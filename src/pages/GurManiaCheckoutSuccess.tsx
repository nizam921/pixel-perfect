import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Gift, Printer, ShoppingBag, ArrowRight, Mail, Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang } from "@/lib/i18n";

const GurManiaCheckoutSuccess = () => {
  const [lang, setLang] = useState<Lang>("RU");
  const location = useLocation();
  const state = location.state as { amount?: number; recipientName?: string; recipientEmail?: string; message?: string } | null;

  const amount = state?.amount ?? 100;
  const recipientName = state?.recipientName ?? "—";
  const recipientEmail = state?.recipientEmail ?? "—";
  const orderNumber = `GM-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <div className="min-h-screen bg-gurmania text-gurmania-foreground">
        <section className="relative pt-32 pb-24 overflow-hidden">
          {/* Background radial glow */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{ background: "radial-gradient(circle, hsl(43 52% 54% / 0.08) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>

          <div className="max-w-2xl mx-auto px-4 relative z-10">
            {/* Animated checkmark */}
            <div className="flex justify-center mb-10">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                className="relative"
              >
                {/* Outer ring */}
                <motion.div
                  className="w-28 h-28 rounded-full border-2 border-gold/30 flex items-center justify-center"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                >
                  {/* Inner circle */}
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #8B6914, #C9A84C, #E8D48B)" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                  >
                    <motion.div
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <Check className="w-10 h-10 text-gurmania" strokeWidth={3} />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Sparkle particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-gold"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                      x: Math.cos((i * Math.PI * 2) / 8) * 70,
                      y: Math.sin((i * Math.PI * 2) / 8) * 70,
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{ delay: 1 + i * 0.05, duration: 1.2, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="font-display text-3xl md:text-5xl text-gurmania-foreground mb-3">
                {lang === "RU" ? "Оплата прошла" : lang === "AZ" ? "Ödəniş" : "Payment"}
                <span className="text-gold"> {lang === "RU" ? "успешно!" : lang === "AZ" ? "uğurlu!" : "Successful!"}</span>
              </h1>
              <p className="font-body text-gurmania-text-secondary/60 text-base md:text-lg">
                {lang === "RU"
                  ? "Подарочная карта отправлена получателю на email"
                  : lang === "AZ"
                  ? "Hədiyyə kartı alıcının e-poçtuna göndərildi"
                  : "Gift card has been sent to recipient's email"}
              </p>
            </motion.div>

            {/* Order details card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gurmania-surface border border-gold/10 rounded-2xl overflow-hidden mb-6"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-gold/10 to-transparent border-b border-gold/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-gold" />
                  <span className="font-display text-gold text-sm tracking-[0.15em]">
                    {lang === "RU" ? "ЗАКАЗ" : lang === "AZ" ? "SİFARİŞ" : "ORDER"} #{orderNumber}
                  </span>
                </div>
                <span className="font-body text-gurmania-text-secondary/40 text-xs">
                  {new Date().toLocaleDateString(lang === "RU" ? "ru-RU" : lang === "AZ" ? "az-AZ" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>

              {/* Details grid */}
              <div className="p-6 space-y-0">
                {/* Items */}
                <div className="py-4 border-b border-gold/5">
                  <h4 className="font-display text-xs tracking-[0.2em] text-gold/50 mb-3">
                    {lang === "RU" ? "ТОВАР" : lang === "AZ" ? "MƏHSUL" : "ITEMS"}
                  </h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-body text-gurmania-foreground text-sm">
                        {lang === "RU" ? "Подарочная карта GurMania" : lang === "AZ" ? "GurMania hədiyyə kartı" : "GurMania Gift Card"}
                      </p>
                      <p className="font-body text-gurmania-text-secondary/40 text-xs mt-0.5">× 1</p>
                    </div>
                    <span className="font-display text-gurmania-foreground">{amount} ₼</span>
                  </div>
                </div>

                {/* Delivery */}
                <div className="py-4 border-b border-gold/5">
                  <h4 className="font-display text-xs tracking-[0.2em] text-gold/50 mb-3">
                    {lang === "RU" ? "ДОСТАВКА" : lang === "AZ" ? "ÇATDIRILMA" : "DELIVERY"}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center font-body text-sm">
                      <span className="text-gurmania-text-secondary">{lang === "RU" ? "Получатель" : lang === "AZ" ? "Alıcı" : "Recipient"}</span>
                      <span className="text-gurmania-foreground">{recipientName}</span>
                    </div>
                    <div className="flex justify-between items-center font-body text-sm">
                      <span className="text-gurmania-text-secondary">Email</span>
                      <span className="text-gurmania-foreground">{recipientEmail}</span>
                    </div>
                    <div className="flex justify-between items-center font-body text-sm">
                      <span className="text-gurmania-text-secondary">{lang === "RU" ? "Способ" : lang === "AZ" ? "Üsul" : "Method"}</span>
                      <div className="flex items-center gap-1.5 text-gurmania-foreground">
                        <Mail className="w-3.5 h-3.5 text-gold/50" />
                        <span>Email</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="py-4">
                  <h4 className="font-display text-xs tracking-[0.2em] text-gold/50 mb-3">
                    {lang === "RU" ? "ОПЛАТА" : lang === "AZ" ? "ÖDƏNİŞ" : "PAYMENT"}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center font-body text-sm">
                      <span className="text-gurmania-text-secondary">{lang === "RU" ? "Подарочная карта" : lang === "AZ" ? "Hədiyyə kartı" : "Gift Card"}</span>
                      <span className="text-gurmania-foreground">{amount} ₼</span>
                    </div>
                    <div className="flex justify-between items-center font-body text-sm">
                      <span className="text-gurmania-text-secondary">{lang === "RU" ? "Доставка" : lang === "AZ" ? "Çatdırılma" : "Delivery"}</span>
                      <span className="text-green-400 text-xs">
                        {lang === "RU" ? "Бесплатно" : lang === "AZ" ? "Pulsuz" : "Free"}
                      </span>
                    </div>
                    <div className="border-t border-gold/10 pt-3 mt-3 flex justify-between items-center">
                      <span className="font-display text-gold tracking-wider text-sm">
                        {lang === "RU" ? "ИТОГО" : lang === "AZ" ? "CƏMİ" : "TOTAL"}
                      </span>
                      <span className="font-display text-gold text-2xl">{amount} ₼</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 bg-gurmania-surface border border-gold/15 rounded-xl px-6 py-3.5 font-display text-xs tracking-[0.15em] text-gurmania-foreground/70 hover:border-gold/40 hover:text-gold transition-colors"
              >
                <Printer className="w-4 h-4" />
                {lang === "RU" ? "ПЕЧАТЬ ЧЕКА" : lang === "AZ" ? "ÇEKI ÇAP ET" : "PRINT RECEIPT"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-gurmania-surface border border-gold/15 rounded-xl px-6 py-3.5 font-display text-xs tracking-[0.15em] text-gurmania-foreground/70 hover:border-gold/40 hover:text-gold transition-colors"
              >
                <Download className="w-4 h-4" />
                {lang === "RU" ? "СКАЧАТЬ PDF" : lang === "AZ" ? "PDF YÜKLƏ" : "DOWNLOAD PDF"}
              </motion.button>

              <Link to="/gurmania/catalog">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-glow text-gurmania rounded-xl px-6 py-3.5 font-display text-xs tracking-[0.15em] hover:shadow-lg hover:shadow-gold/25 transition-shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {lang === "RU" ? "ПРОДОЛЖИТЬ ПОКУПКИ" : lang === "AZ" ? "ALIŞVERİŞƏ DAVAM ET" : "CONTINUE SHOPPING"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </GurManiaLayout>
  );
};

export default GurManiaCheckoutSuccess;
