import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Product, mockPromos, formatPriceUnit, getPerKgPrice } from "@/lib/mock-data";

interface Props {
  product: Product;
  lang: string;
}

const ProductCard = ({ product, lang }: Props) => {
  const promo = mockPromos.find((p) => p.productId === product.id);
  const discountPercent = promo
    ? promo.discount
    : product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <Link
      to={`/gurmania/product/${product.id}`}
      className="bg-gradient-to-b from-gurmania-surface to-gurmania border border-gold/8 rounded-lg overflow-hidden group block hover:border-gold/20 transition-all duration-500"
    >
      <div className="aspect-square overflow-hidden relative">
        {product.oldPrice && (
          <>
            <span className="absolute top-2 left-2 bg-wine-red text-gurmania-foreground font-display text-[11px] tracking-wider px-2.5 py-0.5 rounded-full z-10">
              SALE
            </span>
            <span className="absolute top-2 right-2 bg-wine-red text-gurmania-foreground font-display text-[11px] tracking-wider px-2.5 py-0.5 rounded-full z-10">
              -{discountPercent}%
            </span>
          </>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-3 h-[100px] flex flex-col justify-between">
        <div>
          <h4 className="font-display text-sm tracking-wide mb-1 group-hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h4>
          <p className="font-body text-gurmania-text-secondary/40 text-[11px] mb-2">
            {product.region}
            {product.year && product.year < 2024 ? ` · ${product.year}` : ""}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-gold text-base">
                {product.price} ₼
              </span>
              {formatPriceUnit(product, lang) && (
                <span className="font-body text-gurmania-text-secondary/40 text-[10px]">
                  {formatPriceUnit(product, lang)}
                </span>
              )}
              {product.oldPrice && (
                <span className="font-body text-gurmania-text-secondary/30 text-[11px] line-through">
                  {product.oldPrice} ₼
                </span>
              )}
            </div>
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 text-gold fill-gold" />
              <span className="font-body text-gurmania-text-secondary/50 text-[10px]">
                {product.rating}
              </span>
            </div>
          </div>
          {getPerKgPrice(product) && (
            <p className="font-body text-gurmania-text-secondary/30 text-[10px] mt-0.5">
              {getPerKgPrice(product)} ₼ {lang === "RU" ? "/ кг" : "/ kg"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
