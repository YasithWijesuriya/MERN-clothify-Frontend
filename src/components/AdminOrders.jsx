import React from "react";
import { useGetAllOrdersQuery } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card"; // ShadCN card
import { Loader2, CheckCircle, XCircle, Truck } from "lucide-react";

const AdminOrders = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin w-8 h-8 text-gray-700" />
      </div>
    );

  if (error)
    return (
      <p className="text-red-600 mt-5 text-center">Failed to load orders</p>
    );

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">All Orders (Admin)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 && (
          <p className="text-center col-span-full">No orders found.</p>
        )}

        {orders.map((order) => (
          <Card key={order._id} className="shadow-lg bg-white rounded-lg">
            <CardContent className="p-5 space-y-3">
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
              <p>User ID: {order.userId}</p>
              <p>Payment Method: {order.paymentMethod}</p>

              <div className="flex items-center space-x-2">
                <span>Status:</span>
                {order.orderStatus === "FULFILLED" ? (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                ) : (
                  <XCircle className="text-red-500 w-5 h-5" />
                )}
                <span>{order.orderStatus}</span>
              </div>

              <p>Total: LKR{order.totalPrice}</p>

              <div className="flex items-center space-x-2">
                <span>Payment:</span>
                {order.paymentStatus === "PAID" ? (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                ) : (
                  <XCircle className="text-red-500 w-5 h-5" />
                )}
                <span>{order.paymentStatus}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <span>Delivery ETA: {new Date(order.deliveryEta).toLocaleString()}</span>
              </div>

              {/* Items */}
              <h3 className="font-semibold mt-3">Items:</h3>
              <ul className="list-disc list-inside">
                {order.items.map((item) => (
                  <li key={item.productId}>
                    Product: {item.productId} | Qty: {item.quantity}
                  </li>
                ))}
              </ul>

              {/* Address */}
              <h3 className="font-semibold mt-3">Shipping Address:</h3>
              <p>{order.addressId.first_name} {order.addressId.last_name}</p>
              <p>{order.addressId.phone}</p>
              <p>
                {order.addressId.line_1}
                {order.addressId.line_2 ? `, ${order.addressId.line_2}` : ""}
              </p>
              <p>{order.addressId.city}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
