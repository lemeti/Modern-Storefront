import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePuppy } from "@/hooks/use-puppies";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Dog, Heart, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export default function PuppyDetails() {
  const [, params] = useRoute("/puppies/:id");
  const id = parseInt(params?.id || "0");
  const { data: puppy, isLoading } = usePuppy(id);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-[500px] rounded-3xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!puppy) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center flex-col p-4 text-center">
          <Dog className="w-24 h-24 text-muted-foreground/30 mb-6" />
          <h1 className="text-4xl font-display font-bold mb-4">Puppy Not Found</h1>
          <p className="text-muted-foreground mb-8">This puppy seems to have found a home or doesn't exist.</p>
          <Link href="/puppies">
            <Button size="lg" className="rounded-xl">Browse Available Puppies</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse photos from stored JSON string (if any)
  const photos = useMemo(() => {
    try {
      const parsed = puppy.photos ? JSON.parse(puppy.photos) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [puppy?.photos]);

  // initialize main image to imageUrl or first photo
  if (!mainImage) {
    setMainImage(puppy.imageUrl || photos[0]);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link href="/puppies">
            <Button variant="ghost" className="mb-8 hover:bg-muted/50 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Available Puppies
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-secondary/30">
                <img 
                  src={mainImage} 
                  alt={puppy.name} 
                  className="w-full h-full object-cover"
                />
                {puppy.isFeatured && (
                  <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold uppercase tracking-wider shadow-lg">
                    Featured
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {photos.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {/* show main image as first thumbnail if distinct */}
                  {Array.from(new Set([puppy.imageUrl, ...photos])).map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImage(url)}
                      className={`rounded-xl overflow-hidden h-20 w-full border ${mainImage === url ? "border-primary" : "border-border"}`}
                    >
                      <img src={url} alt={`${puppy.name} ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
                {puppy.name}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-primary/10 text-primary font-medium">
                  <Dog className="w-5 h-5 mr-2" />
                  {puppy.breed}
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-medium">
                  <Calendar className="w-5 h-5 mr-2" />
                  {puppy.age} Months Old
                </div>
              </div>

              <div className="prose prose-lg text-muted-foreground mb-10 max-w-none">
                <p>{puppy.description}</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <h3 className="font-display text-2xl font-bold mb-4">Interested in {puppy.name}?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-5 h-5 mr-3 text-primary" />
                    <span>Available at our Pawtown location</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Heart className="w-5 h-5 mr-3 text-accent" />
                    <span>Up to date on vaccinations & vet checked</span>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <Link href={`/inquiry/${puppy.id}`} className="flex-1">
                    <Button size="lg" className="w-full py-6 text-lg rounded-xl shadow-lg shadow-primary/20">
                      Inquire Now
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="px-6 py-6 rounded-xl">
                    <Mail className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
