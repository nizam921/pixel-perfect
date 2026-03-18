import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
      <div className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <Link to="/gurmania/catalog" className="inline-flex items-center gap-2 font-body text-gurmania-text-secondary text-sm mb-8 hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t.catalog.title}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Product Image */}
            <div className="aspect-[3/4] bg-gurmania-surface border border-gold/5 rounded-lg flex items-center justify-center">
              <span className="font-body text-gurmania-text-secondary">{product.volume || product.category}</span>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="font-display text-2xl md:text-3xl tracking-[0.05em] mb-2">{product.name}</h1>
              <p className="font-body text-gurmania-text-secondary text-sm mb-1">{product.region}, {product.country}</p>
              {product.year > 0 && <p className="font-body text-gurmania-text-secondary text-sm mb-6">{t.product.year}: {product.year}</p>}

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "text-gold fill-gold" : "text-gurmania-text-secondary"}`} />
                ))}
                <span className="font-body text-gurmania-text-secondary text-sm">{product.rating}</span>
              </div>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl text-gold">{product.price} ₼</span>
                  {product.oldPrice && (
                    <span className="font-body text-gurmania-text-secondary text-lg line-through">{product.oldPrice} ₼</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-8">
                <Crown className="w-4 h-4 text-gold/60" />
                <span className="font-body text-gold/60 text-sm">{t.product.clubPrice}: {product.clubPrice} ₼</span>
              </div>

              {/* Add to cart */}
              <button className="w-full bg-gold text-gurmania font-display text-sm tracking-[0.3em] py-4 hover:bg-gold-glow transition-colors duration-500 flex items-center justify-center gap-3 mb-8">
                <ShoppingBag className="w-5 h-5" />
                {t.product.addToCart}
              </button>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-display text-sm tracking-[0.15em] text-gold mb-3">{t.product.description}</h3>
                <p className="font-body text-gurmania-foreground/70 text-sm leading-relaxed">{product.description}</p>
              </div>

              {/* Characteristics */}
              <div>
                <h3 className="font-display text-sm tracking-[0.15em] text-gold mb-3">{t.product.characteristics}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.region && (
                    <div className="bg-gurmania-surface border border-gold/5 rounded p-3">
                      <p className="font-body text-gurmania-text-secondary text-xs">{t.product.region}</p>
                      <p className="font-body text-sm">{product.region}</p>
                    </div>
                  )}
                  {product.grape && (
                    <div className="bg-gurmania-surface border border-gold/5 rounded p-3">
                      <p className="font-body text-gurmania-text-secondary text-xs">{t.product.grape}</p>
                      <p className="font-body text-sm">{product.grape}</p>
                    </div>
                  )}
                  {product.volume && (
                    <div className="bg-gurmania-surface border border-gold/5 rounded p-3">
                      <p className="font-body text-gurmania-text-secondary text-xs">{t.product.volume}</p>
                      <p className="font-body text-sm">{product.volume}</p>
                    </div>
                  )}
                  {product.year > 0 && (
                    <div className="bg-gurmania-surface border border-gold/5 rounded p-3">
                      <p className="font-body text-gurmania-text-secondary text-xs">{t.product.year}</p>
                      <p className="font-body text-sm">{product.year}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-display text-xl tracking-[0.1em] mb-8">{t.product.related}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/gurmania/product/${p.id}`}
                    className="bg-gurmania-surface border border-gold/5 rounded-lg overflow-hidden group hover:border-gold/20 transition-colors"
                  >
                    <div className="aspect-[3/4] bg-gurmania-surface-light flex items-center justify-center">
                      <span className="font-body text-gurmania-text-secondary text-xs">{p.volume || p.category}</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-display text-xs tracking-wide mb-1 group-hover:text-gold transition-colors line-clamp-1">{p.name}</h4>
                      <span className="font-display text-gold text-sm">{p.price} ₼</span>
                    </div>
                  </Link>
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
