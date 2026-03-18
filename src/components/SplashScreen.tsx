import { useState } from "react";
import { motion } from "framer-motion";
import gurmaniaLogo from "@/assets/gurmania-logo-dark.png";
import innvinoLogo from "@/assets/innvino-logo-clean.png";

const languages = ["AZ", "RU", "EN"] as const;
type Lang = (typeof languages)[number];

const content: Record<Lang, { choose: string; gurSub: string; gurTag: string; gurBtn: string; innSub: string; innTag: string; innBtn: string }> = {
  AZ: {
    choose: "YOLUNUZU SEÇİN",
    gurSub: "Premium Şərablar · Pendirlər · Delikatesslər",
    gurTag: "1980-ci ildən şərab butiki",
    gurBtn: "Kəşf et",
    innSub: "Şərab Restoranı · Atmosfer · Qastronomiya",
    innTag: "Tezliklə açılış",
    innBtn: "Daha çox",
  },
  RU: {
    choose: "ВЫБЕРИТЕ СВОЙ ПУТЬ",
    gurSub: "Премиум Вина · Сыры · Деликатесы",
    gurTag: "Винный бутик с 1980 года",
    gurBtn: "Войти",
    innSub: "Винный ресторан · Атмосфера · Гастрономия",
    innTag: "Скоро открытие",
    innBtn: "Узнать больше",
  },
  EN: {
    choose: "CHOOSE YOUR EXPERIENCE",
    gurSub: "Premium Wines · Cheeses · Delicacies",
    gurTag: "Wine Boutique since 1980",
    gurBtn: "Explore",
    innSub: "Wine Restaurant · Atmosphere · Gastronomy",
    innTag: "Opening soon",
    innBtn: "Learn more",
  },
};

const SplashScreen = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const [hovered, setHovered] = useState<"none" | "gur" | "inn">("none");
  const t = content[lang];

  const gurFlex = hovered === "gur" ? 1.3 : hovered === "inn" ? 0.7 : 1;
  const innFlex = hovered === "inn" ? 1.3 : hovered === "gur" ? 0.7 : 1;

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none">
      {/* Language switcher */}
      <div className="absolute top-6 right-8 z-50 flex gap-3">
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`font-body text-sm tracking-[0.2em] transition-all duration-300 ${
              lang === l ? "text-gold border-b border-gold" : "text-gold/50 hover:text-gold/80"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Center text */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="font-display text-gold text-sm md:text-base tracking-[0.4em] drop-shadow-lg">
          {t.choose}
        </p>
      </motion.div>

      {/* Desktop: diagonal split */}
      <div className="hidden md:flex h-full w-full relative">
        {/* GurMania side */}
        <motion.div
          className="relative overflow-hidden cursor-pointer"
          style={{ flex: gurFlex }}
          animate={{ flex: gurFlex }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onMouseEnter={() => setHovered("gur")}
          onMouseLeave={() => setHovered("none")}
        >
          {/* Dark background with subtle texture */}
          <div className="absolute inset-0 bg-gurmania" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          {/* Diagonal clip */}
          <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}>
            <div className="absolute inset-0 bg-gurmania" />
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-12">
            <motion.img
              src={gurmaniaLogo}
              alt="GurMania"
              className="w-64 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            />
            <motion.p
              className="font-body text-gurmania-foreground/70 text-sm tracking-[0.15em] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {t.gurSub}
            </motion.p>
            <motion.p
              className="font-body text-gold/60 text-xs tracking-[0.2em] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {t.gurTag}
            </motion.p>
            <motion.button
              className="border border-gold/40 text-gold font-display text-sm tracking-[0.3em] px-10 py-3 hover:bg-gold/10 hover:border-gold transition-all duration-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              {t.gurBtn}
            </motion.button>
          </div>
        </motion.div>

        {/* Gold diagonal line */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(43, 52%, 54%)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(43, 60%, 62%)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(43, 52%, 54%)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <line x1="85%" y1="100%" x2="60%" y2="0%" stroke="url(#goldGrad)" strokeWidth="1.5">
              <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>

        {/* InnVino side */}
        <motion.div
          className="relative overflow-hidden cursor-pointer"
          style={{ flex: innFlex }}
          animate={{ flex: innFlex }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onMouseEnter={() => setHovered("inn")}
          onMouseLeave={() => setHovered("none")}
        >
          <div className="absolute inset-0 bg-innvino" />
          <div className="absolute inset-0" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)" }}>
            <div className="absolute inset-0 bg-innvino" />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-12">
            <motion.img
              src={innvinoLogo}
              alt="InnVino"
              className="w-48 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            />
            <motion.p
              className="font-body text-innvino-foreground/60 text-sm tracking-[0.15em] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {t.innSub}
            </motion.p>
            <motion.p
              className="font-body text-accent/80 text-xs tracking-[0.2em] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {t.innTag}
            </motion.p>
            <motion.button
              className="border border-accent/40 text-accent-foreground font-display text-sm tracking-[0.3em] px-10 py-3 hover:bg-accent/10 hover:border-accent transition-all duration-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              {t.innBtn}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Mobile: horizontal split */}
      <div className="flex md:hidden flex-col h-full w-full">
        {/* GurMania top */}
        <motion.div
          className="relative flex-1 flex flex-col items-center justify-center bg-gurmania cursor-pointer overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img src={gurmaniaLogo} alt="GurMania" className="w-48 mb-4" />
          <p className="font-body text-gurmania-foreground/70 text-xs tracking-[0.15em] mb-1 px-4 text-center">{t.gurSub}</p>
          <p className="font-body text-gold/60 text-[10px] tracking-[0.2em] mb-5">{t.gurTag}</p>
          <button className="border border-gold/40 text-gold font-display text-xs tracking-[0.3em] px-8 py-2.5 active:bg-gold/10 transition-all duration-300">
            {t.gurBtn}
          </button>
        </motion.div>

        {/* Gold divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Center label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 md:hidden">
          <p className="font-display text-gold text-[10px] tracking-[0.4em] bg-gurmania/80 px-4 py-1.5 backdrop-blur-sm">
            {t.choose}
          </p>
        </div>

        {/* InnVino bottom */}
        <motion.div
          className="relative flex-1 flex flex-col items-center justify-center bg-innvino cursor-pointer overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <img src={innvinoLogo} alt="InnVino" className="w-36 mb-4" />
          <p className="font-body text-innvino-foreground/60 text-xs tracking-[0.15em] mb-1 px-4 text-center">{t.innSub}</p>
          <p className="font-body text-accent/80 text-[10px] tracking-[0.2em] mb-5">{t.innTag}</p>
          <button className="border border-accent/40 text-accent-foreground font-display text-xs tracking-[0.3em] px-8 py-2.5 active:bg-accent/10 transition-all duration-300">
            {t.innBtn}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
