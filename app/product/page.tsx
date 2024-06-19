import Link from 'next/link';
import { getProducts } from '../../lib/products'

interface Product {
    id: number;
    description: string;
    price: number
}

const ProductPage: React.FC = () => {

    const products: Product[] = getProducts();

    console.log(products)

    return (
        <>
        <h1>Product Page</h1>
        <ul>
            {products && products.map(product => (<Link key={product.id} href={`/product/${product.id}`}>{product.description}</Link>))}
        </ul>
        </>
    )
}

export default ProductPage