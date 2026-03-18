import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang, gmContent } from "@/lib/i18n";
import { mockProducts, mockPromos, countries, categories, wineTypes, formatPriceUnit, getPerKgPrice } from "@/lib/mock-data";

const GurManiaCatalog = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [priceRange] = useState<[number, number]>([0, 200]);
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
    meat: lang === "RU" ? "Мясо & Колбасы" : lang === "AZ" ? "Ət & Kolbasalar" : "Meat & Sausages",
    delicacy: lang === "RU" ? "Деликатесы" : lang === "AZ" ? "Delikatesslər" : "Delicacies",
    accessory: lang === "RU" ? "Аксессуары" : lang === "AZ" ? "Aksesuarlar" : "Accessories",
    set: lang === "RU" ? "Подарочные сеты" : lang === "AZ" ? "Hədiyyə setləri" : "Gift Sets",
  };

  const activeFilters = [selectedCategory !== "all", selectedCountry !== "all", selectedType !== "all"].filter(Boolean).length;

  const clearFilters = () => { setSelectedCategory("all"); setSelectedCountry("all"); setSelectedType("all"); };

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      {/* Header */}
      <section className="pt-20 md:pt-24 pb-4 md:pb-6 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-center">{t.catalog.title}</h1>
        </div>
      </section>

      {/* Category pills + Sort bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-gurmania/90 backdrop-blur-xl border-b border-gold/10">
        <div className="container mx-auto px-4 md:px-8 py-3">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-2">
            {["all", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-body text-xs tracking-wider whitespace-nowrap px-4 py-1.5 rounded-full border transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gold/15 border-gold/40 text-gold"
                    : "border-gold/10 text-gurmania-foreground/40 hover:border-gold/20 hover:text-gurmania-foreground/60"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          {/* Sort + filter row */}
          <div className="flex items-center justify-between">
            <p className="font-body text-gurmania-text-secondary/50 text-[11px] tracking-wide">
              {filtered.length} {lang === "RU" ? "товаров" : lang === "AZ" ? "məhsul" : "products"}
            </p>
            <div className="flex items-center gap-3">
              {activeFilters > 0 && (
                <button onClick={clearFilters} className="font-body text-wine-red text-[10px] tracking-wider hover:text-gold transition-colors">
                  {lang === "RU" ? "Сбросить" : lang === "AZ" ? "Sıfırla" : "Clear"}
                </button>
              )}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent border border-gold/10 rounded-lg pl-3 pr-8 py-1.5 font-body text-[11px] text-gurmania-foreground/60 focus:border-gold/30 focus:outline-none cursor-pointer"
                >
                  <option value="popularity">{t.catalog.byPopularity}</option>
                  <option value="price-asc">{t.catalog.byPrice} ↑</option>
                  <option value="price-desc">{t.catalog.byPrice} ↓</option>
                  <option value="newest">{t.catalog.byNew}</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gurmania-foreground/30 pointer-events-none" />
              </div>
              <button
                className="lg:hidden flex items-center gap-1.5 border border-gold/10 rounded-lg px-3 py-1.5 font-body text-[11px] text-gurmania-foreground/60"
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal className="w-3 h-3" />
                {t.catalog.filterTitle}
                {activeFilters > 0 && (
                  <span className="bg-gold text-gurmania rounded-full w-4 h-4 text-[9px] font-display flex items-center justify-center">{activeFilters}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-40 space-y-6">
              {/* Wine type */}
              {(selectedCategory === "wine" || selectedCategory === "all") && (
                <div>
                  <h4 className="font-display text-[10px] tracking-[0.2em] text-gold/70 mb-3 uppercase">{lang === "RU" ? "Тип вина" : lang === "AZ" ? "Şərab növü" : "Wine Type"}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {["all", ...wineTypes].map((wt) => (
                      <button
                        key={wt}
                        onClick={() => setSelectedType(wt)}
                        className={`font-body text-[11px] tracking-wide px-3 py-1 rounded-full border transition-all capitalize ${
                          selectedType === wt ? "bg-gold/15 border-gold/40 text-gold" : "border-gold/8 text-gurmania-foreground/40 hover:border-gold/20"
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
                <h4 className="font-display text-[10px] tracking-[0.2em] text-gold/70 mb-3 uppercase">{t.catalog.country}</h4>
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => setSelectedCountry("all")}
                    className={`text-left font-body text-[11px] py-1.5 px-2 rounded transition-all ${selectedCountry === "all" ? "text-gold bg-gold/10" : "text-gurmania-foreground/40 hover:text-gurmania-foreground/60"}`}
                  >{t.catalog.all}</button>
                  {countries.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCountry(c)}
                      className={`text-left font-body text-[11px] py-1.5 px-2 rounded transition-all ${selectedCountry === c ? "text-gold bg-gold/10" : "text-gurmania-foreground/40 hover:text-gurmania-foreground/60"}`}
                    >{c}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile filter overlay */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 bg-gurmania/95 backdrop-blur-xl p-6 overflow-y-auto lg:hidden">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-lg tracking-[0.1em]">{t.catalog.filterTitle}</h3>
                <button onClick={() => setFiltersOpen(false)} className="text-gold/80"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-6">
                {(selectedCategory === "wine" || selectedCategory === "all") && (
                  <div>
                    <h4 className="font-display text-[10px] tracking-[0.2em] text-gold/70 mb-3 uppercase">{lang === "RU" ? "Тип вина" : "Wine Type"}</h4>
                    <div className="flex flex-wrap gap-2">
                      {["all", ...wineTypes].map((wt) => (
                        <button
                          key={wt}
                          onClick={() => setSelectedType(wt)}
                          className={`font-body text-xs px-4 py-2 rounded-full border transition-all capitalize ${selectedType === wt ? "bg-gold/15 border-gold/40 text-gold" : "border-gold/10 text-gurmania-foreground/40"}`}
                        >{wt === "all" ? t.catalog.all : wt}</button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="font-display text-[10px] tracking-[0.2em] text-gold/70 mb-3 uppercase">{t.catalog.country}</h4>
                  <div className="flex flex-wrap gap-2">
                    {["all", ...countries].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCountry(c === "all" ? "all" : c)}
                        className={`font-body text-xs px-4 py-2 rounded-full border transition-all ${(c === "all" ? selectedCountry === "all" : selectedCountry === c) ? "bg-gold/15 border-gold/40 text-gold" : "border-gold/10 text-gurmania-foreground/40"}`}
                      >{c === "all" ? t.catalog.all : c}</button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => setFiltersOpen(false)} className="w-full mt-8 bg-gold text-gurmania font-display text-xs tracking-[0.2em] py-3 rounded-lg">
                {lang === "RU" ? "Применить" : lang === "AZ" ? "Tətbiq et" : "Apply"}
              </button>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.3), duration: 0.3 }}
                >
                  <ProductCard product={product} lang={lang} />
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
