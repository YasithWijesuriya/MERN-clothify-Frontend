import React from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
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
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";


const shippingAddressSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  email: z.string().email("Invalid email"),
  line_1: z.string().min(1, "Address line 1 is required"),
  line_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(1, "Phone number is required"),
  paymentMethod: z.enum(["CREDIT_CARD", "COD", "ONLINE"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

function ShippingAddressForm() {
  const { user } = useUser();
  const form = useForm({
    resolver: zodResolver(shippingAddressSchema),
    // zodResolver එක shippingAddressSchema use කරල auto validation කරන්න කියන එක.  
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      line_1: "",
      line_2: "",
      city: "",
      phone: "",
      paymentMethod: "COD",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const cart = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const paymentMethod = form.watch("paymentMethod");
  
  const cartTotal = cart.reduce((acc, item) => {
    const price = Number(item.product?.price ?? 0);
    return acc + price * (Number(item.quantity) || 0);
  }, 0);

  
  const extraFee = ["CREDIT_CARD", "COD", "ONLINE"].includes(paymentMethod) ? 400 : 0;
  const totalPrice = cartTotal + extraFee;

  async function onSubmit(values) {
    try {
      
      if (values.paymentMethod === "CREDIT_CARD") {
        if (!values.cardNumber || !values.cardExpiry || !values.cardCvc) {
          form.setError("cardNumber", { type: "manual", message: "Enter card details" });
          return;
        }
       
      }
     
      const orderPayload = {
        
        userId: user?.id||null,
        items: cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        address: {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          line_1: values.line_1,
          line_2: values.line_2,
          city: values.city,
          phone: values.phone,
        },
        paymentMethod: values.paymentMethod,
        paymentDetails:
          values.paymentMethod === "CREDIT_CARD"
            ? { last4: values.cardNumber.slice(-4), brand: "CARD" }
            : {},
        totalPrice,
      };

      const result = await createOrder(orderPayload).unwrap();
      const orderId = result.orderId || result._id || result.id;
      console.log("Navigating to:", `/checkout/order-confirmation/${orderId}`);

      
      dispatch(clearCart());

      navigate(`/checkout/order-confirmation/${orderId}`, {
        state: {
          totalPrice,
          paymentMethod: values.paymentMethod,
          bankDetails: {
            bankName: "Peoples Bank",
            accountName: "WAY RUCHIRANGA ",
            accountNumber: "123-456-789",
            branch: "Yakkala",
          },
          eta: result.eta,
        },
      });
    } catch (err) {
      console.error("Order creation failed:", err);
      
    }
  }

  return (
    <Card className="p-8 max-w-2xl mx-auto shadow-lg border rounded-lg mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Shipping Address</h3>
      <hr className="mb-6" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Yasith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Wijesuriya" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* address fields */}
            <FormField
              control={form.control}
              name="line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="305/2" {...field} />
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
                    <Input placeholder="Street Name" {...field} />
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
                    <Input placeholder="Gampaha" {...field} />
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
                    <Input placeholder="+94-70 123 4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Payment method */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <div className="flex gap-4 mt-2">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      value="CREDIT_CARD"
                      checked={field.value === "CREDIT_CARD"}
                      onChange={() => field.onChange("CREDIT_CARD")}
                    />
                    Credit Card
                  </label>

                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      value="COD"
                      checked={field.value === "COD"}
                      onChange={() => field.onChange("COD")}
                    />
                    Cash on Delivery
                  </label>

                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      value="ONLINE"
                      checked={field.value === "ONLINE"}
                      onChange={() => field.onChange("ONLINE")}
                    />
                    Online Transaction
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* credit card fields (conditionally) */}
          {paymentMethod === "CREDIT_CARD" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="4242 4242 4242 4242" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry (MM/YY)</FormLabel>
                    <FormControl>
                      <Input placeholder="12/34" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardCvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* total summary */}
          <div className="mt-2">
            <p className="font-medium">Cart total: LKR {cartTotal.toFixed(2)}</p>
            <p className="font-medium">Delivery fee: LKR {extraFee}</p>
            <p className="text-lg font-bold">Total: LKR {totalPrice.toFixed(2)}</p>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Creating Order..." : "Place Order"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default ShippingAddressForm;
