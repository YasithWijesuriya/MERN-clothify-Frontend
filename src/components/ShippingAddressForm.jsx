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

const shippingAddressSchema = z.object({
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(1, "Phone number is required"),
});

function ShippingAddressForm() {
  const form = useForm({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      line1: "",
      line2: "",
      city: "",
      phone: "",
    },
  });

  function onSubmit(values) {
    console.log("Shipping Address Submitted:", values);
    // Handle form submission
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
              name="line1"
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
              name="line2"
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
          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default ShippingAddressForm;