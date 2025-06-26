import { getAllProducts } from "@/lib/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ShopPage(){
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProducts(category)
        .then((data) => setProducts(data))
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));    
    }, [category]);
    return(
    <main>
        <h1>shop page</h1>
        <h1>{category}</h1>
        <div>{loading ? "Loading" : "Done"}</div>
        <div>{error}</div>
        <div>{JSON.stringify(products)}</div>

        
    </main>   

        
    )
}
export default ShopPage;