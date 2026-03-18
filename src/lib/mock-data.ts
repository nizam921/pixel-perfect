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

// Using placeholder images from the generated assets
export const mockProducts: Product[] = [
  { id: "1", name: "Château Margaux 2015", region: "Bordeaux", country: "France", year: 2015, price: 89.99, clubPrice: 85.49, category: "wine", type: "red", grape: "Cabernet Sauvignon", volume: "750ml", description: "Элегантное бордо с нотами чёрной смородины, кедра и фиалки. Долгое шелковистое послевкусие.", image: "/placeholder.svg", rating: 4.8 },
  { id: "2", name: "Barolo Riserva 2016", region: "Piedmont", country: "Italy", year: 2016, price: 120.00, oldPrice: 145.00, clubPrice: 114.00, category: "wine", type: "red", grape: "Nebbiolo", volume: "750ml", description: "Мощное вино с ароматом роз, дёгтя и трюфеля. Комплексная структура с бархатными танинами.", image: "/placeholder.svg", rating: 4.9 },
  { id: "3", name: "Sancerre Blanc 2022", region: "Loire Valley", country: "France", year: 2022, price: 34.50, clubPrice: 32.78, category: "wine", type: "white", grape: "Sauvignon Blanc", volume: "750ml", description: "Свежее и минеральное белое вино с цитрусовыми и травяными нотами.", image: "/placeholder.svg", rating: 4.5 },
  { id: "4", name: "Prosecco Superiore DOCG", region: "Veneto", country: "Italy", year: 2023, price: 28.00, clubPrice: 26.60, category: "sparkling", grape: "Glera", volume: "750ml", description: "Игристое вино с нотами зелёного яблока, акации и свежей выпечки.", image: "/placeholder.svg", rating: 4.3 },
  { id: "5", name: "Comté Aged 18 months", region: "Jura", country: "France", year: 2024, price: 24.90, clubPrice: 23.66, category: "cheese", description: "Выдержанный сыр Конте с насыщенным ореховым вкусом и кристаллической текстурой.", image: "/placeholder.svg", rating: 4.7 },
  { id: "6", name: "Ibérico Ham de Bellota", region: "Extremadura", country: "Spain", year: 2024, price: 65.00, clubPrice: 61.75, category: "meat", description: "Хамон Иберико де Бельота — 36 месяцев выдержки, нежнейший мраморный вкус.", image: "/placeholder.svg", rating: 4.9 },
  { id: "7", name: "Rioja Gran Reserva 2014", region: "Rioja", country: "Spain", year: 2014, price: 55.00, oldPrice: 68.00, clubPrice: 52.25, category: "wine", type: "red", grape: "Tempranillo", volume: "750ml", description: "Классическая Риоха с ванильными и табачными оттенками, зрелые танины.", image: "/placeholder.svg", rating: 4.6 },
  { id: "8", name: "Côtes de Provence Rosé 2023", region: "Provence", country: "France", year: 2023, price: 22.50, clubPrice: 21.38, category: "wine", type: "rose", grape: "Grenache, Cinsault", volume: "750ml", description: "Лёгкое провансальское розе с ароматами клубники и белого персика.", image: "/placeholder.svg", rating: 4.4 },
  { id: "9", name: "Parmigiano Reggiano 24m", region: "Emilia-Romagna", country: "Italy", year: 2024, price: 32.00, clubPrice: 30.40, category: "cheese", description: "Подлинный Пармиджано Реджано 24-месячной выдержки с насыщенным умами.", image: "/placeholder.svg", rating: 4.8 },
  { id: "10", name: "Châteauneuf-du-Pape 2018", region: "Rhône Valley", country: "France", year: 2018, price: 78.00, oldPrice: 92.00, clubPrice: 74.10, category: "wine", type: "red", grape: "Grenache, Syrah", volume: "750ml", description: "Полнотелое вино с нотами спелых ягод, специй и гарриги.", image: "/placeholder.svg", rating: 4.7 },
  { id: "11", name: "Gewürztraminer Alsace 2021", region: "Alsace", country: "France", year: 2021, price: 29.00, clubPrice: 27.55, category: "wine", type: "white", grape: "Gewürztraminer", volume: "750ml", description: "Ароматное белое с нотами личи, розы и имбиря.", image: "/placeholder.svg", rating: 4.5 },
  { id: "12", name: "Truffle Salami", region: "Umbria", country: "Italy", year: 2024, price: 18.50, clubPrice: 17.58, category: "delicacy", description: "Итальянское салями с чёрным трюфелем — идеально к красному вину.", image: "/placeholder.svg", rating: 4.6 },
];

export const mockEvents: Event[] = [
  { id: "1", title: "Wine & Cheese Evening", date: "2026-04-12", time: "19:00", description: "Дегустация 6 сортов вина в паре с артизанальными сырами", image: "/placeholder.svg" },
  { id: "2", title: "Bordeaux Masterclass", date: "2026-04-25", time: "18:00", description: "Погружение в мир бордоских вин с сомелье Марией Герц", image: "/placeholder.svg" },
  { id: "3", title: "Italian Night", date: "2026-05-08", time: "20:00", description: "Вечер итальянских вин, сыров и хамона под живую музыку", image: "/placeholder.svg" },
];

export const mockPromos: Promo[] = [
  { id: "1", productId: "2", discount: 17, endsAt: "2026-04-01" },
  { id: "2", productId: "7", discount: 19, endsAt: "2026-04-15" },
  { id: "3", productId: "10", discount: 15, endsAt: "2026-04-10" },
];

export const countries = ["France", "Italy", "Spain", "Georgia", "Argentina", "Chile", "USA", "Australia"];
export const categories = ["wine", "sparkling", "cheese", "meat", "delicacy"] as const;
export const wineTypes = ["red", "white", "rose", "orange"] as const;
