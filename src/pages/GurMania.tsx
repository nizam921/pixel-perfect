import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Crown, Star, Gift, ChevronRight } from "lucide-react";
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
      {/* ═══════ Hero Section ═══════ */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide})` }}
            initial={false}
            animate={{
              opacity: currentSlide === i ? 1 : 0,
              scale: currentSlide === i ? 1 : 1.08,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
        {/* Multi-layered gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gurmania via-gurmania/60 to-gurmania/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-gurmania/30 via-transparent to-gurmania/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <motion.img
            src={gurmaniaLogo}
            alt="GurMania"
            className="w-44 md:w-56 mb-8 rounded-sm drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.div
            className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.h1
            className="font-display text-gurmania-foreground text-3xl md:text-5xl lg:text-6xl tracking-[0.12em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            className="font-body text-gurmania-foreground/50 text-lg md:text-xl tracking-[0.2em] mb-12 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/gurmania/catalog"
              className="border border-gold text-gold font-display text-sm tracking-[0.3em] px-12 py-3.5 hover:bg-gold hover:text-gurmania transition-all duration-500 group"
            >
              {t.hero.ctaCatalog}
              <ChevronRight className="inline-block w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
            <button className="border border-gurmania-foreground/15 text-gurmania-foreground/60 font-display text-sm tracking-[0.3em] px-12 py-3.5 hover:border-gold/40 hover:text-gold/80 transition-all duration-500">
              {t.hero.ctaEvents}
            </button>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 rounded-full transition-all duration-700 ${
                currentSlide === i ? "bg-gold w-10" : "bg-gurmania-foreground/20 w-3 hover:bg-gurmania-foreground/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ═══════ Loyalty Card ═══════ */}
      <section className="py-14 md:py-20 bg-gurmania-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gurmania via-transparent to-transparent h-24" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-gurmania-surface-light to-gurmania border border-gold/15 rounded-xl p-7 md:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-[0.1em]">{t.loyalty.title}</h3>
                  <p className="font-body text-gurmania-text-secondary text-xs">
                    {lang === "RU" ? "Проверьте ваш баланс" : lang === "AZ" ? "Balansınızı yoxlayın" : "Check your balance"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder={t.loyalty.placeholder}
                  className="flex-1 bg-gurmania/80 border border-gold/15 rounded-lg px-4 py-3.5 font-body text-sm text-gurmania-foreground placeholder:text-gurmania-text-secondary/50 focus:border-gold/40 focus:ring-1 focus:ring-gold/20 focus:outline-none transition-all"
                />
                <button className="bg-gold/10 border border-gold/25 text-gold font-display text-sm tracking-[0.2em] px-7 py-3.5 rounded-lg hover:bg-gold/20 hover:border-gold/40 transition-all duration-400">
                  {t.loyalty.btn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Categories ═══════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.12em] mb-3">
              {lang === "RU" ? "Коллекции" : lang === "AZ" ? "Kolleksiyalar" : "Collections"}
            </h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[
              { label: t.categories.wines, img: catWine },
              { label: t.categories.cheeses, img: catCheese },
              { label: t.categories.meat, img: catMeat },
            ].map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/gurmania/catalog"
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl block"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${cat.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gurmania via-gurmania/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="w-8 h-px bg-gold mb-4 transition-all duration-500 group-hover:w-14" />
                    <h3 className="font-display text-2xl md:text-3xl tracking-[0.08em] mb-2">
                      {cat.label}
                    </h3>
                    <span className="font-body text-gold/70 text-sm tracking-[0.2em] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 inline-flex items-center gap-2">
                      {lang === "RU" ? "Смотреть" : lang === "AZ" ? "Baxmaq" : "Explore"}
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Popular Products ═══════ */}
      <section className="py-16 md:py-24 bg-gurmania-surface relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.12em] mb-3">
              {lang === "RU" ? "Популярное" : lang === "AZ" ? "Populyar" : "Popular"}
            </h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </motion.div>

          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {popular.map((product, i) => (
              <motion.div
                key={product.id}
                className="snap-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/gurmania/product/${product.id}`}
                  className="min-w-[240px] md:min-w-[270px] bg-gradient-to-b from-gurmania-surface-light to-gurmania border border-gold/8 rounded-xl overflow-hidden group flex-shrink-0 block hover:border-gold/20 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(201,168,76,0.08)]"
                >
                  <div className="aspect-[3/4] bg-gurmania-surface flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gurmania-surface-light/50" />
                    <span className="font-body text-gurmania-text-secondary/60 text-xs tracking-wider">750ml</span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-sm tracking-wide mb-1.5 group-hover:text-gold transition-colors duration-300 line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="font-body text-gurmania-text-secondary/60 text-xs mb-3">
                      {product.region}, {product.year}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-gold text-lg">{product.price} ₼</span>
                      {product.oldPrice && (
                        <span className="font-body text-gurmania-text-secondary/50 text-xs line-through">
                          {product.oldPrice} ₼
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Promotions ═══════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.12em] mb-3">{t.promos.title}</h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </motion.div>

          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {promoProducts.map((promo, i) => (
              <motion.div
                key={promo.id}
                className="min-w-[300px] md:min-w-[340px] flex-shrink-0 snap-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="bg-gradient-to-b from-gurmania-surface to-gurmania border border-gold/10 rounded-xl overflow-hidden relative group hover:border-gold/20 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(201,168,76,0.08)]">
                  <div className="absolute top-4 right-4 bg-wine-red text-gurmania-foreground font-display text-[11px] tracking-wider px-3.5 py-1 rounded-full z-10 shadow-lg">
                    -{promo.discount}%
                  </div>
                  <div className="aspect-[4/3] bg-gurmania-surface-light flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gurmania-surface/50" />
                    <span className="font-body text-gurmania-text-secondary/40 text-xs tracking-wider">Photo</span>
                  </div>
                  <div className="p-6">
                    <h4 className="font-display text-base tracking-wide mb-3 group-hover:text-gold transition-colors duration-300">
                      {promo.product.name}
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-gold text-xl">{promo.product.price} ₼</span>
                      {promo.product.oldPrice && (
                        <span className="font-body text-gurmania-text-secondary/50 line-through">
                          {promo.product.oldPrice} ₼
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Gourmet Club CTA ═══════ */}
      <section className="py-20 md:py-28 bg-gurmania-surface relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--gold)) 0.5px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-8">
              <Crown className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[0.1em] mb-3">
              {t.club.title}
            </h2>
            <p className="font-display text-gold/80 text-lg md:text-xl tracking-[0.2em] mb-12">
              {t.club.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-14">
            {[
              { icon: Star, label: t.club.p1 },
              { icon: Gift, label: t.club.p2 },
              { icon: CreditCard, label: t.club.p3 },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gurmania/30 border border-gold/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gold/80" />
                </div>
                <p className="font-body text-gurmania-foreground/70 text-sm tracking-wide leading-relaxed">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="bg-gold text-gurmania font-display text-sm tracking-[0.3em] px-14 py-4 hover:bg-gold-glow transition-all duration-500 rounded-lg shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:shadow-[0_8px_30px_rgba(201,168,76,0.4)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t.club.btn}
          </motion.button>
        </div>
      </section>

      {/* ═══════ Events ═══════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.12em] mb-3">{t.events.title}</h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockEvents.map((event, i) => (
              <motion.div
                key={event.id}
                className="bg-gradient-to-b from-gurmania-surface to-gurmania border border-gold/8 rounded-xl overflow-hidden group hover:border-gold/20 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(201,168,76,0.06)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative overflow-hidden">
                  <div
                    className="aspect-[16/9] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${eventImg})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gurmania-surface to-transparent" />
                </div>
                <div className="p-6">
                  <p className="font-body text-gold/70 text-xs tracking-[0.2em] mb-2.5 uppercase">
                    {new Date(event.date).toLocaleDateString(
                      lang === "RU" ? "ru-RU" : lang === "AZ" ? "az-AZ" : "en-US",
                      { day: "numeric", month: "long" }
                    )}{" "}
                    · {event.time}
                  </p>
                  <h4 className="font-display text-base tracking-wide mb-2 group-hover:text-gold transition-colors duration-300">
                    {event.title}
                  </h4>
                  <p className="font-body text-gurmania-text-secondary/70 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border border-gold/25 text-gold/80 font-display text-sm tracking-[0.3em] px-12 py-3.5 hover:bg-gold/10 hover:border-gold/40 hover:text-gold transition-all duration-500 rounded-lg">
              {t.events.btn}
            </button>
          </div>
        </div>
      </section>
    </GurManiaLayout>
  );
};

export default GurManiaPage;
