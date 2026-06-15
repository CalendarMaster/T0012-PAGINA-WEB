import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { getSessionId } from '../lib/sessionId'
import LoadingLoop from '../components/LoadingLoop'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
}

function authorDisplayName(email, name) {
  if (name) return name
  if (email) return email.split('@')[0]
  return 'MI Studio'
}

export default function NewsPage() {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [likes, setLikes] = useState({})
  const [likedByMe, setLikedByMe] = useState({})
  const sessionId = getSessionId()

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (error || !data) {
        setIsLoading(false)
        return
      }

      setNews(data)

      const newsIds = data.map((n) => n.id)
      if (newsIds.length > 0) {
        const { data: likesData } = await supabase
          .from('news_likes')
          .select('news_id, session_id')
          .in('news_id', newsIds)

        if (likesData) {
          const countsMap = {}
          const myLikesMap = {}
          for (const like of likesData) {
            countsMap[like.news_id] = (countsMap[like.news_id] || 0) + 1
            if (like.session_id === sessionId) myLikesMap[like.news_id] = true
          }
          setLikes(countsMap)
          setLikedByMe(myLikesMap)
        }
      }

      setIsLoading(false)
    }

    load()
  }, [])

  const handleLike = async (newsId, event) => {
    event.preventDefault()
    event.stopPropagation()

    if (likedByMe[newsId]) {
      await supabase.from('news_likes').delete().eq('news_id', newsId).eq('session_id', sessionId)
      setLikes((prev) => ({ ...prev, [newsId]: Math.max(0, (prev[newsId] || 1) - 1) }))
      setLikedByMe((prev) => ({ ...prev, [newsId]: false }))
    } else {
      const { error } = await supabase.from('news_likes').insert({ news_id: newsId, session_id: sessionId })
      if (!error) {
        setLikes((prev) => ({ ...prev, [newsId]: (prev[newsId] || 0) + 1 }))
        setLikedByMe((prev) => ({ ...prev, [newsId]: true }))
      }
    }
  }

  return (
    <main className="content-page news-catalog-page" aria-labelledby="news-page-title">
      <section className="content-page-head projects-catalog-head">
        <p className="eyebrow">Actualidad</p>
        <h1 id="news-page-title">Noticias</h1>
        <p className="services-catalog-lead">Novedades, hitos de proyectos y contenido técnico del rubro.</p>
      </section>

      {isLoading ? (
        <div className="news-loader">
          <LoadingLoop compact label="Cargando noticias" />
        </div>
      ) : news.length === 0 ? (
        <p className="news-empty">No hay noticias publicadas todavía.</p>
      ) : (
        <div className="news-grid">
          {news.map((item) => (
            <article key={item.id} className="news-card">
              {item.image_url && (
                <Link to={`/noticias/${item.slug}`} className="news-card-image-wrap" tabIndex={-1} aria-hidden="true">
                  <img className="news-card-img" src={item.image_url} alt={item.title} loading="lazy" />
                </Link>
              )}
              <div className="news-card-body">
                <div className="news-card-meta">
                  <span className="news-card-avatar" aria-hidden="true">
                    {authorDisplayName(item.author_email, item.author_name).charAt(0).toUpperCase()}
                  </span>
                  <span className="news-card-author">{authorDisplayName(item.author_email, item.author_name)}</span>
                  <span className="news-card-sep" aria-hidden="true">·</span>
                  <time className="news-card-date" dateTime={item.created_at}>{formatDate(item.created_at)}</time>
                </div>

                <Link to={`/noticias/${item.slug}`} className="news-card-title-link">
                  <h2 className="news-card-title">{item.title}</h2>
                  {item.subtitle && <p className="news-card-subtitle">{item.subtitle}</p>}
                </Link>

                <div className="news-card-footer">
                  <span className="news-card-comments">0 comentarios</span>
                  <button
                    className={`news-like-btn${likedByMe[item.id] ? ' is-liked' : ''}`}
                    type="button"
                    onClick={(e) => handleLike(item.id, e)}
                    aria-label={likedByMe[item.id] ? 'Quitar like' : 'Dar like'}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={likedByMe[item.id] ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {likes[item.id] || 0}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
