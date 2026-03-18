import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Star, ChevronRight } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang, gmContent } from "@/lib/i18n";
import { mockProducts, countries, categories, wineTypes } from "@/lib/mock-data";

const GurManiaCatalog = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const t = gmContent[lang];

  const filtered = useMemo(() => {
    let result = [...mockProducts];
    if (selectedCategory !== "all") result = result.filter((p) => p.category === selectedCategory);
    if (selectedCountry !== "all") result = result.filter((p) => p.country === selectedCountry);
    if (selectedType !== "all") result = result.filter((p) => p.type === selectedType);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") result.sort((a, b) => b.year - a.year);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [selectedCategory, selectedCountry, selectedType, sortBy, priceRange]);

  const categoryLabels: Record<string, string> = {
    all: t.catalog.all,
    wine: lang === "RU" ? "Вина" : lang === "AZ" ? "Şərablar" : "Wines",
    sparkling: lang === "RU" ? "Игристые" : lang === "AZ" ? "Köpüklü" : "Sparkling",
    cheese: lang === "RU" ? "Сыры" : lang === "AZ" ? "Pendirlər" : "Cheeses",
    meat: lang === "RU" ? "Мясо" : lang === "AZ" ? "Ət" : "Meat",
    delicacy: lang === "RU" ? "Деликатесы" : lang === "AZ" ? "Delikatesslər" : "Delicacies",
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedCountry !== "all",
    selectedType !== "all",
  ].filter(Boolean).length;

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h4 className="font-display text-xs tracking-[0.2em] text-gold/80 mb-4 uppercase">
          {t.catalog.category}
        </h4>
        <div className="flex flex-col gap-1">
          {["all", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left font-body text-sm tracking-wide py-2 px-3 rounded-lg transition-all duration-300 ${
                selectedCategory === cat
                  ? "text-gold bg-gold/10"
                  : "text-gurmania-foreground/45 hover:text-gurmania-foreground/80 hover:bg-gurmania-surface-light/50"
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Wine type */}
      {(selectedCategory === "wine" || selectedCategory === "all") && (
        <div>
          <h4 className="font-display text-xs tracking-[0.2em] text-gold/80 mb-4 uppercase">
            {lang === "RU" ? "Тип вина" : lang === "AZ" ? "Şərab növü" : "Wine Type"}
          </h4>
          <div className="flex flex-col gap-1">
            {["all", ...wineTypes].map((wt) => (
              <button
                key={wt}
                onClick={() => setSelectedType(wt)}
                className={`text-left font-body text-sm tracking-wide py-2 px-3 rounded-lg transition-all duration-300 capitalize ${
                  selectedType === wt
                    ? "text-gold bg-gold/10"
                    : "text-gurmania-foreground/45 hover:text-gurmania-foreground/80 hover:bg-gurmania-surface-light/50"
                }`}
              >
                {wt === "all" ? t.catalog.all : wt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Country */}
      <div>
        <h4 className="font-display text-xs tracking-[0.2em] text-gold/80 mb-4 uppercase">
          {t.catalog.country}
        </h4>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setSelectedCountry("all")}
            className={`text-left font-body text-sm py-2 px-3 rounded-lg transition-all duration-300 ${
              selectedCountry === "all"
                ? "text-gold bg-gold/10"
                : "text-gurmania-foreground/45 hover:text-gurmania-foreground/80 hover:bg-gurmania-surface-light/50"
            }`}
          >
            {t.catalog.all}
          </button>
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`text-left font-body text-sm py-2 px-3 rounded-lg transition-all duration-300 ${
                selectedCountry === c
                  ? "text-gold bg-gold/10"
                  : "text-gurmania-foreground/45 hover:text-gurmania-foreground/80 hover:bg-gurmania-surface-light/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="font-display text-xs tracking-[0.2em] text-gold/80 mb-4 uppercase">
          {t.catalog.sort}
        </h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-gurmania/80 border border-gold/15 rounded-lg px-4 py-2.5 font-body text-sm text-gurmania-foreground focus:border-gold/40 focus:ring-1 focus:ring-gold/20 focus:outline-none transition-all"
        >
          <option value="popularity">{t.catalog.byPopularity}</option>
          <option value="price-asc">{t.catalog.byPrice} ↑</option>
          <option value="price-desc">{t.catalog.byPrice} ↓</option>
          <option value="newest">{t.catalog.byNew}</option>
        </select>
      </div>
    </div>
  );

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      {/* Banner */}
      <section className="pt-24 md:pt-28 pb-10 md:pb-14 bg-gurmania-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gurmania to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[0.1em] text-center">
            {t.catalog.title}
          </h1>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-28">
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile filter button */}
          <button
            className="lg:hidden fixed bottom-6 right-6 z-40 bg-gold text-gurmania p-4 rounded-full shadow-[0_4px_20px_rgba(201,168,76,0.4)] hover:shadow-[0_8px_30px_rgba(201,168,76,0.5)] transition-shadow"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal className="w-5 h-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-wine-red text-gurmania-foreground rounded-full text-[10px] font-display flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Mobile filter overlay */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 bg-gurmania/95 backdrop-blur-xl p-6 overflow-y-auto lg:hidden">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-display text-lg tracking-[0.1em]">{t.catalog.filterTitle}</h3>
                <button onClick={() => setFiltersOpen(false)} className="text-gold/80 hover:text-gold transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterPanel />
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full mt-10 bg-gold text-gurmania font-display text-sm tracking-[0.2em] py-3.5 rounded-lg shadow-[0_4px_20px_rgba(201,168,76,0.3)]"
              >
                {lang === "RU" ? "Применить" : lang === "AZ" ? "Tətbiq et" : "Apply"}
              </button>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            <p className="font-body text-gurmania-text-secondary/60 text-sm mb-8 tracking-wide">
              {filtered.length} {lang === "RU" ? "товаров" : lang === "AZ" ? "məhsul" : "products"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                >
                  <Link
                    to={`/gurmania/product/${product.id}`}
                    className="bg-gradient-to-b from-gurmania-surface to-gurmania border border-gold/8 rounded-xl overflow-hidden group hover:border-gold/20 transition-all duration-500 block hover:shadow-[0_8px_30px_rgba(201,168,76,0.06)]"
                  >
                    <div className="aspect-[3/4] bg-gurmania-surface-light flex items-center justify-center relative overflow-hidden">
                      {product.oldPrice && (
                        <span className="absolute top-3 right-3 bg-wine-red text-gurmania-foreground font-display text-[10px] tracking-wider px-2.5 py-0.5 rounded-full z-10 shadow-md">
                          SALE
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gurmania-surface/30" />
                      <span className="font-body text-gurmania-text-secondary/40 text-xs tracking-wider">
                        {product.volume || product.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h4 className="font-display text-sm tracking-wide mb-1.5 group-hover:text-gold transition-colors duration-300 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="font-body text-gurmania-text-secondary/50 text-xs mb-3">
                        {product.region} {product.year ? `· ${product.year}` : ""}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-gold">{product.price} ₼</span>
                          {product.oldPrice && (
                            <span className="font-body text-gurmania-text-secondary/40 text-xs line-through">
                              {product.oldPrice} ₼
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          <span className="font-body text-gurmania-text-secondary/60 text-xs">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GurManiaLayout>
  );
};

export default GurManiaCatalog;
