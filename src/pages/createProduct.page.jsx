import CreateProductForm from "../components/CreateProductForm";
import { useGetAllCategoriesQuery } from "@/lib/api";

function createProduct() {
    const { data: getAllCategories } = useGetAllCategoriesQuery();
//api එක යැවූ පසු ලැබෙන category list එක getAllCategories මගින් ලබා ගනී

    return (
        <div className="w-full max-w-2xl md-w-xl sm-w-l mx-auto mt-6 p-4 sm:p-8 bg-gray-50 rounded-lg shadow-xl">
            <h1 className="text-xl sm:text-2xl font-extrabold text-center text-gray-800 mb-6">
                Create Product Page
            </h1>
            <CreateProductForm categories={getAllCategories} />
        </div>
    );
}

export default createProduct;