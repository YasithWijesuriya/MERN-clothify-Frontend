import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateReviewsMutation, useGetReviewsByProductQuery} from "@/lib/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const createReviewSchema = z.object({
  user: z.string().min(2).max(100),
  review: z.string().min(5).max(500),
  rating: z.number().min(1).max(5),
});


export default function ProductReviews({ productId }) {
    const form = useForm({
        resolver: zodResolver(createReviewSchema),
        defaultValues: { 
            user: "",
            review: "",
            rating: 1 
        },
    });
    
    const { reset } = form;
    const [createReview] = useCreateReviewsMutation();
    const { data: reviews = [] } = useGetReviewsByProductQuery(productId);     

  const onSubmit = async (data) => {
    try {
      await createReview({ ...data, productId }).unwrap();
      reset();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-md bg-gray-50">
      {/* Compact Review Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Name" {...field} size="sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="w-20">
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 1)
                      }
                      size="sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Write a review" {...field} size="sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="sm">
            Submit
          </Button>
        </form>
      </Form>

     {/* Display Existing Reviews */}
      <div className="mt-4 space-y-2">
  {reviews.length === 0 ? (
    <p className="text-gray-500 text-sm">No reviews yet.</p>
  ) : (
    reviews.map((r) => (
      <div key={r._id} className="p-2 border rounded-md bg-white">
        <div className="flex justify-between text-sm font-semibold">
          <span>{r.user}</span>
          <span>⭐ {r.rating}</span>
        </div>
        <p className="text-sm">{r.review}</p>
      </div>
    ))
  )}
</div>
    </div>
  );
}

