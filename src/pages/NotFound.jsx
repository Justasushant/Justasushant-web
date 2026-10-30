import { Link } from 'react-router'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[80svh] flex-col justify-center px-4 pt-16 sm:px-6 lg:px-10 2xl:px-16">
        <p className="font-mono text-sm text-zinc-500">404</p>
        <h1 className="mt-3 font-display text-5xl uppercase tracking-tight sm:text-7xl">Nothing here.</h1>
        <p className="mt-4 max-w-md text-zinc-400">
          That page doesn’t exist, or it moved. Try the home page or the Lab.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
          <Link to="/" className="rounded-full bg-white px-5 py-2.5 text-zinc-950">
            Home
          </Link>
          <Link to="/lab" className="rounded-full border border-white/15 px-5 py-2.5 hover:border-white/40">
            Browse the Lab
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
