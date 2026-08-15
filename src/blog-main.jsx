import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BlogPage from './components/BlogPage.jsx'

createRoot(document.getElementById('blog-root')).render(
  <StrictMode>
    <BlogPage />
  </StrictMode>,
)
