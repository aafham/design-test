import { GlassCard } from "./GlassCard";

export type Product = {
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
};

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <GlassCard as="article" className="product-card">
      <div className="product-thumb-wrap">
        {product.badge ? <span className="badge">{product.badge}</span> : null}
        <img className="product-thumb" src={product.image} alt={product.name} loading="lazy" />
      </div>

      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price-row">
        <span className="price">{product.price}</span>
        <button type="button" className="btn btn-ghost" style={{ height: 34, paddingInline: 12 }}>
          Quick Add
        </button>
      </div>
    </GlassCard>
  );
}
