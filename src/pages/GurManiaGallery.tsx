import { useState } from "react";
import { motion } from "framer-motion";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang, gmContent } from "@/lib/i18n";
import heroWine1 from "@/assets/hero-wine-1.jpg";
import heroWine2 from "@/assets/hero-wine-2.jpg";
import heroWine3 from "@/assets/hero-wine-3.jpg";
import aboutInterior from "@/assets/about-interior.jpg";
import catWine from "@/assets/category-wine.jpg";
import catCheese from "@/assets/category-cheese.jpg";
import catMeat from "@/assets/category-meat.jpg";
import eventImg1 from "@/assets/event-1.jpg";
import eventImg2 from "@/assets/event-2.jpg";
import eventImg3 from "@/assets/event-3.jpg";

const galleryImages = [
  { src: aboutInterior, label: "Boutique Interior" },
  { src: heroWine1, label: "Wine Collection" },
  { src: catWine, label: "Fine Wines" },
  { src: eventImg2, label: "Wine Tasting" },
  { src: catCheese, label: "Artisan Cheeses" },
  { src: heroWine2, label: "Premium Selection" },
  { src: catMeat, label: "Delicacies" },
  { src: eventImg1, label: "Wine Evening" },
  { src: heroWine3, label: "Wine Cellar" },
  { src: eventImg3, label: "Gourmet Dinner" },
];

const GurManiaGallery = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const [selected, setSelected] = useState<number | null>(null);

  const title = lang === "RU" ? "Галерея" : lang === "AZ" ? "Qalereya" : "Gallery";

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <section className="pt-20 md:pt-24 pb-4 md:pb-6 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="font-display text-2xl md:text-3xl tracking-[0.1em]">{title}</h1>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid cursor-pointer group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(i)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gurmania/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-body text-gurmania-foreground text-xs tracking-wider">{img.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[200] bg-gurmania/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button className="absolute top-6 right-6 font-display text-gold text-2xl">✕</button>
          <img
            src={galleryImages[selected].src}
            alt={galleryImages[selected].label}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                className={`w-2 h-2 rounded-full transition-all ${selected === i ? "bg-gold w-6" : "bg-gurmania-foreground/20"}`}
              />
            ))}
          </div>
        </div>
      )}
    </GurManiaLayout>
  );
};

export default GurManiaGallery;
