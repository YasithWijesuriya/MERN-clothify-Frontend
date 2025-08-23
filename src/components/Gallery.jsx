import { useUser} from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllGalleryItemsQuery, useCreateGalleryItemMutation, useDeleteGalleryItemMutation } from "@/lib/api";
import GalleryImageInput from "./GalleryImageInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const createGallerySchema = z.object({
  image: z.string().min(1, "Image is required").refine(
    (url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Invalid image URL" }
  ),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description cannot exceed 500 characters")
    .trim(),
});

export default function Gallery() {
  const { user } = useUser();

  const form = useForm({
    resolver: zodResolver(createGallerySchema),
    defaultValues: {
      image: "",
      description: "",
    },
  });

  const { reset } = form;
  const [createGallery] = useCreateGalleryItemMutation();
  const { data: galleries = [] } = useGetAllGalleryItemsQuery();
  const [deleteGallery, { isLoading: isDeleting }] = useDeleteGalleryItemMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
  if (user?.publicMetadata?.role === "admin") {
    try {
      setIsSubmitting(true);
      setError(null);

      // Wrap single image string in array
      const payload = {
        description: data.description,
        images: data.image ? [data.image] : [], // 👈 important
      };

      await createGallery(payload).unwrap();
      reset();
    } catch (err) {
      setError(err.message || "Failed to create gallery item");
    } finally {
      setIsSubmitting(false);
    }
  }
};



  const handleDeleteGallery = async (galleryId) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) return;
    await deleteGallery(galleryId).unwrap();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Admin Only Form */}
      {user?.publicMetadata?.role === "admin" && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add New Gallery Item</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter gallery item description"
                        {...field}
                        className="min-h-[100px]"
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
                    <FormLabel className="text-base font-semibold">Gallery Image</FormLabel>
                    <FormControl>
                      <GalleryImageInput
                        onChange={(url) => {
                          field.onChange(url);
                          // Optional: Show preview
                          const previewEl = document.getElementById('imagePreview');
                          if (previewEl) {
                            previewEl.src = url;
                          }
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    {field.value && (
                      <div className="mt-2">
                        <img 
                          id="imagePreview"
                          src={field.value} 
                          alt="Preview" 
                          className="w-full max-h-[200px] object-cover rounded-md"
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Upload Gallery Item"}
              </Button>

              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </form>
          </Form>
        </div>
      )}

     {/* Gallery Grid */}
     <div className="grid grid-cols-1 gap-8 p-4 max-w-4xl mx-auto">
  {galleries.length === 0 ? (
    <p className="text-center text-gray-500 col-span-full text-lg font-medium">No gallery items yet.</p>
  ) : (
    galleries.map((item) => (
      <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:shadow-xl transition duration-300">
        {/* Description Section on Top */}
        <div className="p-6">
          <p className="text-gray-800 text-xl font-medium leading-relaxed mb-4">
            {item.description}
          </p>
        </div>
        
        {/* Image Section */}
        <div className="relative">
          <img 
            src={item.images[0]} 
            alt="Gallery item"
            className="w-full max-h-[500px] object-cover"
          />
          {(user?.publicMetadata?.role === "admin") && (
            <button
              onClick={() => handleDeleteGallery(item._id)}
              disabled={isDeleting}
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-red-50 transition duration-200"
              title="Delete gallery item"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
          )}
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
}