import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Crown, Star, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang, gmContent } from "@/lib/i18n";
import { mockProducts, mockEvents, mockPromos } from "@/lib/mock-data";
import heroWine1 from "@/assets/hero-wine-1.jpg";
import heroWine2 from "@/assets/hero-wine-2.jpg";
import heroWine3 from "@/assets/hero-wine-3.jpg";
import catWine from "@/assets/category-wine.jpg";
import catCheese from "@/assets/category-cheese.jpg";
import catMeat from "@/assets/category-meat.jpg";
import eventImg from "@/assets/event-1.jpg";
import gurmaniaLogo from "@/assets/gurmania-logo-dark.png";

const heroSlides = [heroWine1, heroWine2, heroWine3];

const GurManiaPage = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const t = gmContent[lang];

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const promoProducts = mockPromos.map((p) => ({
    ...p,
    product: mockProducts.find((pr) => pr.id === p.productId)!,
  }));

  const popular = mockProducts.filter((p) => p.category === "wine").slice(0, 6);

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide})` }}
            initial={false}
            animate={{ opacity: currentSlide === i ? 1 : 0, scale: currentSlide === i ? 1 : 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-gurmania via-gurmania/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <motion.img
            src={gurmaniaLogo}
            alt="GurMania"
            className="w-48 md:w-64 mb-6 rounded-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.h1
            className="font-display text-gurmania-foreground text-3xl md:text-5xl tracking-[0.1em] mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            className="font-body text-gurmania-foreground/60 text-lg md:text-xl tracking-[0.15em] mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/gurmania/catalog"
              className="border border-gold text-gold font-display text-sm tracking-[0.3em] px-10 py-3 hover:bg-gold/10 transition-colors duration-500"
            >
              {t.hero.ctaCatalog}
            </Link>
            <button className="border border-gurmania-foreground/20 text-gurmania-foreground/70 font-display text-sm tracking-[0.3em] px-10 py-3 hover:border-gurmania-foreground/40 transition-colors duration-500">
              {t.hero.ctaEvents}
            </button>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentSlide === i ? "bg-gold w-8" : "bg-gurmania-foreground/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Loyalty Card Balance */}
      <section className="py-12 md:py-16 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-md mx-auto bg-gurmania-surface-light border border-gold/10 rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-gold" />
              <h3 className="font-display text-lg tracking-[0.1em]">{t.loyalty.title}</h3>
            </div>
            <div className="flex gap-3">
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder={t.loyalty.placeholder}
                className="flex-1 bg-gurmania border border-gold/20 rounded px-4 py-3 font-body text-sm text-gurmania-foreground placeholder:text-gurmania-text-secondary focus:border-gold/50 focus:outline-none transition-colors"
              />
              <button className="bg-gold/10 border border-gold/30 text-gold font-display text-sm tracking-[0.2em] px-6 py-3 hover:bg-gold/20 transition-colors">
                {t.loyalty.btn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: t.categories.wines, img: catWine },
              { label: t.categories.cheeses, img: catCheese },
              { label: t.categories.meat, img: catMeat },
            ].map((cat) => (
              <Link
                key={cat.label}
                to="/gurmania/catalog"
                className="group relative aspect-[4/5] overflow-hidden rounded-lg"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gurmania/80 via-gurmania/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl tracking-[0.1em] mb-2">{cat.label}</h3>
                  <span className="font-body text-gold text-sm tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Carousel */}
      <section className="py-12 md:py-16 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-center mb-12">
            {lang === "RU" ? "Популярное" : lang === "AZ" ? "Populyar" : "Popular"}
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {popular.map((product) => (
              <Link
                key={product.id}
                to={`/gurmania/product/${product.id}`}
                className="min-w-[260px] md:min-w-[280px] bg-gurmania-surface-light border border-gold/5 rounded-lg overflow-hidden group flex-shrink-0"
              >
                <div className="aspect-[3/4] bg-gurmania-surface flex items-center justify-center">
                  <span className="font-body text-gurmania-text-secondary text-xs">750ml</span>
                </div>
                <div className="p-4">
                  <h4 className="font-display text-sm tracking-wide mb-1 group-hover:text-gold transition-colors">{product.name}</h4>
                  <p className="font-body text-gurmania-text-secondary text-xs mb-2">{product.region}, {product.year}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-gold text-lg">{product.price} ₼</span>
                    {product.oldPrice && (
                      <span className="font-body text-gurmania-text-secondary text-xs line-through">{product.oldPrice} ₼</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-center mb-12">{t.promos.title}</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {promoProducts.map((promo) => (
              <div
                key={promo.id}
                className="min-w-[300px] bg-gurmania-surface border border-gold/10 rounded-lg overflow-hidden flex-shrink-0 relative"
              >
                <div className="absolute top-4 right-4 bg-wine-red text-gurmania-foreground font-display text-xs tracking-wider px-3 py-1 rounded z-10">
                  -{promo.discount}%
                </div>
                <div className="aspect-[4/3] bg-gurmania-surface-light flex items-center justify-center">
                  <span className="font-body text-gurmania-text-secondary text-xs">Photo</span>
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base tracking-wide mb-2">{promo.product.name}</h4>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-gold text-xl">{promo.product.price} ₼</span>
                    {promo.product.oldPrice && (
                      <span className="font-body text-gurmania-text-secondary line-through">{promo.product.oldPrice} ₼</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gourmet Club CTA */}
      <section className="py-16 md:py-24 bg-gurmania-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(43, 52%, 54%) 0.5px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <Crown className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl tracking-[0.1em] mb-3">{t.club.title}</h2>
          <p className="font-display text-gold text-xl tracking-[0.2em] mb-10">{t.club.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            {[
              { icon: Star, label: t.club.p1 },
              { icon: Gift, label: t.club.p2 },
              { icon: CreditCard, label: t.club.p3 },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <item.icon className="w-8 h-8 text-gold/70" />
                <p className="font-body text-gurmania-foreground/80 text-sm tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>
          <button className="bg-gold text-gurmania font-display text-sm tracking-[0.3em] px-12 py-4 hover:bg-gold-glow transition-colors duration-500">
            {t.club.btn}
          </button>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-center mb-12">{t.events.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gurmania-surface border border-gold/10 rounded-lg overflow-hidden group"
              >
                <div
                  className="aspect-[16/9] bg-cover bg-center"
                  style={{ backgroundImage: `url(${eventImg})` }}
                />
                <div className="p-5">
                  <p className="font-body text-gold text-xs tracking-[0.2em] mb-2">
                    {new Date(event.date).toLocaleDateString(lang === "RU" ? "ru-RU" : lang === "AZ" ? "az-AZ" : "en-US", { day: "numeric", month: "long" })} · {event.time}
                  </p>
                  <h4 className="font-display text-base tracking-wide mb-2 group-hover:text-gold transition-colors">{event.title}</h4>
                  <p className="font-body text-gurmania-text-secondary text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="border border-gold/30 text-gold font-display text-sm tracking-[0.3em] px-10 py-3 hover:bg-gold/10 transition-colors">
              {t.events.btn}
            </button>
          </div>
        </div>
      </section>
    </GurManiaLayout>
  );
};

export default GurManiaPage;
