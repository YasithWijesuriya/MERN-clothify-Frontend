import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

function CartItem({ item, onRemove }) {
  return (
    <Card className="p-4 mb-4 shadow-md border rounded-lg transition hover:shadow-lg ">
      <div className="flex items-center gap-4">
        <img
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-lg border"
        />
        <div className="flex-1">
          <h3 className="md:text-lg font-semibold sm:text-[14px]">{item.product.name}</h3>
          <p className="text-base text-gray-700 font-medium mt-1">
            LKR{item.product.price?.toFixed(2) ?? "0.00"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Quantity: <span className="font-semibold">{item.quantity}</span>
          </p>
        </div>
       {onRemove && (
        <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => onRemove(item.product._id)}
            title="Remove from cart"
            aria-label={`Remove ${item.product.name}`}
            >
            <Trash2 className="w-5 h-5 text-red-700  semibold text-xl" />
        </Button>
        )}
      </div>
    </Card>
  );
}

export default CartItem;