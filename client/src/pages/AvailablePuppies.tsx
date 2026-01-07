import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePuppies } from "@/hooks/use-puppies";
import { PuppyCard } from "@/components/PuppyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AvailablePuppies() {
  const { data: puppies, isLoading } = usePuppies();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPuppies = puppies?.filter(puppy => 
    puppy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    puppy.breed.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold">Available Puppies</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our current litter of adorable puppies looking for their forever homes.
            </p>
          </div>

          {/* Search/Filter Bar */}
          <div className="max-w-xl mx-auto mb-12 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                className="pl-12 py-6 rounded-2xl bg-white border-border/50 shadow-sm focus:ring-primary/20 text-lg" 
                placeholder="Search by name or breed..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[300px] w-full rounded-3xl" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : filteredPuppies.length > 0 ? (
              filteredPuppies.map((puppy, index) => (
                <motion.div
                  key={puppy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <PuppyCard puppy={puppy} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-24">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">No puppies found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
