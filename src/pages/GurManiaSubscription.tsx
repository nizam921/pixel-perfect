import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Wine, Star, Gift, Shield, Percent, Users, Sparkles, Check, ChevronRight, Calculator } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang } from "@/lib/i18n";

/* ── privileges list ── */
const privileges = [
  { icon: Percent, title: "7% extra discount with Club", desc: "Exclusive additional discount on all products", badge: "−7%", titleRu: "7% дополнительная скидка с Клубом", descRu: "Эксклюзивная дополнительная скидка на все товары", titleAz: "Klubla 7% əlavə endirim", descAz: "Bütün məhsullara eksklüziv əlavə endirim" },
  { icon: Wine, title: "Exclusive wine tastings", desc: "Private tastings with our expert sommeliers", titleRu: "Эксклюзивные дегустации вин", descRu: "Закрытые дегустации с нашими сомелье", titleAz: "Eksklüziv şərab dadma mərasimləri", descAz: "Sommelyerlərimizlə qapalı dadma mərasimləri" },
  { icon: Sparkles, title: "Early access to new arrivals", desc: "Be the first to discover new products", titleRu: "Ранний доступ к новинкам", descRu: "Узнавайте о новых поступлениях первыми", titleAz: "Yeni gələnlərə erkən giriş", descAz: "Yeni məhsulları ilk siz kəşf edin" },
  { icon: Star, title: "Priority event registration", desc: "Guaranteed spots at all GurMania events", titleRu: "Приоритетная регистрация на мероприятия", descRu: "Гарантированные места на всех мероприятиях GurMania", titleAz: "Tədbirlərə prioritet qeydiyyat", descAz: "Bütün GurMania tədbirlərində zəmanətli yerlər" },
  { icon: Crown, title: "Club-exclusive products", desc: "Access to products only available for members", titleRu: "Эксклюзивные товары для членов клуба", descRu: "Доступ к товарам только для участников клуба", titleAz: "Kluba eksklüziv məhsullar", descAz: "Yalnız üzvlər üçün əlçatan məhsullar" },
  { icon: Gift, title: "Auction participation rights", desc: "Bid on rare wines and collectibles", titleRu: "Право участия в аукционах", descRu: "Делайте ставки на редкие вина и коллекционные товары", titleAz: "Auksionda iştirak hüququ", descAz: "Nadir şərablar və kolleksiya əşyalarına təklif verin" },
  { icon: Shield, title: "Club member badge on profile", desc: "Show your exclusive membership status", titleRu: "Значок члена клуба в профиле", descRu: "Покажите свой эксклюзивный статус участника", titleAz: "Profildə klub üzvü nişanı", descAz: "Eksklüziv üzvlük statusunuzu göstərin" },
];

const GurManiaSubscription = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const [billingPeriod, setBillingPeriod] = useState<"month" | "year">("year");
  const [spotsLeft, setSpotsLeft] = useState(37);
  const [monthlySpend, setMonthlySpend] = useState(200);
  const [showCalc, setShowCalc] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  const annualSavings = Math.round(monthlySpend * 12 * (clubDiscount / 100));

  const getTitle = (p: typeof privileges[0]) => lang === "RU" ? p.titleRu : lang === "AZ" ? p.titleAz : p.title;
  const getDesc = (p: typeof privileges[0]) => lang === "RU" ? p.descRu : lang === "AZ" ? p.descAz : p.desc;

  /* 3D tilt */
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
      <section className="min-h-screen bg-gurmania pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* ═══ Hero ═══ */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ── LEFT: Pricing ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-5 py-2 border border-gold/15"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-display text-[11px] tracking-[0.25em] text-gold/80 uppercase">
                  {lang === "RU" ? "Первые 100 клиентов" : lang === "AZ" ? "İlk 100 müştəri" : "First 100 customers"}
                </span>
              </motion.div>

              {/* Title */}
              <div>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-gurmania-foreground leading-[1.1]">
                  <Crown className="inline w-12 h-12 mr-3 -mt-2 text-gold" />
                  {lang === "RU" ? "Вступайте в" : lang === "AZ" ? "Qoşulun" : "Join the"}
                  <br />
                  <span className="text-gold font-bold">Gourmet Club</span>
                </h1>
              </div>

              {/* Price */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-7xl md:text-8xl text-gold font-bold">
                    {billingPeriod === "year" ? yearPrice : monthPrice}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-body text-2xl text-gurmania-text-secondary">
                      ₼ / {billingPeriod === "year" ? (lang === "RU" ? "год" : lang === "AZ" ? "il" : "year") : (lang === "RU" ? "мес" : lang === "AZ" ? "ay" : "month")}
                    </span>
                  </div>
                  {billingPeriod === "year" && (
                    <div className="flex items-center gap-2">
                      <span className="font-body text-lg text-gurmania-text-secondary/40 line-through">{oldYearPrice} ₼</span>
                      <span className="bg-gold text-gurmania font-display text-xs tracking-wider px-3 py-1 rounded-md">
                        Visa −{visaDiscount}%
                      </span>
                    </div>
                  )}
                </div>
                <p className="font-body text-sm text-gurmania-text-secondary">
                  {billingPeriod === "year"
                    ? (lang === "RU" ? `Годовая подписка ${oldYearPrice} ₼ · С Visa Premium — ${yearPrice} ₼` : lang === "AZ" ? `İllik abunəlik ${oldYearPrice} ₼ · Visa Premium ilə — ${yearPrice} ₼` : `Annual membership ${oldYearPrice} ₼ · With Visa Premium — ${yearPrice} ₼`)
                    : (lang === "RU" ? "Ежемесячная оплата" : lang === "AZ" ? "Aylıq ödəniş" : "Billed monthly")}
                </p>
              </div>

              {/* Billing toggle */}
              <div className="flex gap-1 bg-gurmania-surface rounded-xl p-1 w-fit border border-gold/5">
                {(["month", "year"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setBillingPeriod(p)}
                    className={`font-display text-xs tracking-[0.15em] uppercase px-6 py-2.5 rounded-lg transition-all duration-300 ${
                      billingPeriod === p ? "bg-gold text-gurmania shadow-lg" : "text-gurmania-text-secondary hover:text-gurmania-foreground/80"
                    }`}
                  >
                    {p === "month" ? (lang === "RU" ? "Месяц" : lang === "AZ" ? "Ay" : "Month") : (lang === "RU" ? "Год" : lang === "AZ" ? "İl" : "Year")}
                  </button>
                ))}
              </div>

              {/* 3D Card */}
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
                        <div className="absolute inset-0 bg-gradient-to-br from-gurmania-surface via-gurmania-surface-light to-gurmania rounded-2xl border border-gold/20 p-6 flex flex-col justify-between">
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            animate={{ background: [
                              "linear-gradient(135deg, transparent 40%, hsla(43,52%,54%,0.08) 50%, transparent 60%)",
                              "linear-gradient(135deg, transparent 0%, hsla(43,52%,54%,0.08) 10%, transparent 20%)",
                              "linear-gradient(135deg, transparent 80%, hsla(43,52%,54%,0.08) 90%, transparent 100%)",
                            ] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <div className="flex justify-between items-start relative z-10">
                            <div>
                              <p className="font-display text-[10px] tracking-[0.3em] text-gold/50 uppercase">Gourmet Club</p>
                              <p className="font-display text-lg text-gold mt-1">GurMania</p>
                            </div>
                            <Crown className="w-8 h-8 text-gold" />
                          </div>
                          <div className="relative z-10">
                            <svg width="45" height="35" viewBox="0 0 45 35" className="text-gold">
                              <rect x="1" y="1" width="43" height="33" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                              <line x1="1" y1="12" x2="44" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                              <line x1="1" y1="23" x2="44" y2="23" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                              <line x1="15" y1="1" x2="15" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                              <line x1="30" y1="1" x2="30" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                            </svg>
                          </div>
                          <div className="relative z-10 flex justify-between items-end">
                            <div>
                              <p className="font-body text-xs text-gold/40 mb-1">Member since</p>
                              <p className="font-display text-sm tracking-[0.15em] text-gold">2025</p>
                            </div>
                            <div className="text-right">
                              <Crown className="w-5 h-5 text-gold inline mr-1" />
                              <span className="font-display text-xs tracking-wider text-gold">
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
                        <div className="absolute inset-0 bg-gradient-to-br from-gurmania-surface via-gurmania-surface-light to-gurmania rounded-2xl border border-gold/20 p-6 flex flex-col justify-between">
                          <div className="w-full h-10 bg-gold/10 -mx-6 -mt-6 px-6 mb-4" style={{ width: "calc(100% + 3rem)" }} />
                          <div className="space-y-2">
                            <p className="font-body text-[10px] text-gold/40 uppercase tracking-widest">Card Number</p>
                            <p className="font-display text-lg tracking-[0.2em] text-gold">•••• •••• •••• 4827</p>
                          </div>
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="font-body text-[10px] text-gold/40">Valid thru</p>
                              <p className="font-display text-sm text-gold">05/2026</p>
                            </div>
                            <p className="font-body text-[10px] text-gold/30">Click to flip</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="font-body text-[10px] text-gurmania-text-secondary/40 mt-2 text-center max-w-[420px]">
                  {lang === "RU" ? "Нажмите на карту, чтобы перевернуть" : lang === "AZ" ? "Kartı çevirmək üçün klikləyin" : "Click card to flip"}
                </p>
              </div>

              {/* Trial badge */}
              <div className="bg-gurmania-surface rounded-xl px-6 py-4 border border-gold/10 max-w-[420px]">
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-gold" />
                  <div>
                    <p className="font-display text-sm tracking-wider text-gurmania-foreground">Gourmet Club · Trial</p>
                    <p className="font-body text-xs text-gurmania-text-secondary">
                      {lang === "RU" ? "до 20 мая 2026" : lang === "AZ" ? "20 may 2026-dək" : "till May 20, 2026"}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gold text-gurmania font-display text-sm tracking-[0.2em] uppercase px-10 py-4 rounded-xl hover:bg-gold-glow transition-colors shadow-xl relative overflow-hidden group"
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
              className="space-y-3 pt-8 lg:pt-16"
            >
              {privileges.map((priv, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 bg-gurmania-surface rounded-xl px-5 py-4 border border-gold/8 hover:border-gold/20 transition-all duration-300 hover:translate-x-1 group"
                >
                  {/* Number */}
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center font-display text-[11px] text-gold/70">
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold/8 group-hover:bg-gold/15 flex items-center justify-center transition-colors">
                    <priv.icon className="w-5 h-5 text-gold/70" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-gurmania-foreground leading-tight">{getTitle(priv)}</p>
                    <p className="font-body text-xs text-gurmania-text-secondary mt-0.5">{getDesc(priv)}</p>
                  </div>

                  {/* Badge */}
                  {priv.badge && (
                    <span className="flex-shrink-0 bg-gold text-gurmania font-display text-xs px-3 py-1 rounded-md">
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
              className="w-full flex items-center justify-center gap-3 bg-gurmania-surface hover:bg-gurmania-surface-light rounded-2xl px-8 py-5 border border-gold/10 transition-all group"
            >
              <Calculator className="w-5 h-5 text-gold/60" />
              <span className="font-display text-sm tracking-[0.15em] text-gurmania-foreground/80 uppercase">
                {lang === "RU" ? "Калькулятор экономии" : lang === "AZ" ? "Qənaət kalkulyatoru" : "Savings Calculator"}
              </span>
              <ChevronRight className={`w-4 h-4 text-gurmania-text-secondary transition-transform duration-300 ${showCalc ? "rotate-90" : ""}`} />
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
                  <div className="bg-gurmania-surface rounded-2xl p-8 mt-3 border border-gold/10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <label className="font-display text-xs tracking-[0.15em] text-gurmania-text-secondary uppercase block">
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
                            className="w-full h-2 bg-gurmania-surface-light rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer"
                          />
                          <div className="flex justify-between mt-2">
                            <span className="font-body text-xs text-gurmania-text-secondary/40">50 ₼</span>
                            <span className="font-display text-lg text-gold font-bold">{monthlySpend} ₼</span>
                            <span className="font-body text-xs text-gurmania-text-secondary/40">1000 ₼</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center space-y-2">
                        <p className="font-body text-xs text-gurmania-text-secondary uppercase tracking-wider">
                          {lang === "RU" ? "Ваша экономия за год" : lang === "AZ" ? "İllik qənaətiniz" : "Your annual savings"}
                        </p>
                        <motion.p
                          key={annualSavings}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="font-display text-5xl text-gold font-bold"
                        >
                          {annualSavings} ₼
                        </motion.p>
                        <p className="font-body text-sm text-gurmania-text-secondary">
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
            <div className="inline-flex items-center gap-3 bg-gurmania-surface rounded-full px-6 py-3 border border-gold/10">
              <Users className="w-4 h-4 text-gurmania-text-secondary" />
              <span className="font-body text-sm text-gurmania-text-secondary">
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
          <p className="font-body text-[11px] text-gurmania-text-secondary/30 text-center mt-6 max-w-lg mx-auto">
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
