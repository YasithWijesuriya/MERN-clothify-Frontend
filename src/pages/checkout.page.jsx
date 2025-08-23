import { useSelector,useDispatch } from "react-redux";
import CartItem from "@/components/CartItem";
import ShippingAddressForm from "@/components/ShippingAddressForm";
import { Card } from "@/components/ui/card";
import { removeFromCart } from "@/lib/features/cartSlice";
function CheckoutPage() {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const onRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Calculate total price
  const total = cart.reduce(
    (sum, item) => sum + (item.product.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <main className="px-4 md:px-16 min-h-screen py-8 bg-gray-50">
      <h2 className="text-4xl font-bold mb-8 text-center">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Order Details */}
        <Card className="p-6 shadow-lg border rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Order Details
          </h3>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} onRemove={onRemove} />
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-blue-600">
              LKR {total.toFixed(2)}
            </span>
          </div>
        </Card>

        {/* Shipping Address */}
        <section className="p-6 shadow-lg border rounded-lg bg-white">
          <ShippingAddressForm />
        </section>
      </div>
    </main>
  );
}

export default CheckoutPage;
