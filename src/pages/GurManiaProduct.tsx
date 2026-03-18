import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Crown, ArrowLeft, Wine } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang, gmContent } from "@/lib/i18n";
import { mockProducts } from "@/lib/mock-data";

const GurManiaProduct = () => {
  const { id } = useParams();
  const [lang, setLang] = useState<Lang>("EN");
  const t = gmContent[lang];
  const product = mockProducts.find((p) => p.id === id);
  const related = mockProducts
    .filter((p) => p.id !== id && p.category === product?.category)
    .slice(0, 4);

  if (!product) {
    return (
      <GurManiaLayout lang={lang} setLang={setLang}>
        <div className="pt-32 pb-20 text-center">
          <p className="font-display text-2xl text-gurmania-foreground/50">Product not found</p>
          <Link
            to="/gurmania/catalog"
            className="text-gold mt-4 inline-block font-body"
          >
            ← {t.catalog.title}
          </Link>
        </div>
      </GurManiaLayout>
    );
  }

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <div className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/gurmania/catalog"
              className="inline-flex items-center gap-2 font-body text-gurmania-text-secondary/60 text-sm mb-10 hover:text-gold transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t.catalog.title}
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Product Image */}
            <motion.div
              className="aspect-[3/4] bg-gradient-to-b from-gurmania-surface to-gurmania-surface-light border border-gold/10 rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.02] to-transparent" />
              <Wine className="w-16 h-16 text-gurmania-text-secondary/20 mb-3" />
              <span className="font-body text-gurmania-text-secondary/40 text-sm tracking-wider">
                {product.volume || product.category}
              </span>
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[0.05em] mb-3">
                {product.name}
              </h1>
              <p className="font-body text-gurmania-text-secondary/60 text-sm mb-1">
                {product.region}, {product.country}
              </p>
              {product.year > 0 && (
                <p className="font-body text-gurmania-text-secondary/60 text-sm mb-6">
                  {t.product.year}: {product.year}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating)
                          ? "text-gold fill-gold"
                          : "text-gurmania-text-secondary/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-body text-gurmania-text-secondary/60 text-sm">
                  {product.rating}
                </span>
              </div>

              {/* Price block */}
              <div className="bg-gurmania-surface border border-gold/10 rounded-xl p-6 mb-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-3xl md:text-4xl text-gold">
                    {product.price} ₼
                  </span>
                  {product.oldPrice && (
                    <span className="font-body text-gurmania-text-secondary/50 text-lg line-through">
                      {product.oldPrice} ₼
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-gold/50" />
                  <span className="font-body text-gold/50 text-sm">
                    {t.product.clubPrice}: {product.clubPrice} ₼
                  </span>
                </div>
              </div>

              {/* Add to cart */}
              <button className="w-full bg-gold text-gurmania font-display text-sm tracking-[0.3em] py-4.5 hover:bg-gold-glow transition-all duration-500 flex items-center justify-center gap-3 mb-10 rounded-xl shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:shadow-[0_8px_30px_rgba(201,168,76,0.4)]">
                <ShoppingBag className="w-5 h-5" />
                {t.product.addToCart}
              </button>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-display text-xs tracking-[0.2em] text-gold/80 mb-3 uppercase">
                  {t.product.description}
                </h3>
                <p className="font-body text-gurmania-foreground/60 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Characteristics */}
              <div>
                <h3 className="font-display text-xs tracking-[0.2em] text-gold/80 mb-4 uppercase">
                  {t.product.characteristics}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.region && (
                    <div className="bg-gurmania-surface border border-gold/8 rounded-lg p-4">
                      <p className="font-body text-gurmania-text-secondary/50 text-[11px] tracking-wider uppercase mb-1">
                        {t.product.region}
                      </p>
                      <p className="font-body text-sm">{product.region}</p>
                    </div>
                  )}
                  {product.grape && (
                    <div className="bg-gurmania-surface border border-gold/8 rounded-lg p-4">
                      <p className="font-body text-gurmania-text-secondary/50 text-[11px] tracking-wider uppercase mb-1">
                        {t.product.grape}
                      </p>
                      <p className="font-body text-sm">{product.grape}</p>
                    </div>
                  )}
                  {product.volume && (
                    <div className="bg-gurmania-surface border border-gold/8 rounded-lg p-4">
                      <p className="font-body text-gurmania-text-secondary/50 text-[11px] tracking-wider uppercase mb-1">
                        {t.product.volume}
                      </p>
                      <p className="font-body text-sm">{product.volume}</p>
                    </div>
                  )}
                  {product.year > 0 && (
                    <div className="bg-gurmania-surface border border-gold/8 rounded-lg p-4">
                      <p className="font-body text-gurmania-text-secondary/50 text-[11px] tracking-wider uppercase mb-1">
                        {t.product.year}
                      </p>
                      <p className="font-body text-sm">{product.year}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="mt-24">
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-display text-xl tracking-[0.1em]">{t.product.related}</h2>
                <div className="flex-1 ml-6 h-px bg-gradient-to-r from-gold/15 to-transparent" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {related.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/gurmania/product/${p.id}`}
                      className="bg-gradient-to-b from-gurmania-surface to-gurmania border border-gold/8 rounded-xl overflow-hidden group hover:border-gold/20 transition-all duration-500 block hover:shadow-[0_8px_30px_rgba(201,168,76,0.06)]"
                    >
                      <div className="aspect-[3/4] bg-gurmania-surface-light flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gurmania-surface/30" />
                        <span className="font-body text-gurmania-text-secondary/40 text-xs tracking-wider">
                          {p.volume || p.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-display text-xs tracking-wide mb-1.5 group-hover:text-gold transition-colors duration-300 line-clamp-1">
                          {p.name}
                        </h4>
                        <span className="font-display text-gold text-sm">{p.price} ₼</span>
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
