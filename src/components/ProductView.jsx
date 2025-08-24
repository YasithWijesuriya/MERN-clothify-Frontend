import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useParams, Link } from "react-router-dom"
import { useGetAllProductsQuery } from "@/lib/api"
import { useDispatch } from "react-redux"
import { addToCart } from "@/lib/features/cartSlice"
import { ArrowLeft, Star } from "lucide-react"
import CreateReviewForm from "src/components/CreateReviewForm"

export default function ProductView() {
  const { productId } = useParams()
  const dispatch = useDispatch()
  
  const { data: products, isLoading, error } = useGetAllProductsQuery()
  
  const product = products?.find(p => p._id === productId)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <div className="max-w-3xl mx-auto mb-6">
        <Link
          to="/shop"
          className="inline-flex font-bold  items-center gap-2 text-blue-400 hover:text-blue-600 transition-colors text-xl"
        >
          <ArrowLeft size={25} />
          Back to Shop
        </Link>
      </div>
      
      <div className="flex justify-center">
        <Card className="max-w-3xl w-full shadow-lg rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Product Image */}
            <div className="bg-white flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-xl object-cover w-full max-h-[500px]"
              />
            </div>

            {/* Product Details */}
            <CardContent className="flex flex-col gap-4 p-6">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-lg font-semibold text-blue-600">
                LKR {product.price.toLocaleString()}
              </p>
              <p className="text-[16px] font-semibold text-red-500">
                Available Stock: {product.stock}
              </p>
              <p className="text-sm text-gray-600">{product.description}</p>


              {/* Add to Cart Button */}
              <div className="mt-6">
                <Button className="w-full" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </div>
          <div>
            <CreateReviewForm productId={product._id} />
          </div>

        </Card>
      </div>
    </div>
  )
}
