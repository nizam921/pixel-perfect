import { useState } from "react";
import { motion } from "framer-motion";
import { Gavel, Clock, Wine } from "lucide-react";
import GurManiaLayout from "@/components/GurManiaLayout";
import { Lang } from "@/lib/i18n";
import productWineRed from "@/assets/product-wine-red.jpg";
import productSparkling from "@/assets/product-sparkling.jpg";
import productRose from "@/assets/product-rose.jpg";

const auctionItems = [
  { id: "a1", name: "Château Pétrus 2005", region: "Pomerol, France", currentBid: 2450, image: productWineRed, bids: 12, endsIn: "2d 14h" },
  { id: "a2", name: "Dom Pérignon Vintage 2008", region: "Champagne, France", currentBid: 890, image: productSparkling, bids: 8, endsIn: "1d 6h" },
  { id: "a3", name: "Opus One 2018", region: "Napa Valley, USA", currentBid: 680, image: productWineRed, bids: 15, endsIn: "3d 2h" },
  { id: "a4", name: "Whispering Angel Magnum 2022", region: "Provence, France", currentBid: 120, image: productRose, bids: 5, endsIn: "5d 8h" },
];

const GurManiaAuction = () => {
  const [lang, setLang] = useState<Lang>("EN");

  const t = {
    AZ: { title: "Şərab Auksionu", subtitle: "Nadir şərablar üçün təklif verin", bid: "Təklif ver", current: "Cari təklif", bids: "təklif", ends: "Bitir" },
    RU: { title: "Винный Аукцион", subtitle: "Делайте ставки на редкие вина", bid: "Сделать ставку", current: "Текущая ставка", bids: "ставок", ends: "Завершение" },
    EN: { title: "Wine Auction", subtitle: "Bid on rare and exclusive wines", bid: "Place Bid", current: "Current bid", bids: "bids", ends: "Ends in" },
  }[lang];

  return (
    <GurManiaLayout lang={lang} setLang={setLang}>
      <section className="pt-20 md:pt-24 pb-4 md:pb-6 bg-gurmania-surface">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <Gavel className="w-8 h-8 text-gold/60 mx-auto mb-3" />
          <h1 className="font-display text-2xl md:text-3xl tracking-[0.1em]">{t.title}</h1>
          <p className="font-body text-gurmania-text-secondary/50 text-sm mt-2">{t.subtitle}</p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {auctionItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="bg-gradient-to-r from-gurmania-surface to-gurmania border border-gold/10 rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex">
                <div className="w-32 md:w-40 flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex-1 p-4 md:p-5 flex flex-col">
                  <h3 className="font-display text-sm md:text-base tracking-wide mb-1 group-hover:text-gold transition-colors">{item.name}</h3>
                  <p className="font-body text-gurmania-text-secondary/40 text-[11px] mb-3">{item.region}</p>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-gold text-xl md:text-2xl">{item.currentBid} ₼</span>
                    <span className="font-body text-gurmania-text-secondary/40 text-[10px]">{item.bids} {t.bids}</span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-4">
                    <Clock className="w-3 h-3 text-wine-red" />
                    <span className="font-body text-wine-red text-[11px]">{t.ends}: {item.endsIn}</span>
                  </div>

                  <button className="self-start border border-gold/25 text-gold/80 font-display text-[10px] tracking-[0.2em] px-5 py-1.5 rounded-lg hover:bg-gold/10 hover:text-gold transition-all">
                    {t.bid}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info section */}
        <motion.div
          className="mt-12 bg-gurmania-surface border border-gold/8 rounded-xl p-6 md:p-8 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Wine className="w-8 h-8 text-gold/40 mx-auto mb-4" />
          <h3 className="font-display text-base tracking-[0.1em] mb-3">
            {lang === "RU" ? "Как участвовать?" : lang === "AZ" ? "Necə iştirak etmək olar?" : "How to participate?"}
          </h3>
          <p className="font-body text-gurmania-text-secondary/50 text-sm leading-relaxed">
            {lang === "RU"
              ? "Зарегистрируйтесь в Клубе Гурманов для участия в аукционах. Каждый лот — это уникальное вино из нашей коллекции. Торги проходят онлайн, доставка по Баку бесплатна."
              : lang === "AZ"
              ? "Auksionda iştirak etmək üçün Gurmanlar Klubuna qeydiyyatdan keçin. Hər lot kolleksiyamızdan unikal şərabdır."
              : "Register with the Gourmet Club to participate in auctions. Each lot is a unique wine from our collection. Bidding takes place online with free delivery in Baku."}
          </p>
        </motion.div>
      </div>
    </GurManiaLayout>
  );
};

export default GurManiaAuction;
