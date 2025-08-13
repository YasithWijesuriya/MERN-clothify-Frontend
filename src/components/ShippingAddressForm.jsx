import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateOrderMutation } from "@/lib/api";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/lib/features/cartSlice";


const shippingAddressSchema = z.object({
  line_1: z.string().min(1, "Address line 1 is required"),
  line_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(1, "Phone number is required"),
});

function ShippingAddressForm() {
  const form = useForm({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      line_1: "",
      line_2: "",
      city: "",
      phone: "",
    },
  });
   const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const[createOrder, { isLoading }] = useCreateOrderMutation();
  
  async function onSubmit(values) {
    console.log("Shipping Address:", values);
    console.log("Cart Items:", cart);
    try {
      await createOrder({
        shippingAddress: values,
        orderItems: cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      }).unwrap();
      
      // Clear the cart after successful order creation
      dispatch(clearCart());
      console.log("Cart cleared successfully!");
      
    } catch (error) {
      console.error("Error creating order:", error);
    }
    
  }

  return (
    <Card className="p-8 max-w-xl mx-auto shadow-lg border rounded-lg mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Shipping Address</h3>
      <hr className="mb-6" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="305/2"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Street Name"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Gampaha"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+94-70 123 4567"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Creating Order..." : "Submit"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default ShippingAddressForm;