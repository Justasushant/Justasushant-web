import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home.jsx'
import LabIndex from './pages/LabIndex.jsx'
import LabComponent from './pages/LabComponent.jsx'
import OpenSource from './pages/OpenSource.jsx'
import NotFound from './pages/NotFound.jsx'
import { metaFor } from './seo/meta.js'
import { applyHead } from './seo/head.js'

export default function App() {
  const { pathname, hash } = useLocation()

  // New page -> start at the top (hash links handle their own scrolling)
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  // Title, description, canonical, social tags and structured data for this page
  useEffect(() => {
    applyHead(metaFor(pathname))
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lab" element={<LabIndex />} />
      <Route path="/lab/:slug" element={<LabComponent />} />
      <Route path="/open-source" element={<OpenSource />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
