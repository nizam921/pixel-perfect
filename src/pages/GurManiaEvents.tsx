import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang, gmContent } from "@/lib/i18n";
import { mockEvents } from "@/lib/mock-data";

const GurManiaEvents = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const t = gmContent[lang];

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <section className="pt-20 md:pt-24 pb-4 md:pb-6 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="font-display text-2xl md:text-3xl tracking-[0.1em]">{t.events.title}</h1>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="space-y-6">
          {mockEvents.map((event, i) => (
            <motion.div
              key={event.id}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8 bg-gradient-to-r from-gurmania-surface to-gurmania border border-gold/8 rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="aspect-[16/9] md:aspect-auto overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5 md:py-8 md:pr-8 flex flex-col justify-center">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-gold/60">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span className="font-body text-xs">
                      {new Date(event.date).toLocaleDateString(lang === "RU" ? "ru-RU" : lang === "AZ" ? "az-AZ" : "en-US", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gold/60">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-body text-xs">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gold/60">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-body text-xs">GurMania Boutique</span>
                  </div>
                </div>
                <h3 className="font-display text-lg md:text-xl tracking-wide mb-3 group-hover:text-gold transition-colors">{event.title}</h3>
                <p className="font-body text-gurmania-text-secondary/60 text-sm leading-relaxed mb-5">{event.description}</p>
                <button className="self-start border border-gold/25 text-gold/70 font-display text-[10px] tracking-[0.2em] px-6 py-2 rounded-lg hover:bg-gold/10 hover:text-gold transition-all">
                  {lang === "RU" ? "Записаться" : lang === "AZ" ? "Qeydiyyat" : "Register"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GurManiaLayout>
  );
};

export default GurManiaEvents;
