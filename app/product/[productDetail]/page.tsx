import { getProduct } from "@/lib/products"
import { notFound } from "next/navigation"

interface ProductDetailParams {
    productDetail: string;
}

interface ProductDetailPageProps {
    params: ProductDetailParams;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({params}) => {

    const product = getProduct(params.productDetail)

    if(!product) {
        notFound();
    }

    return (
        <>
        <h1>Client Detail Page</h1>
        <h2>{product.description} {product.price}</h2>
        </>
    )
}

export default ProductDetailPage