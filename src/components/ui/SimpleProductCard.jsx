function SimpleProductCard(props) {

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
          <span className="text-lg sm:text-l md:text-xl font-bold block">
            {props.product.name}
          </span>
          <span className="text-base sm:text-lg md:text-xl block">
            ${props.product.price}
          </span>
          <span>
          
          </span>
        </div>
      </div>
      
    );
    
  }
  
  export default SimpleProductCard;