import { Product, ProductCard } from "../ProductCard";

const products: Product[] = [
  {
    name: "Strawberry Velvet",
    description: "Vanilla sponge, strawberry confit, and cream cheese frosting.",
    price: "RM 98",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Midnight Choco",
    description: "Dark cocoa sponge with Belgian ganache and sea salt finish.",
    price: "RM 110",
    badge: "Chef Pick",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Lemon Snow",
    description: "Lemon curd, whipped meringue, and citrus zest glaze.",
    price: "RM 92",
    badge: "Fresh",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80"
  }
];

export function BestSellersSection() {
  return (
    <section id="menu" aria-labelledby="menu-title">
      <div className="section-head">
        <h2 id="menu-title">Best Sellers</h2>
        <p>Minimal design, refined flavor, and premium finishing.</p>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
