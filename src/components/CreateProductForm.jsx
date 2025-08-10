import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation } from "@/lib/api";
import ImageInput from "./Image-Input"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const createProductSchema = z.object({
    categoryId: z.string().min(1),
    name: z.string().min(1),
    image: z.string().min(1),
    stock: z.number(),
    price: z.number().nonnegative(),
});

function createProductForm({categories}) {
    
    const form = useForm({
        resolver: zodResolver(createProductSchema),
    });

    const [createProduct, {isLoading}] = useCreateProductMutation();
    const onSubmit = async (values) => {
    try {
      console.log(values);
       await createProduct(values).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

    return(
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4 w-full max-w-2xl mx-auto">
        
        
        <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category ID</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.map((category) => (
                                <SelectItem key={category._id} value={category._id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product Name"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500 text-base py-3 px-4 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Image</FormLabel>
                  <FormControl>
                    <ImageInput onChange={field.onChange} value={field.value} 
                    className="focus:ring-2 focus:ring-blue-500 text-base py-3 px-4 w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                     
        <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter stock quantity"
                      {...field}
                      onChange={(e) => {
                       field.onChange(parseInt(e.target.value, 10 || 0));
                      }}
                      className="focus:ring-2 focus:ring-blue-500 text-base py-3 px-4 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number" step="0.01"
                      placeholder="Enter product price"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseFloat(e.target.value) || 0);
                      }}
                      className="focus:ring-2 focus:ring-blue-500 text-base py-3 px-4 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">Submit </Button>

        </form>

     </Form>
    )

}
export default createProductForm;