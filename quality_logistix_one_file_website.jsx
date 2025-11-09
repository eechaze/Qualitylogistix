/*
Quality Logistix — Single-file React website (Tailwind)

How to use:
1) This is a single-file React component (default export). Drop it into a Create React App / Vite React project as src/App.jsx
2) Make sure Tailwind is installed and configured in the project. If you don't want Tailwind, the CSS classes are straightforward to convert.
3) Forms are wired to Formspree (example endpoints). Replace the FORM_ENDPOINT constants with your Formspree URLs or with your own backend endpoints (Supabase/Firebase/Netlify Forms).
4) Logo and hero images are inline SVG so you immediately have an editable logo and banners. Swap them for exported PNGs if you prefer.
5) Deployment: push to Git and deploy on Vercel / Netlify / Hostinger. See the short README below.

What this file contains:
- A responsive 5-page site: Home, About, Services, Track Shipment, Contact
- Client-side routing via a minimal internal router (no dependency on react-router)
- Accessible forms that submit to Formspree (email) and show success messages
- An SVG logo, color tokens, and a modern aesthetic

Replace this header comment in production.
*/

import React, {useState, useEffect} from 'react';

// ----------------------------- CONFIG -----------------------------
const BRAND = {
  name: 'Quality Logistix',
  primary: '#0A1F44', // deep navy
  secondary: '#1FC4B2', // teal
  accent: '#F5F7FA', // light
  supportEmail: 'support@qualitylogistix.com' // replace with your real email
};

// Replace these with your real form endpoints (Formspree, Netlify, Supabase function, etc.)
const CONTACT_FORM_ENDPOINT = 'https://formspree.io/f/xzzypvnr';
const TRACK_FORM_ENDPOINT = 'https://formspree.io/f/xeovjzyk';

// ----------------------------- STYLES (tailwind-like minimal) -----------------------------
// If you don't use Tailwind, you can keep these style objects and use inline styles.
const styles = {
  container: `min-h-screen font-sans bg-white text-gray-900`,
  header: `w-full border-b border-gray-200 bg-white`,
  nav: `max-w-6xl mx-auto px-6 py-4 flex items-center justify-between`,
  navLinks: `hidden md:flex gap-6 items-center text-sm font-medium`,
  ctaButton: `ml-3 inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-semibold`,
  main: `max-w-6xl mx-auto px-6 py-12`,
  section: `my-12`,
  card: `bg-white rounded-lg shadow p-6 border`,
  footer: `w-full border-t border-gray-200 mt-16 bg-white`
};

// ----------------------------- UTIL: tiny router -----------------------------
function useRoute() {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || '/');
  useEffect(() => {
    function onHash() { setRoute(window.location.hash.replace('#', '') || '/'); }
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return [route, (to) => { window.location.hash = to; }];
}

// ----------------------------- Logo (SVG) -----------------------------
function Logo({className}){
  return (
    <div className={className} aria-hidden="false">
      <svg width="140" height="40" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quality Logistix logo">
        <rect width="280" height="80" rx="12" fill="white"/>
        <g transform="translate(14,10)">
          <circle cx="18" cy="18" r="16" fill={BRAND.secondary} />
          <path d="M6 30 L30 6" stroke={BRAND.primary} strokeWidth="3" strokeLinecap="round" />
          <text x="56" y="28" fill={BRAND.primary} fontFamily="Inter, Roboto, system-ui, -apple-system" fontWeight="700" fontSize="20">{BRAND.name.split(' ')[0]}</text>
          <text x="56" y="48" fill="#4B5563" fontFamily="Inter, Roboto, system-ui, -apple-system" fontWeight="600" fontSize="12">{BRAND.name.split(' ').slice(1).join(' ')}</text>
        </g>
      </svg>
    </div>
  );
}

// ----------------------------- UI: Nav -----------------------------
function Nav({onNavigate}){
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className="flex items-center gap-4">
          <a href="#/" onClick={(e)=>{e.preventDefault(); onNavigate('/');}} style={{display:'flex',alignItems:'center'}}>
            <Logo className="" />
          </a>
        </div>
        <nav className={styles.navLinks}>
          <a href="#/" onClick={(e)=>{e.preventDefault(); onNavigate('/');}} className="text-slate-700 hover:text-slate-900">Home</a>
          <a href="#/about" onClick={(e)=>{e.preventDefault(); onNavigate('/about');}} className="text-slate-700 hover:text-slate-900">About</a>
          <a href="#/services" onClick={(e)=>{e.preventDefault(); onNavigate('/services');}} className="text-slate-700 hover:text-slate-900">Services</a>
          <a href="#/track" onClick={(e)=>{e.preventDefault(); onNavigate('/track');}} className="text-slate-700 hover:text-slate-900">Track</a>
          <a href="#/contact" onClick={(e)=>{e.preventDefault(); onNavigate('/contact');}} className="text-slate-700 hover:text-slate-900">Contact</a>
          <a href="#/contact" onClick={(e)=>{e.preventDefault(); onNavigate('/contact');}} className={`bg-[${BRAND.primary}] text-white px-3 py-2 rounded-md ml-2`} style={{background:BRAND.primary}}>Ship Now</a>
        </nav>
        <div className="md:hidden">
          <button onClick={()=>setOpen(!open)} aria-label="menu" className="p-2 rounded-md border">
            ☰
          </button>
          {open && (
            <div className="absolute right-4 mt-2 bg-white border rounded shadow p-4">
              <a href="#/" onClick={(e)=>{e.preventDefault(); onNavigate('/'); setOpen(false);}} className="block py-1">Home</a>
              <a href="#/about" onClick={(e)=>{e.preventDefault(); onNavigate('/about'); setOpen(false);}} className="block py-1">About</a>
              <a href="#/services" onClick={(e)=>{e.preventDefault(); onNavigate('/services'); setOpen(false);}} className="block py-1">Services</a>
              <a href="#/track" onClick={(e)=>{e.preventDefault(); onNavigate('/track'); setOpen(false);}} className="block py-1">Track</a>
              <a href="#/contact" onClick={(e)=>{e.preventDefault(); onNavigate('/contact'); setOpen(false);}} className="block py-1">Contact</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ----------------------------- Components: Hero, Cards, Forms -----------------------------
function Hero(){
  return (
    <section className="rounded-lg overflow-hidden mb-8" style={{background: `linear-gradient(90deg, ${BRAND.primary} 0%, ${BRAND.secondary} 100%)`}}>
      <div className="max-w-6xl mx-auto px-6 py-20 text-white flex flex-col md:flex-row items-center gap-10">
        <div style={{flex:1}}>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Fast. Secure. Reliable Shipping to Nigeria.</h1>
          <p className="mt-4 text-md max-w-xl">Quality Logistix connects the world to Nigeria with seamless freight forwarding, package consolidation, and reliable delivery you can trust.</p>
          <div className="mt-6 flex gap-4">
            <a href="#/contact" className="px-5 py-3 bg-white text-[${BRAND.primary}] rounded-md font-semibold">Ship Now</a>
            <a href="#/track" className="px-5 py-3 border border-white rounded-md text-white">Track a Package</a>
          </div>
        </div>
        <div style={{flex:1}}>
          {/* Simple illustrative SVG banner (editable) */}
          <svg viewBox="0 0 600 360" className="w-full h-56 md:h-72" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.06" />
              </linearGradient>
            </defs>
            <rect width="600" height="360" rx="12" fill="url(#g1)"/>
            <g transform="translate(30,40)">
              <rect x="0" y="0" width="220" height="120" rx="8" fill="#fff" opacity="0.06" />
              <rect x="240" y="0" width="120" height="80" rx="8" fill="#fff" opacity="0.06" />
              <path d="M10 140 Q120 90 220 140 T430 140" stroke="#fff" strokeWidth="3" fill="none" opacity="0.08" />
              <text x="10" y="110" fill="#fff" fontSize="18" fontWeight="700">Ship, Track, Deliver</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

function Feature({title, children}){
  return (
    <div className="p-4">
      <div className="p-6 rounded-lg border bg-white h-full">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{children}</p>
      </div>
    </div>
  );
}

// ----------------------------- Forms -----------------------------
function useSubmitForm(endpoint){
  const [status, setStatus] = useState('idle');
  const submit = async (formData) => {
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if (res.ok) { setStatus('success'); }
      else { setStatus('error'); }
    } catch (e) { setStatus('error'); }
  };
  return [status, submit];
}

function ContactForm(){
  const [status, submit] = useSubmitForm(CONTACT_FORM_ENDPOINT);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await submit(fd);
    e.target.reset();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="fullName" required placeholder="Full name" className="p-3 border rounded" />
        <input name="email" required type="email" placeholder="Email" className="p-3 border rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="origin" placeholder="Origin country" className="p-3 border rounded" />
        <input name="destination" placeholder="Destination city (Nigeria)" className="p-3 border rounded" />
      </div>
      <div>
        <select name="packageType" className="p-3 border rounded w-full">
          <option>Documents</option>
          <option>Electronics</option>
          <option>Personal Items</option>
          <option>Business Goods</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <textarea name="message" placeholder="Tell us about your shipment (optional)" className="p-3 border rounded w-full" rows={4}></textarea>
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" className="px-4 py-2 rounded bg-[${BRAND.primary}] text-white" style={{background:BRAND.primary}}>Send Inquiry</button>
        {status === 'sending' && <span>Sending...</span>}
        {status === 'success' && <span className="text-green-600">Thanks — we'll respond within 24–48 hrs.</span>}
        {status === 'error' && <span className="text-red-600">There was an error. Try again later.</span>}
      </div>
    </form>
  );
}

function TrackForm(){
  const [status, submit] = useSubmitForm(TRACK_FORM_ENDPOINT);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await submit(fd);
    // don't reset tracking number to let user see what they asked
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input name="fullName" placeholder="Full name" className="p-3 border rounded w-full" />
      <input name="email" type="email" placeholder="Email (to receive updates)" className="p-3 border rounded w-full" />
      <input name="trackingNumber" required placeholder="Tracking number" className="p-3 border rounded w-full" />
      <div className="flex items-center gap-4">
        <button type="submit" className="px-4 py-2 rounded" style={{background:BRAND.primary,color:'white'}}>Get Status</button>
        {status === 'sending' && <span>Checking...</span>}
        {status === 'success' && <span className="text-green-600">Request received — check your email for updates.</span>}
        {status === 'error' && <span className="text-red-600">Error — try again later.</span>}
      </div>
    </form>
  );
}

// ----------------------------- Pages -----------------------------
function HomePage(){
  return (
    <main className={styles.main}>
      <Hero />
      <section className={styles.section}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature title="Hassle-free Shipping">We manage pickup, consolidation, documentation and delivery so you can focus on your business.</Feature>
          <Feature title="Affordable Rates">Consolidation and flexible air/sea freight options to suit budgets.</Feature>
          <Feature title="Customs Support">We handle paperwork and clearance to minimize delays at arrival.</Feature>
        </div>
      </section>

      <section className={styles.section}>
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold">How it works</h2>
            <ol className="mt-4 list-decimal list-inside text-gray-700">
              <li>Request a shipping quote or send an inquiry.</li>
              <li>Choose pickup or drop-off; we consolidate packages weekly.</li>
              <li>Track shipment and receive delivery in Nigeria.</li>
            </ol>
            <div className="mt-6">
              <a href="#/contact" className="px-4 py-2 rounded" style={{background:BRAND.primary,color:'white'}}>Send Inquiry</a>
            </div>
          </div>
          <div className="p-4 rounded bg-white border shadow">
            <h3 className="font-semibold">Quick Quote</h3>
            <p className="text-sm text-slate-600">Tell us origin, destination and approximate weight. We'll reply with options.</p>
            <form className="mt-4 space-y-3" onSubmit={(e)=>{e.preventDefault(); alert('This demo form posts to your Formspree endpoint when configured.')}}>
              <input placeholder="Origin country" className="p-2 border rounded w-full"/>
              <input placeholder="Destination city (Nigeria)" className="p-2 border rounded w-full"/>
              <input placeholder="Est. weight (kg)" className="p-2 border rounded w-full"/>
              <button className="px-4 py-2 rounded" style={{background:BRAND.secondary,color:'#042432'}}>Get Quote</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function AboutPage(){
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h2 className="text-2xl font-bold">About Quality Logistix</h2>
        <p className="mt-4 text-gray-700 max-w-3xl">Quality Logistix is a global freight forwarding company focused on shipping packages to Nigeria with speed, transparency, and reliability. We support families and businesses with air and sea freight options, package consolidation, and customs guidance to reduce cost and transit time.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border rounded shadow">
            <h4 className="font-semibold">Our Mission</h4>
            <p className="text-sm text-gray-600 mt-2">To create a seamless and trusted shipping bridge between the world and Nigeria.</p>
          </div>
          <div className="p-4 bg-white border rounded shadow">
            <h4 className="font-semibold">Our Values</h4>
            <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
              <li>Reliability</li>
              <li>Transparency</li>
              <li>Speed</li>
              <li>Customer-First</li>
            </ul>
          </div>
          <div className="p-4 bg-white border rounded shadow">
            <h4 className="font-semibold">Support</h4>
            <p className="text-sm text-gray-600 mt-2">Email: <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a></p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServicesPage(){
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h2 className="text-2xl font-bold">Services</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border rounded shadow">
            <h3 className="font-semibold">International Freight Forwarding</h3>
            <p className="text-sm text-gray-600 mt-2">We ship packages worldwide to Nigeria with air and sea routing.</p>
          </div>
          <div className="p-4 bg-white border rounded shadow">
            <h3 className="font-semibold">Package Consolidation</h3>
            <p className="text-sm text-gray-600 mt-2">Combine multiple packages to reduce per-shipment costs.</p>
          </div>
          <div className="p-4 bg-white border rounded shadow">
            <h3 className="font-semibold">Customs & Clearance</h3>
            <p className="text-sm text-gray-600 mt-2">We assist with documentation, duties and compliance to avoid delays.</p>
          </div>
          <div className="p-4 bg-white border rounded shadow">
            <h3 className="font-semibold">Real-Time Updates</h3>
            <p className="text-sm text-gray-600 mt-2">Receive tracking updates and customer support during transit.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function TrackPage(){
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h2 className="text-2xl font-bold">Track Shipment</h2>
        <p className="mt-2 text-gray-700">Enter your tracking number and email to get the latest status.</p>
        <div className="mt-6">
          <TrackForm />
        </div>
      </section>
    </main>
  );
}

function ContactPage(){
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="mt-2 text-gray-700">We’re here to help move your packages across borders. Response time: 24–48 hours.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-8">
          <div className="p-4 bg-white border rounded shadow">
            <h3 className="font-semibold">Email</h3>
            <p className="text-sm text-gray-600 mt-2">{BRAND.supportEmail}</p>
            <h3 className="font-semibold mt-4">Pickup / Partner Locations</h3>
            <p className="text-sm text-gray-600 mt-2">USA • UK • Canada • Nigeria</p>
          </div>
          <div className="p-4 bg-white border rounded shadow">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

// ----------------------------- Footer -----------------------------
function Footer(){
  return (
    <footer className={styles.footer}>
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <Logo />
          <p className="text-sm text-gray-600 mt-2">Trusted freight forwarding to Nigeria.</p>
        </div>
        <div>
          <h4 className="font-semibold">Services</h4>
          <ul className="text-sm text-gray-600 mt-2 list-inside">
            <li>Air & Sea Freight</li>
            <li>Consolidation</li>
            <li>Customs Clearance</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm text-gray-600 mt-2">Email: <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a></p>
          <p className="text-sm text-gray-600 mt-2">© {new Date().getFullYear()} {BRAND.name}</p>
        </div>
      </div>
    </footer>
  );
}

// ----------------------------- App -----------------------------
export default function App(){
  const [route, navigate] = useRoute();
  return (
    <div className={styles.container}>
      <Nav onNavigate={navigate} />
      {route === '/' && <HomePage />}
      {route === '/about' && <AboutPage />}
      {route === '/services' && <ServicesPage />}
      {route === '/track' && <TrackPage />}
      {route === '/contact' && <ContactPage />}
      <Footer />
    </div>
  );
}

/*
README / next steps (short)

1) Replace FORM_ENDPOINT constants with your project's form endpoints. Formspree can be configured quickly:
   - Sign up at https://formspree.io -> create a form -> copy endpoint
   - Or use Netlify/Vercel function to send emails via SMTP or third-party API
2) Install Tailwind (optional) or replace classes with your own CSS
3) To deploy quickly: push to GitHub and connect to Vercel (automatic deploys). Or use Netlify.
4) To use a backend (store inquiries in DB): create a simple serverless function (Supabase, Firebase, Vercel functions) and update endpoints.

If you'd like, I can:
- Convert this into a static HTML/CSS + plain JS bundle you can upload anywhere
- Create the Formspree endpoints and test them for you (I will give the exact instructions and payloads)
- Generate PNG/JPEG versions of the logo and banner (exported assets)
*/
