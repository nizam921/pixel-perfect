import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Crown, Star, Gift, ChevronRight, Mail, MapPin, Clock, Wine, Grape } from "lucide-react";
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
        {heroSlides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide})` }}
            initial={false}
            animate={{ opacity: currentSlide === i ? 1 : 0, scale: currentSlide === i ? 1 : 1.08 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-gurmania via-gurmania/60 to-gurmania/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-gurmania/40 via-transparent to-gurmania/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <motion.img
            src={gurmaniaLogo}
            alt="GurMania"
            className="w-36 md:w-48 mb-6 rounded-sm drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-5" />

          {/* Animated slide text */}
          <div className="h-24 md:h-28 flex flex-col items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="text-center absolute"
              >
                <h1 className="font-display text-gurmania-foreground text-2xl md:text-4xl lg:text-5xl tracking-[0.1em] mb-2">
                  {slideContent.title}
                </h1>
                <p className="font-body text-gurmania-foreground/50 text-base md:text-lg tracking-[0.15em]">
                  {slideContent.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/gurmania/catalog"
              className="border border-gold text-gold font-display text-xs tracking-[0.3em] px-10 py-3 hover:bg-gold hover:text-gurmania transition-all duration-500"
            >
              {t.hero.ctaCatalog}
            </Link>
            <button className="border border-gurmania-foreground/15 text-gurmania-foreground/50 font-display text-xs tracking-[0.3em] px-10 py-3 hover:border-gold/40 hover:text-gold/70 transition-all duration-500">
              {t.hero.ctaEvents}
            </button>
          </motion.div>

          {/* Loyalty card - integrated into hero bottom */}
          <motion.div
            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="bg-gurmania/60 backdrop-blur-xl border border-gold/15 rounded-xl px-4 py-3 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gold flex-shrink-0" />
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder={t.loyalty.placeholder}
                className="flex-1 bg-transparent font-body text-sm text-gurmania-foreground placeholder:text-gurmania-foreground/30 focus:outline-none min-w-0"
              />
              <button className="text-gold font-display text-[10px] tracking-[0.2em] px-4 py-1.5 border border-gold/25 rounded-lg hover:bg-gold/10 transition-colors flex-shrink-0">
                {t.loyalty.btn}
              </button>
            </div>
          </motion.div>
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
      <section className="py-14 md:py-20 bg-gurmania-surface relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
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
              <p className="font-body text-gurmania-foreground/60 text-sm leading-relaxed mb-8">
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
      <section className="py-14 md:py-20">
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
                  className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl block"
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
      <section className="py-14 md:py-20 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
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
                <Link
                  to={`/gurmania/product/${product.id}`}
                  className="bg-gradient-to-b from-gurmania-surface-light to-gurmania border border-gold/8 rounded-lg overflow-hidden group block hover:border-gold/20 transition-all duration-500"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-3">
                    <h4 className="font-display text-xs tracking-wide mb-1 group-hover:text-gold transition-colors line-clamp-1">{product.name}</h4>
                    <p className="font-body text-gurmania-text-secondary/50 text-[10px] mb-2">{product.region}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-gold text-sm">{product.price} ₼</span>
                      {product.oldPrice && <span className="font-body text-gurmania-text-secondary/40 text-[10px] line-through">{product.oldPrice} ₼</span>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Promotions ═══════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-xl md:text-2xl tracking-[0.1em] mb-8">{t.promos.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {promoProducts.map((promo, i) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/gurmania/product/${promo.product.id}`}
                  className="bg-gradient-to-b from-gurmania-surface to-gurmania border border-gold/10 rounded-lg overflow-hidden relative group block hover:border-gold/20 transition-all duration-500"
                >
                  <div className="absolute top-3 right-3 bg-wine-red text-gurmania-foreground font-display text-[10px] tracking-wider px-2.5 py-0.5 rounded-full z-10">
                    -{promo.discount}%
                  </div>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={promo.product.image} alt={promo.product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display text-sm tracking-wide mb-2 group-hover:text-gold transition-colors">{promo.product.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-gold text-lg">{promo.product.price} ₼</span>
                      {promo.product.oldPrice && <span className="font-body text-gurmania-text-secondary/40 line-through text-xs">{promo.product.oldPrice} ₼</span>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Gourmet Club ═══════ */}
      <section className="py-14 md:py-20 bg-gurmania-surface relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <Crown className="w-7 h-7 text-gold" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] mb-2">{t.club.title}</h2>
            <p className="font-display text-gold/70 text-lg tracking-[0.2em] mb-10">{t.club.subtitle}</p>
          </motion.div>
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-10">
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
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-xl md:text-2xl tracking-[0.1em] mb-8">{t.events.title}</h2>
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

      {/* ═══════ Subscribe ═══════ */}
      <section className="py-14 md:py-20 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="max-w-lg mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mail className="w-8 h-8 text-gold/60 mx-auto mb-4" />
            <h2 className="font-display text-xl md:text-2xl tracking-[0.1em] mb-2">{t.subscribe.title}</h2>
            <p className="font-body text-gurmania-text-secondary/60 text-sm mb-6">{t.subscribe.subtitle}</p>
            {subscribed ? (
              <p className="font-body text-gold text-sm">{t.subscribe.success}</p>
            ) : (
              <div className="flex gap-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.subscribe.placeholder}
                  type="email"
                  className="flex-1 bg-gurmania/80 border border-gold/15 rounded-lg px-4 py-3 font-body text-sm text-gurmania-foreground placeholder:text-gurmania-foreground/25 focus:border-gold/40 focus:outline-none transition-all min-w-0"
                />
                <button
                  onClick={() => { if (email) setSubscribed(true); }}
                  className="bg-gold text-gurmania font-display text-[10px] tracking-[0.2em] px-6 py-3 rounded-lg hover:bg-gold-glow transition-colors flex-shrink-0"
                >
                  {t.subscribe.btn}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </GurManiaLayout>
  );
};

export default GurManiaPage;
