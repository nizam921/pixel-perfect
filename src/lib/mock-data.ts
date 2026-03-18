import productWineRed from "@/assets/product-wine-red.jpg";
import productWineRed2 from "@/assets/product-wine-red-2.jpg";
import productWineRed3 from "@/assets/product-wine-red-3.jpg";
import productWineRed4 from "@/assets/product-wine-red-4.jpg";
import productWineRed5 from "@/assets/product-wine-red-5.jpg";
import productWineWhite from "@/assets/product-wine-white.jpg";
import productWineWhite2 from "@/assets/product-wine-white-2.jpg";
import productWineWhite3 from "@/assets/product-wine-white-3.jpg";
import productSparkling from "@/assets/product-sparkling.jpg";
import productSparkling2 from "@/assets/product-sparkling-2.jpg";
import productCheese from "@/assets/product-cheese.jpg";
import productCheese2 from "@/assets/product-cheese-2.jpg";
import productCheese3 from "@/assets/product-cheese-3.jpg";
import productCheese4 from "@/assets/product-cheese-4.jpg";
import productCheese5 from "@/assets/product-cheese-5.jpg";
import productCheese6 from "@/assets/product-cheese-6.jpg";
import productCheese7 from "@/assets/product-cheese-7.jpg";
import productMeat from "@/assets/product-meat.jpg";
import productMeat2 from "@/assets/product-meat-2.jpg";
import productMeat3 from "@/assets/product-meat-3.jpg";
import productMeat4 from "@/assets/product-meat-4.jpg";
import productDelicacy from "@/assets/product-delicacy.jpg";
import productRose from "@/assets/product-rose.jpg";
import productRose2 from "@/assets/product-rose-2.jpg";
import eventImg1 from "@/assets/event-1.jpg";
import eventImg2 from "@/assets/event-2.jpg";
import eventImg3 from "@/assets/event-3.jpg";

export interface Product {
  id: string;
  name: string;
  region: string;
  country: string;
  year: number;
  price: number;
  oldPrice?: number;
  clubPrice: number;
  category: "wine" | "cheese" | "meat" | "delicacy" | "sparkling";
  type?: "red" | "white" | "rose" | "orange";
  grape?: string;
  volume?: string;
  description: string;
  image: string;
  rating: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
}

export interface Promo {
  id: string;
  productId: string;
  discount: number;
  endsAt: string;
}

export const mockProducts: Product[] = [
  { id: "1", name: "Château Margaux 2015", region: "Bordeaux", country: "France", year: 2015, price: 89.99, clubPrice: 85.49, category: "wine", type: "red", grape: "Cabernet Sauvignon", volume: "750ml", description: "Элегантное бордо с нотами чёрной смородины, кедра и фиалки. Долгое шелковистое послевкусие.", image: productWineRed, rating: 4.8 },
  { id: "2", name: "Barolo Riserva 2016", region: "Piedmont", country: "Italy", year: 2016, price: 120.00, oldPrice: 145.00, clubPrice: 114.00, category: "wine", type: "red", grape: "Nebbiolo", volume: "750ml", description: "Мощное вино с ароматом роз, дёгтя и трюфеля. Комплексная структура с бархатными танинами.", image: productWineRed2, rating: 4.9 },
  { id: "3", name: "Sancerre Blanc 2022", region: "Loire Valley", country: "France", year: 2022, price: 34.50, clubPrice: 32.78, category: "wine", type: "white", grape: "Sauvignon Blanc", volume: "750ml", description: "Свежее и минеральное белое вино с цитрусовыми и травяными нотами.", image: productWineWhite, rating: 4.5 },
  { id: "4", name: "Prosecco Superiore DOCG", region: "Veneto", country: "Italy", year: 2023, price: 28.00, clubPrice: 26.60, category: "sparkling", grape: "Glera", volume: "750ml", description: "Игристое вино с нотами зелёного яблока, акации и свежей выпечки.", image: productSparkling, rating: 4.3 },
  { id: "5", name: "Comté Aged 18 months", region: "Jura", country: "France", year: 2024, price: 24.90, clubPrice: 23.66, category: "cheese", description: "Выдержанный сыр Конте с насыщенным ореховым вкусом и кристаллической текстурой.", image: productCheese2, rating: 4.7 },
  { id: "6", name: "Ibérico Ham de Bellota", region: "Extremadura", country: "Spain", year: 2024, price: 65.00, clubPrice: 61.75, category: "meat", description: "Хамон Иберико де Бельота — 36 месяцев выдержки, нежнейший мраморный вкус.", image: productMeat2, rating: 4.9 },
  { id: "7", name: "Rioja Gran Reserva 2014", region: "Rioja", country: "Spain", year: 2014, price: 55.00, oldPrice: 68.00, clubPrice: 52.25, category: "wine", type: "red", grape: "Tempranillo", volume: "750ml", description: "Классическая Риоха с ванильными и табачными оттенками, зрелые танины.", image: productWineRed3, rating: 4.6 },
  { id: "8", name: "Côtes de Provence Rosé 2023", region: "Provence", country: "France", year: 2023, price: 22.50, clubPrice: 21.38, category: "wine", type: "rose", grape: "Grenache, Cinsault", volume: "750ml", description: "Лёгкое провансальское розе с ароматами клубники и белого персика.", image: productRose, rating: 4.4 },
  { id: "9", name: "Parmigiano Reggiano 24m", region: "Emilia-Romagna", country: "Italy", year: 2024, price: 32.00, clubPrice: 30.40, category: "cheese", description: "Подлинный Пармиджано Реджано 24-месячной выдержки с насыщенным умами.", image: productCheese3, rating: 4.8 },
  { id: "10", name: "Châteauneuf-du-Pape 2018", region: "Rhône Valley", country: "France", year: 2018, price: 78.00, oldPrice: 92.00, clubPrice: 74.10, category: "wine", type: "red", grape: "Grenache, Syrah", volume: "750ml", description: "Полнотелое вино с нотами спелых ягод, специй и гарриги.", image: productWineRed, rating: 4.7 },
  { id: "11", name: "Gewürztraminer Alsace 2021", region: "Alsace", country: "France", year: 2021, price: 29.00, clubPrice: 27.55, category: "wine", type: "white", grape: "Gewürztraminer", volume: "750ml", description: "Ароматное белое с нотами личи, розы и имбиря.", image: productWineWhite3, rating: 4.5 },
  { id: "12", name: "Truffle Salami", region: "Umbria", country: "Italy", year: 2024, price: 18.50, clubPrice: 17.58, category: "delicacy", description: "Итальянское салями с чёрным трюфелем — идеально к красному вину.", image: productDelicacy, rating: 4.6 },
  { id: "13", name: "Brunello di Montalcino 2017", region: "Tuscany", country: "Italy", year: 2017, price: 95.00, clubPrice: 90.25, category: "wine", type: "red", grape: "Sangiovese", volume: "750ml", description: "Интенсивное тосканское вино с нотами вишни, кожи и пряностей.", image: productWineRed2, rating: 4.8 },
  { id: "14", name: "Chablis Premier Cru 2020", region: "Burgundy", country: "France", year: 2020, price: 48.00, oldPrice: 56.00, clubPrice: 45.60, category: "wine", type: "white", grape: "Chardonnay", volume: "750ml", description: "Минеральное шабли с нотами цитрусов, белых цветов и кремня.", image: productWineWhite2, rating: 4.7 },
  { id: "15", name: "Moët & Chandon Impérial", region: "Champagne", country: "France", year: 2023, price: 72.00, clubPrice: 68.40, category: "sparkling", grape: "Pinot Noir, Chardonnay", volume: "750ml", description: "Классическое шампанское с нотами груши, цитрусов и бриоши.", image: productSparkling2, rating: 4.6 },
  { id: "16", name: "Maasdam 45%", region: "Holland", country: "Netherlands", year: 2024, price: 5.70, clubPrice: 5.42, category: "cheese", description: "Голландский сыр Маасдам с характерными отверстиями и ореховым вкусом.", image: productCheese7, rating: 4.3 },
  { id: "17", name: "Turkey Ham With Spices", region: "Europe", country: "Italy", year: 2024, price: 5.00, clubPrice: 4.75, category: "meat", description: "Нежная ветчина из индейки с ароматными специями.", image: productMeat3, rating: 4.2 },
  { id: "18", name: "Saperavi Reserve 2019", region: "Kakheti", country: "Georgia", year: 2019, price: 42.00, clubPrice: 39.90, category: "wine", type: "red", grape: "Saperavi", volume: "750ml", description: "Грузинское вино глубокого цвета с нотами чёрной сливы и шоколада.", image: productWineRed4, rating: 4.5 },
  { id: "19", name: "Malbec Reserva 2020", region: "Mendoza", country: "Argentina", year: 2020, price: 35.00, oldPrice: 42.00, clubPrice: 33.25, category: "wine", type: "red", grape: "Malbec", volume: "750ml", description: "Аргентинский Мальбек с нотами фиалки, сливы и шоколада.", image: productWineRed5, rating: 4.4 },
  { id: "20", name: "Grana Padano Sole Luna", region: "Lombardy", country: "Italy", year: 2024, price: 187.00, clubPrice: 177.65, category: "cheese", volume: "1kg", description: "Премиальный итальянский Грана Падано 30-месячной выдержки.", image: productCheese4, rating: 4.9 },
  { id: "21", name: "Smoked Suluguni", region: "Caucasus", country: "Georgia", year: 2024, price: 3.20, clubPrice: 3.04, category: "cheese", description: "Копчёный сулугуни с характерным дымным ароматом.", image: productCheese5, rating: 4.4 },
  { id: "22", name: "Danish Blue Cheese", region: "Denmark", country: "Denmark", year: 2024, price: 6.60, clubPrice: 6.27, category: "cheese", description: "Датский голубой сыр с насыщенным острым вкусом.", image: productCheese6, rating: 4.5 },
  { id: "23", name: "Pork Dry Cured Carbonade", region: "Europe", country: "Italy", year: 2024, price: 5.00, clubPrice: 4.75, category: "meat", description: "Сухая вяленая свинина карбонад — нежная текстура.", image: productMeat4, rating: 4.3 },
  { id: "24", name: "Whispering Angel Rosé 2023", region: "Provence", country: "France", year: 2023, price: 26.00, clubPrice: 24.70, category: "wine", type: "rose", grape: "Grenache, Vermentino", volume: "750ml", description: "Культовое розе Прованса с нотами персика и цитрусов.", image: productRose2, rating: 4.6 },
];

export const mockEvents: Event[] = [
  { id: "1", title: "Wine & Cheese Evening", date: "2026-04-12", time: "19:00", description: "Дегустация 6 сортов вина в паре с артизанальными сырами", image: eventImg1 },
  { id: "2", title: "Bordeaux Masterclass", date: "2026-04-25", time: "18:00", description: "Погружение в мир бордоских вин с сомелье Марией Герц", image: eventImg2 },
  { id: "3", title: "Italian Night", date: "2026-05-08", time: "20:00", description: "Вечер итальянских вин, сыров и хамона под живую музыку", image: eventImg3 },
];

export const mockPromos: Promo[] = [
  { id: "1", productId: "2", discount: 17, endsAt: "2026-04-01" },
  { id: "2", productId: "7", discount: 19, endsAt: "2026-04-15" },
  { id: "3", productId: "10", discount: 15, endsAt: "2026-04-10" },
  { id: "4", productId: "14", discount: 14, endsAt: "2026-04-20" },
  { id: "5", productId: "19", discount: 20, endsAt: "2026-04-30" },
];

export const countries = ["France", "Italy", "Spain", "Georgia", "Argentina", "Netherlands", "Denmark"];
export const categories = ["wine", "sparkling", "cheese", "meat", "delicacy"] as const;
export const wineTypes = ["red", "white", "rose", "orange"] as const;
