import { Link, useNavigate } from 'react-router'
import { site } from '../data/site.js'
import { categories } from '../registry/index.jsx'

// A dark hero with a glow rising from the bottom, like the end of a day
export default function Hero() {
  const navigate = useNavigate()

  return (
    <section
      id="top"
      className="on-dark grain relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#140a05] px-5 pb-24 pt-28 text-center text-[#fff6ef]"
    >
      <div
        aria-hidden
        className="absolute inset-x-[-20%] bottom-[-30%] -z-10 h-[75%]"
        style={{ background: 'radial-gradient(ellipse 65% 90% at 50% 100%, #ff5b14 0%, #e0480c 30%, rgba(194,65,12,0.55) 52%, rgba(194,65,12,0) 74%)', filter: 'blur(10px)' }}
      />
      <h1 className=" text-[clamp(3rem,11vw,8.75rem)] leading-[0.94] tracking-[-0.045em] text-[#fff6ef]">
        Sushant
        <br />
        Sharma
      </h1>
      <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#fff6ef]/70">{site.tagline}</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <button onClick={() => navigate('/lab')} className="ink-btn">
          Open the Lab
        </button>
        <button onClick={() => navigate('/#contact')} className="ink-btn ghost">
          Contact
        </button>
      </div>
      <ul className="mt-14 flex max-w-3xl flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <li key={category}>
            <Link
              to={`/lab?category=${encodeURIComponent(category)}`}
              className="block rounded-full bg-white/[0.08] px-4 py-1.5 text-sm text-[#fff6ef]/80 ring-1 ring-white/10 transition-colors hover:bg-white/15 hover:text-[#fff6ef]"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
