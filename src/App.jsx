import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Bottle from './Bottle.jsx'

gsap.registerPlugin(ScrollTrigger)

/* ============================================================
   THE COLLECTION — edit fragrances here
   ============================================================ */
const FRAGRANCES = [
  {
    name: 'Noir',
    tagline: 'Oud, smoke & citrus',
    mono: 'N',
    glass: '#1A1410', cap: '#B8893B', accent: '#CBA259',
    orb: 'radial-gradient(circle at 38% 32%, #CBA259, #6B4A2E 72%, transparent)',
    notes: ['Aged Oud', 'Frankincense', 'Bergamot'],
    desc: 'The signature. Dark, resinous and warm — worn after dark.',
    price: 85000,
  },
  {
    name: 'Aurore',
    tagline: 'Citrus & white flowers',
    mono: 'A',
    glass: '#E8D6B8', cap: '#D9A441', accent: '#B8893B',
    orb: 'radial-gradient(circle at 38% 32%, #F2D98A, #C9912F 72%, transparent)',
    notes: ['Neroli', 'Jasmine', 'Mandarin'],
    desc: 'Morning light in a bottle. Bright, floral and clean.',
    price: 78000,
  },
  {
    name: 'Velours',
    tagline: 'Rose & saffron',
    mono: 'V',
    glass: '#5A1F2A', cap: '#C9A24B', accent: '#E0A6B0',
    orb: 'radial-gradient(circle at 38% 32%, #C24A5E, #5A1F2A 74%, transparent)',
    notes: ['Damask Rose', 'Saffron', 'Patchouli'],
    desc: 'Velvet warmth. A deep rose laid over spice.',
    price: 92000,
  },
  {
    name: 'Cèdre',
    tagline: 'Cedar & vetiver',
    mono: 'C',
    glass: '#1F2A1E', cap: '#A7B58A', accent: '#9DB038',
    orb: 'radial-gradient(circle at 38% 32%, #8FA86B, #2F3A22 74%, transparent)',
    notes: ['Cedarwood', 'Vetiver', 'Green Fig'],
    desc: 'A walk through forest at dusk. Earthy and quiet.',
    price: 80000,
  },
  {
    name: 'Lumière',
    tagline: 'Amber & vanilla',
    mono: 'L',
    glass: '#2A2018', cap: '#E0BC6A', accent: '#E8C879',
    orb: 'radial-gradient(circle at 38% 32%, #E8C879, #8A6A2E 74%, transparent)',
    notes: ['Amber', 'Vanilla', 'Tonka Bean'],
    desc: 'The last glow of evening. Sweet, golden, lasting.',
    price: 88000,
  },
]

const MANIFESTO = 'A scent is a memory you cannot see. We built five from the warmth of West Africa — for those who arrive without announcement.'

function naira(n) { return '\u20A6' + n.toLocaleString('en-NG') }

export default function App() {
  const root = useRef(null)
  const [order, setOrder] = useState({
    name: '', fragrance: FRAGRANCES[0].name, quantity: 1,
    contact: '', address: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const selected = FRAGRANCES.find((f) => f.name === order.fragrance) || FRAGRANCES[0]
  const total = selected.price * Math.max(1, Number(order.quantity) || 1)

  function update(field, value) {
    setSubmitted(false)
    setOrder((o) => ({ ...o, [field]: value }))
  }

  function validate() {
    return order.name.trim() && order.contact.trim() && order.address.trim()
  }

  function handleEmail() {
    if (!validate()) { setSubmitted('error'); return }
    const subject = encodeURIComponent(`NOIR Order — ${order.fragrance} x${order.quantity}`)
    const body = encodeURIComponent(
      `New fragrance order\n\n` +
      `Name: ${order.name}\n` +
      `Fragrance: ${order.fragrance}\n` +
      `Quantity: ${order.quantity}\n` +
      `Contact: ${order.contact}\n` +
      `Address: ${order.address}\n` +
      `Notes: ${order.notes || '—'}\n` +
      `Total: ${naira(total)}\n`
    )
    window.location.href = `mailto: sam07ife@gmail.com?subject=${subject}&body=${body}`
    setSubmitted('email')
  }

  function handlePrint() {
    if (!validate()) { setSubmitted('error'); return }
    setSubmitted('print')
    setTimeout(() => window.print(), 100)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) {
        gsap.set('.hero-title .line em, .manifesto .word, .frag-card, .step', { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 1, delay: 0.2 })
        .from('.hero-title .line em', { yPercent: 110, opacity: 0, duration: 1.1 }, '-=0.5')
        .from('.hero-sub', { opacity: 0, y: 20, duration: 1 }, '-=0.6')
        .from('.scroll-cue', { opacity: 0, duration: 1 }, '-=0.4')
        .from('.hero-bottle', { opacity: 0, y: 60, duration: 1.4 }, '-=1.2')

      gsap.to('.hero-bottle', {
        yPercent: -18, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      const words = gsap.utils.toArray('.manifesto .word')
      gsap.to(words, {
        opacity: 1, stagger: 0.5, ease: 'none',
        scrollTrigger: { trigger: '.manifesto', start: 'top 75%', end: 'bottom 60%', scrub: true },
      })

      // Collection cards: staggered rise + bottle float
      gsap.utils.toArray('.frag-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, y: 70, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 82%' },
        })
        gsap.to(card.querySelector('.frag-bottle'), {
          y: -22, ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.to(card.querySelector('.frag-orb'), {
          scale: 1.15, rotate: i % 2 ? 12 : -12, ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      // Order steps
      gsap.from('.order-inner > *', {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.order', start: 'top 70%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      <nav className="nav">
        <div className="nav-mark">NOIR</div>
        <div className="nav-links">
          <a href="#collection">Collection</a>
          <a href="#order">Order</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-glow" />
        <div className="hero-eyebrow">Abeokuta Fragrance House</div>
        <h1 className="hero-title">
          <span className="line"><em>NOIR</em></span>
        </h1>
        <p className="hero-sub">
          Five eaux de parfum, composed in Nigeria. Find the one that becomes
          your signature.
        </p>
        <Bottle className="hero-bottle" glass="#1A1410" cap="#B8893B" accent="#CBA259" mono="N" />
        <div className="scroll-cue"><span>Scroll</span><span className="bar" /></div>
      </header>

      {/* MANIFESTO */}
      <section className="manifesto">
        <p>
          {MANIFESTO.split(' ').map((w, i) => (
            <span className="word" key={i}>{w}&nbsp;</span>
          ))}
        </p>
      </section>

      {/* COLLECTION — 5 fragrances */}
      <section className="collection" id="collection">
        <div className="collection-head">
          <div className="eyebrow-gold">The Collection</div>
          <h2>Five signatures</h2>
        </div>
        <div className="frag-list">
          {FRAGRANCES.map((f, i) => (
            <article className={`frag-card ${i % 2 ? 'flip' : ''}`} key={f.name}>
              <div className="frag-visual">
                <div className="frag-orb" style={{ background: f.orb }} />
                <Bottle className="frag-bottle" glass={f.glass} cap={f.cap} accent={f.accent} mono={f.mono} />
              </div>
              <div className="frag-text">
                <div className="frag-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{f.name}</h3>
                <div className="frag-tagline">{f.tagline}</div>
                <p>{f.desc}</p>
                <div className="frag-notes">
                  {f.notes.map((n) => <span key={n}>{n}</span>)}
                </div>
                <div className="frag-foot">
                  <span className="frag-price">{naira(f.price)}</span>
                  <button className="btn btn-gold" onClick={() => {
                    update('fragrance', f.name)
                    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
                  }}>Order {f.name}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ORDER */}
      <section className="order" id="order">
        <div className="order-inner">
          <div className="eyebrow-gold">Place an Order</div>
          <h2 className="order-title">Request your fragrance</h2>
          <p className="order-lede">
            Fill in your details and we'll confirm your order by your preferred contact.
            You can print this as a receipt or send it directly.
          </p>

          <div className="order-grid">
            <label className="field">
              <span>Full name *</span>
              <input value={order.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" />
            </label>

            <label className="field">
              <span>Fragrance</span>
              <select value={order.fragrance} onChange={(e) => update('fragrance', e.target.value)}>
                {FRAGRANCES.map((f) => (
                  <option key={f.name} value={f.name}>{f.name} — {naira(f.price)}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Quantity</span>
              <input type="number" min="1" value={order.quantity}
                onChange={(e) => update('quantity', e.target.value)} />
            </label>

            <label className="field">
              <span>Contact (email or phone) *</span>
              <input value={order.contact} onChange={(e) => update('contact', e.target.value)} placeholder="How we reach you" />
            </label>

            <label className="field field-wide">
              <span>Delivery address *</span>
              <input value={order.address} onChange={(e) => update('address', e.target.value)} placeholder="Street, city, state" />
            </label>

            <label className="field field-wide">
              <span>Notes (optional)</span>
              <textarea rows="3" value={order.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Gift wrap, delivery preferences, anything else" />
            </label>
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>{order.fragrance} × {Math.max(1, Number(order.quantity) || 1)}</span>
              <span className="summary-total">{naira(total)}</span>
            </div>
          </div>

          {submitted === 'error' && (
            <p className="order-msg error">Please fill in your name, contact, and address.</p>
          )}
          {submitted === 'email' && (
            <p className="order-msg ok">Opening your email to send the order…</p>
          )}
          {submitted === 'print' && (
            <p className="order-msg ok">Preparing your printable order…</p>
          )}

          <div className="order-actions">
            <button className="btn btn-gold" onClick={handleEmail}>Send Order</button>
            <button className="btn btn-ghost" onClick={handlePrint}>Print Order</button>
          </div>
        </div>

        {/* Printable receipt — hidden on screen, shown when printing */}
        <div className="print-receipt">
          <div className="receipt-mark">NOIR</div>
          <div className="receipt-sub">Abeokuta Fragrance House — Order Request</div>
          <hr />
          <div className="receipt-row"><span>Name</span><span>{order.name || '—'}</span></div>
          <div className="receipt-row"><span>Fragrance</span><span>{order.fragrance}</span></div>
          <div className="receipt-row"><span>Quantity</span><span>{Math.max(1, Number(order.quantity) || 1)}</span></div>
          <div className="receipt-row"><span>Unit price</span><span>{naira(selected.price)}</span></div>
          <div className="receipt-row"><span>Contact</span><span>{order.contact || '—'}</span></div>
          <div className="receipt-row"><span>Address</span><span>{order.address || '—'}</span></div>
          <div className="receipt-row"><span>Notes</span><span>{order.notes || '—'}</span></div>
          <hr />
          <div className="receipt-row total"><span>Total</span><span>{naira(total)}</span></div>
          <div className="receipt-fine">Thank you for choosing NOIR · Made in Nigeria</div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-mark">NOIR</div>
        <div className="footer-links">
          <a href="#collection">Collection</a>
          <a href="#order">Order</a>
          <a href="#">Stockists</a>
          <a href="#">Contact</a>
        </div>
        <p className="footer-fine">Abeokuta Fragrance House · Made in Nigeria · © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
