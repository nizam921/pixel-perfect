import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, ShoppingBag, Star, Crown, CreditCard,
  ChevronDown, Printer, Mail, Search,
  MapPin, Phone, Edit3, Save, Check
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

const GurManiaProfile = () => {
  const [lang, setLang] = useState<Lang>("RU");
  const [activeTab, setActiveTab] = useState<TabId>("orders");
  const [expandedOrder, setExpandedOrder] = useState<number | null>(34);
  const [selectedPrefs, setSelectedPrefs] = useState<Set<string>>(new Set(["Red", "Sparkling", "Hard", "Prosciutto"]));

  const togglePref = (item: string) => {
    setSelectedPrefs(prev => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <section className="min-h-screen bg-gurmania pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">

          {/* ═══ Tab Navigation ═══ */}
          <div className="bg-gurmania-surface rounded-2xl p-1.5 flex gap-1 overflow-x-auto scrollbar-hide mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-body text-sm tracking-wide whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gurmania text-gold shadow-lg"
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
                <div className="space-y-6">
                  {/* Avatar & name */}
                  <div className="bg-gurmania-surface rounded-2xl p-8 border border-gold/10">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border-2 border-gold/30 flex items-center justify-center">
                        <User className="w-8 h-8 text-gold" />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-display text-2xl text-gurmania-foreground">Elvin Mammadov</h2>
                        <p className="font-body text-sm text-gurmania-text-secondary mt-1">elvin.mammadov@gmail.com</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Crown className="w-4 h-4 text-gold" />
                          <span className="font-display text-xs tracking-wider text-gold">Gourmet Club Member</span>
                        </div>
                      </div>
                      <button className="text-gurmania-text-secondary hover:text-gold transition-colors">
                        <Edit3 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Info fields */}
                  {[
                    { label: { EN: "Phone", RU: "Телефон", AZ: "Telefon" }, value: "+994 50 262 05 88", icon: Phone },
                    { label: { EN: "Address", RU: "Адрес", AZ: "Ünvan" }, value: "Muğan bağı, 28 May küçəsi, Nəsimi rayonu, Bakı", icon: MapPin },
                  ].map((field, i) => (
                    <div key={i} className="bg-gurmania-surface rounded-2xl px-6 py-5 border border-gold/5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <field.icon className="w-5 h-5 text-gold/70" />
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-xs text-gurmania-text-secondary">{field.label[lang]}</p>
                        <p className="font-body text-sm text-gurmania-foreground mt-0.5">{field.value}</p>
                      </div>
                      <button className="text-gurmania-text-secondary hover:text-gold transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
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
                          className="w-full px-6 py-5 flex items-center gap-4 hover:bg-gurmania-surface-light/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="font-display text-lg text-gurmania-foreground">#{order.id}</span>
                            
                            {/* Status badge */}
                            {order.status === "preparing" && (
                              <span className="font-body text-xs tracking-wide px-3 py-1 rounded-md border border-gold/40 text-gold bg-gold/10">
                                {order.statusLabel[lang]}
                              </span>
                            )}
                            
                            {/* Club badge */}
                            {order.hasClub && (
                              <span className="font-body text-xs tracking-wide px-3 py-1 rounded-md border border-gurmania-foreground/20 text-gurmania-foreground/70">
                                Club -7%
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-display text-lg text-gold">{order.total.toFixed(2)} ₼</span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 text-gurmania-text-secondary" />
                            </motion.div>
                          </div>
                        </button>

                        <p className="px-6 -mt-2 pb-3 font-body text-xs text-gurmania-text-secondary/60">{order.date}</p>

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
                              <div className="px-6 pb-6 space-y-4 border-t border-gold/5 pt-4">
                                {/* Items */}
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between">
                                    <span className="font-body text-sm text-gurmania-foreground">{item.name}</span>
                                    <div className="flex items-center gap-3">
                                      <span className="font-body text-xs text-gurmania-text-secondary">×{item.qty}</span>
                                      <span className="font-display text-sm text-gurmania-foreground">{item.price.toFixed(2)} ₼</span>
                                    </div>
                                  </div>
                                ))}

                                {/* Divider */}
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
                                  <span className="font-body text-sm text-gold">{order.visaDiscount.toFixed(2)} ₼</span>
                                </div>

                                {/* Club discount */}
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <Crown className="w-3.5 h-3.5 text-gold/70" />
                                    <span className="font-body text-sm text-gold/70">
                                      {lang === "RU" ? "Скидка Club" : lang === "AZ" ? "Club endirimi" : "Club Discount"}
                                    </span>
                                  </div>
                                  <span className="font-body text-sm text-gold">{order.clubDiscount.toFixed(2)} ₼</span>
                                </div>

                                {/* Delivery */}
                                <div className="flex justify-between">
                                  <span className="font-body text-sm text-gurmania-text-secondary">
                                    {lang === "RU" ? "Доставка" : lang === "AZ" ? "Çatdırılma" : "Delivery"}
                                  </span>
                                  <span className="font-body text-sm text-gurmania-text-secondary">{order.delivery.toFixed(2)} ₼</span>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gold/5" />

                                {/* Address */}
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                                  <span className="font-body text-xs text-gurmania-text-secondary/60">{order.address}</span>
                                </div>

                                {/* Payment */}
                                <div className="flex items-center gap-2">
                                  <CreditCard className="w-3.5 h-3.5 text-gurmania-text-secondary/40" />
                                  <span className="font-body text-xs text-gurmania-text-secondary/60">{order.payment[lang]}</span>
                                </div>

                                {/* Total + actions */}
                                <div className="flex items-center justify-between pt-2">
                                  <p className="font-display text-xl text-gold">
                                    {lang === "RU" ? "Итого" : lang === "AZ" ? "Cəmi" : "Total"}: {order.total.toFixed(2)} ₼
                                  </p>
                                  <div className="flex gap-2">
                                    {[Printer, Mail, Search].map((Icon, i) => (
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
                      <h3 className="font-display text-sm tracking-wider text-gold/80 uppercase mb-4">{cat.label[lang]}</h3>
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
                  <button className="w-full bg-gold/10 hover:bg-gold/20 border border-gold/20 text-gold font-display text-xs tracking-widest uppercase px-6 py-4 rounded-xl transition-colors">
                    <Save className="w-4 h-4 inline mr-2" />
                    {lang === "RU" ? "Сохранить предпочтения" : lang === "AZ" ? "Üstünlükləri yadda saxla" : "Save Preferences"}
                  </button>
                </div>
              )}

              {/* ── SUBSCRIPTION TAB ── */}
              {activeTab === "subscription" && (
                <div className="space-y-6">
                  {/* Active plan */}
                  <div className="bg-gradient-to-br from-gold/15 via-gold/5 to-transparent rounded-2xl p-8 border border-gold/20 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      animate={{ background: [
                        "radial-gradient(circle at 20% 50%, hsl(43 52% 54% / 0.3), transparent 50%)",
                        "radial-gradient(circle at 80% 50%, hsl(43 52% 54% / 0.3), transparent 50%)",
                        "radial-gradient(circle at 20% 50%, hsl(43 52% 54% / 0.3), transparent 50%)",
                      ]}}
                      transition={{ duration: 6, repeat: Infinity }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <Crown className="w-6 h-6 text-gold" />
                        <h3 className="font-display text-xl text-gold">Gourmet Club</h3>
                        <span className="font-body text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                          {lang === "RU" ? "Активна" : lang === "AZ" ? "Aktiv" : "Active"}
                        </span>
                      </div>
                      <p className="font-body text-sm text-gurmania-text-secondary mb-1">
                        {lang === "RU" ? "Годовая подписка · Premium" : lang === "AZ" ? "İllik abunəlik · Premium" : "Annual subscription · Premium"}
                      </p>
                      <p className="font-body text-xs text-gurmania-text-secondary/60">
                        {lang === "RU" ? "Следующее списание: 20 мая 2026 — 99 ₼" : lang === "AZ" ? "Növbəti ödəniş: 20 may 2026 — 99 ₼" : "Next billing: May 20, 2026 — 99 ₼"}
                      </p>
                      <div className="flex gap-3 mt-6">
                        <a href="/gurmania/subscription" className="font-display text-xs tracking-widest uppercase px-5 py-2.5 rounded-xl bg-gold text-gurmania hover:bg-gold-glow transition-colors">
                          {lang === "RU" ? "Управление" : lang === "AZ" ? "İdarə et" : "Manage"}
                        </a>
                        <button className="font-display text-xs tracking-widest uppercase px-5 py-2.5 rounded-xl border border-gold/20 text-gurmania-text-secondary hover:text-gold hover:border-gold/40 transition-colors">
                          {lang === "RU" ? "Отменить" : lang === "AZ" ? "Ləğv et" : "Cancel"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Savings summary */}
                  <div className="bg-gurmania-surface rounded-2xl p-6 border border-gold/8">
                    <h3 className="font-display text-sm tracking-wider text-gurmania-foreground/70 uppercase mb-4">
                      {lang === "RU" ? "Ваша экономия" : lang === "AZ" ? "Qənaətiniz" : "Your Savings"}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: "47.20 ₼", label: { EN: "This month", RU: "В этом месяце", AZ: "Bu ay" } },
                        { value: "312.50 ₼", label: { EN: "All time", RU: "За всё время", AZ: "Ümumi" } },
                        { value: "23", label: { EN: "Orders with Club", RU: "Заказов с Club", AZ: "Club sifarişləri" } },
                      ].map((stat, i) => (
                        <div key={i} className="text-center">
                          <p className="font-display text-2xl text-gold">{stat.value}</p>
                          <p className="font-body text-xs text-gurmania-text-secondary mt-1">{stat.label[lang]}</p>
                        </div>
                      ))}
                    </div>
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

                  {/* Add card button */}
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
