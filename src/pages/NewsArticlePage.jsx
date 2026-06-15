import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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

function estimateReadingTime(text) {
  if (!text) return 1
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default function NewsArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [recentNews, setRecentNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [likesCount, setLikesCount] = useState(0)
  const [likedByMe, setLikedByMe] = useState(false)
  const sessionId = getSessionId()

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

      if (error || !data) {
        setIsLoading(false)
        return
      }

      setArticle(data)

      const [likesRes, recentRes] = await Promise.all([
        supabase.from('news_likes').select('session_id').eq('news_id', data.id),
        supabase.from('news').select('id, slug, title, subtitle, image_url, created_at, author_email, author_name')
          .eq('is_published', true)
          .neq('slug', slug)
          .order('created_at', { ascending: false })
          .limit(3),
      ])

      if (likesRes.data) {
        setLikesCount(likesRes.data.length)
        setLikedByMe(likesRes.data.some((l) => l.session_id === sessionId))
      }

      if (recentRes.data) setRecentNews(recentRes.data)

      setIsLoading(false)
    }

    load()
  }, [slug])

  const handleLike = async () => {
    if (!article) return
    if (likedByMe) {
      await supabase.from('news_likes').delete().eq('news_id', article.id).eq('session_id', sessionId)
      setLikesCount((c) => Math.max(0, c - 1))
      setLikedByMe(false)
    } else {
      const { error } = await supabase.from('news_likes').insert({ news_id: article.id, session_id: sessionId })
      if (!error) {
        setLikesCount((c) => c + 1)
        setLikedByMe(true)
      }
    }
  }

  if (isLoading) {
    return (
      <main className="news-article-page">
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <LoadingLoop compact label="Cargando noticia" />
        </div>
      </main>
    )
  }

  if (!article) {
    return (
      <main className="news-article-page">
        <div className="news-article-inner">
          <Link className="news-article-back" to="/noticias">← Todas las entradas</Link>
          <p style={{ color: 'rgba(11,13,14,0.5)', marginTop: 40 }}>Noticia no encontrada.</p>
        </div>
      </main>
    )
  }

  const bodyParagraphs = (article.body || '').split('\n\n').filter(Boolean)
  const readingTime = estimateReadingTime(article.body)

  return (
    <main className="news-article-page">
      <div className="news-article-inner">
        <Link className="news-article-back" to="/noticias">← Todas las entradas</Link>

        <div className="news-article-header">
          <p className="news-article-dateline">
            {formatDate(article.created_at)}
            <span className="news-card-sep" aria-hidden="true"> · </span>
            {readingTime} min de lectura
          </p>

          <h1 className="news-article-title">{article.title}</h1>
          {article.subtitle && <p className="news-article-subtitle">{article.subtitle}</p>}
        </div>

        {article.image_url && (
          <div className="news-article-img-wrap">
            <img src={article.image_url} alt={article.title} />
          </div>
        )}

        {bodyParagraphs.length > 0 && (
          <div className="news-article-body">
            {bodyParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        {article.external_link && (
          <a
            className="news-article-external"
            href={article.external_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver noticia completa →
          </a>
        )}

        <div className="news-article-footer">
          <div className="news-article-stats">
            <span>0 comentarios</span>
          </div>
          <button
            className={`news-like-btn${likedByMe ? ' is-liked' : ''}`}
            type="button"
            onClick={handleLike}
            aria-label={likedByMe ? 'Quitar like' : 'Dar like'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={likedByMe ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {likesCount}
          </button>
        </div>

        {recentNews.length > 0 && (
          <aside className="news-article-recent">
            <div className="news-article-recent-head">
              <h2>Entradas recientes</h2>
              <Link to="/noticias">Ver todo</Link>
            </div>
            <div className="news-article-recent-grid">
              {recentNews.map((item) => (
                <Link key={item.id} className="news-recent-card" to={`/noticias/${item.slug}`}>
                  {item.image_url && (
                    <div className="news-recent-card-img-wrap">
                      <img src={item.image_url} alt={item.title} loading="lazy" />
                    </div>
                  )}
                  <div className="news-recent-card-body">
                    <div className="news-card-meta">
                      <span className="news-card-avatar" aria-hidden="true">
                        {authorDisplayName(item.author_email, item.author_name).charAt(0).toUpperCase()}
                      </span>
                      <time className="news-card-date">{formatDate(item.created_at)}</time>
                    </div>
                    <p className="news-recent-card-title">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </main>
  )
}
