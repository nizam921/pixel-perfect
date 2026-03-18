import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang } from "@/lib/i18n";
import aboutInterior from "@/assets/about-interior.jpg";

const GurManiaContacts = () => {
  const [lang, setLang] = useState<Lang>("EN");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const t = {
    AZ: { title: "Əlaqə", name: "Adınız", email: "E-poçt", message: "Mesajınız", send: "Göndər", address: "Nizami 98, Bakı, Azərbaycan", hours: "Hər gün: 10:00–22:00", info: "Bizimlə əlaqə saxlayın" },
    RU: { title: "Контакты", name: "Ваше имя", email: "Email", message: "Сообщение", send: "Отправить", address: "Низами 98, Баку, Азербайджан", hours: "Ежедневно: 10:00–22:00", info: "Свяжитесь с нами" },
    EN: { title: "Contacts", name: "Your name", email: "Email", message: "Message", send: "Send", address: "Nizami 98, Baku, Azerbaijan", hours: "Daily: 10:00–22:00", info: "Get in touch" },
  }[lang];

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <section className="pt-20 md:pt-24 pb-4 md:pb-6 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="font-display text-2xl md:text-3xl tracking-[0.1em]">{t.title}</h1>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Contact info + image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="rounded-xl overflow-hidden mb-8 aspect-[16/9]">
              <img src={aboutInterior} alt="GurMania" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-display text-xs tracking-[0.15em] text-gold/70 mb-1">
                    {lang === "RU" ? "Адрес" : lang === "AZ" ? "Ünvan" : "Address"}
                  </p>
                  <p className="font-body text-gurmania-foreground/70 text-sm">{t.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-display text-xs tracking-[0.15em] text-gold/70 mb-1">
                    {lang === "RU" ? "Телефон" : lang === "AZ" ? "Telefon" : "Phone"}
                  </p>
                  <p className="font-body text-gurmania-foreground/70 text-sm">+994 12 000 00 00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-display text-xs tracking-[0.15em] text-gold/70 mb-1">Email</p>
                  <p className="font-body text-gold/70 text-sm">info@gurmania.az</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-display text-xs tracking-[0.15em] text-gold/70 mb-1">
                    {lang === "RU" ? "Часы работы" : lang === "AZ" ? "İş saatları" : "Working hours"}
                  </p>
                  <p className="font-body text-gurmania-foreground/70 text-sm">{t.hours}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gurmania-surface border border-gold/10 rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-5 h-5 text-gold/60" />
                <h3 className="font-display text-lg tracking-[0.1em]">{t.info}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-body text-gurmania-text-secondary/50 text-[10px] tracking-wider uppercase mb-1.5 block">{t.name}</label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gurmania/80 border border-gold/15 rounded-lg px-4 py-3 font-body text-sm text-gurmania-foreground placeholder:text-gurmania-foreground/20 focus:border-gold/40 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="font-body text-gurmania-text-secondary/50 text-[10px] tracking-wider uppercase mb-1.5 block">{t.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gurmania/80 border border-gold/15 rounded-lg px-4 py-3 font-body text-sm text-gurmania-foreground placeholder:text-gurmania-foreground/20 focus:border-gold/40 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="font-body text-gurmania-text-secondary/50 text-[10px] tracking-wider uppercase mb-1.5 block">{t.message}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full bg-gurmania/80 border border-gold/15 rounded-lg px-4 py-3 font-body text-sm text-gurmania-foreground placeholder:text-gurmania-foreground/20 focus:border-gold/40 focus:outline-none transition-all resize-none"
                  />
                </div>
                <button className="w-full bg-gold text-gurmania font-display text-xs tracking-[0.3em] py-3.5 rounded-lg hover:bg-gold-glow transition-all duration-500 shadow-[0_4px_20px_rgba(201,168,76,0.3)]">
                  {t.send}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          className="mt-10 rounded-xl overflow-hidden border border-gold/10 aspect-[21/9] bg-gurmania-surface flex items-center justify-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <MapPin className="w-8 h-8 text-gold/30 mx-auto mb-2" />
            <p className="font-body text-gurmania-text-secondary/30 text-xs">
              {lang === "RU" ? "Карта будет здесь" : lang === "AZ" ? "Xəritə burada olacaq" : "Map will be here"}
            </p>
          </div>
        </motion.div>
      </div>
    </GurManiaLayout>
  );
};

export default GurManiaContacts;
