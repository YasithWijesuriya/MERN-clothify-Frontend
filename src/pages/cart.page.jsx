import { Button } from "@/components/ui/button";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router";
import CartItem from "@/components/CartItem";
import { removeFromCart } from "@/lib/features/cartSlice";


function CartPage() {
    const cart = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const onRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <main className="px-16 min-h-screen py-8">
          <h2 className="text-4xl font-bold">My Cart</h2>
         <div className="mt-4 grid gap-4 w-3/4 sm:grid-cols-1 md:grid-cols-2 ">
              {cart.map((item, index) => (
                <CartItem key={index} item={item} onRemove={onRemove} />
              ))}
            
          </div>
    
          <div className="mt-4">
            {cart.length > 0 ? (
              <Button asChild>
                <Link to="/shop/checkout">Proceed to Checkout</Link>
              </Button>
            ) : (
              <p>No items in cart</p>
            )}
          </div>
        </main>
      );
    }
    
    export default CartPage;