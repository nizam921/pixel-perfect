import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang, gmContent } from "@/lib/i18n";
import { mockProducts, mockPromos } from "@/lib/mock-data";

const GurManiaPromos = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const t = gmContent[lang];

  const promoProducts = mockPromos.map((p) => ({
    ...p,
    product: mockProducts.find((pr) => pr.id === p.productId)!,
  }));

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <section className="pt-20 md:pt-24 pb-4 md:pb-6 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="font-display text-2xl md:text-3xl tracking-[0.1em]">{t.promos.title}</h1>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {promoProducts.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/gurmania/product/${promo.product.id}`}
                className="bg-gradient-to-b from-gurmania-surface to-gurmania border border-gold/10 rounded-xl overflow-hidden relative group block hover:border-gold/20 transition-all duration-500"
              >
                 <div className="absolute top-3 left-3 bg-wine-red text-gurmania-foreground font-display text-xs tracking-wider px-3 py-1 rounded-full z-10 shadow-lg">
                  -{promo.discount}%
                </div>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={promo.product.image} alt={promo.product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base tracking-wide mb-2 group-hover:text-gold transition-colors">{promo.product.name}</h4>
                  <p className="font-body text-gurmania-text-secondary/50 text-xs mb-3">{promo.product.region}, {promo.product.country}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-gold text-2xl">{promo.product.price} ₼</span>
                      {promo.product.oldPrice && (
                        <span className="font-body text-gurmania-text-secondary/40 line-through">{promo.product.oldPrice} ₼</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-gurmania-text-secondary/40">
                      <Clock className="w-3 h-3" />
                      <span className="font-body text-[10px]">
                        {lang === "RU" ? "до" : lang === "AZ" ? "qədər" : "until"} {new Date(promo.endsAt).toLocaleDateString(lang === "RU" ? "ru-RU" : "en-US", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </GurManiaLayout>
  );
};

export default GurManiaPromos;
