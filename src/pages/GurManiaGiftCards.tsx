import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, CreditCard, Check, ArrowRight, Wifi, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang } from "@/lib/i18n";

const presetAmounts = [50, 100, 200, 500, 1000];
const cardTiers = ["GOLD", "SILVER", "PLATINUM", "BURGUNDY", "COPPER"];
const stepLabels = {
  RU: ["Выбор карты", "Данные получателя", "Оплата"],
  AZ: ["Kart seçimi", "Alıcı məlumatları", "Ödəniş"],
  EN: ["Select Card", "Recipient Info", "Payment"],
};

const cardStyles = [
  {
    bg: "linear-gradient(135deg, #8B6914 0%, #C9A84C 25%, #E8D48B 50%, #C9A84C 75%, #8B6914 100%)",
    shadow: "0 20px 60px -15px rgba(201,168,76,0.4)",
    accent: "rgba(232,212,139,0.3)",
    chipColor: "rgba(232,212,139,0.5)",
    dotColor: "rgba(255,255,255,0.15)",
  },
  {
    bg: "linear-gradient(135deg, #5A5A5A 0%, #A8A8A8 25%, #D4D4D4 50%, #A8A8A8 75%, #5A5A5A 100%)",
    shadow: "0 20px 60px -15px rgba(168,168,168,0.35)",
    accent: "rgba(212,212,212,0.3)",
    chipColor: "rgba(212,212,212,0.5)",
    dotColor: "rgba(255,255,255,0.12)",
  },
  {
    bg: "linear-gradient(135deg, #1a1a2e 0%, #3d3d5c 25%, #6b6b8a 50%, #3d3d5c 75%, #1a1a2e 100%)",
    shadow: "0 20px 60px -15px rgba(107,107,138,0.35)",
    accent: "rgba(107,107,138,0.3)",
    chipColor: "rgba(180,180,210,0.4)",
    dotColor: "rgba(255,255,255,0.08)",
  },
  {
    bg: "linear-gradient(135deg, #3B0A1A 0%, #6B1D3A 25%, #8B2252 40%, #6B1D3A 60%, #4A1028 80%, #3B0A1A 100%)",
    shadow: "0 20px 60px -15px rgba(107,29,58,0.45)",
    accent: "rgba(139,34,82,0.3)",
    chipColor: "rgba(200,140,170,0.4)",
    dotColor: "rgba(255,255,255,0.1)",
  },
  {
    bg: "linear-gradient(135deg, #5C2E0E 0%, #B87333 25%, #DA8A47 50%, #B87333 75%, #5C2E0E 100%)",
    shadow: "0 20px 60px -15px rgba(184,115,51,0.4)",
    accent: "rgba(218,138,71,0.3)",
    chipColor: "rgba(218,180,120,0.5)",
    dotColor: "rgba(255,255,255,0.12)",
  },
];

// EMV chip SVG component
const CardChip = ({ color }: { color: string }) => (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
    <rect x="1" y="1" width="34" height="26" rx="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
    <line x1="1" y1="10" x2="35" y2="10" stroke={color} strokeWidth="0.8" />
    <line x1="1" y1="18" x2="35" y2="18" stroke={color} strokeWidth="0.8" />
    <line x1="12" y1="1" x2="12" y2="27" stroke={color} strokeWidth="0.8" />
    <line x1="24" y1="1" x2="24" y2="27" stroke={color} strokeWidth="0.8" />
    <line x1="12" y1="14" x2="24" y2="14" stroke={color} strokeWidth="0.8" />
  </svg>
);

// Decorative dot pattern
const DotPattern = ({ color }: { color: string }) => (
  <div className="flex gap-[3px] flex-wrap" style={{ maxWidth: "60px" }}>
    {[...Array(15)].map((_, i) => (
      <div key={i} className="w-[3px] h-[3px] rounded-full" style={{ backgroundColor: color }} />
    ))}
  </div>
);

const GiftCard = ({
  amount,
  index,
  selected,
  onSelect,
}: {
  amount: number;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const style = cardStyles[index % cardStyles.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.03, rotateY: 5 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-500 ${
          selected ? "ring-2 ring-gold ring-offset-2 ring-offset-gurmania" : ""
        }`}
        style={{
          background: style.bg,
          boxShadow: selected
            ? `0 0 0 2px hsl(43 52% 54%), ${style.shadow}`
            : style.shadow,
        }}
      >
        {/* Fine line texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)`,
          }}
        />

        {/* Metallic light overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${style.accent} 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(0,0,0,0.2) 0%, transparent 50%)`,
          }}
        />

        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)",
          }}
          animate={{ x: hovered ? ["-100%", "200%"] : "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        <AnimatePresence>
          {hovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white/30"
                  initial={{ x: Math.random() * 300, y: Math.random() * 200, opacity: 0, scale: 0 }}
                  animate={{ y: [null, Math.random() * -100], opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
                  transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Card content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-5">
          {/* Top row: Logo + Contactless */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-white/80" />
              <span className="font-display text-white/80 text-[9px] md:text-[10px] tracking-[0.3em] uppercase">
                GurMania
              </span>
            </div>
            <Wifi className="w-4 h-4 text-white/40 rotate-90" />
          </div>

          {/* Middle: Chip */}
          <div className="flex items-center gap-3">
            <CardChip color={style.chipColor} />
          </div>

          {/* Bottom: Amount + Tier + Dots */}
          <div className="flex items-end justify-between">
            <div>
              <motion.div
                animate={hovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="font-display text-white text-3xl md:text-4xl font-bold tracking-tight">
                  {amount}
                </span>
                <span className="font-display text-white/70 text-base md:text-lg ml-1">₼</span>
              </motion.div>
              <p className="font-body text-white/40 text-[9px] mt-0.5 tracking-[0.25em]">
                {cardTiers[index % cardTiers.length]} · GIFT CARD
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <DotPattern color={style.dotColor} />
              <CreditCard className="w-5 h-5 text-white/25" />
            </div>
          </div>
        </div>

        {/* Selected checkmark */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gold flex items-center justify-center z-20"
            >
              <Check className="w-4 h-4 text-gurmania" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CustomAmountCard = ({
  selected,
  onSelect,
  customAmount,
  setCustomAmount,
}: {
  selected: boolean;
  onSelect: () => void;
  customAmount: string;
  setCustomAmount: (v: string) => void;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full aspect-[1.6/1] rounded-2xl overflow-hidden border-2 border-dashed transition-all duration-500 ${
          selected
            ? "border-gold bg-gradient-to-br from-gurmania-surface to-gurmania shadow-lg shadow-gold/20"
            : "border-gold/20 bg-gradient-to-br from-gurmania-surface/80 to-gurmania hover:border-gold/50"
        }`}
      >
        {(focused || selected) && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: "linear-gradient(45deg, transparent, hsl(43 52% 54% / 0.1), transparent)" }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <div className="relative z-10 h-full flex flex-col items-center justify-center p-5 gap-3">
          <motion.div animate={selected ? { rotate: [0, 10, -10, 0] } : {}} transition={{ duration: 0.5 }}>
            <Gift className="w-8 h-8 text-gold/60" />
          </motion.div>

          <div className="flex items-baseline gap-1" onClick={(e) => e.stopPropagation()}>
            <input
              type="number"
              min="1"
              max="10000"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              onFocus={() => { setFocused(true); onSelect(); }}
              onBlur={() => setFocused(false)}
              placeholder="0"
              className="w-28 bg-transparent text-center font-display text-4xl text-gold placeholder:text-gold/20 focus:outline-none border-b border-gold/20 focus:border-gold/60 transition-colors pb-1"
            />
            <span className="font-display text-gold/50 text-xl">₼</span>
          </div>

          <p className="font-body text-gurmania-text-secondary/50 text-xs tracking-wider">YOUR AMOUNT</p>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gold flex items-center justify-center z-20"
            >
              <Check className="w-4 h-4 text-gurmania" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const GurManiaGiftCards = () => {
  const [lang, setLang] = useState<Lang>("RU");
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [activationCode, setActivationCode] = useState("");
  const [activationResult, setActivationResult] = useState<"idle" | "success" | "error">("idle");
  const navigate = useNavigate();

  const selectedAmount = isCustom ? Number(customAmount) || 0 : selectedCard !== null ? presetAmounts[selectedCard] : 0;
  const canProceed = selectedAmount > 0;
  const labels = stepLabels[lang];

  const handlePurchase = () => {
    navigate("/gurmania/checkout/success", {
      state: { amount: selectedAmount, recipientName, recipientEmail, message },
    });
  };

  const handleActivate = () => {
    if (activationCode.length >= 6) {
      setActivationResult("success");
    } else {
      setActivationResult("error");
    }
    setTimeout(() => setActivationResult("idle"), 3000);
  };

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <div className="min-h-screen bg-gurmania text-gurmania-foreground">
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-1/4 w-96 h-96 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(43 52% 54% / 0.06) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
              style={{ background: "radial-gradient(circle, hsl(350 65% 34% / 0.05) 0%, transparent 70%)" }}
              animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-5 py-2 mb-6"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="font-body text-gold text-sm tracking-wider">
                  {lang === "RU" ? "ПОДАРОЧНЫЕ КАРТЫ" : lang === "AZ" ? "HƏDİYYƏ KARTLARI" : "GIFT CARDS"}
                </span>
              </motion.div>

              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-gurmania-foreground mb-4">
                {lang === "RU" ? "Подарите" : lang === "AZ" ? "Hədiyyə edin" : "Gift the"}
                <span className="text-gold"> {lang === "RU" ? "вкус" : lang === "AZ" ? "dadı" : "taste"}</span>
                <br />
                {lang === "RU" ? "роскоши" : lang === "AZ" ? "lüksün" : "of luxury"}
              </h1>
              <p className="font-body text-gurmania-text-secondary/60 text-lg md:text-xl max-w-2xl mx-auto">
                {lang === "RU"
                  ? "Идеальный подарок для ценителей вина и гастрономии. Выберите номинал или укажите свою сумму."
                  : lang === "AZ"
                  ? "Şərab və qastronomiya biliciləri üçün ideal hədiyyə. Nominal seçin və ya öz məbləğinizi daxil edin."
                  : "The perfect gift for wine and gastronomy connoisseurs. Choose a denomination or enter your own amount."}
              </p>
            </motion.div>

            {/* 3-Step Stepper */}
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 md:gap-4">
                  <div className="flex flex-col items-center gap-1.5">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-sm transition-all duration-500 ${
                        step > s
                          ? "bg-gold text-gurmania"
                          : step === s
                          ? "bg-gold text-gurmania shadow-lg shadow-gold/30"
                          : "bg-gurmania-surface border border-gold/20 text-gurmania-text-secondary/40"
                      }`}
                      animate={step === s ? { scale: [1, 1.08, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </motion.div>
                    <span className={`text-[10px] md:text-xs tracking-wider font-body transition-colors ${
                      step >= s ? "text-gold" : "text-gurmania-text-secondary/30"
                    }`}>
                      {labels[s - 1]}
                    </span>
                  </div>
                  {s < 3 && (
                    <div className={`w-8 md:w-16 h-px transition-colors duration-500 mb-5 ${step > s ? "bg-gold" : "bg-gold/15"}`} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* STEP 1: Select Card */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4 }}>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                    {presetAmounts.map((amount, i) => (
                      <GiftCard key={amount} amount={amount} index={i} selected={!isCustom && selectedCard === i} onSelect={() => { setSelectedCard(i); setIsCustom(false); }} />
                    ))}
                    <CustomAmountCard selected={isCustom} onSelect={() => { setIsCustom(true); setSelectedCard(null); }} customAmount={customAmount} setCustomAmount={setCustomAmount} />
                  </div>

                  <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: canProceed ? 1 : 0.3 }}>
                    <motion.button
                      whileHover={canProceed ? { scale: 1.05 } : {}}
                      whileTap={canProceed ? { scale: 0.95 } : {}}
                      onClick={() => canProceed && setStep(2)}
                      disabled={!canProceed}
                      className="group bg-gradient-to-r from-gold to-gold-glow text-gurmania font-display tracking-[0.2em] text-sm px-10 py-4 rounded-xl flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-gold/25 transition-shadow"
                    >
                      {lang === "RU" ? "ПРОДОЛЖИТЬ" : lang === "AZ" ? "DAVAM ET" : "CONTINUE"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* STEP 2: Recipient Info */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }} className="max-w-2xl mx-auto">
                  {/* Selected card preview */}
                  <motion.div className="mb-10 flex justify-center" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                    <div className="w-72">
                      <div
                        className="relative w-full aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                          background: isCustom
                            ? "linear-gradient(135deg, #8B6914 0%, #C9A84C 50%, #8B6914 100%)"
                            : cardStyles[(selectedCard ?? 0) % cardStyles.length].bg,
                          boxShadow: cardStyles[(selectedCard ?? 0) % cardStyles.length].shadow,
                        }}
                      >
                        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)` }} />
                        <div className="relative z-10 h-full flex flex-col justify-between p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Gift className="w-4 h-4 text-white/80" />
                              <span className="font-display text-white/80 text-[10px] tracking-[0.3em]">GURMANIA</span>
                            </div>
                            <Wifi className="w-3.5 h-3.5 text-white/40 rotate-90" />
                          </div>
                          <CardChip color={cardStyles[(selectedCard ?? 0) % cardStyles.length].chipColor} />
                          <div className="flex items-end justify-between">
                            <div>
                              <span className="font-display text-white text-3xl font-bold">{selectedAmount}</span>
                              <span className="font-display text-white/70 text-base ml-1">₼</span>
                            </div>
                            <CreditCard className="w-5 h-5 text-white/30" />
                          </div>
                        </div>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          animate={{ x: ["-200%", "200%"] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                          style={{ transform: "skewX(-20deg)" }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Form */}
                  <div className="space-y-5">
                    <div>
                      <label className="font-display text-xs tracking-[0.2em] text-gold/70 block mb-2">
                        {lang === "RU" ? "ИМЯ ПОЛУЧАТЕЛЯ" : lang === "AZ" ? "ALICININ ADI" : "RECIPIENT NAME"}
                      </label>
                      <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full bg-gurmania-surface border border-gold/15 rounded-xl px-5 py-3.5 font-body text-gurmania-foreground placeholder:text-gurmania-text-secondary/30 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder={lang === "RU" ? "Введите имя..." : lang === "AZ" ? "Adı daxil edin..." : "Enter name..."} />
                    </div>
                    <div>
                      <label className="font-display text-xs tracking-[0.2em] text-gold/70 block mb-2">
                        {lang === "RU" ? "EMAIL ПОЛУЧАТЕЛЯ" : lang === "AZ" ? "ALICININ E-POÇTU" : "RECIPIENT EMAIL"}
                      </label>
                      <input type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)}
                        className="w-full bg-gurmania-surface border border-gold/15 rounded-xl px-5 py-3.5 font-body text-gurmania-foreground placeholder:text-gurmania-text-secondary/30 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="font-display text-xs tracking-[0.2em] text-gold/70 block mb-2">
                        {lang === "RU" ? "СООБЩЕНИЕ" : lang === "AZ" ? "MESAJ" : "MESSAGE"}
                      </label>
                      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
                        className="w-full bg-gurmania-surface border border-gold/15 rounded-xl px-5 py-3.5 font-body text-gurmania-foreground placeholder:text-gurmania-text-secondary/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                        placeholder={lang === "RU" ? "Добавьте поздравление..." : lang === "AZ" ? "Təbrik əlavə edin..." : "Add a greeting..."} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <button onClick={() => setStep(1)} className="font-display text-xs tracking-[0.2em] text-gurmania-text-secondary/50 hover:text-gold transition-colors">
                      ← {lang === "RU" ? "НАЗАД" : lang === "AZ" ? "GERİ" : "BACK"}
                    </button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setStep(3)}
                      className="bg-gradient-to-r from-gold to-gold-glow text-gurmania font-display tracking-[0.2em] text-sm px-10 py-4 rounded-xl flex items-center gap-3 hover:shadow-lg hover:shadow-gold/25 transition-shadow">
                      {lang === "RU" ? "К ОПЛАТЕ" : lang === "AZ" ? "ÖDƏNİŞƏ" : "TO PAYMENT"}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Payment */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }} className="max-w-2xl mx-auto">
                  {/* Order summary */}
                  <div className="bg-gurmania-surface border border-gold/10 rounded-2xl p-6 md:p-8 mb-8">
                    <h3 className="font-display text-gold text-sm tracking-[0.2em] mb-6">
                      {lang === "RU" ? "ИТОГО К ОПЛАТЕ" : lang === "AZ" ? "ÖDƏNİŞ CƏMİ" : "ORDER SUMMARY"}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center font-body text-sm">
                        <span className="text-gurmania-text-secondary">
                          {lang === "RU" ? "Подарочная карта" : lang === "AZ" ? "Hədiyyə kartı" : "Gift Card"} ({!isCustom && selectedCard !== null ? cardTiers[selectedCard % cardTiers.length] : "CUSTOM"})
                        </span>
                        <span className="text-gurmania-foreground font-display">{selectedAmount} ₼</span>
                      </div>
                      {recipientName && (
                        <div className="flex justify-between items-center font-body text-sm">
                          <span className="text-gurmania-text-secondary">{lang === "RU" ? "Получатель" : lang === "AZ" ? "Alıcı" : "Recipient"}</span>
                          <span className="text-gurmania-foreground">{recipientName}</span>
                        </div>
                      )}
                      {recipientEmail && (
                        <div className="flex justify-between items-center font-body text-sm">
                          <span className="text-gurmania-text-secondary">Email</span>
                          <span className="text-gurmania-foreground">{recipientEmail}</span>
                        </div>
                      )}
                      <div className="border-t border-gold/10 pt-4 flex justify-between items-center">
                        <span className="font-display text-gold tracking-wider text-sm">{lang === "RU" ? "ИТОГО" : lang === "AZ" ? "CƏMİ" : "TOTAL"}</span>
                        <span className="font-display text-gold text-2xl">{selectedAmount} ₼</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment methods placeholder */}
                  <div className="bg-gurmania-surface border border-gold/10 rounded-2xl p-6 md:p-8 mb-8">
                    <h3 className="font-display text-gold text-sm tracking-[0.2em] mb-6">
                      {lang === "RU" ? "СПОСОБ ОПЛАТЫ" : lang === "AZ" ? "ÖDƏNİŞ ÜSULU" : "PAYMENT METHOD"}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["VISA", "Mastercard", "Apple Pay", "Google Pay"].map((method) => (
                        <motion.div key={method} whileHover={{ scale: 1.02 }}
                          className="border border-gold/15 rounded-xl p-4 flex items-center justify-center font-body text-sm text-gurmania-foreground/70 hover:border-gold/40 hover:text-gold cursor-pointer transition-colors">
                          {method}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button onClick={() => setStep(2)} className="font-display text-xs tracking-[0.2em] text-gurmania-text-secondary/50 hover:text-gold transition-colors">
                      ← {lang === "RU" ? "НАЗАД" : lang === "AZ" ? "GERİ" : "BACK"}
                    </button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePurchase}
                      className="bg-gradient-to-r from-gold to-gold-glow text-gurmania font-display tracking-[0.2em] text-sm px-10 py-4 rounded-xl flex items-center gap-3 hover:shadow-lg hover:shadow-gold/25 transition-shadow">
                      {lang === "RU" ? `ОПЛАТИТЬ ${selectedAmount} ₼` : lang === "AZ" ? `${selectedAmount} ₼ ÖDƏ` : `PAY ${selectedAmount} ₼`}
                      <Gift className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Card Activation Section */}
        <section className="py-20 border-t border-gold/10">
          <div className="max-w-xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-gold/5 border border-gold/15 rounded-full px-4 py-1.5 mb-6">
                <KeyRound className="w-3.5 h-3.5 text-gold/60" />
                <span className="font-body text-gold/70 text-xs tracking-wider">
                  {lang === "RU" ? "АКТИВАЦИЯ" : lang === "AZ" ? "AKTİVASİYA" : "ACTIVATION"}
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-gurmania-foreground mb-3">
                {lang === "RU" ? "Активировать карту" : lang === "AZ" ? "Kartı aktivləşdir" : "Activate Your Card"}
              </h2>
              <p className="font-body text-gurmania-text-secondary/50 text-sm mb-8">
                {lang === "RU"
                  ? "Введите код с вашей подарочной карты для активации"
                  : lang === "AZ"
                  ? "Aktivasiya üçün hədiyyə kartınızdakı kodu daxil edin"
                  : "Enter the code from your gift card to activate it"}
              </p>

              <div className="flex gap-3 max-w-sm mx-auto">
                <input
                  type="text"
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                  placeholder="XXXX-XXXX-XXXX"
                  maxLength={14}
                  className="flex-1 bg-gurmania-surface border border-gold/15 rounded-xl px-5 py-3.5 font-display text-center text-gurmania-foreground tracking-[0.2em] placeholder:text-gurmania-text-secondary/20 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleActivate}
                  className="bg-gradient-to-r from-gold to-gold-glow text-gurmania font-display text-xs tracking-[0.15em] px-6 rounded-xl hover:shadow-lg hover:shadow-gold/25 transition-shadow">
                  {lang === "RU" ? "АКТИВИРОВАТЬ" : lang === "AZ" ? "AKTİVLƏŞDİR" : "ACTIVATE"}
                </motion.button>
              </div>

              <AnimatePresence>
                {activationResult !== "idle" && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={`font-body text-sm mt-4 ${activationResult === "success" ? "text-green-400" : "text-red-400"}`}>
                    {activationResult === "success"
                      ? (lang === "RU" ? "✓ Карта успешно активирована!" : lang === "AZ" ? "✓ Kart uğurla aktivləşdirildi!" : "✓ Card activated successfully!")
                      : (lang === "RU" ? "✗ Неверный код. Попробуйте снова." : lang === "AZ" ? "✗ Yanlış kod. Yenidən cəhd edin." : "✗ Invalid code. Please try again.")}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </div>
    </GurManiaLayout>
  );
};

export default GurManiaGiftCards;
