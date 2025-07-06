import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import CartItem from "@/components/CartItem";
import ShippingAddressForm from "@/components/ShippingAddressForm";

function CheckoutPage() {
    const cart = useSelector((state) => state.cart.cartItems);

    if(cart.length === 0){
        return <Navigate to="/" />;
    }
    return (
        <main className="px-16 min-h-screen py-8">
            <h2 className="text-4xl font-bold">Checkout Page</h2>
            <div className="mt-4 grid grid-cols-2 w-1/2 gap-x-4">
            <h3 className="text-2xl font-bold">Order Details</h3>
            <div className="mt-2 col-span-2 grid grid-cols-2 gap-x-4">
                {cart.map((item, index) => (
                    <CartItem key={index} item={item} />
                ))}
            </div>
            </div>
            <div className="mt-4">
                <h3 className="text-2xl font-bold">Shipping Address Form</h3>
                <ShippingAddressForm />
            </div>
        </main>
    )
}
export default CheckoutPage;