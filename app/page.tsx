"use client"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

// ── Scroll reveal hook ──
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    document.querySelectorAll(".reveal, .stagger").forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ── Data ──
const specialties = [
  { tag: "Médecine Esthétique", title: "Injections & Fillers", desc: "Botox, acide hyaluronique et PRP pour rajeunir le visage, combler les rides et restaurer les volumes naturellement.", img: "https://res.cloudinary.com/hh9gnin1v/image/upload/c_fill,h_480,w_380/v1580996822/5d6c4e46283b5a0031d5fd4d_photo_1.jpg" },
  { tag: "Chirurgie Faciale", title: "Rhinoplastie", desc: "Chirurgie esthétique et fonctionnelle du nez. Correction de déviation, affinement de la pointe ou réduction selon vos souhaits.", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=380&h=480&fit=crop&crop=face" },
  { tag: "Chirurgie Plastique", title: "Chirurgie Mammaire", desc: "Augmentation, réduction ou lifting mammaire — chaque intervention est adaptée à votre morphologie et vos attentes.", img: "https://res.cloudinary.com/hh9gnin1v/image/upload/c_fill,h_480,w_380/v1580996822/5d6c4e46283b5a0031d5fd4d_photo_2.jpg" },
  { tag: "Capillaire", title: "Greffe de Cheveux FUE", desc: "Transplantation capillaire permanente par technique FUE, pour un résultat naturel indétectable avec suivi post-opératoire complet.", img: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=380&h=480&fit=crop" },
]

const testimonials = [
  { quote: "« Ma rhinoplastie avec le Dr. Dhaidah a complètement dépassé mes attentes. Elle a pris le temps de comprendre ce que je voulais — un résultat naturel, pas une transformation radicale. Six mois après, je suis ravie. »", name: "Nadia B.", loc: "Marrakech, Maroc", init: "N" },
  { quote: "« Le suivi post-opératoire est exemplaire. Après mon augmentation mammaire, chaque question trouvait une réponse rapide. Une vraie professionnelle, humaine et accessible. Résultat parfaitement naturel. »", name: "Samira K.", loc: "Casablanca, Maroc", init: "S" },
  { quote: "« I came from London specifically for my hair transplant. Dr. Dhaidah speaks perfect English, the welcome was impeccable and the result after 8 months is remarkable. »", name: "Ahmed R.", loc: "Londres, UK", init: "A" },
]

const faqs = [
  { q: "Comment se déroule une première consultation ?", a: "La première consultation est un échange confidentiel où vous exposez vos souhaits. Le Dr. Dhaidah réalise une analyse esthétique complète, vous explique les options chirurgicales adaptées à votre morphologie et répond à toutes vos questions. Un devis détaillé vous est remis à l'issue de la consultation." },
  { q: "Puis-je consulter depuis l'étranger avant de venir ?", a: "Oui. Pour les patientes internationales, nous proposons une consultation préliminaire par visioconférence (Zoom ou WhatsApp). Vous envoyez vos photos en amont, le Dr. Dhaidah analyse votre situation et vous présente un plan de soin personnalisé." },
  { q: "Quelle est la durée de récupération après une rhinoplastie ?", a: "Le retour à la vie sociale normale est généralement possible après 10 à 14 jours. Le plâtre est retiré après 7 à 10 jours. Le résultat final est visible à 80% à 3 mois et à 100% à 12 mois." },
  { q: "Les interventions sont-elles réalisées en clinique privée agréée ?", a: "Oui, toutes les interventions chirurgicales sont réalisées dans des établissements cliniques agréés par le Ministère de la Santé du Maroc, avec une équipe d'anesthésistes qualifiés." },
  { q: "En quelles langues sont réalisées les consultations ?", a: "Les consultations sont disponibles en français, en arabe et en anglais. Le Dr. Dhaidah accueille une patientèle internationale et s'assure que chaque patiente comprend pleinement la procédure proposée." },
]

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }) }

export default function Home() {
  useReveal()
  const [scrolled, setScrolled] = useState(false)
  const [testiIdx, setTestiIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    const interval = setInterval(() => setTestiIdx(i => (i + 1) % testimonials.length), 6000)
    return () => { window.removeEventListener("scroll", onScroll); clearInterval(interval) }
  }, [])

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#0F172A] text-[#1E293B] dark:text-[#F1F5F9] overflow-x-hidden transition-colors duration-300">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-10 h-[68px] flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-white/85 dark:bg-[#0F172A]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_24px_rgba(15,23,42,0.07)]" : ""}`}>
        <a href="#" className="flex items-center no-underline">
          <img src="/Dr_logo.png" alt="Dr. Ouafaa Dhaidah" className="h-16 w-auto" />
        </a>
        <ul className="hidden md:flex gap-9 list-none">
          {[["#specialites","Spécialités"],["#pourquoi","Pourquoi nous"],["#temoignages","Témoignages"],["#forfaits","Forfaits"],["#faq","FAQ"]].map(([href, label]) => (
            <li key={href}><a href={href} className="text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white no-underline transition-colors">{label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <AnimatedThemeToggler className="border-slate-200 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10" />
          <a href="https://www.facebook.com/DrOuafaaDhaidah/" target="_blank" className="bg-[#0F172A] dark:bg-white dark:text-[#0F172A] text-white px-5 py-2.5 rounded-full text-[13px] font-semibold no-underline hover:bg-blue-600 dark:hover:bg-blue-100 transition-colors">Prendre RDV</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden bg-black">

        {/* Shader background */}
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#06b6d4", "#0891b2", "#164e63", "#f97316"]}
          speed={0.3}
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-50"
          colors={["#000000", "#ffffff", "#06b6d4", "#f97316"]}
          speed={0.2}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide">Chirurgien Esthétique & Plastique — Marrakech, Maroc</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            Votre Beauté,<br />
            <span className="bg-gradient-to-r from-cyan-400 via-white to-orange-400 bg-clip-text text-transparent">
              une Expertise Mondiale
            </span>
            <br />au Maroc
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Diplômée de Paris, Virginia et Vérone, le Dr. Ouafaa Dhaidah allie rigueur chirurgicale et sens esthétique pour des résultats naturels et durables.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="https://www.facebook.com/DrOuafaaDhaidah/" target="_blank"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm no-underline shadow-lg hover:shadow-cyan-500/30 hover:shadow-xl transition-shadow"
            >
              Prendre rendez-vous →
            </motion.a>
            <motion.a
              href="#specialites"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-medium text-sm no-underline backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              Découvrir les soins ↓
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center gap-12 mt-16 pt-12 border-t border-white/10"
          >
            {[["98%","Taux de satisfaction"],["10+","Années d'expérience"],["3","Formations internationales"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-white">{num}</div>
                <div className="text-xs text-white/50 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SPECIALTIES ── */}
      <section id="specialites" className="py-24 px-6 md:px-10 dark:bg-[#0F172A]">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 mb-4">✦ Nos Spécialités</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-tight mb-4">La Chirurgie Esthétique<br />au Plus Haut Niveau</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Chaque intervention est conçue sur-mesure, avec des techniques éprouvées issues de formations internationales de premier rang.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {specialties.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{ aspectRatio: "3/4" }}
              >
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.88)] via-[rgba(15,23,42,0.18)] to-transparent transition-all duration-300 group-hover:from-[rgba(6,182,212,0.85)] group-hover:via-[rgba(8,145,178,0.3)]" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block text-[10px] font-semibold tracking-wider uppercase text-cyan-300 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full mb-2">{s.tag}</span>
                  <div className="text-white font-bold text-lg mb-2">{s.title}</div>
                  <div className="text-white/70 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">{s.desc}</div>
                  <div className="text-white/80 mt-2 font-bold">→</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section id="pourquoi" className="py-24 px-6 md:px-10 bg-white dark:bg-[#1E293B]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5]">
                <img src="https://res.cloudinary.com/hh9gnin1v/image/upload/c_fit,h_600,w_480/v1580996822/5d6c4e46283b5a0031d5fd4d_photo_1.jpg" alt="Dr. Ouafaa Dhaidah" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-[#0F172A] rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[260px]">
                <span className="text-2xl">🏆</span>
                <div>
                  <div className="font-semibold text-[#0F172A] dark:text-white text-sm">Formation Internationale</div>
                  <div className="text-slate-500 dark:text-slate-400 text-xs">Paris · Virginia · Verona</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 mb-3">✦ Pourquoi nous choisir</div>
              <h2 className="text-4xl font-black text-[#0F172A] dark:text-white leading-tight mb-4">
                Expertise mondiale,<br />
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">accompagnement personnalisé</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Chaque patiente bénéficie d'un suivi complet, de la consultation initiale jusqu'à la récupération post-opératoire.</p>

              {[
                { n: "01", title: "Résultats Naturels & Durables", desc: "Une approche conservatrice qui respecte votre identité. Chaque intervention est planifiée pour un résultat harmonieux sur le long terme." },
                { n: "02", title: "Diplômes & Formations Internationales", desc: "Formée à Paris, en Virginie USA et à Vérone Italie — une expertise rare au Maroc." },
                { n: "03", title: "Patientes Locales & Internationales", desc: "Consultations en français, arabe et anglais. Des patientes viennent du monde entier pour bénéficier d'une expertise internationale à Marrakech." },
              ].map((item, i) => (
                <motion.div key={item.n} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2} className="flex gap-4 mb-6">
                  <div className="text-2xl font-black text-blue-500/20 leading-none mt-0.5 w-8 shrink-0">{item.n}</div>
                  <div>
                    <div className="font-bold text-[#0F172A] dark:text-white mb-1">{item.title}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="temoignages" className="py-24 px-6 md:px-10 dark:bg-[#0F172A]">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-500 mb-3">✦ Témoignages</div>
            <h2 className="text-4xl font-black text-[#0F172A] dark:text-white">Nos Patientes <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">Témoignent</span></h2>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
            <div className="md:w-64 shrink-0">
              <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=420&fit=crop&crop=face" alt="" className="w-full h-48 md:h-full object-cover" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-between relative">
              <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
              <AnimatePresence mode="wait">
                <motion.div key={testiIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <p className="text-[#0F172A] dark:text-slate-200 text-base leading-relaxed mb-6 italic">{testimonials[testiIdx].quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">{testimonials[testiIdx].init}</div>
                    <div>
                      <div className="font-bold text-[#0F172A] dark:text-white text-sm">{testimonials[testiIdx].name}</div>
                      <div className="text-slate-400 dark:text-slate-500 text-xs">{testimonials[testiIdx].loc}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-3 mt-6">
                <button onClick={() => setTestiIdx(i => (i - 1 + testimonials.length) % testimonials.length)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer">‹</button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => <button key={i} onClick={() => setTestiIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${i === testiIdx ? "bg-blue-500" : "bg-slate-200"}`} />)}
                </div>
                <button onClick={() => setTestiIdx(i => (i + 1) % testimonials.length)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer">›</button>
              </div>
              <div className="absolute top-6 right-8 text-8xl text-slate-100 font-black leading-none select-none">"</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="forfaits" className="py-24 px-6 md:px-10 bg-white dark:bg-[#1E293B]">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-500 mb-3">✦ Forfaits & Tarifs</div>
            <h2 className="text-4xl font-black text-[#0F172A] dark:text-white mb-3">Transparence totale<br />sur nos honoraires</h2>
            <p className="text-slate-500 dark:text-slate-400">Chaque consultation est une relation de confiance.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Consultation", amount: "Gratuit", note: "Premier échange découverte", features: ["Bilan esthétique initial","Questions & réponses","Orientation vers la procédure","Sans engagement"], href: "https://www.facebook.com/DrOuafaaDhaidah/", featured: false },
              { label: "Consultation Complète", amount: "Sur devis", note: "Chirurgie & suivi post-opératoire", features: ["Analyse morphologique complète","Plan chirurgical sur-mesure","Photos avant / après","Suivi J+7, J+30, J+90","Accès direct au Dr. Dhaidah"], href: "https://www.facebook.com/DrOuafaaDhaidah/", featured: true, badge: "⭐ Le Plus Choisi" },
              { label: "Forfait International", amount: "Pack", note: "Pour patientes venant de l'étranger", features: ["Consultation pré-op à distance","Coordination hôtel & clinique","Suivi WhatsApp post-op","Interprète disponible"], href: "https://www.instagram.com/wafa_dhaidah", featured: false },
            ].map((plan, i) => (
              <motion.div
                key={plan.label}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className={`rounded-2xl p-7 flex flex-col relative ${plan.featured ? "shadow-2xl shadow-blue-500/10 ring-2 ring-blue-500/20 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/40 dark:to-[#1E293B]" : "bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-100 dark:border-slate-800"}`}
              >
                {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">{plan.badge}</div>}
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{plan.label}</div>
                <div className={`text-3xl font-black mb-1 ${plan.featured ? "text-blue-600" : "text-[#0F172A] dark:text-white"}`}>{plan.amount}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mb-5">{plan.note}</div>
                <div className="h-px bg-slate-100 mb-5" />
                <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="text-blue-500 font-bold mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href={plan.href} target="_blank" className={`block text-center py-3 rounded-full text-sm font-semibold no-underline transition-all ${plan.featured ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-lg hover:shadow-blue-500/30" : "border border-slate-200 dark:border-slate-700 text-[#0F172A] dark:text-white hover:border-blue-400 hover:text-blue-500"}`}>
                  {plan.featured ? "Obtenir un devis →" : "Réserver →"}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6 md:px-10 dark:bg-[#0F172A]">
        <div className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 mb-3">✦ Questions Fréquentes</div>
            <h2 className="text-4xl font-black text-[#0F172A] dark:text-white">Tout ce que vous<br />devez savoir</h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="bg-white dark:bg-[#1E293B] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left cursor-pointer">
                  <span className="font-semibold text-[#0F172A] dark:text-white text-sm pr-4">{faq.q}</span>
                  <span className={`text-xl font-light text-blue-500 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="py-24 px-6 text-center bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] relative overflow-hidden">
        <MeshGradient className="absolute inset-0 w-full h-full opacity-40" colors={["#0F172A","#06b6d4","#0891b2","#164e63"]} speed={0.2} />
        <div className="relative z-10">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-white mb-4">
            Prête à <span className="bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">sublimer</span> votre beauté ?
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="text-white/60 mb-8">Prenez rendez-vous avec le Dr. Ouafaa Dhaidah — Gueliz, Marrakech.</motion.p>
          <motion.a
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            href="https://www.facebook.com/DrOuafaaDhaidah/" target="_blank"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold no-underline hover:shadow-xl hover:shadow-cyan-500/30 transition-shadow"
          >
            Prendre rendez-vous →
          </motion.a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0F172A] text-white px-10 pt-16 pb-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <a href="#" className="flex items-center no-underline mb-4">
              <img src="/Dr_logo.png" alt="Dr. Ouafaa Dhaidah" className="h-16 w-auto" />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">Chirurgien Esthétique & Plastique à Gueliz, Marrakech. Consultations en français, arabe & anglais.</p>
            <div className="flex gap-3">
              {[["https://www.instagram.com/wafa_dhaidah","IG"],["https://www.facebook.com/DrOuafaaDhaidah/","FB"]].map(([href, label]) => (
                <a key={label} href={href} target="_blank" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors no-underline">{label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">Navigation</div>
            <div className="flex flex-col gap-2.5">
              {[["#specialites","Spécialités"],["#pourquoi","Pourquoi nous"],["#temoignages","Témoignages"],["#forfaits","Forfaits"],["#faq","FAQ"]].map(([href, label]) => (
                <a key={href} href={href} className="text-slate-400 text-sm hover:text-white transition-colors no-underline">{label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">Contact</div>
            <div className="flex flex-col gap-2.5">
              {[["https://www.facebook.com/DrOuafaaDhaidah/","Facebook"],["https://www.instagram.com/wafa_dhaidah","Instagram"],["#","Centre Sara, Gueliz — Marrakech"]].map(([href, label]) => (
                <a key={label} href={href} target="_blank" className="text-slate-400 text-sm hover:text-white transition-colors no-underline">{label}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between gap-2 text-slate-500 text-xs">
          <span>© 2026 Dr. Ouafaa Dhaidah — Tous droits réservés.</span>
          <span>Cabinet Gueliz, 4ème N°20, Marrakech, Maroc</span>
        </div>
      </footer>

    </div>
  )
}
