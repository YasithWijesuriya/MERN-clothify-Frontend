import { useUser, SignInButton } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateReviewsMutation, useGetReviewsByProductQuery, useDeleteReviewMutation } from "@/lib/api";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const createReviewSchema = z.object({
  review: z.string().min(5).max(500),
  rating: z.number().min(1).max(5),
});

export default function CreateReviewForm({ productId }) {
  const { isSignedIn, user } = useUser();

  const form = useForm({
    resolver: zodResolver(createReviewSchema),
    defaultValues: { review: "", rating: 1 },
  });

  const { reset } = form;
  const [createReview] = useCreateReviewsMutation();
  const { data: reviews = [] } = useGetReviewsByProductQuery(productId);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const onSubmit = async (data) => {
    await createReview({ ...data, productId }).unwrap();
    reset();
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    await deleteReview(reviewId).unwrap();
  };

  return (
    <div className="mt-4 p-4 border rounded-md bg-gray-50">
      {/* Review Form */}
      {isSignedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="w-24">
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      size="sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review */}
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

            <Button type="submit" size="sm">Submit</Button>
          </form>
        </Form>
      ) : (
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">Sign in to write a review</p>
          <SignInButton mode="modal">
            <Button size="sm" variant="outline">Sign in</Button>
          </SignInButton>
        </div>
      )}

      {/* Reviews List */}
      <div className="mt-4 space-y-2">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r._id} className="p-2 border rounded-md bg-white">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span>{r.user}</span>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐ {r.rating}</span>

                  {/* Delete button only for owner */}
                  {(user?.publicMetadata?.role === "admin" || // admin can delete any review
                    (isSignedIn && r.userId === user?.id)    // regular user can delete only their own review
                  ) && (
                    <button
                      onClick={() => handleDeleteReview(r._id)}
                      disabled={isDeleting}
                      className={`p-1 rounded-full hover:bg-gray-100 transition ${
                        isDeleting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                    )}
                </div>
              </div>
              <p className="text-sm mt-1">{r.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
