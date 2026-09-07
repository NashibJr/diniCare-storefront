import type { Product } from "../types";

export const products: Product[] = [
  { id: 1, name: "iPhone 15 Pro", category: "Electronics", price: 999, oldPrice: 1099, rating: 4.9, reviews: 120, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80", badge: "Popular", description: "Titanium design, pro camera system, all-day battery and powerful performance." },
  { id: 2, name: "MacBook Air M3", category: "Electronics", price: 1099, rating: 4.8, reviews: 88, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80", description: "Thin, light and fast laptop for work, creativity and everyday tasks." },
  { id: 3, name: "AirPods Pro 2", category: "Electronics", price: 249, rating: 4.8, reviews: 214, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=80", badge: "Best seller", description: "Immersive sound, active noise cancellation and a comfortable in-ear fit." },
  { id: 4, name: "Everyday Tote", category: "Fashion", price: 89, rating: 4.6, reviews: 76, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80", description: "A structured, spacious tote designed for workdays, weekends and travel." },
  { id: 5, name: "Minimal Sneakers", category: "Fashion", price: 129, rating: 4.7, reviews: 149, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80", badge: "New", description: "Clean everyday sneakers with responsive cushioning and durable construction." },
  { id: 6, name: "Smart Watch", category: "Wearables", price: 199, rating: 4.5, reviews: 95, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80", description: "Fitness, notifications, heart-rate insights and a bright all-day display." },
  { id: 7, name: "Studio Headphones", category: "Audio", price: 309, rating: 4.9, reviews: 184, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80", description: "Balanced audio, plush cushions and focused listening for work or travel." },
  { id: 8, name: "Ceramic Diffuser", category: "Home", price: 59, rating: 4.5, reviews: 63, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80", description: "A calm home fragrance diffuser with a sculptural ceramic finish." }
];

export const categories = ["Electronics", "Fashion", "Home", "Beauty", "Sports", "Wearables"];
