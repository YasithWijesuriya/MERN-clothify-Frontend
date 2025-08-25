import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle, Truck } from "lucide-react";
import { useGetMyOrdersByUserQuery } from "@/lib/api";
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";

const MyOrders = () => {

  const { isSignedIn, isLoaded, userId } = useAuth();

  const { data: response, isLoading, error } = useGetMyOrdersByUserQuery(undefined, {
    skip: !isLoaded || !isSignedIn
  });

  // Get orders from the response data
  const orders = response?.data || [];

  // Add more detailed logging
  console.log('Auth Status:', { isSignedIn, isLoaded, userId });
  console.log('Query Status:', { isLoading, error, ordersCount: orders?.length });

  // Wait for auth to load
  if (!isLoaded) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin w-8 h-8 text-gray-700" />
      </div>
    );
  }

  // Redirect if not signed in
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin w-8 h-8 text-gray-700" />
      </div>
    );
  }

  // Improve error handling
  if (error) {
    console.error('Orders Error:', error);
    return (
      <div className="text-center mt-10">
        <p className="text-red-600">
          {error.status === 401 ? 'Please sign in to view your orders' : 
           error.message || 'Failed to load orders'}
        </p>
      </div>
    );
  }

  const renderOrderCard = (order) => (
    <Card key={order._id} className="shadow-lg bg-white rounded-lg">
      <CardContent className="p-5 space-y-3">
        <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>

        {/* Status Section */}
        <div className="flex items-center space-x-2">
          <span className="font-medium">Status:</span>
          {order.orderStatus === "FULFILLED" ? (
            <CheckCircle className="text-green-500 w-5 h-5" />
          ) : (
            <XCircle className="text-red-500 w-5 h-5" />
          )}
          
          <span className="capitalize">{order.orderStatus.toLowerCase()}</span>
        </div>

        {/* Price Section */}
        <p className="text-lg">
          <span className="font-medium">Total:</span>{" "}
          <span className="text-green-600 font-semibold">
            LKR{order.totalPrice.toFixed(2)}
          </span>
        </p>

        {/* Payment Status */}
        <div className="flex items-center space-x-2">
          <span className="font-medium">Payment:</span>
          {order.paymentStatus === "PAID" ? (
            <CheckCircle className="text-green-500 w-5 h-5" />
          ) : (
            <XCircle className="text-red-500 w-5 h-5" />
          )}
          <span className="capitalize">{order.paymentStatus.toLowerCase()}</span>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center space-x-2">
          <Truck className="w-5 h-5 text-blue-500" />
          <span className="font-medium">Delivery ETA:</span>
          <span>{new Date(order.deliveryEta).toLocaleDateString()}</span>
        </div>

        
        {/* Items Section */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Ordered Items:</h3>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div 
                key={item._id} 
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{item.productId?.name || 'Product'}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  LKR {(item.productId?.price * item.quantity || 0).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Shipping Address:</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium">
              {order.addressId.first_name} {order.addressId.last_name}
            </p>
            <p>{order.addressId.phone}</p>
            <p>
              {order.addressId.line_1}
              {order.addressId.line_2 ? `, ${order.addressId.line_2}` : ""}
            </p>
            <p>{order.addressId.city}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );


  return (
      <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">My Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!orders?.length ? (
          <p className="text-center col-span-full">No orders placed yet.</p>
        ) : (
          orders.map(renderOrderCard)
        )}
      </div>
    </div>
  );
};

export default MyOrders;