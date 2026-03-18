import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import gurmaniaLogoText from "@/assets/gurmania-logo-text.png";
import { Lang, languages, gmContent } from "@/lib/i18n";

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
  children: React.ReactNode;
}

const GurManiaLayout = ({ lang, setLang, children }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const t = gmContent[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, path: "/gurmania" },
    { label: t.nav.catalog, path: "/gurmania/catalog" },
    { label: t.nav.promos, path: "/gurmania/promos" },
    { label: t.nav.events, path: "/gurmania/events" },
    { label: t.nav.gallery, path: "/gurmania/gallery" },
    { label: t.nav.auction, path: "/gurmania/auction" },
    { label: t.nav.contacts, path: "/gurmania/contacts" },
  ];

  return (
    <div className="min-h-screen bg-gurmania text-gurmania-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-gurmania/90 backdrop-blur-xl border-b border-gold/10 shadow-[0_4px_30px_rgba(201,168,76,0.05)]"
            : "bg-gradient-to-b from-gurmania/80 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link to="/gurmania" className="group">
            <img src={gurmaniaLogoText} alt="GurMania" className="h-8 md:h-10 transition-all duration-500 group-hover:brightness-125" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-body text-sm tracking-[0.15em] transition-colors duration-300 hover:text-gold ${
                  location.pathname === item.path
                    ? "text-gold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-px after:bg-gold"
                    : "text-gurmania-foreground/60"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-1 bg-gurmania-surface/50 rounded-full px-2 py-1">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`font-body text-[10px] tracking-[0.2em] px-2 py-0.5 rounded-full transition-all duration-300 ${
                    lang === l
                      ? "text-gurmania bg-gold"
                      : "text-gurmania-foreground/40 hover:text-gurmania-foreground/70"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button className="text-gurmania-foreground/60 hover:text-gold transition-colors duration-300">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button className="text-gurmania-foreground/60 hover:text-gold transition-colors duration-300">
              <User className="w-5 h-5" />
            </button>
            <button
              className="lg:hidden text-gurmania-foreground/60 hover:text-gold"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-gurmania/95 backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              className="absolute top-6 right-6 text-gold/80 hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Decorative gold line */}
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-10" />

            <nav className="flex flex-col items-center gap-5">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`font-display text-xl tracking-[0.25em] transition-colors duration-300 ${
                      location.pathname === item.path
                        ? "text-gold"
                        : "text-gurmania-foreground/70 hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-10 mb-6" />

            <div className="flex gap-4">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`font-body text-sm tracking-[0.2em] px-3 py-1 rounded-full transition-all duration-300 ${
                    lang === l
                      ? "text-gurmania bg-gold"
                      : "text-gurmania-foreground/40 hover:text-gurmania-foreground/70"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="relative bg-gurmania-surface border-t border-gold/10 overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--gold)) 0.5px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <span className="font-logo text-4xl text-gold">GurMania</span>
              <p className="font-body text-gurmania-text-secondary text-sm leading-relaxed">
                {t.hero.subtitle}
              </p>
            </div>

            <div>
              <h4 className="font-display text-gold/80 text-xs tracking-[0.3em] mb-5 uppercase">
                Navigation
              </h4>
              <nav className="flex flex-col gap-2.5">
                {navItems.slice(0, 5).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="font-body text-gurmania-text-secondary text-sm hover:text-gold transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="font-display text-gold/80 text-xs tracking-[0.3em] mb-5 uppercase">
                Contacts
              </h4>
              <div className="space-y-2.5">
                <p className="font-body text-gurmania-text-secondary text-sm">{t.footer.address}</p>
                <p className="font-body text-gurmania-text-secondary text-sm">+994 50 262 05 88</p>
                <p className="font-body text-gold/70 text-sm hover:text-gold transition-colors cursor-pointer">
                  marketing@gurmania.az
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-display text-gold/80 text-xs tracking-[0.3em] mb-5 uppercase">
                {lang === "RU" ? "Часы работы" : lang === "AZ" ? "İş saatları" : "Hours"}
              </h4>
              <div className="space-y-2.5">
                <p className="font-body text-gurmania-text-secondary text-sm">
                  {lang === "RU" ? "Ежедневно: 10:00 – 22:00" : lang === "AZ" ? "Hər gün: 10:00 – 22:00" : "Daily: 10:00 – 22:00"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gold/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-gurmania-text-secondary text-xs tracking-wide">
              © 2026 GurMania. {t.footer.rights}
            </p>
            <div className="flex items-center gap-6">
              <span className="font-body text-gurmania-text-secondary/50 text-xs hover:text-gold/60 cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="font-body text-gurmania-text-secondary/50 text-xs hover:text-gold/60 cursor-pointer transition-colors">
                Terms
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GurManiaLayout;
