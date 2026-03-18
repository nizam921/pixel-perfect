import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Phone, Clock, Instagram, MessageCircle, ArrowLeft } from "lucide-react";
import innvinoLogo from "@/assets/innvino-logo-clean.png";
import innvinoHero from "@/assets/innvino-hero.jpg";
import eventImg from "@/assets/event-1.jpg";
import { Lang, languages, ivContent } from "@/lib/i18n";

const InnVinoPage = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const t = ivContent[lang];

  const reviews = [
    { author: "Elena S.", text: lang === "RU" ? "Потрясающая атмосфера и великолепная винная карта. Лучший ресторан в Баку!" : "Amazing atmosphere and magnificent wine list. Best restaurant in Baku!", stars: 5 },
    { author: "Marco R.", text: lang === "RU" ? "Каждый визит — как маленькое путешествие по Европе. Восхитительно." : "Every visit is like a little trip to Europe. Magnificent.", stars: 5 },
    { author: "Aygün M.", text: lang === "AZ" ? "Mükəmməl xidmət və əla şərab seçimi." : "Perfect service and excellent wine selection.", stars: 4 },
  ];

  const galleryImages = [innvinoHero, eventImg, innvinoHero, eventImg];

  return (
    <div className="min-h-screen bg-innvino text-innvino-foreground">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-innvino/80 backdrop-blur-md border-b border-innvino-foreground/5">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-body text-innvino-text-light text-sm hover:text-burgundy transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <img src={innvinoLogo} alt="InnVino" className="h-10" />
          <div className="flex gap-2">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`font-body text-xs tracking-[0.2em] transition-all ${
                  lang === l ? "text-burgundy" : "text-innvino-text-light hover:text-innvino-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 1. Hero */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${innvinoHero})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-innvino via-innvino/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          <motion.img
            src={innvinoLogo}
            alt="InnVino"
            className="w-40 md:w-56 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.h1
            className="font-display text-innvino-foreground text-3xl md:text-5xl tracking-[0.05em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            className="font-body text-innvino-text-light text-lg tracking-[0.15em] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.span
            className="inline-block border border-burgundy/30 text-burgundy font-body text-sm tracking-[0.15em] px-6 py-2 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t.hero.badge}
          </motion.span>
        </div>
      </section>

      {/* 2. About */}
      <section className="py-20 md:py-32 bg-innvino-warm">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-center mb-12">{t.about.title}</h2>
          <p className="font-body text-innvino-foreground/70 text-lg leading-relaxed text-center mb-12">
            {t.about.text}
          </p>
          <div className="bg-innvino rounded-lg p-8 md:p-12 text-center">
            <blockquote className="font-display text-xl md:text-2xl italic text-innvino-foreground/80 mb-6">
              "{t.about.quote}"
            </blockquote>
            <p className="font-body text-burgundy text-sm tracking-[0.15em]">{t.about.founder}</p>
          </div>
        </div>
      </section>

      {/* 3. Rating */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-center mb-4">{t.rating.title}</h2>
          <div className="flex items-center justify-center gap-2 mb-12">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-gold" />
            ))}
            <span className="font-body text-innvino-text-light ml-2">4.8 / 5</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-innvino-surface border border-innvino-foreground/5 rounded-lg p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.stars)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-body text-innvino-foreground/70 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <p className="font-display text-sm text-innvino-foreground/50">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Events */}
      <section className="py-20 md:py-28 bg-innvino-warm">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-center mb-12">{t.events.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Wine & Jazz Evening", date: "April 18, 2026", desc: lang === "RU" ? "Вечер живого джаза с дегустацией итальянских вин" : "Live jazz evening with Italian wine tasting" },
              { title: "Sommelier Masterclass", date: "May 2, 2026", desc: lang === "RU" ? "Учимся подбирать вино к блюдам" : "Learn wine & food pairing" },
            ].map((ev, i) => (
              <div key={i} className="bg-innvino border border-innvino-foreground/5 rounded-lg overflow-hidden">
                <div className="aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: `url(${eventImg})` }} />
                <div className="p-5">
                  <p className="font-body text-burgundy text-xs tracking-[0.15em] mb-2">{ev.date}</p>
                  <h4 className="font-display text-lg tracking-wide mb-2">{ev.title}</h4>
                  <p className="font-body text-innvino-text-light text-sm">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Gallery */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-center mb-12">{t.gallery.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[400px] aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contacts */}
      <section className="py-20 md:py-28 bg-innvino-warm">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-center mb-12">{t.contacts.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-burgundy mt-0.5" />
                <div>
                  <p className="font-body text-sm">{t.contacts.address}</p>
                  <p className="font-body text-innvino-text-light text-xs mt-1">Nizami Street 42</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-burgundy" />
                <p className="font-body text-sm">{t.contacts.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-burgundy" />
                <p className="font-body text-sm">{t.contacts.hours}</p>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="#" className="text-innvino-text-light hover:text-burgundy transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-innvino-text-light hover:text-burgundy transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <button className="w-full bg-burgundy text-innvino font-display text-sm tracking-[0.3em] py-4 hover:opacity-90 transition-opacity rounded-lg">
                {t.contacts.book}
              </button>
              {/* Map placeholder */}
              <div className="mt-6 aspect-[4/3] bg-innvino-surface border border-innvino-foreground/5 rounded-lg flex items-center justify-center">
                <span className="font-body text-innvino-text-light text-sm">Google Maps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-innvino-foreground/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <img src={innvinoLogo} alt="InnVino" className="h-8 mx-auto mb-4" />
          <p className="font-body text-innvino-text-light text-xs">© 2026 InnVino. {lang === "RU" ? "Все права защищены" : "All rights reserved"}</p>
        </div>
      </footer>
    </div>
  );
};

export default InnVinoPage;
