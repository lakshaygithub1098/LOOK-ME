export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  fabric: string;
  sizes: string[];
  colors: string[];
  description: string;
  badge?: string;
  tags?: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isFestive?: boolean;
  isSummer?: boolean;
}

export const WHATSAPP_NUMBER = "8700808780";

export function getWhatsAppLink(productName: string, productId: string): string {
  const message = encodeURIComponent(
    `I want to order ${productName} (ID: ${productId})`
  );
  return `https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`;
}

const keywordMap: Record<string, string[]> = {
  kurti: ["casual", "festive", "summer", "ethnic", "co-ord set"],
  festive: ["festive"],
  casual: ["casual"],
};

export function searchProducts(query: string, productList: Product[] = products): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return productList;

  const expanded = new Set<string>([q, ...(keywordMap[q] ?? [])]);

  return productList.filter((product) => {
    const tags = (product.tags ?? []).map((tag) => tag.toLowerCase());
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();

    return Array.from(expanded).some(
      (term) =>
        name.includes(term) ||
        category.includes(term) ||
        tags.some((tag) => tag.includes(term))
    );
  });
}

export const products: Product[] = [
  {
    id: "LAM-001",
    name: "Ivory Bloom Embroidered Kurti",
    price: 1299,
    originalPrice: 1899,
    image: "/kurti_1.png",
    images: ["/kurti_1.png", "/kurti_2.png"],
    category: "Casual",
    fabric: "Cotton",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory", "Cream"],
    description:
      "Delicate floral embroidery on premium ivory cotton fabric. Perfect for daily wear or casual outings. Features intricate threadwork at the neckline and sleeves with a relaxed A-line silhouette.",
    badge: "Best Seller",
    tags: ["kurti", "casual", "cotton", "embroidered"],
    isTrending: true,
  },
  {
    id: "LAM-002",
    name: "Dusty Rose Block Print Kurti",
    price: 999,
    originalPrice: 1499,
    image: "/kurti_2.png",
    images: ["/kurti_2.png", "/kurti_1.png"],
    category: "Casual",
    fabric: "Cotton",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Dusty Rose", "Blush Pink"],
    description:
      "Traditional hand-block printed kurti in a contemporary silhouette. Made from breathable 100% cotton, this piece combines artisanal craft with modern style.",
    tags: ["kurti", "casual", "cotton", "block print"],
    isTrending: true,
    isSummer: true,
  },
  {
    id: "LAM-003",
    name: "Royal Blue Zari Anarkali",
    price: 2199,
    originalPrice: 2999,
    image: "/kurti_3.png",
    images: ["/kurti_3.png", "/kurti_5.png"],
    category: "Festive",
    fabric: "Silk",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Royal Blue", "Navy"],
    description:
      "Regal deep cobalt blue anarkali with golden zari embroidery. The intricate collar work and flowing silhouette make this perfect for festive occasions and celebrations.",
    badge: "Premium",
    tags: ["kurti", "festive", "anarkali", "silk", "zari"],
    isFestive: true,
    isTrending: true,
  },
  {
    id: "LAM-004",
    name: "Sage Green Block Print Kurta",
    price: 849,
    image: "/kurti_4.png",
    images: ["/kurti_4.png", "/kurti_6.png"],
    category: "Casual",
    fabric: "Cotton",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sage Green", "Mint"],
    description:
      "Earthy sage green with geometric hand-block print motifs. A mindful, artisanal piece made from sustainably sourced cotton. The minimalist design makes it versatile for many occasions.",
    tags: ["kurti", "casual", "summer", "cotton"],
    isNew: true,
    isSummer: true,
  },
  {
    id: "LAM-005",
    name: "Maroon Sequin Festival Kurti",
    price: 2799,
    originalPrice: 3499,
    image: "/kurti_5.png",
    images: ["/kurti_5.png", "/kurti_3.png"],
    category: "Festive",
    fabric: "Georgette",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Maroon", "Deep Red"],
    description:
      "Opulent maroon with gold sequins and mirror embellishments. This festive showstopper is perfect for Diwali, weddings, and celebrations. The heavy embroidery catches light beautifully.",
    badge: "Festive Special",
    tags: ["kurti", "festive", "georgette", "party"],
    isFestive: true,
  },
  {
    id: "LAM-006",
    name: "Sunshine Yellow Floral Kurti",
    price: 799,
    originalPrice: 1099,
    image: "/kurti_6.png",
    images: ["/kurti_6.png", "/kurti_4.png"],
    category: "Summer",
    fabric: "Rayon",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Yellow", "Golden"],
    description:
      "Light and breezy sunshine yellow kurti with delicate floral prints and a charming scalloped hem. Made from lightweight rayon fabric, perfect for hot summer days.",
    tags: ["kurti", "summer", "casual", "rayon"],
    isSummer: true,
    isNew: true,
  },
  {
    id: "LAM-007",
    name: "Lavender Palazzo Set",
    price: 1599,
    originalPrice: 2199,
    image: "/kurti_7.png",
    images: ["/kurti_7.png", "/kurti_8.png"],
    category: "Co-ord Set",
    fabric: "Rayon",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Lavender", "Purple"],
    description:
      "Contemporary fusion palazzo set in a dreamy dusty lavender. The wide-leg palazzo pants paired with a short kurti create an effortlessly chic silhouette for modern women.",
    badge: "New Arrival",
    tags: ["co-ord", "set", "new", "rayon"],
    isNew: true,
    isTrending: true,
  },
  {
    id: "LAM-008",
    name: "Mint Green Chikankari Kurti",
    price: 1499,
    originalPrice: 1999,
    image: "/kurti_8.png",
    images: ["/kurti_8.png", "/kurti_1.png"],
    category: "Ethnic",
    fabric: "Cotton",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Mint", "Pale Green"],
    description:
      "Timeless Lucknawi chikankari on pale mint cotton. The delicate white thread embroidery is a testament to artisanal craftsmanship. A classic piece that transcends trends.",
    tags: ["kurti", "ethnic", "chikankari", "cotton"],
    isTrending: true,
  },
];

export const categories = ["All", "Casual", "Festive", "Summer", "Ethnic", "Co-ord Set"];
export const fabrics = ["All", "Cotton", "Silk", "Rayon", "Georgette"];
export const sizes = ["S", "M", "L", "XL"];
export const colors = [
  "All", "Ivory", "Pink", "Blue", "Green", "Yellow", "Maroon", "Lavender", "Mint"
];
