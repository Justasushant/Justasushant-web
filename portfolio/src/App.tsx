import { useMemo } from 'react'
import './App.css'
import { Orb, ShinyText, ScrambleText, Aurora, ClickSpark } from '@appletosolutions/reactbits'
import { FaReact, FaNodeJs, FaPython, FaGitAlt } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiVite } from 'react-icons/si'

const LOGO_URL = 'https://i.ibb.co/LD1KByNz/Pheonix-logo-png.png'

function PillNav() {
	const items = useMemo(() => [
		{ label: 'Home', href: '#home' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Contact', href: '#contact' },
	], [])
	return (
		<div style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
			<div style={{ display: 'flex', gap: 8, background: '#0a0a0a', border: '1px solid #222', padding: 6, borderRadius: 9999 }}>
				{items.map((item) => (
					<a key={item.href} href={item.href} style={{
						color: '#fff', textDecoration: 'none', padding: '10px 16px', borderRadius: 9999,
						background: 'transparent'
					}} onMouseEnter={(e) => (e.currentTarget.style.background = '#111')}
						onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
						{item.label}
					</a>
				))}
			</div>
		</div>
	)
}

function Hero() {
	// Flame-like palette via hue and Aurora overlay
	return (
		<section id="home" className="section" style={{ position: 'relative', paddingTop: 120, paddingBottom: 120 }}>
			<div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
				<Orb hue={28} hoverIntensity={0.8} rotateOnHover />
				<div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 10%, rgba(255,106,0,0.2), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,180,0,0.15), transparent 60%)' }} />
				<Aurora colorStops={[ '#ff6a00', '#ffb300', '#ff3b00' ]} amplitude={1.1} speed={0.6} />
			</div>
			<div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 24, justifyItems: 'center' }}>
				<img src={LOGO_URL} alt="Logo" width={140} height={140} style={{ filter: 'drop-shadow(0 0 24px rgba(255,106,0,0.35))' }} />
				<ShinyText text="justasushant" speed={6} />
				<p style={{ color: '#a1a1aa', marginTop: -8 }}>I build fast, modern web apps.</p>
				<div style={{ display: 'inline-flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
					<ClickSpark sparkColor="#ff6a00" sparkCount={12}>
						<a href="#projects" className="button">View Projects</a>
					</ClickSpark>
					<a href="#contact" className="button" style={{ background: 'transparent', color: '#ff6a00', border: '1px solid #ff6a00' }}>Contact</a>
				</div>
			</div>
		</section>
	)
}

function RotatingSkills() {
	const texts = [ 'Web developer (frontend)', 'Python developer' ]
	return (
		<section id="skills" className="section" style={{ position: 'relative' }}>
			<div className="container" style={{ textAlign: 'center' }}>
				<h2 style={{ marginBottom: 8 }}>Skills</h2>
				{/* Use ScrambleText to simulate rotating emphasis */}
				<div style={{ fontSize: '1.25rem', color: '#ff6a00', fontWeight: 800 }}>
					<ScrambleText speed={0.5} scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz">{texts[0]}</ScrambleText>
				</div>
				<div style={{ opacity: 0.6, marginTop: 8 }}>
					<ScrambleText speed={0.5} scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz">{texts[1]}</ScrambleText>
				</div>
				<div style={{ marginTop: 24, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
					<FaReact size={36} color="#61dafb" />
					<SiNextdotjs size={36} color="#ffffff" />
					<SiTypescript size={36} color="#3178c6" />
					<SiTailwindcss size={36} color="#38bdf8" />
					<FaNodeJs size={36} color="#8cc84b" />
					<SiMongodb size={36} color="#10aa50" />
					<FaPython size={36} color="#ffd43b" />
					<FaGitAlt size={36} color="#f05033" />
					<SiVite size={36} color="#a855f7" />
				</div>
			</div>
		</section>
	)
}

function Projects() {
	const projects = [
		{ name: 'Desigambler.in', desc: 'Economy, spin & redeem, daily reward, redeem code coins system created', status: 'Currently down' },
		{ name: 'Homeyrewards.pro', desc: 'Created whole website including the features of 1st website', status: 'Currently running' },
		{ name: 'Shreeshyammobile.com', desc: 'Mobile shopping website online ecommerce', status: 'Currently up' },
		{ name: 'RKexport.in', desc: 'Marble & granite related website', status: 'Currently up' },
	]
	return (
		<section id="projects" className="section">
			<div className="container">
				<h2 style={{ textAlign: 'center', marginBottom: 24 }}>Projects</h2>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
					{projects.map((p) => (
						<div key={p.name} style={{ border: '1px solid #222', borderRadius: 16, padding: 16, background: '#0a0a0a' }}>
							<h3 style={{ marginTop: 0 }}>{p.name}</h3>
							<p style={{ color: '#a1a1aa', marginTop: 4 }}>{p.desc}</p>
							<p style={{ color: p.status.includes('down') ? '#ff4444' : '#22c55e', fontWeight: 700 }}>{p.status}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function Contact() {
	return (
		<section id="contact" className="section">
			<div className="container" style={{ display: 'grid', gap: 12 }}>
				<h2>Contact</h2>
				<p>Instagram: <a href="https://instagram.com/justasushant" target="_blank" rel="noreferrer">@justasushant</a></p>
				<p>Discord: _pheonix5128</p>
				<p>Email: <a href="mailto:pheonix5128@gmail.com">pheonix5128@gmail.com</a>, <a href="mailto:hi@justasushant.com">hi@justasushant.com</a></p>
			</div>
		</section>
	)
}

function App() {
	return (
		<>
			<PillNav />
			<Hero />
			<RotatingSkills />
			<Projects />
			<Contact />
			<footer className="section" style={{ textAlign: 'center', color: '#a1a1aa' }}>
				© {new Date().getFullYear()} justasushant. All rights reserved.
			</footer>
		</>
	)
}

export default App
