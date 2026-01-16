import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link, useRoute, useLocation } from "wouter";
import { ArrowLeft, Loader2, Save, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPuppySchema, type InsertPuppy } from "@shared/schema";
import { useCreatePuppy, useUpdatePuppy, usePuppy } from "@/hooks/use-puppies";
import { useEffect, useState } from "react";
import { z } from "zod";

// Extend schema for form validation (zod resolver handles coercion)
const formSchema = insertPuppySchema.extend({
  age: z.coerce.number().min(0, "Age must be a positive number"),
  imageUrl: z.string().url("Must be a valid URL"),
  // we will manage photos as an array in the UI and stringify before submitting
});

export default function PuppyForm() {
  const { user, isLoading: authLoading } = useAuth();
  const [, params] = useRoute("/admin/edit/:id");
  const [, setLocation] = useLocation();
  const isEditing = !!params?.id;
  const id = parseInt(params?.id || "0");

  // Protect route
  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/api/login";
    }
  }, [user, authLoading]);

  // Fetch data if editing
  const { data: puppy, isLoading: puppyLoading } = usePuppy(id);
  
  const createPuppy = useCreatePuppy();
  const updatePuppy = useUpdatePuppy();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<InsertPuppy>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFeatured: false,
    }
  });

  // Local state to manage multiple photo URLs
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // Populate form when data loads
  useEffect(() => {
    if (puppy && isEditing) {
      reset({
        name: puppy.name,
        breed: puppy.breed,
        age: puppy.age,
        description: puppy.description,
        imageUrl: puppy.imageUrl,
        isFeatured: puppy.isFeatured || false,
      });

      try {
        const parsed = puppy.photos ? JSON.parse(puppy.photos) : [];
        setPhotoUrls(Array.isArray(parsed) ? parsed : []);
      } catch {
        setPhotoUrls([]);
      }
    }
  }, [puppy, isEditing, reset]);

  const onSubmit = async (data: InsertPuppy) => {
    // attach photos as JSON string
    const payload: any = {
      ...data,
      photos: JSON.stringify(photoUrls || []),
    };

    if (isEditing) {
      await updatePuppy.mutateAsync({ id, data: payload });
    } else {
      await createPuppy.mutateAsync(payload);
    }
    setLocation("/admin");
  };

  const isLoading = authLoading || (isEditing && puppyLoading);
  const isSaving = createPuppy.isPending || updatePuppy.isPending;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  function addPhoto() {
    setPhotoUrls((s) => [...s, ""]);
  }

  function updatePhoto(index: number, value: string) {
    setPhotoUrls((s) => s.map((p, i) => (i === index ? value : p)));
  }

  function removePhoto(index: number) {
    setPhotoUrls((s) => s.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <nav className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold">
              {isEditing ? `Edit ${puppy?.name}` : "Add New Puppy"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Update the puppy's details below." : "Enter the details for the new puppy."}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-sm border border-border space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} placeholder="e.g. Buddy" />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Input id="breed" {...register("breed")} placeholder="e.g. Golden Retriever" />
                {errors.breed && <p className="text-sm text-destructive">{errors.breed.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age (months)</Label>
                <Input type="number" id="age" {...register("age")} placeholder="2" />
                {errors.age && <p className="text-sm text-destructive">{errors.age.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Main Image URL</Label>
                <Input id="imageUrl" {...register("imageUrl")} placeholder="https://images.unsplash.com/..." />
                {errors.imageUrl && <p className="text-sm text-destructive">{errors.imageUrl.message}</p>}
                <p className="text-xs text-muted-foreground">Tip: Use Unsplash for high quality images.</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Additional Photo URLs</Label>
              <div className="space-y-3">
                {photoUrls.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Input
                      value={p}
                      onChange={(e) => updatePhoto(idx, e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removePhoto(idx)} className="h-10 w-10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div>
                  <Button type="button" variant="outline" onClick={addPhoto} className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" /> Add Photo
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Add multiple photo URLs to show in the puppy gallery.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                {...register("description")} 
                placeholder="Describe personality, history, etc."
                className="min-h-[150px]"
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="flex items-center space-x-2 border p-4 rounded-xl bg-secondary/10">
              <Checkbox 
                id="isFeatured" 
                onCheckedChange={(checked) => setValue("isFeatured", checked === true)}
                defaultChecked={puppy?.isFeatured || false}
                {...register("isFeatured")}
              />
              <Label htmlFor="isFeatured" className="cursor-pointer">
                Feature on Homepage?
              </Label>
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <Link href="/admin">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSaving} className="min-w-[120px]">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? "Update Puppy" : "Create Puppy"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
