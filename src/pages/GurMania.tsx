import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Crown, Star, Gift, ChevronRight, Mail, MapPin, Clock, Wine, Grape } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang, gmContent } from "@/lib/i18n";
import { mockProducts, mockEvents, mockPromos } from "@/lib/mock-data";
import heroWine1 from "@/assets/hero-wine-1.jpg";
import heroWine2 from "@/assets/hero-wine-2.jpg";
import heroWine3 from "@/assets/hero-wine-3.jpg";
import catWine from "@/assets/category-wine.jpg";
import catCheese from "@/assets/category-cheese.jpg";
import catMeat from "@/assets/category-meat.jpg";
import aboutInterior from "@/assets/about-interior.jpg";
import gurmaniaLogo from "@/assets/gurmania-logo-dark.png";

const heroSlides = [heroWine1, heroWine2, heroWine3];

const GurManiaPage = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const t = gmContent[lang];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const promoProducts = mockPromos.map((p) => ({
    ...p,
    product: mockProducts.find((pr) => pr.id === p.productId)!,
  }));

  const popular = mockProducts.filter((p) => p.category === "wine").slice(0, 8);
  const slideContent = t.heroSlides[currentSlide] || t.heroSlides[0];

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      {/* ═══════ Hero with integrated loyalty ═══════ */}
      <section className="relative h-screen overflow-hidden">
        {/* Background slides */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out"
            style={{
              backgroundImage: `url(${slide})`,
              opacity: currentSlide === i ? 1 : 0,
              transform: currentSlide === i ? "scale(1)" : "scale(1.08)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-gurmania via-gurmania/60 to-gurmania/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-gurmania/40 via-transparent to-gurmania/40" />

        {/* Loyalty ribbon — vertical strip on left side */}
        <div className="absolute top-0 left-0 bottom-0 z-20 hidden md:block md:w-[220px] lg:w-[270px]">
          <div className="h-full bg-gradient-to-b from-gurmania/90 via-gurmania/70 to-gurmania/90 backdrop-blur-xl border-r border-gold/10 relative overflow-hidden">
            {/* Falling stars */}
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="absolute text-gold pointer-events-none"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `-20px`,
                  fontSize: `${8 + Math.random() * 6}px`,
                  opacity: 0,
                  animation: `star-fall ${6 + Math.random() * 8}s linear ${Math.random() * 10}s infinite`,
                }}
              >
                ✦
              </span>
            ))}
            <div className="flex flex-col items-center justify-center h-full px-5 py-20 gap-6 relative z-10">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gold" />
                <h3 className="font-display text-[10px] tracking-[0.15em] text-gold">{t.loyalty.title}</h3>
              </div>

              <div className="w-full space-y-2">
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder={t.loyalty.placeholder}
                  className="w-full bg-gurmania/40 border border-gold/15 rounded-lg px-3 py-2 font-body text-[11px] text-gurmania-foreground placeholder:text-gurmania-foreground/30 focus:outline-none focus:border-gold/40 transition-colors"
                />
                <button className="w-full text-gurmania bg-gold font-display text-[9px] tracking-[0.2em] px-4 py-2 rounded-lg hover:bg-gold-glow transition-colors">
                  {t.loyalty.btn}
                </button>
              </div>

              <div className="w-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

              <div className="space-y-3 w-full">
                {[
                  { icon: Star, text: lang === "RU" ? "Баллы за покупки" : lang === "AZ" ? "Alış balları" : "Earn Points" },
                  { icon: Gift, text: lang === "RU" ? "Скидки и подарки" : lang === "AZ" ? "Endirimlər" : "Discounts & Gifts" },
                  { icon: Crown, text: lang === "RU" ? "VIP доступ" : lang === "AZ" ? "VIP giriş" : "VIP Access" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-3 h-3 text-gold/50 flex-shrink-0" />
                    <span className="font-body text-gurmania-foreground/50 text-[10px]">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="w-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

              <div className="w-full bg-gold/10 border border-gold/20 rounded-lg p-3 text-center">
                <p className="font-display text-[10px] tracking-wider text-gold mb-1">
                  {lang === "RU" ? "Клуб Гурманов" : lang === "AZ" ? "Gurmanlar Klubu" : "Gourmet Club"}
                </p>
                <p className="font-body text-gurmania-foreground/40 text-[10px] mb-2">
                  <span className="text-gold font-display">0.99 ₼</span>{lang === "RU" ? "/мес" : lang === "AZ" ? "/ay" : "/mo"}
                </p>
                <button className="w-full bg-gold text-gurmania font-display text-[8px] tracking-[0.2em] px-3 py-1.5 rounded-md hover:bg-gold-glow transition-colors">
                  {t.club.btn}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero content — centered */}
        <div className="absolute inset-0 flex items-center z-10 px-4 md:pl-[240px] lg:pl-[290px]">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="font-logo text-5xl md:text-7xl text-gold mb-4 drop-shadow-2xl inline-block">GurMania</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-5 mx-auto" />

              <div className="h-20 md:h-24 flex flex-col items-center justify-center overflow-hidden">
                <div key={currentSlide} className="animate-fade-in">
                  <h1 className="font-display text-gurmania-foreground text-xl md:text-3xl lg:text-4xl tracking-[0.1em] mb-2">
                    {slideContent.title}
                  </h1>
                  <p className="font-body text-gurmania-foreground/50 text-sm md:text-base tracking-[0.15em]">
                    {slideContent.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
                <Link
                  to="/gurmania/catalog"
                  className="border border-gold text-gold font-display text-xs tracking-[0.3em] px-10 py-3 hover:bg-gold hover:text-gurmania transition-all duration-500"
                >
                  {t.hero.ctaCatalog}
                </Link>
                <Link
                  to="/gurmania/events"
                  className="border border-gurmania-foreground/15 text-gurmania-foreground/50 font-display text-xs tracking-[0.3em] px-10 py-3 hover:border-gold/40 hover:text-gold/70 transition-all duration-500"
                >
                  {t.hero.ctaEvents}
                </Link>
              </div>

              {/* Mobile loyalty card */}
              <div className="md:hidden mt-6 bg-gurmania/60 backdrop-blur-xl border border-gold/15 rounded-xl p-4 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-gold" />
                  <h3 className="font-display text-xs tracking-[0.15em] text-gold">{t.loyalty.title}</h3>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder={t.loyalty.placeholder}
                    className="flex-1 bg-gurmania/50 border border-gold/15 rounded-lg px-3 py-2 font-body text-xs text-gurmania-foreground placeholder:text-gurmania-foreground/30 focus:outline-none focus:border-gold/40 transition-colors min-w-0"
                  />
                  <button className="text-gurmania bg-gold font-display text-[9px] tracking-[0.2em] px-4 py-2 rounded-lg hover:bg-gold-glow transition-colors flex-shrink-0">
                    {t.loyalty.btn}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  {[
                    { icon: Star, text: lang === "RU" ? "Баллы" : lang === "AZ" ? "Ballar" : "Points" },
                    { icon: Gift, text: lang === "RU" ? "Скидки" : lang === "AZ" ? "Endirimlər" : "Discounts" },
                    { icon: Crown, text: lang === "RU" ? "VIP" : lang === "AZ" ? "VIP" : "VIP" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <item.icon className="w-3 h-3 text-gold/50 flex-shrink-0" />
                      <span className="font-body text-gurmania-foreground/50 text-[10px]">{item.text}</span>
                    </div>
                  ))}
                  <button className="bg-gold text-gurmania font-display text-[8px] tracking-[0.2em] px-3 py-1 rounded-md hover:bg-gold-glow transition-colors flex-shrink-0">
                    {t.club.btn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 rounded-full transition-all duration-700 ${
                currentSlide === i ? "bg-gold w-8" : "bg-gurmania-foreground/20 w-3"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ═══════ About Section ═══════ */}
      <section className="py-10 md:py-14 bg-gurmania-surface relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <motion.div
              className="relative rounded-xl overflow-hidden aspect-[4/3]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={aboutInterior} alt="GurMania Interior" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-gurmania/20 to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] mb-4">{t.about.title}</h2>
              <div className="w-10 h-px bg-gold mb-5" />
              <p className="font-body text-gurmania-foreground/60 text-sm leading-relaxed mb-5">
                {t.about.text}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: t.about.since, icon: Clock },
                  { value: t.about.products, icon: Wine },
                  { value: t.about.countries, icon: MapPin },
                  { value: t.about.clients, icon: Grape },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.value}
                    className="text-center p-3 rounded-lg bg-gurmania/40 border border-gold/8"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <stat.icon className="w-4 h-4 text-gold/60 mx-auto mb-2" />
                    <p className="font-display text-gold text-xs tracking-wider">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ Categories ═══════ */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { label: t.categories.wines, img: catWine },
              { label: t.categories.cheeses, img: catCheese },
              { label: t.categories.meat, img: catMeat },
            ].map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/gurmania/catalog"
                  className="group relative aspect-[5/4] md:aspect-[4/3] overflow-hidden rounded-xl block"
                >
                  <img src={cat.img} alt={cat.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gurmania via-gurmania/30 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="w-6 h-px bg-gold mb-3 transition-all duration-500 group-hover:w-10" />
                    <h3 className="font-display text-xl md:text-2xl tracking-[0.08em]">{cat.label}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Popular Products ═══════ */}
      <section className="py-10 md:py-14 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl md:text-2xl tracking-[0.1em]">
              {lang === "RU" ? "Популярное" : lang === "AZ" ? "Populyar" : "Popular"}
            </h2>
            <Link to="/gurmania/catalog" className="font-body text-gold/70 text-xs tracking-wider hover:text-gold transition-colors flex items-center gap-1">
              {lang === "RU" ? "Все" : lang === "AZ" ? "Hamısı" : "View all"} <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {popular.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <ProductCard product={product} lang={lang} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Promotions ═══════ */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl md:text-2xl tracking-[0.1em]">{t.promos.title}</h2>
            <Link to="/gurmania/promos" className="font-body text-gold/70 text-xs tracking-wider hover:text-gold transition-colors flex items-center gap-1">
              {lang === "RU" ? "Все" : lang === "AZ" ? "Hamısı" : "View all"} <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {promoProducts.slice(0, 8).map((promo, i) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <ProductCard product={promo.product} lang={lang} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Gourmet Club ═══════ */}
      <section className="py-10 md:py-14 bg-gurmania-surface relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <Crown className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] mb-2">{t.club.title}</h2>
            <p className="font-display text-gold/70 text-lg tracking-[0.2em] mb-6">{t.club.subtitle}</p>
          </motion.div>
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-6">
            {[
              { icon: Star, label: t.club.p1 },
              { icon: Gift, label: t.club.p2 },
              { icon: CreditCard, label: t.club.p3 },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gurmania/30 border border-gold/5"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <item.icon className="w-5 h-5 text-gold/70" />
                <p className="font-body text-gurmania-foreground/60 text-[11px] tracking-wide">{item.label}</p>
              </motion.div>
            ))}
          </div>
          <button className="bg-gold text-gurmania font-display text-xs tracking-[0.3em] px-12 py-3.5 hover:bg-gold-glow transition-all duration-500 rounded-lg shadow-[0_4px_20px_rgba(201,168,76,0.3)]">
            {t.club.btn}
          </button>
        </div>
      </section>

      {/* ═══════ Events ═══════ */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-xl md:text-2xl tracking-[0.1em] mb-5">{t.events.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockEvents.map((event, i) => (
              <motion.div
                key={event.id}
                className="bg-gradient-to-b from-gurmania-surface to-gurmania border border-gold/8 rounded-lg overflow-hidden group"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative overflow-hidden aspect-[16/9]">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gurmania-surface to-transparent" />
                </div>
                <div className="p-4">
                  <p className="font-body text-gold/60 text-[10px] tracking-[0.2em] mb-2 uppercase">
                    {new Date(event.date).toLocaleDateString(lang === "RU" ? "ru-RU" : lang === "AZ" ? "az-AZ" : "en-US", { day: "numeric", month: "long" })} · {event.time}
                  </p>
                  <h4 className="font-display text-sm tracking-wide mb-1.5 group-hover:text-gold transition-colors">{event.title}</h4>
                  <p className="font-body text-gurmania-text-secondary/60 text-xs leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </GurManiaLayout>
  );
};

export default GurManiaPage;
