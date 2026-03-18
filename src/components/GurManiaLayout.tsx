import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import gurmaniaLogo from "@/assets/gurmania-logo-dark.png";
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

  // Track scroll
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => setScrolled(window.scrollY > 50), { passive: true });
  }

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-gurmania/80 backdrop-blur-md border-b border-gold/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link to="/gurmania">
            <img src={gurmaniaLogo} alt="GurMania" className="h-10 md:h-12 rounded-sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-sm tracking-[0.15em] transition-colors duration-300 hover:text-gold ${
                  location.pathname === item.path ? "text-gold" : "text-gurmania-foreground/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`font-body text-xs tracking-[0.2em] transition-all duration-300 ${
                    lang === l ? "text-gold" : "text-gurmania-foreground/40 hover:text-gurmania-foreground/70"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button className="text-gurmania-foreground/70 hover:text-gold transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button className="text-gurmania-foreground/70 hover:text-gold transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button
              className="lg:hidden text-gurmania-foreground/70 hover:text-gold"
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
            className="fixed inset-0 z-[100] bg-gurmania flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-6 right-6 text-gold"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-2xl tracking-[0.2em] text-gurmania-foreground hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex gap-4 mt-12">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`font-body text-sm tracking-[0.2em] ${lang === l ? "text-gold" : "text-gurmania-foreground/40"}`}
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
      <footer className="bg-gurmania-surface border-t border-gold/10 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <img src={gurmaniaLogo} alt="GurMania" className="h-12 mb-4 rounded-sm" />
              <p className="font-body text-gurmania-text-secondary text-sm">{t.hero.subtitle}</p>
            </div>
            <div>
              <h4 className="font-display text-gold text-sm tracking-[0.2em] mb-4">NAVIGATION</h4>
              <nav className="flex flex-col gap-2">
                {navItems.slice(0, 5).map((item) => (
                  <Link key={item.path} to={item.path} className="font-body text-gurmania-text-secondary text-sm hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-display text-gold text-sm tracking-[0.2em] mb-4">CONTACTS</h4>
              <p className="font-body text-gurmania-text-secondary text-sm">{t.footer.address}</p>
              <p className="font-body text-gurmania-text-secondary text-sm mt-1">+994 12 000 00 00</p>
              <p className="font-body text-gurmania-text-secondary text-sm mt-1">info@gurmania.az</p>
            </div>
          </div>
          <div className="border-t border-gold/10 mt-12 pt-8 text-center">
            <p className="font-body text-gurmania-text-secondary text-xs">© 2026 GurMania. {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GurManiaLayout;
