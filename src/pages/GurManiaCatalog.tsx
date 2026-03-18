import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal, X, Star } from "lucide-react";
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

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h4 className="font-display text-sm tracking-[0.15em] text-gold mb-4">{t.catalog.category}</h4>
        <div className="flex flex-col gap-2">
          {["all", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left font-body text-sm tracking-wide py-1.5 transition-colors ${
                selectedCategory === cat ? "text-gold" : "text-gurmania-foreground/50 hover:text-gurmania-foreground/80"
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
          <h4 className="font-display text-sm tracking-[0.15em] text-gold mb-4">
            {lang === "RU" ? "Тип вина" : lang === "AZ" ? "Şərab növü" : "Wine Type"}
          </h4>
          <div className="flex flex-col gap-2">
            {["all", ...wineTypes].map((wt) => (
              <button
                key={wt}
                onClick={() => setSelectedType(wt)}
                className={`text-left font-body text-sm tracking-wide py-1.5 transition-colors capitalize ${
                  selectedType === wt ? "text-gold" : "text-gurmania-foreground/50 hover:text-gurmania-foreground/80"
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
        <h4 className="font-display text-sm tracking-[0.15em] text-gold mb-4">{t.catalog.country}</h4>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSelectedCountry("all")}
            className={`text-left font-body text-sm py-1.5 transition-colors ${
              selectedCountry === "all" ? "text-gold" : "text-gurmania-foreground/50 hover:text-gurmania-foreground/80"
            }`}
          >
            {t.catalog.all}
          </button>
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`text-left font-body text-sm py-1.5 transition-colors ${
                selectedCountry === c ? "text-gold" : "text-gurmania-foreground/50 hover:text-gurmania-foreground/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="font-display text-sm tracking-[0.15em] text-gold mb-4">{t.catalog.sort}</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-gurmania border border-gold/20 rounded px-3 py-2 font-body text-sm text-gurmania-foreground focus:border-gold/50 focus:outline-none"
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
      <section className="pt-20 md:pt-24 pb-8 md:pb-12 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="font-display text-3xl md:text-4xl tracking-[0.1em] text-center">{t.catalog.title}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel />
          </aside>

          {/* Mobile filter button */}
          <button
            className="lg:hidden fixed bottom-6 right-6 z-40 bg-gold text-gurmania p-4 rounded-full shadow-lg"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* Mobile filter overlay */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 bg-gurmania p-6 overflow-y-auto lg:hidden">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-lg tracking-[0.1em]">{t.catalog.filterTitle}</h3>
                <button onClick={() => setFiltersOpen(false)}>
                  <X className="w-6 h-6 text-gold" />
                </button>
              </div>
              <FilterPanel />
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full mt-8 bg-gold text-gurmania font-display text-sm tracking-[0.2em] py-3 rounded"
              >
                {lang === "RU" ? "Применить" : lang === "AZ" ? "Tətbiq et" : "Apply"}
              </button>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            <p className="font-body text-gurmania-text-secondary text-sm mb-6">
              {filtered.length} {lang === "RU" ? "товаров" : lang === "AZ" ? "məhsul" : "products"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  to={`/gurmania/product/${product.id}`}
                  className="bg-gurmania-surface border border-gold/5 rounded-lg overflow-hidden group hover:border-gold/20 transition-colors"
                >
                  <div className="aspect-[3/4] bg-gurmania-surface-light flex items-center justify-center relative">
                    {product.oldPrice && (
                      <span className="absolute top-3 right-3 bg-wine-red text-gurmania-foreground font-display text-[10px] tracking-wider px-2 py-0.5 rounded">
                        SALE
                      </span>
                    )}
                    <span className="font-body text-gurmania-text-secondary text-xs">{product.volume || product.category}</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-display text-sm tracking-wide mb-1 group-hover:text-gold transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="font-body text-gurmania-text-secondary text-xs mb-2">
                      {product.region} {product.year ? `· ${product.year}` : ""}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-gold">{product.price} ₼</span>
                        {product.oldPrice && (
                          <span className="font-body text-gurmania-text-secondary text-xs line-through">{product.oldPrice} ₼</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-gold fill-gold" />
                        <span className="font-body text-gurmania-text-secondary text-xs">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GurManiaLayout>
  );
};

export default GurManiaCatalog;
