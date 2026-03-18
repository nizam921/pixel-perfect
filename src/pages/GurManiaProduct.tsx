import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Crown, ArrowLeft, Heart, ChevronLeft, ChevronRight, User } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang, gmContent } from "@/lib/i18n";
import { mockProducts } from "@/lib/mock-data";

// Recently viewed — persist in sessionStorage
const getRecentlyViewed = (): string[] => {
  try {
    return JSON.parse(sessionStorage.getItem("gm-recently-viewed") || "[]");
  } catch { return []; }
};
const addRecentlyViewed = (id: string) => {
  const list = getRecentlyViewed().filter((x) => x !== id);
  list.unshift(id);
  sessionStorage.setItem("gm-recently-viewed", JSON.stringify(list.slice(0, 10)));
};

// Favorites — persist in localStorage
const getFavorites = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem("gm-favorites") || "[]");
  } catch { return []; }
};
const toggleFavorite = (id: string): string[] => {
  const list = getFavorites();
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem("gm-favorites", JSON.stringify(next));
  return next;
};

// Mock reviews
const mockReviews = [
  { id: "1", name: "Мария Г.", rating: 5, date: "2026-02-14", text: "Великолепное вино! Подарила мужу на День Св. Валентина, он был в восторге." },
  { id: "2", name: "Alex K.", rating: 4, date: "2026-01-20", text: "Very good quality, fast delivery. Will order again." },
  { id: "3", name: "Nigar M.", rating: 5, date: "2025-12-30", text: "Çox gözəl məhsuldur, hər kəsə tövsiyə edirəm!" },
  { id: "4", name: "Дмитрий Л.", rating: 4, date: "2025-11-15", text: "Отличное соотношение цены и качества. Рекомендую." },
];

const GurManiaProduct = () => {
  const { id } = useParams();
  const [lang, setLang] = useState<Lang>("EN");
  const [favorites, setFavorites] = useState<string[]>(getFavorites);
  const t = gmContent[lang];
  const product = mockProducts.find((p) => p.id === id);
  const related = mockProducts.filter((p) => p.id !== id && p.category === product?.category).slice(0, 8);
  const recentIds = getRecentlyViewed().filter((rid) => rid !== id);
  const recentProducts = recentIds.map((rid) => mockProducts.find((p) => p.id === rid)).filter(Boolean).slice(0, 8);
  const sliderRef = useRef<HTMLDivElement>(null);
  const recentSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) addRecentlyViewed(id);
  }, [id]);

  const isFav = id ? favorites.includes(id) : false;
  const handleFav = () => {
    if (id) setFavorites(toggleFavorite(id));
  };

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") => {
    if (ref.current) ref.current.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
  };

  if (!product) {
    return (
      <GurManiaLayout lang={lang} setLang={setLang}>
        <div className="pt-32 pb-20 text-center">
          <p className="font-display text-2xl text-gurmania-foreground/50">Product not found</p>
          <Link to="/gurmania/catalog" className="text-gold mt-4 inline-block font-body">← {t.catalog.title}</Link>
        </div>
      </GurManiaLayout>
    );
  }

  const reviewsTitle = lang === "RU" ? "Отзывы клиентов" : lang === "AZ" ? "Müştəri rəyləri" : "Customer Reviews";
  const recentTitle = lang === "RU" ? "Вы недавно смотрели" : lang === "AZ" ? "Son baxdıqlarınız" : "Recently Viewed";
  const viewMoreLabel = lang === "RU" ? "Смотреть ещё" : lang === "AZ" ? "Daha çox bax" : "View More";

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <div className="pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/gurmania/catalog" className="inline-flex items-center gap-2 font-body text-gurmania-text-secondary/50 text-xs mb-6 hover:text-gold transition-colors group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              {t.catalog.title}
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Image */}
            <motion.div
              className="aspect-square md:aspect-[3/4] rounded-xl overflow-hidden relative"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button
                onClick={handleFav}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 ${
                  isFav ? "bg-wine-red/80 border-wine-red text-white" : "bg-gurmania/50 border-gold/20 text-gurmania-foreground/60 hover:text-gold hover:border-gold/40"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
              </button>
            </motion.div>

            {/* Info */}
            <motion.div className="flex flex-col" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="font-display text-xl md:text-3xl tracking-[0.05em] mb-2">{product.name}</h1>
              <p className="font-body text-gurmania-text-secondary/50 text-xs mb-1">{product.region}, {product.country}</p>
              {product.year > 0 && <p className="font-body text-gurmania-text-secondary/50 text-xs mb-4">{t.product.year}: {product.year}</p>}

              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? "text-gold fill-gold" : "text-gurmania-text-secondary/20"}`} />
                ))}
                <span className="font-body text-gurmania-text-secondary/50 text-xs ml-1">{product.rating}</span>
              </div>

              <div className="bg-gurmania-surface border border-gold/10 rounded-lg p-5 mb-6">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="font-display text-2xl md:text-3xl text-gold">{product.price} ₼</span>
                  {product.oldPrice && <span className="font-body text-gurmania-text-secondary/40 text-base line-through">{product.oldPrice} ₼</span>}
                </div>
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3 h-3 text-gold/40" />
                  <span className="font-body text-gold/40 text-xs">{t.product.clubPrice}: {product.clubPrice} ₼</span>
                </div>
              </div>

              <div className="flex gap-2 mb-8">
                <button className="flex-1 bg-gold text-gurmania font-display text-xs tracking-[0.3em] py-4 hover:bg-gold-glow transition-all duration-500 flex items-center justify-center gap-2.5 rounded-lg shadow-[0_4px_20px_rgba(201,168,76,0.3)]">
                  <ShoppingBag className="w-4 h-4" />
                  {t.product.addToCart}
                </button>
                <button
                  onClick={handleFav}
                  className={`w-14 flex items-center justify-center rounded-lg border transition-all duration-300 ${
                    isFav ? "bg-wine-red/20 border-wine-red/40 text-wine-red" : "border-gold/15 text-gurmania-foreground/40 hover:border-gold/30 hover:text-gold"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-[10px] tracking-[0.2em] text-gold/70 mb-2 uppercase">{t.product.description}</h3>
                <p className="font-body text-gurmania-foreground/55 text-sm leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h3 className="font-display text-[10px] tracking-[0.2em] text-gold/70 mb-3 uppercase">{t.product.characteristics}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    product.region && { label: t.product.region, value: product.region },
                    product.grape && { label: t.product.grape, value: product.grape },
                    product.volume && { label: t.product.volume, value: product.volume },
                    product.year > 0 && { label: t.product.year, value: String(product.year) },
                  ].filter(Boolean).map((item: any) => (
                    <div key={item.label} className="bg-gurmania-surface border border-gold/8 rounded-lg p-3">
                      <p className="font-body text-gurmania-text-secondary/40 text-[9px] tracking-wider uppercase mb-0.5">{item.label}</p>
                      <p className="font-body text-xs">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ═══════ Customer Reviews ═══════ */}
          <section className="mt-14">
            <h2 className="font-display text-lg tracking-[0.1em] mb-5">{reviewsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockReviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="bg-gurmania-surface border border-gold/8 rounded-lg p-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-gold/60" />
                      </div>
                      <span className="font-display text-xs tracking-wide">{review.name}</span>
                    </div>
                    <span className="font-body text-gurmania-text-secondary/30 text-[10px]">
                      {new Date(review.date).toLocaleDateString(lang === "RU" ? "ru-RU" : "en-US", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-gold fill-gold" : "text-gurmania-text-secondary/20"}`} />
                    ))}
                  </div>
                  <p className="font-body text-gurmania-foreground/55 text-xs leading-relaxed">{review.text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ═══════ Related Products — Slider ═══════ */}
          {related.length > 0 && (
            <section className="mt-14">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-lg tracking-[0.1em]">{t.product.related}</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => scroll(sliderRef, "left")} className="w-8 h-8 rounded-full border border-gold/15 flex items-center justify-center text-gurmania-foreground/40 hover:text-gold hover:border-gold/30 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => scroll(sliderRef, "right")} className="w-8 h-8 rounded-full border border-gold/15 flex items-center justify-center text-gurmania-foreground/40 hover:text-gold hover:border-gold/30 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div ref={sliderRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {related.map((p, i) => (
                  <motion.div key={p.id} className="flex-shrink-0 w-[200px] md:w-[220px]" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/gurmania/product/${p.id}`} className="bg-gradient-to-b from-gurmania-surface to-gurmania border border-gold/8 rounded-lg overflow-hidden group block hover:border-gold/20 transition-all">
                      <div className="aspect-square overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-display text-sm tracking-wide mb-1 group-hover:text-gold transition-colors line-clamp-1">{p.name}</h4>
                        <span className="font-display text-gold text-base">{p.price} ₼</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-4">
                <Link to="/gurmania/catalog" className="inline-flex items-center gap-2 font-display text-xs tracking-[0.2em] text-gold/70 border border-gold/20 px-8 py-2.5 rounded-lg hover:bg-gold/10 hover:text-gold transition-all">
                  {viewMoreLabel}
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </section>
          )}

          {/* ═══════ Recently Viewed ═══════ */}
          {recentProducts.length > 0 && (
            <section className="mt-14">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-lg tracking-[0.1em]">{recentTitle}</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => scroll(recentSliderRef, "left")} className="w-8 h-8 rounded-full border border-gold/15 flex items-center justify-center text-gurmania-foreground/40 hover:text-gold hover:border-gold/30 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => scroll(recentSliderRef, "right")} className="w-8 h-8 rounded-full border border-gold/15 flex items-center justify-center text-gurmania-foreground/40 hover:text-gold hover:border-gold/30 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div ref={recentSliderRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {recentProducts.map((p: any, i: number) => (
                  <motion.div key={p.id} className="flex-shrink-0 w-[200px] md:w-[220px]" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/gurmania/product/${p.id}`} className="bg-gradient-to-b from-gurmania-surface to-gurmania border border-gold/8 rounded-lg overflow-hidden group block hover:border-gold/20 transition-all">
                      <div className="aspect-square overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-display text-sm tracking-wide mb-1 group-hover:text-gold transition-colors line-clamp-1">{p.name}</h4>
                        <span className="font-display text-gold text-base">{p.price} ₼</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </GurManiaLayout>
  );
};

export default GurManiaProduct;
