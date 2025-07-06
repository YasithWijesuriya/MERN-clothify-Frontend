import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";

function SimpleProductCard(props) {
  const dispatch = useDispatch();
    return (
      <div key={props.product._id}>
        <div className=" sm:h-72  md:h-72 md:w-60">
          <img
            src={props.product.image}
            alt={props.product.name}
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
        <div className="mt-2">
          <span className="text-lg  md:text-[15px] sm:text-2xl font-bold block">
            {props.product.name}
          </span>
          <span className="text-base sm:text-lg md:text-xl block">
            ${props.product.price}
          </span>
         <div>
          <Button onClick={()=>  dispatch(
              addToCart({
                _id: props.product._id,
                name: props.product.name,
                price: props.product.price,
                image: props.product.image,
              })
            )} className="bg-black text-white  rounded-lg px-6 py-2  mt-2  transition-colors duration-300 cursor-pointer">
            Add to Cart
          </Button>
         </div>
        </div>
      </div>
      
    );
    
  }
  
  export default SimpleProductCard;