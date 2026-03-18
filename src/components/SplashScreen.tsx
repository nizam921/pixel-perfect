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

  // Diagonal offset shifts based on hover
  const diagLeft = hovered === "gur" ? 68 : hovered === "inn" ? 48 : 58;
  const diagRight = hovered === "gur" ? 52 : hovered === "inn" ? 32 : 42;

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

      {/* Center "choose" text */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="font-display text-gold text-sm md:text-base tracking-[0.4em] drop-shadow-[0_2px_8px_rgba(201,168,76,0.4)]">
          {t.choose}
        </p>
      </motion.div>

      {/* ===== DESKTOP diagonal split ===== */}
      <div className="hidden md:block h-full w-full relative">
        {/* GurMania — dark side */}
        <motion.div
          className="absolute inset-0 cursor-pointer"
          style={{ clipPath: `polygon(0 0, ${diagLeft}% 0, ${diagRight}% 100%, 0 100%)` }}
          animate={{ clipPath: `polygon(0 0, ${diagLeft}% 0, ${diagRight}% 100%, 0 100%)` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onMouseEnter={() => setHovered("gur")}
          onMouseLeave={() => setHovered("none")}
        >
          <div className="absolute inset-0 bg-gurmania" />
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(30,29%,94%) 0.5px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center pr-[15%]">
            <motion.img
              src={gurmaniaLogo}
              alt="GurMania"
              className="w-56 lg:w-64 mb-6 rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            />
            <motion.p
              className="font-body text-gurmania-foreground/70 text-sm tracking-[0.15em] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t.gurSub}
            </motion.p>
            <motion.p
              className="font-body text-gold/60 text-xs tracking-[0.2em] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t.gurTag}
            </motion.p>
            <motion.button
              className="border border-gold/40 text-gold font-display text-sm tracking-[0.3em] px-10 py-3 hover:bg-gold/10 hover:border-gold transition-all duration-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.03 }}
            >
              {t.gurBtn}
            </motion.button>
          </div>
        </motion.div>

        {/* InnVino — light side */}
        <motion.div
          className="absolute inset-0 cursor-pointer"
          style={{ clipPath: `polygon(${diagLeft}% 0, 100% 0, 100% 100%, ${diagRight}% 100%)` }}
          animate={{ clipPath: `polygon(${diagLeft}% 0, 100% 0, 100% 100%, ${diagRight}% 100%)` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onMouseEnter={() => setHovered("inn")}
          onMouseLeave={() => setHovered("none")}
        >
          <div className="absolute inset-0 bg-innvino" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center pl-[15%]">
            <motion.img
              src={innvinoLogo}
              alt="InnVino"
              className="w-40 lg:w-48 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            />
            <motion.p
              className="font-body text-innvino-foreground/60 text-sm tracking-[0.15em] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t.innSub}
            </motion.p>
            <motion.p
              className="font-body text-accent/80 text-xs tracking-[0.2em] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t.innTag}
            </motion.p>
            <motion.button
              className="border border-accent/40 text-innvino-foreground font-display text-sm tracking-[0.3em] px-10 py-3 hover:bg-accent/10 hover:border-accent transition-all duration-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.03 }}
            >
              {t.innBtn}
            </motion.button>
          </div>
        </motion.div>

        {/* Gold diagonal line overlay */}
        <svg className="absolute inset-0 w-full h-full z-30 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(43, 52%, 54%)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(43, 60%, 68%)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(43, 52%, 54%)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.line
            x1={diagLeft} y1="0" x2={diagRight} y2="100"
            stroke="url(#goldLine)" strokeWidth="0.15"
            animate={{ x1: diagLeft, x2: diagRight }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* ===== MOBILE horizontal split ===== */}
      <div className="flex md:hidden flex-col h-full w-full">
        <motion.div
          className="relative flex-1 flex flex-col items-center justify-center bg-gurmania cursor-pointer overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img src={gurmaniaLogo} alt="GurMania" className="w-44 mb-4 rounded-sm" />
          <p className="font-body text-gurmania-foreground/70 text-xs tracking-[0.15em] mb-1 px-4 text-center">{t.gurSub}</p>
          <p className="font-body text-gold/60 text-[10px] tracking-[0.2em] mb-5">{t.gurTag}</p>
          <button className="border border-gold/40 text-gold font-display text-xs tracking-[0.3em] px-8 py-2.5 active:bg-gold/10 transition-all duration-300">
            {t.gurBtn}
          </button>
        </motion.div>

        {/* Gold divider + label */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent z-40">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-gold text-[10px] tracking-[0.4em] bg-gurmania/90 px-4 py-1 whitespace-nowrap">
            {t.choose}
          </span>
        </div>

        <motion.div
          className="relative flex-1 flex flex-col items-center justify-center bg-innvino cursor-pointer overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <img src={innvinoLogo} alt="InnVino" className="w-32 mb-4" />
          <p className="font-body text-innvino-foreground/60 text-xs tracking-[0.15em] mb-1 px-4 text-center">{t.innSub}</p>
          <p className="font-body text-accent/80 text-[10px] tracking-[0.2em] mb-5">{t.innTag}</p>
          <button className="border border-accent/40 text-innvino-foreground font-display text-xs tracking-[0.3em] px-8 py-2.5 active:bg-accent/10 transition-all duration-300">
            {t.innBtn}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
