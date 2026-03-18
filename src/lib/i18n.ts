export const languages = ["AZ", "RU", "EN"] as const;
export type Lang = (typeof languages)[number];

export const gmContent: Record<Lang, {
  nav: { home: string; catalog: string; promos: string; events: string; gallery: string; auction: string; contacts: string };
  hero: { title: string; subtitle: string; ctaCatalog: string; ctaEvents: string };
  heroSlides: { title: string; subtitle: string }[];
  loyalty: { title: string; placeholder: string; btn: string };
  categories: { wines: string; cheeses: string; meat: string };
  promos: { title: string; badge: string };
  club: { title: string; subtitle: string; btn: string; p1: string; p2: string; p3: string };
  events: { title: string; btn: string };
  about: { title: string; text: string; since: string; products: string; countries: string; clients: string };
  subscribe: { title: string; subtitle: string; placeholder: string; btn: string; success: string };
  footer: { rights: string; address: string };
  catalog: { title: string; filterTitle: string; category: string; country: string; priceRange: string; sort: string; all: string; byPrice: string; byPopularity: string; byNew: string };
  product: { addToCart: string; clubPrice: string; related: string; description: string; characteristics: string; region: string; year: string; grape: string; volume: string };
}> = {
  AZ: {
    nav: { home: "Ana səhifə", catalog: "Kataloq", promos: "Aksiyalar", events: "Tədbirlər", gallery: "Qalereya", auction: "Auksion", contacts: "Əlaqə" },
    hero: { title: "1980-ci ildən şərab butiki", subtitle: "Premium Şərablar · Pendirlər · Delikatesslər", ctaCatalog: "Kataloq", ctaEvents: "Tədbirlər" },
    heroSlides: [
      { title: "Premium şərab kolleksiyası", subtitle: "Dünyanın 20+ ölkəsindən seçilmiş şərablar" },
      { title: "Artizanal pendirlər", subtitle: "Avropa və Qafqazın ən yaxşı pendirləri" },
      { title: "Delikatesslər və qastro-boutique", subtitle: "Hər dadı bir hekayə ilə kəşf edin" },
    ],
    loyalty: { title: "Loyallıq kartı balansı", placeholder: "Kart nömrəsi", btn: "Yoxla" },
    categories: { wines: "Şərablar", cheeses: "Pendirlər", meat: "Kolbasa & Ət" },
    promos: { title: "Xüsusi təkliflər", badge: "Endirim" },
    club: { title: "Gurmanlar Klubuna qoşulun", subtitle: "0.99 AZN/ay", btn: "Abunə ol", p1: "Eksklüziv məhsullar", p2: "Tədbirlərə dəvət", p3: "5% endirim" },
    events: { title: "Yaxınlaşan tədbirlər", btn: "Bütün tədbirlər" },
    about: { title: "Haqqımızda", text: "GurMania — 1980-ci ildən Bakının premium şərab butiki. Premium məhsullar və alkoqol dünyasının ən seçilmiş kolleksiyası. İtaliya, Fransa, İspaniya, Gürcüstan və dünyanın 20-dən çox ölkəsindən şərablar, pendirlər və delikatesslər.", since: "1980-ci ildən", products: "2000+ məhsul", countries: "20+ ölkə", clients: "50K+ müştəri" },
    subscribe: { title: "Yeniliklərdən xəbərdar olun", subtitle: "Eksklüziv təkliflər və tədbirlər haqqında ilk siz bilin", placeholder: "E-poçt ünvanınız", btn: "Abunə ol", success: "Uğurla abunə oldunuz!" },
    footer: { rights: "Bütün hüquqlar qorunur", address: "Nizami 98, Bakı, Azərbaycan" },
    catalog: { title: "Bizim kataloq", filterTitle: "Filtrlər", category: "Kateqoriya", country: "Ölkə", priceRange: "Qiymət aralığı", sort: "Sıralama", all: "Hamısı", byPrice: "Qiymətə görə", byPopularity: "Populyarlığa görə", byNew: "Yeniyə görə" },
    product: { addToCart: "Səbətə əlavə et", clubPrice: "Klub qiyməti", related: "Sizə də xoş gələ bilər", description: "Təsvir", characteristics: "Xüsusiyyətlər", region: "Region", year: "İl", grape: "Üzüm növü", volume: "Həcm" },
  },
  RU: {
    nav: { home: "Главная", catalog: "Каталог", promos: "Акции", events: "Мероприятия", gallery: "Галерея", auction: "Аукцион", contacts: "Контакты" },
    hero: { title: "Винный бутик с 1980 года", subtitle: "Премиум Вина · Сыры · Деликатесы", ctaCatalog: "Каталог", ctaEvents: "Мероприятия" },
    heroSlides: [
      { title: "Премиальная коллекция вин", subtitle: "Отборные вина из 20+ стран мира" },
      { title: "Артизанальные сыры", subtitle: "Лучшие сыры Европы и Кавказа" },
      { title: "Деликатесы и гастро-бутик", subtitle: "Откройте каждый вкус с историей" },
    ],
    loyalty: { title: "Баланс карты лояльности", placeholder: "Номер карты", btn: "Проверить" },
    categories: { wines: "Вина", cheeses: "Сыры", meat: "Колбасы & Мясо" },
    promos: { title: "Специальные предложения", badge: "Скидка" },
    club: { title: "Вступите в Клуб Гурманов", subtitle: "0.99 AZN/мес", btn: "Подписаться", p1: "Эксклюзивные товары", p2: "Приглашения на мероприятия", p3: "Постоянная скидка 5%" },
    events: { title: "Ближайшие мероприятия", btn: "Все мероприятия" },
    about: { title: "О нас", text: "GurMania — премиальный винный бутик в Баку с 1980 года. Место премиальных продуктов и алкоголя. Вина, сыры и деликатесы из Италии, Франции, Испании, Грузии и более 20 стран мира.", since: "С 1980 года", products: "2000+ товаров", countries: "20+ стран", clients: "50K+ клиентов" },
    subscribe: { title: "Будьте в курсе новинок", subtitle: "Эксклюзивные предложения и мероприятия — первыми узнаете вы", placeholder: "Ваш email", btn: "Подписаться", success: "Вы успешно подписались!" },
    footer: { rights: "Все права защищены", address: "Низами 98, Баку, Азербайджан" },
    catalog: { title: "Наш каталог", filterTitle: "Фильтры", category: "Категория", country: "Страна", priceRange: "Ценовой диапазон", sort: "Сортировка", all: "Все", byPrice: "По цене", byPopularity: "По популярности", byNew: "По новизне" },
    product: { addToCart: "В корзину", clubPrice: "Цена для членов клуба", related: "Вам также понравится", description: "Описание", characteristics: "Характеристики", region: "Регион", year: "Год", grape: "Сорт винограда", volume: "Объём" },
  },
  EN: {
    nav: { home: "Home", catalog: "Catalog", promos: "Promotions", events: "Events", gallery: "Gallery", auction: "Auction", contacts: "Contacts" },
    hero: { title: "Wine Boutique since 1980", subtitle: "Premium Wines · Cheeses · Delicacies", ctaCatalog: "Catalog", ctaEvents: "Events" },
    heroSlides: [
      { title: "Premium Wine Collection", subtitle: "Curated wines from 20+ countries worldwide" },
      { title: "Artisan Cheeses", subtitle: "The finest cheeses of Europe and the Caucasus" },
      { title: "Delicacies & Gastro-Boutique", subtitle: "Discover every taste with a story" },
    ],
    loyalty: { title: "Loyalty Card Balance", placeholder: "Card number", btn: "Check" },
    categories: { wines: "Wines", cheeses: "Cheeses", meat: "Sausages & Meat" },
    promos: { title: "Special Offers", badge: "Sale" },
    club: { title: "Join the Gourmet Club", subtitle: "0.99 AZN/mo", btn: "Subscribe", p1: "Exclusive products", p2: "Event invitations", p3: "Permanent 5% discount" },
    events: { title: "Upcoming Events", btn: "All Events" },
    about: { title: "About Us", text: "GurMania is Baku's premium wine boutique since 1980. A place of premium products and alcohol. Wines, cheeses and delicacies from Italy, France, Spain, Georgia and 20+ countries worldwide.", since: "Since 1980", products: "2000+ products", countries: "20+ countries", clients: "50K+ clients" },
    subscribe: { title: "Stay Updated", subtitle: "Be the first to know about exclusive offers and events", placeholder: "Your email", btn: "Subscribe", success: "Successfully subscribed!" },
    footer: { rights: "All rights reserved", address: "Nizami 98, Baku, Azerbaijan" },
    catalog: { title: "Our Catalog", filterTitle: "Filters", category: "Category", country: "Country", priceRange: "Price Range", sort: "Sort by", all: "All", byPrice: "By price", byPopularity: "By popularity", byNew: "By newest" },
    product: { addToCart: "Add to Cart", clubPrice: "Club price", related: "You may also like", description: "Description", characteristics: "Characteristics", region: "Region", year: "Year", grape: "Grape variety", volume: "Volume" },
  },
};

export const ivContent: Record<Lang, {
  hero: { title: string; subtitle: string; badge: string };
  about: { title: string; text: string; quote: string; founder: string };
  rating: { title: string };
  events: { title: string };
  gallery: { title: string };
  contacts: { title: string; address: string; hours: string; book: string; phone: string };
}> = {
  AZ: {
    hero: { title: "Bakının qəlbində şərab restoranı", subtitle: "Atmosfer · Qastronomiya · Şərab", badge: "Tezliklə tam sayt" },
    about: { title: "Restoran haqqında", text: "InnVino — Bakının mərkəzində unikal şərab restoranı. Biz Avropa qastronomiyasının ən yaxşı ənənələrini seçilmiş şərab kolleksiyası ilə birləşdiririk.", quote: "Hər bütün yaxşı şərab kimi, böyük hekayə ilə başlayır.", founder: "Nizam Babayev, Təsisçi" },
    rating: { title: "Rəylər və reytinq" },
    events: { title: "Tədbirlər" },
    gallery: { title: "Qalereya" },
    contacts: { title: "Əlaqə", address: "Bakı, Azərbaycan", hours: "Hər gün 12:00 – 00:00", book: "Masa sifariş et", phone: "+994 12 000 00 00" },
  },
  RU: {
    hero: { title: "Винный ресторан в сердце Баку", subtitle: "Атмосфера · Гастрономия · Вино", badge: "Скоро полноценный сайт" },
    about: { title: "О ресторане", text: "InnVino — уникальный винный ресторан в центре Баку. Мы объединяем лучшие традиции европейской гастрономии с избранной коллекцией вин со всего мира.", quote: "Каждый великий вечер, как и хорошее вино, начинается с истории.", founder: "Низам Бабаев, Основатель" },
    rating: { title: "Отзывы и рейтинг" },
    events: { title: "Мероприятия" },
    gallery: { title: "Галерея" },
    contacts: { title: "Контакты", address: "Баку, Азербайджан", hours: "Ежедневно 12:00 – 00:00", book: "Забронировать столик", phone: "+994 12 000 00 00" },
  },
  EN: {
    hero: { title: "Wine Restaurant in the Heart of Baku", subtitle: "Atmosphere · Gastronomy · Wine", badge: "Full site coming soon" },
    about: { title: "About the Restaurant", text: "InnVino is a unique wine restaurant in the center of Baku. We combine the best traditions of European gastronomy with a curated collection of wines from around the world.", quote: "Every great evening, like fine wine, begins with a story.", founder: "Nizam Babayev, Founder" },
    rating: { title: "Reviews & Rating" },
    events: { title: "Events" },
    gallery: { title: "Gallery" },
    contacts: { title: "Contacts", address: "Baku, Azerbaijan", hours: "Daily 12:00 – 00:00", book: "Book a Table", phone: "+994 12 000 00 00" },
  },
};
