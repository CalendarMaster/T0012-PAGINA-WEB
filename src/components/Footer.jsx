import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>MI Studio - Modelo Integrado</span>
      <span>Servicios BIM y arquitectura en Chile</span>
      <Link to="/auth">Acceso equipo</Link>
    </footer>
  )
}
