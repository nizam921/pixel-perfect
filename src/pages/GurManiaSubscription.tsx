import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Wine, Star, Gift, Truck, Shield, Percent, Users, Sparkles, Check, ChevronRight, Calculator } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang } from "@/lib/i18n";

/* ── privileges list ── */
const privileges = [
  { icon: Wine, title: "Special member-only discounts on wines", desc: "Exclusive prices on selected wines every week", titleRu: "Эксклюзивные скидки на вина", descRu: "Специальные цены на избранные вина каждую неделю", titleAz: "Şərablara xüsusi endirim", descAz: "Hər həftə seçilmiş şərablara eksklüziv qiymətlər" },
  { icon: Star, title: "Double reward points on every purchase", desc: "Earn faster, redeem for discounts", titleRu: "Двойные бонусные баллы", descRu: "Копите быстрее, обменивайте на скидки", titleAz: "Hər alışda ikiqat bonus", descAz: "Daha sürətli qazanın, endirimlərə dəyişin" },
  { icon: Crown, title: "Exclusive tasting notes and expert advice", desc: "Personal recommendations from our sommeliers", titleRu: "Дегустации и советы экспертов", descRu: "Персональные рекомендации от наших сомелье", titleAz: "Eksklüziv dadma qeydləri", descAz: "Sommelyerlərimizdən şəxsi tövsiyələr" },
  { icon: Gift, title: "Quarterly boosts and special offers", desc: "Seasonal promotions and gifts for club members", titleRu: "Сезонные бонусы и подарки", descRu: "Ежеквартальные акции и подарки для членов клуба", titleAz: "Mövsümi bonuslar və hədiyyələr", descAz: "Klub üzvləri üçün rüblük aksiyalar" },
  { icon: Percent, title: "Access to a refined circle of wine collectors", desc: "Exclusive auctions and private events", badge: "−5%", titleRu: "Доступ к кругу коллекционеров", descRu: "Эксклюзивные аукционы и закрытые мероприятия", titleAz: "Kolleksiyaçılar dairəsinə giriş", descAz: "Eksklüziv hərraclar və qapalı tədbirlər" },
];

const GurManiaSubscription = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const [billingPeriod, setBillingPeriod] = useState<"month" | "year">("year");
  const [spotsLeft, setSpotsLeft] = useState(37);
  const [monthlySpend, setMonthlySpend] = useState(200);
  const [showCalc, setShowCalc] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* fake spots counter */
  useEffect(() => {
    const t = setInterval(() => {
      setSpotsLeft((s) => (s > 12 ? s - 1 : s));
    }, 45000);
    return () => clearInterval(t);
  }, []);

  const yearPrice = 99;
  const monthPrice = 12.99;
  const oldYearPrice = 125;
  const visaDiscount = 21;
  const clubDiscount = 7;
  const price = billingPeriod === "year" ? yearPrice : monthPrice;

  const annualSavings = Math.round(monthlySpend * 12 * (clubDiscount / 100));

  const getTitle = (p: typeof privileges[0]) => lang === "RU" ? p.titleRu : lang === "AZ" ? p.titleAz : p.title;
  const getDesc = (p: typeof privileges[0]) => lang === "RU" ? p.descRu : lang === "AZ" ? p.descAz : p.desc;

  /* 3D tilt for card */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
  };

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      {/* ═══ Full-screen gold gradient hero ═══ */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Gold gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(43,52%,40%)] via-[hsl(43,48%,48%)] to-[hsl(40,45%,35%)]" />
        
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Animated gold particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-black/20"
              initial={{ x: `${Math.random() * 100}%`, y: "110%" }}
              animate={{ y: "-10%", opacity: [0, 0.6, 0] }}
              transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 6, ease: "linear" }}
            />
          ))}
        </div>

        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-black/20" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-black/20" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-black/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-black/20" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* ── LEFT: Pricing ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* FIRST 100 badge */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 bg-black/15 backdrop-blur-sm rounded-full px-5 py-2 border border-black/10"
              >
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                <span className="font-display text-[11px] tracking-[0.25em] text-black/80 uppercase">
                  {lang === "RU" ? "Первые 100 клиентов" : lang === "AZ" ? "İlk 100 müştəri" : "First 100 customers"}
                </span>
              </motion.div>

              {/* Title */}
              <div>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-black/90 leading-[1.1]">
                  <Crown className="inline w-12 h-12 mr-3 -mt-2 text-black/70" />
                  {lang === "RU" ? "Вступайте в" : lang === "AZ" ? "Qoşulun" : "Join the"}
                  <br />
                  <span className="text-black font-bold">Gourmet Club</span>
                </h1>
              </div>

              {/* Price */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-7xl md:text-8xl text-black font-bold">{billingPeriod === "year" ? yearPrice : monthPrice}</span>
                  <div className="flex flex-col">
                    <span className="font-body text-2xl text-black/70">₼ / {billingPeriod === "year" ? (lang === "RU" ? "год" : lang === "AZ" ? "il" : "year") : (lang === "RU" ? "мес" : lang === "AZ" ? "ay" : "month")}</span>
                  </div>
                  {billingPeriod === "year" && (
                    <div className="flex items-center gap-2">
                      <span className="font-body text-lg text-black/40 line-through">{oldYearPrice} ₼</span>
                      <span className="bg-black/80 text-[hsl(43,52%,54%)] font-display text-xs tracking-wider px-3 py-1 rounded-md">
                        Visa −{visaDiscount}%
                      </span>
                    </div>
                  )}
                </div>
                <p className="font-body text-sm text-black/60">
                  {billingPeriod === "year" 
                    ? (lang === "RU" ? `Годовая подписка ${oldYearPrice} ₼ · С Visa Premium — ${yearPrice} ₼` : lang === "AZ" ? `İllik abunəlik ${oldYearPrice} ₼ · Visa Premium ilə — ${yearPrice} ₼` : `Annual membership ${oldYearPrice} ₼ · With Visa Premium — ${yearPrice} ₼`)
                    : (lang === "RU" ? "Ежемесячная оплата" : lang === "AZ" ? "Aylıq ödəniş" : "Billed monthly")}
                </p>
              </div>

              {/* Billing toggle */}
              <div className="flex gap-1 bg-black/10 rounded-xl p-1 w-fit">
                {(["month", "year"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setBillingPeriod(p)}
                    className={`font-display text-xs tracking-[0.15em] uppercase px-6 py-2.5 rounded-lg transition-all duration-300 ${
                      billingPeriod === p ? "bg-black text-[hsl(43,52%,54%)] shadow-lg" : "text-black/60 hover:text-black/80"
                    }`}
                  >
                    {p === "month" ? (lang === "RU" ? "Месяц" : lang === "AZ" ? "Ay" : "Month") : (lang === "RU" ? "Год" : lang === "AZ" ? "İl" : "Year")}
                  </button>
                ))}
              </div>

              {/* 3D Membership Card */}
              <div className="pt-4">
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setFlipped(!flipped)}
                  className="relative w-full max-w-[420px] aspect-[1.586/1] cursor-pointer transition-transform duration-200 ease-out"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <AnimatePresence mode="wait">
                    {!flipped ? (
                      <motion.div
                        key="front"
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: -180 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 rounded-2xl overflow-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        {/* Card front */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black via-[hsl(0,0%,12%)] to-black rounded-2xl border border-[hsl(43,52%,54%)]/30 p-6 flex flex-col justify-between">
                          {/* Hologram shimmer */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            animate={{ background: [
                              "linear-gradient(135deg, transparent 40%, hsla(43,52%,54%,0.1) 50%, transparent 60%)",
                              "linear-gradient(135deg, transparent 0%, hsla(43,52%,54%,0.1) 10%, transparent 20%)",
                              "linear-gradient(135deg, transparent 80%, hsla(43,52%,54%,0.1) 90%, transparent 100%)",
                            ] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          
                          <div className="flex justify-between items-start relative z-10">
                            <div>
                              <p className="font-display text-[10px] tracking-[0.3em] text-[hsl(43,52%,54%)]/70 uppercase">Gourmet Club</p>
                              <p className="font-display text-lg text-[hsl(43,52%,54%)] mt-1">GurMania</p>
                            </div>
                            <Crown className="w-8 h-8 text-[hsl(43,52%,54%)]" />
                          </div>

                          {/* EMV chip */}
                          <div className="relative z-10">
                            <svg width="45" height="35" viewBox="0 0 45 35" className="text-[hsl(43,52%,54%)]">
                              <rect x="1" y="1" width="43" height="33" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                              <line x1="1" y1="12" x2="44" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                              <line x1="1" y1="23" x2="44" y2="23" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                              <line x1="15" y1="1" x2="15" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                              <line x1="30" y1="1" x2="30" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                            </svg>
                          </div>

                          <div className="relative z-10 flex justify-between items-end">
                            <div>
                              <p className="font-body text-xs text-[hsl(43,52%,54%)]/50 mb-1">Member since</p>
                              <p className="font-display text-sm tracking-[0.15em] text-[hsl(43,52%,54%)]">2025</p>
                            </div>
                            <div className="text-right">
                              <Crown className="w-5 h-5 text-[hsl(43,52%,54%)] inline mr-1" />
                              <span className="font-display text-xs tracking-wider text-[hsl(43,52%,54%)]">
                                {billingPeriod === "year" ? "PREMIUM" : "STANDARD"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ rotateY: -180 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 rounded-2xl overflow-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        {/* Card back */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black via-[hsl(0,0%,12%)] to-black rounded-2xl border border-[hsl(43,52%,54%)]/30 p-6 flex flex-col justify-between">
                          <div className="w-full h-10 bg-[hsl(43,52%,54%)]/20 -mx-6 -mt-6 px-6 mb-4" style={{ width: "calc(100% + 3rem)" }} />
                          <div className="space-y-2">
                            <p className="font-body text-[10px] text-[hsl(43,52%,54%)]/50 uppercase tracking-widest">Card Number</p>
                            <p className="font-display text-lg tracking-[0.2em] text-[hsl(43,52%,54%)]">•••• •••• •••• 4827</p>
                          </div>
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="font-body text-[10px] text-[hsl(43,52%,54%)]/50">Valid thru</p>
                              <p className="font-display text-sm text-[hsl(43,52%,54%)]">05/2026</p>
                            </div>
                            <p className="font-body text-[10px] text-[hsl(43,52%,54%)]/40">Click to flip</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="font-body text-[10px] text-black/40 mt-2 text-center max-w-[420px]">
                  {lang === "RU" ? "Нажмите на карту, чтобы перевернуть" : lang === "AZ" ? "Kartı çevirmək üçün klikləyin" : "Click card to flip"}
                </p>
              </div>

              {/* Gourmet Club Trial badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-black/15 backdrop-blur-sm rounded-xl px-6 py-4 border border-black/10 max-w-[420px]"
              >
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-black/80" />
                  <div>
                    <p className="font-display text-sm tracking-wider text-black/90">Gourmet Club · Trial</p>
                    <p className="font-body text-xs text-black/50">
                      {lang === "RU" ? "до 20 мая 2026" : lang === "AZ" ? "20 may 2026-dək" : "till May 20, 2026"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-black text-[hsl(43,52%,54%)] font-display text-sm tracking-[0.2em] uppercase px-10 py-4 rounded-xl hover:bg-black/90 transition-colors shadow-xl relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative z-10">
                  {lang === "RU" ? "Присоединиться" : lang === "AZ" ? "Qoşulun" : "Join Now"}
                </span>
              </motion.button>
            </motion.div>

            {/* ── RIGHT: Privileges ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 pt-8 lg:pt-16"
            >
              {privileges.map((priv, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:translate-x-1 ${
                    i === privileges.length - 1
                      ? "bg-green-900/30 border border-green-700/30"
                      : "bg-black/10 border border-black/5 hover:bg-black/15"
                  }`}
                >
                  {/* Number */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display text-xs ${
                    i === privileges.length - 1 ? "bg-green-600 text-white" : "bg-black/20 text-black/70"
                  }`}>
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    i === privileges.length - 1 ? "bg-green-700/40" : "bg-black/10"
                  }`}>
                    <priv.icon className="w-5 h-5 text-black/70" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-black/90 leading-tight">{getTitle(priv)}</p>
                    <p className="font-body text-xs text-black/50 mt-0.5">{getDesc(priv)}</p>
                  </div>

                  {/* Badge */}
                  {priv.badge && (
                    <span className="flex-shrink-0 bg-black/80 text-[hsl(43,52%,54%)] font-display text-xs px-3 py-1 rounded-md">
                      {priv.badge}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ═══ Savings Calculator ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <button
              onClick={() => setShowCalc(!showCalc)}
              className="w-full flex items-center justify-center gap-3 bg-black/10 hover:bg-black/15 rounded-2xl px-8 py-5 border border-black/10 transition-all group"
            >
              <Calculator className="w-5 h-5 text-black/70" />
              <span className="font-display text-sm tracking-[0.15em] text-black/80 uppercase">
                {lang === "RU" ? "Калькулятор экономии" : lang === "AZ" ? "Qənaət kalkulyatoru" : "Savings Calculator"}
              </span>
              <ChevronRight className={`w-4 h-4 text-black/50 transition-transform duration-300 ${showCalc ? "rotate-90" : ""}`} />
            </button>

            <AnimatePresence>
              {showCalc && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-8 mt-3 border border-black/10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <label className="font-display text-xs tracking-[0.15em] text-black/70 uppercase block">
                          {lang === "RU" ? "Ваш средний расход в месяц" : lang === "AZ" ? "Aylıq orta xərciniz" : "Your average monthly spend"}
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min={50}
                            max={1000}
                            step={10}
                            value={monthlySpend}
                            onChange={(e) => setMonthlySpend(Number(e.target.value))}
                            className="w-full h-2 bg-black/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer"
                          />
                          <div className="flex justify-between mt-2">
                            <span className="font-body text-xs text-black/40">50 ₼</span>
                            <span className="font-display text-lg text-black font-bold">{monthlySpend} ₼</span>
                            <span className="font-body text-xs text-black/40">1000 ₼</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center space-y-2">
                        <p className="font-body text-xs text-black/50 uppercase tracking-wider">
                          {lang === "RU" ? "Ваша экономия за год" : lang === "AZ" ? "İllik qənaətiniz" : "Your annual savings"}
                        </p>
                        <motion.p
                          key={annualSavings}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="font-display text-5xl text-black font-bold"
                        >
                          {annualSavings} ₼
                        </motion.p>
                        <p className="font-body text-sm text-black/60">
                          {annualSavings > yearPrice
                            ? (lang === "RU" ? `Подписка окупается ${Math.round(annualSavings / yearPrice)}x раз! 🎉` : lang === "AZ" ? `Abunəlik ${Math.round(annualSavings / yearPrice)}x özünü ödəyir! 🎉` : `Membership pays for itself ${Math.round(annualSavings / yearPrice)}x over! 🎉`)
                            : (lang === "RU" ? "Выгода растёт с каждой покупкой" : lang === "AZ" ? "Hər alışla qənaət artır" : "Savings grow with every purchase")}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Spots counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-black/15 backdrop-blur-sm rounded-full px-6 py-3 border border-black/10">
              <Users className="w-4 h-4 text-black/60" />
              <span className="font-body text-sm text-black/70">
                {lang === "RU" 
                  ? `Осталось ${spotsLeft} мест по специальной цене` 
                  : lang === "AZ" 
                  ? `Xüsusi qiymətlə ${spotsLeft} yer qalıb` 
                  : `${spotsLeft} spots left at this price`}
              </span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Fine print */}
          <p className="font-body text-[11px] text-black/30 text-center mt-6 max-w-lg mx-auto">
            {lang === "RU" 
              ? "Подписка автоматически продлевается. Отменить можно в любой момент в профиле. После отмены доступ сохраняется до конца оплаченного периода."
              : lang === "AZ"
              ? "Abunəlik avtomatik yenilənir. İstənilən vaxt profildən ləğv edə bilərsiniz."
              : "Subscription auto-renews. Cancel anytime from your profile. After cancellation, access remains until end of the billing period."}
          </p>
        </div>
      </section>
    </GurManiaLayout>
  );
};

export default GurManiaSubscription;
