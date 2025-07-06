import { Card} from "@/components/ui/card";

function CartItem({ item }) {
    return (
        <Card className="p-4">
            <div className="flex items-center  space-x-4">
                <img 
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-bold">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">{item.product.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
            </div>

        </Card>
    );
}

export default CartItem;