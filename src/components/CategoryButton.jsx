import { useGetAllCategoriesQuery } from "@/lib/api";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

function CategoryButton() {

const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
const { categorySlug } = useParams();
  
         return (
             <nav className="flex flex-wrap justify-end gap-2 mt-5 px-4 sm:px-0 mr-5">
                                 <Link 
                   to="/shop" 
                   className={cn(`border border-black rounded-full px-3 py-2 text-sm transition-colors cursor-pointer`, {
                     'bg-black text-white': !categorySlug,
                     'bg-white text-black': categorySlug,
                   })}
                 >
                   All
                 </Link>
                {!isLoading &&
                  !error &&
                  categories?.map((cat) => (
                                         <Link
                       key={cat._id}
                       to={`/shop/${cat.categorySlug}`}
                       className={cn(`border border-black rounded-full px-3 py-2 text-sm transition-colors cursor-pointer hover:bg-black hover:text-white`)}
                     >
                       {cat.name}
                     </Link>
                  ))}
       </nav>
     );
  }
  
  export default CategoryButton;
          