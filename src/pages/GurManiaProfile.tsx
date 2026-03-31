import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, ShoppingBag, Star, Crown, CreditCard,
  ChevronDown, ChevronRight, Printer, Mail, MessageCircle,
  MapPin, Phone, Edit3, Save, Check, Calendar, ChevronUp
} from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang } from "@/lib/i18n";

/* ── Tabs ── */
const tabs = [
  { id: "profile", icon: User, label: { EN: "Profile", RU: "Профиль", AZ: "Profil" } },
  { id: "orders", icon: ShoppingBag, label: { EN: "Orders", RU: "Заказы", AZ: "Sifarişlər" } },
  { id: "preferences", icon: Star, label: { EN: "Preferences", RU: "Предпочтения", AZ: "Üstünlüklər" } },
  { id: "subscription", icon: Crown, label: { EN: "Subscription", RU: "Подписка", AZ: "Abunəlik" } },
  { id: "cards", icon: CreditCard, label: { EN: "Cards", RU: "Карты", AZ: "Kartlar" } },
] as const;

type TabId = typeof tabs[number]["id"];

/* ── Mock orders ── */
const mockOrders = [
  {
    id: 34, status: "preparing", statusLabel: { EN: "Preparing", RU: "Готовится", AZ: "Hazırlanır" },
    date: "30 марта 2026 г. в 19:24", hasClub: true, total: 3.07,
    items: [{ name: "Erdinger, Weißbier, 500ml", qty: 1, price: 0.10 }],
    subtotal: 0.10, visaDiscount: -0.02, clubDiscount: -0.01, delivery: 3.00,
    address: "Muğan bağı, 28 May küçəsi, Nəsimi rayonu, Bakı İnzibati Ərazisi, 1010, Azərbaycan",
    payment: { EN: "Bank card", RU: "Банковская карта", AZ: "Bank kartı" },
  },
  {
    id: 33, status: "delivered", statusLabel: { EN: "Delivered", RU: "Доставлен", AZ: "Çatdırılıb" },
    date: "30 марта 2026 г. в 19:23", hasClub: true, total: 49.90,
    items: [
      { name: "Château Margaux 2015, 750ml", qty: 1, price: 42.90 },
      { name: "Brie de Meaux AOC", qty: 1, price: 7.00 },
    ],
    subtotal: 49.90, visaDiscount: -1.00, clubDiscount: -3.49, delivery: 3.00,
    address: "Muğan bağı, 28 May küçəsi, Nəsimi rayonu, Bakı İnzibati Ərazisi, 1010, Azərbaycan",
    payment: { EN: "Bank card", RU: "Банковская карта", AZ: "Bank kartı" },
  },
  {
    id: 32, status: "delivered", statusLabel: { EN: "Delivered", RU: "Доставлен", AZ: "Çatdırılıb" },
    date: "28 марта 2026 г. в 14:10", hasClub: true, total: 28.50,
    items: [
      { name: "Prosecco Superiore DOCG, 750ml", qty: 1, price: 28.00 },
      { name: "Grissini Torinesi", qty: 1, price: 3.90 },
    ],
    subtotal: 31.90, visaDiscount: -0.64, clubDiscount: -2.23, delivery: 0.00,
    address: "Muğan bağı, 28 May küçəsi, Nəsimi rayonu, Bakı İnzibati Ərazisi, 1010, Azərbaycan",
    payment: { EN: "Bank card", RU: "Банковская карта", AZ: "Bank kartı" },
  },
];

/* ── Mock cards ── */
const mockCards = [
  { id: 1, type: "Visa Premium", last4: "4827", expiry: "05/26", isDefault: true },
  { id: 2, type: "Mastercard", last4: "9152", expiry: "11/27", isDefault: false },
];

/* ── Preference categories ── */
const preferenceCategories = [
  { id: "wine", label: { EN: "Wine", RU: "Вино", AZ: "Şərab" }, items: ["Red", "White", "Rosé", "Sparkling"] },
  { id: "cheese", label: { EN: "Cheese", RU: "Сыр", AZ: "Pendir" }, items: ["Soft", "Hard", "Blue", "Goat"] },
  { id: "meat", label: { EN: "Meat", RU: "Мясо", AZ: "Ət" }, items: ["Prosciutto", "Salami", "Chorizo", "Ham"] },
];

/* ── Subscription privileges ── */
const privileges = [
  { EN: "7% discount with Visa + Club on every purchase", RU: "Скидка 7% с Visa + Club на каждую покупку", AZ: "Hər alışda Visa + Club ilə 7% endirim" },
  { EN: "Tastings and sommelier consultations", RU: "Дегустации и советы сомелье", AZ: "Dadma mərasimləri və sommelyer məsləhətləri" },
  { EN: "Seasonal bonuses and gifts", RU: "Сезонные бонусы и подарки", AZ: "Mövsümi bonuslar və hədiyyələr" },
  { EN: "Access to auctions and private events", RU: "Доступ к аукционам и закрытым мероприятиям", AZ: "Auksionlara və qapalı tədbirlərə giriş" },
];

const GurManiaProfile = () => {
  const [lang, setLang] = useState<Lang>("RU");
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [expandedOrder, setExpandedOrder] = useState<number | null>(34);
  const [selectedPrefs, setSelectedPrefs] = useState<Set<string>>(new Set(["Red", "Sparkling", "Hard", "Prosciutto"]));

  /* Profile form state */
  const [profile, setProfile] = useState({
    firstName: "Nizam",
    lastName: "Babayev",
    phone: "994702362335",
    email: "nizamb236@gmail.com",
    birthDate: "29/03/1998",
    gender: "male",
  });

  const togglePref = (item: string) => {
    setSelectedPrefs(prev => {
      const next = new Set(prev);
      if (next.has(item)) { next.delete(item); } else { next.add(item); }
      return next;
    });
  };

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <section className="min-h-screen bg-gurmania pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">

          {/* ═══ User Header ═══ */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 rounded-full border-2 border-gold/40 bg-gurmania-surface flex items-center justify-center flex-shrink-0">
              <span className="font-display text-lg text-gold tracking-wider">{initials}</span>
            </div>
            <div>
              <h1 className="font-display text-2xl text-gurmania-foreground tracking-wide">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="font-body text-sm text-gurmania-text-secondary mt-0.5">{profile.phone}</p>
              <p className="font-body text-sm mt-0.5">
                <span className="text-gold">401.00 ₼</span>
                <span className="text-gurmania-text-secondary ml-2">
                  {lang === "RU" ? "бонусный баланс" : lang === "AZ" ? "bonus balansı" : "bonus balance"}
                </span>
              </p>
            </div>
          </div>

          {/* ═══ Tab Navigation ═══ */}
          <div className="bg-gurmania-surface rounded-2xl p-1.5 flex gap-1 overflow-x-auto scrollbar-hide mb-10 border border-gold/5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-display text-[13px] tracking-[0.12em] whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gold text-gurmania shadow-lg"
                      : "text-gurmania-text-secondary hover:text-gurmania-foreground/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label[lang]}
                </button>
              );
            })}
          </div>

          {/* ═══ Tab Content ═══ */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >

              {/* ── PROFILE TAB ── */}
              {activeTab === "profile" && (
                <div className="bg-gurmania-surface rounded-2xl border border-gold/8 p-8">
                  <div className="space-y-6">
                    {/* Phone (readonly) */}
                    <div>
                      <label className="font-display text-[11px] tracking-[0.2em] text-gurmania-text-secondary uppercase mb-2 block">
                        {lang === "RU" ? "Телефон" : lang === "AZ" ? "Telefon" : "Phone"}
                      </label>
                      <div className="flex items-center bg-gurmania-surface-light rounded-xl border border-gold/8 px-4 py-3.5">
                        <Phone className="w-4 h-4 text-gold/50 mr-3 flex-shrink-0" />
                        <span className="font-body text-sm text-gurmania-foreground flex-1">{profile.phone}</span>
                        <span className="font-body text-[11px] text-gurmania-text-secondary/50">
                          {lang === "RU" ? "Нельзя изменить" : lang === "AZ" ? "Dəyişdirilə bilməz" : "Cannot change"}
                        </span>
                      </div>
                    </div>

                    {/* Name / Surname row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-display text-[11px] tracking-[0.2em] text-gurmania-text-secondary uppercase mb-2 block">
                          {lang === "RU" ? "Имя" : lang === "AZ" ? "Ad" : "First name"} *
                        </label>
                        <input
                          value={profile.firstName}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                          className="w-full bg-gurmania-surface-light rounded-xl border border-gold/8 px-4 py-3.5 font-body text-sm text-gurmania-foreground focus:outline-none focus:border-gold/30 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-display text-[11px] tracking-[0.2em] text-gurmania-text-secondary uppercase mb-2 block">
                          {lang === "RU" ? "Фамилия" : lang === "AZ" ? "Soyad" : "Last name"}
                        </label>
                        <input
                          value={profile.lastName}
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                          className="w-full bg-gurmania-surface-light rounded-xl border border-gold/8 px-4 py-3.5 font-body text-sm text-gurmania-foreground focus:outline-none focus:border-gold/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-display text-[11px] tracking-[0.2em] text-gurmania-text-secondary uppercase mb-2 block">
                        Email
                      </label>
                      <div className="flex items-center bg-gurmania-surface-light rounded-xl border border-gold/8 px-4 py-3.5">
                        <Mail className="w-4 h-4 text-gold/50 mr-3 flex-shrink-0" />
                        <input
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full bg-transparent font-body text-sm text-gurmania-foreground focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Birth date / Gender row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-display text-[11px] tracking-[0.2em] text-gurmania-text-secondary uppercase mb-2 block">
                          {lang === "RU" ? "Дата рождения" : lang === "AZ" ? "Doğum tarixi" : "Birth date"}
                        </label>
                        <div className="flex items-center bg-gurmania-surface-light rounded-xl border border-gold/8 px-4 py-3.5">
                          <Calendar className="w-4 h-4 text-gold/50 mr-3 flex-shrink-0" />
                          <input
                            value={profile.birthDate}
                            onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                            className="w-full bg-transparent font-body text-sm text-gurmania-foreground focus:outline-none"
                            placeholder="DD/MM/YYYY"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-display text-[11px] tracking-[0.2em] text-gurmania-text-secondary uppercase mb-2 block">
                          {lang === "RU" ? "Пол" : lang === "AZ" ? "Cins" : "Gender"}
                        </label>
                        <div className="relative">
                          <select
                            value={profile.gender}
                            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                            className="w-full appearance-none bg-gurmania-surface-light rounded-xl border border-gold/8 px-4 py-3.5 font-body text-sm text-gurmania-foreground focus:outline-none focus:border-gold/30 transition-colors cursor-pointer"
                          >
                            <option value="male">{lang === "RU" ? "Мужской" : lang === "AZ" ? "Kişi" : "Male"}</option>
                            <option value="female">{lang === "RU" ? "Женский" : lang === "AZ" ? "Qadın" : "Female"}</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gurmania-text-secondary pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Save button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="bg-gold text-gurmania font-display text-[13px] tracking-[0.2em] uppercase px-8 py-3.5 rounded-xl hover:bg-gold-glow transition-colors mt-2"
                    >
                      {lang === "RU" ? "Сохранить" : lang === "AZ" ? "Yadda saxla" : "Save"}
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── ORDERS TAB ── */}
              {activeTab === "orders" && (
                <div className="space-y-4">
                  {mockOrders.map((order) => {
                    const isExpanded = expandedOrder === order.id;
                    return (
                      <div key={order.id} className="bg-gurmania-surface rounded-2xl border border-gold/8 overflow-hidden">
                        {/* Order header */}
                        <button
                          onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                          className="w-full px-6 py-5 flex items-center gap-4 hover:bg-gurmania-surface-light/30 transition-colors"
                        >
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="font-display text-base text-gurmania-foreground">#{order.id}</span>
                              
                              {order.status === "preparing" && (
                                <span className="font-body text-[11px] tracking-wide px-3 py-1 rounded-md border border-gold/40 text-gold">
                                  {order.statusLabel[lang]}
                                </span>
                              )}
                              {order.status === "delivered" && (
                                <span className="font-body text-[11px] tracking-wide px-2 py-0.5 rounded-md bg-gurmania-surface-light text-gurmania-text-secondary">
                                  —
                                </span>
                              )}
                              
                              {order.hasClub && (
                                <span className="font-body text-[11px] tracking-wide px-3 py-1 rounded-md border border-gurmania-foreground/15 text-gurmania-foreground/60">
                                  Club -7%
                                </span>
                              )}
                            </div>
                            <p className="font-body text-[11px] text-gurmania-text-secondary/50 mt-1">{order.date}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-display text-base text-gold">{order.total.toFixed(2)} ₼</span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4 text-gurmania-text-secondary" />
                            </motion.div>
                          </div>
                        </button>

                        {/* Expanded content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 space-y-3 border-t border-gold/5 pt-4">
                                {/* Items */}
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between">
                                    <span className="font-body text-sm text-gurmania-foreground">{item.name}</span>
                                    <div className="flex items-center gap-3">
                                      <span className="font-body text-xs text-gurmania-text-secondary">×{item.qty}</span>
                                      <span className="font-body text-sm text-gurmania-foreground">{item.price.toFixed(2)} ₼</span>
                                    </div>
                                  </div>
                                ))}

                                <div className="h-px bg-gold/5" />

                                {/* Subtotal */}
                                <div className="flex justify-between">
                                  <span className="font-body text-sm text-gurmania-text-secondary">
                                    {lang === "RU" ? "Подытог" : lang === "AZ" ? "Ara cəm" : "Subtotal"}
                                  </span>
                                  <span className="font-body text-sm text-gurmania-text-secondary">{order.subtotal.toFixed(2)} ₼</span>
                                </div>

                                {/* Visa discount */}
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                                    <span className="font-body text-sm text-blue-400">
                                      {lang === "RU" ? "Скидка Visa" : lang === "AZ" ? "Visa endirimi" : "Visa Discount"}
                                    </span>
                                  </div>
                                  <span className="font-body text-sm text-green-400">{order.visaDiscount.toFixed(2)} ₼</span>
                                </div>

                                {/* Club discount */}
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <Crown className="w-3.5 h-3.5 text-gold/70" />
                                    <span className="font-body text-sm text-gold/70">
                                      {lang === "RU" ? "Скидка Club" : lang === "AZ" ? "Club endirimi" : "Club Discount"}
                                    </span>
                                  </div>
                                  <span className="font-body text-sm text-green-400">{order.clubDiscount.toFixed(2)} ₼</span>
                                </div>

                                {/* Delivery */}
                                <div className="flex justify-between">
                                  <span className="font-body text-sm text-gurmania-text-secondary">
                                    {lang === "RU" ? "Доставка" : lang === "AZ" ? "Çatdırılma" : "Delivery"}
                                  </span>
                                  <span className="font-body text-sm text-gurmania-text-secondary">{order.delivery.toFixed(2)} ₼</span>
                                </div>

                                <div className="h-px bg-gold/5" />

                                {/* Address */}
                                <div className="flex items-start gap-2">
                                  <span className="text-sm mt-0.5">📍</span>
                                  <span className="font-body text-xs text-gurmania-text-secondary/50">{order.address}</span>
                                </div>

                                {/* Payment */}
                                <div className="flex items-center gap-2">
                                  <CreditCard className="w-3.5 h-3.5 text-gurmania-text-secondary/40" />
                                  <span className="font-body text-xs text-gurmania-text-secondary/50">{order.payment[lang]}</span>
                                </div>

                                {/* Total + actions */}
                                <div className="flex items-center justify-between pt-2">
                                  <p className="font-display text-xl text-gold">
                                    {lang === "RU" ? "Итого" : lang === "AZ" ? "Cəmi" : "Total"}: {order.total.toFixed(2)} ₼
                                  </p>
                                  <div className="flex gap-2">
                                    {[Printer, Mail, MessageCircle].map((Icon, i) => (
                                      <button key={i} className="w-9 h-9 rounded-lg border border-gold/10 flex items-center justify-center text-gurmania-text-secondary hover:text-gold hover:border-gold/30 transition-colors">
                                        <Icon className="w-4 h-4" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── PREFERENCES TAB ── */}
              {activeTab === "preferences" && (
                <div className="space-y-6">
                  {preferenceCategories.map((cat) => (
                    <div key={cat.id} className="bg-gurmania-surface rounded-2xl p-6 border border-gold/8">
                      <h3 className="font-display text-[11px] tracking-[0.2em] text-gold/70 uppercase mb-4">{cat.label[lang]}</h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item) => {
                          const selected = selectedPrefs.has(item);
                          return (
                            <button
                              key={item}
                              onClick={() => togglePref(item)}
                              className={`font-body text-sm px-4 py-2 rounded-xl border transition-all duration-300 ${
                                selected
                                  ? "border-gold/40 bg-gold/15 text-gold"
                                  : "border-gold/10 text-gurmania-text-secondary hover:border-gold/20 hover:text-gurmania-foreground/70"
                              }`}
                            >
                              {selected && <Check className="w-3 h-3 inline mr-1.5" />}
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-gold/10 hover:bg-gold/20 border border-gold/20 text-gold font-display text-[11px] tracking-[0.2em] uppercase px-6 py-4 rounded-xl transition-colors"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    {lang === "RU" ? "Сохранить предпочтения" : lang === "AZ" ? "Üstünlükləri yadda saxla" : "Save Preferences"}
                  </motion.button>
                </div>
              )}

              {/* ── SUBSCRIPTION TAB ── */}
              {activeTab === "subscription" && (
                <div className="bg-gurmania-surface rounded-2xl border border-gold/8 p-8 md:p-10">
                  {/* Crown icon */}
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 rounded-full border-2 border-gold/30 flex items-center justify-center mb-5">
                      <Crown className="w-7 h-7 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-gold tracking-wide">Gourmet Club</h2>
                    <p className="font-body text-sm text-gurmania-text-secondary mt-2 max-w-md">
                      {lang === "RU" ? "Станьте членом клуба и получите эксклюзивные привилегии" : lang === "AZ" ? "Klubun üzvü olun və eksklüziv imtiyazlar əldə edin" : "Become a club member and get exclusive privileges"}
                    </p>
                  </div>

                  {/* Privileges list */}
                  <div className="space-y-4 mb-8 max-w-lg mx-auto">
                    {privileges.map((priv, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-gold/70" />
                        </div>
                        <span className="font-body text-sm text-gurmania-foreground/80">{priv[lang]}</span>
                      </div>
                    ))}
                  </div>

                  {/* Plan cards */}
                  <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
                    {/* Standard */}
                    <div className="bg-gurmania-surface-light rounded-xl border border-gold/10 p-5 text-center">
                      <p className="font-display text-[10px] tracking-[0.25em] text-gurmania-text-secondary uppercase mb-2">Standard</p>
                      <p className="font-display text-2xl text-gold">1 ₼</p>
                      <p className="font-body text-[11px] text-gurmania-text-secondary mt-1">
                        {lang === "RU" ? "в год" : lang === "AZ" ? "ildə" : "per year"}
                      </p>
                    </div>
                    {/* Visa */}
                    <div className="bg-gurmania-surface-light rounded-xl border border-gold/20 p-5 text-center relative">
                      <span className="absolute -top-2.5 right-3 font-display text-[9px] tracking-[0.2em] uppercase bg-gold text-gurmania px-2.5 py-0.5 rounded-md">
                        Visa Premium
                      </span>
                      <p className="font-display text-[10px] tracking-[0.25em] text-gurmania-text-secondary uppercase mb-2">Visa</p>
                      <p className="font-display text-2xl text-gold">1 ₼</p>
                      <p className="font-body text-[11px] text-gurmania-text-secondary mt-1">
                        {lang === "RU" ? "в год" : lang === "AZ" ? "ildə" : "per year"}
                      </p>
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="max-w-lg mx-auto">
                    <motion.a
                      href="/gurmania/subscription"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="block w-full bg-gold text-gurmania font-display text-[13px] tracking-[0.25em] uppercase text-center py-4 rounded-xl hover:bg-gold-glow transition-colors"
                    >
                      {lang === "RU" ? "Вступить в клуб" : lang === "AZ" ? "Kluba qoşul" : "Join the Club"}
                    </motion.a>
                  </div>
                </div>
              )}

              {/* ── CARDS TAB ── */}
              {activeTab === "cards" && (
                <div className="space-y-4">
                  {mockCards.map((card) => (
                    <div key={card.id} className="bg-gurmania-surface rounded-2xl p-6 border border-gold/8 flex items-center gap-5">
                      <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-6 h-6 text-gold/70" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-body text-sm text-gurmania-foreground">{card.type} •••• {card.last4}</span>
                          {card.isDefault && (
                            <span className="font-body text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/20">
                              {lang === "RU" ? "Основная" : lang === "AZ" ? "Əsas" : "Default"}
                            </span>
                          )}
                        </div>
                        <p className="font-body text-xs text-gurmania-text-secondary mt-0.5">
                          {lang === "RU" ? "Действует до" : lang === "AZ" ? "Etibarlıdır" : "Expires"} {card.expiry}
                        </p>
                      </div>
                      <button className="text-gurmania-text-secondary hover:text-gold transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button className="w-full border-2 border-dashed border-gold/15 hover:border-gold/30 rounded-2xl py-6 flex items-center justify-center gap-2 text-gurmania-text-secondary hover:text-gold transition-colors">
                    <CreditCard className="w-5 h-5" />
                    <span className="font-body text-sm">
                      {lang === "RU" ? "Добавить карту" : lang === "AZ" ? "Kart əlavə et" : "Add Card"}
                    </span>
                  </button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </GurManiaLayout>
  );
};

export default GurManiaProfile;
