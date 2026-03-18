import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Crown, ArrowLeft } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang, gmContent } from "@/lib/i18n";
import { mockProducts } from "@/lib/mock-data";

const GurManiaProduct = () => {
  const { id } = useParams();
  const [lang, setLang] = useState<Lang>("EN");
  const t = gmContent[lang];
  const product = mockProducts.find((p) => p.id === id);
  const related = mockProducts.filter((p) => p.id !== id && p.category === product?.category).slice(0, 4);

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

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <div className="pt-22 md:pt-26 pb-16">
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
              className="aspect-square md:aspect-[3/4] rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
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

              <button className="w-full bg-gold text-gurmania font-display text-xs tracking-[0.3em] py-4 hover:bg-gold-glow transition-all duration-500 flex items-center justify-center gap-2.5 mb-8 rounded-lg shadow-[0_4px_20px_rgba(201,168,76,0.3)]">
                <ShoppingBag className="w-4 h-4" />
                {t.product.addToCart}
              </button>

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

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-lg tracking-[0.1em] mb-6">{t.product.related}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {related.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
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
