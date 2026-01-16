import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Dog, Heart, Shield, Star } from "lucide-react";
import { usePuppies } from "@/hooks/use-puppies";
import { PuppyCard } from "@/components/PuppyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Home() {
  const { data: puppies, isLoading } = usePuppies();
  const featuredPuppies = puppies?.filter(p => p.isFeatured).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-secondary/30">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span>Premium Quality Puppies</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-foreground">
                Find Your New <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Best Friend</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                We raise happy, healthy, and well-socialized puppies ready to join your loving family. Start your journey today.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/puppies">
                  <Button size="lg" className="rounded-2xl px-8 py-6 text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:-translate-y-1 transition-all">
                    View Available Puppies
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="rounded-2xl px-8 py-6 text-lg border-2 hover:bg-background/50">
                    Learn About Us
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2 relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {/* Unsplash image of a golden retriever puppy */}
                <img 
                  src="https://i.pinimg.com/1200x/d7/3a/3a/d73a3a725c7983544370b02109c50225.jpg" 
                  alt="Happy Golden Retriever Puppy" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Health Guarantee</h3>
              <p className="text-muted-foreground">Every puppy comes with a comprehensive health check and 1-year genetic health guarantee.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Raised with Love</h3>
              <p className="text-muted-foreground">Our puppies are raised in our home, not a kennel, ensuring they are socialized and happy.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 text-secondary-foreground">
                <Dog className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Lifetime Support</h3>
              <p className="text-muted-foreground">We are here for you and your puppy for life. Questions? Concerns? Call us anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Puppies */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold mb-4">Featured Puppies</h2>
              <p className="text-muted-foreground text-lg">Meet some of our adorable new arrivals.</p>
            </div>
            <Link href="/puppies">
              <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary/80 hover:bg-primary/10">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[300px] w-full rounded-3xl" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : featuredPuppies.length > 0 ? (
              featuredPuppies.map((puppy) => (
                <PuppyCard key={puppy.id} puppy={puppy} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-white rounded-3xl border border-dashed border-border">
                <p className="text-muted-foreground">No featured puppies at the moment. Check back soon!</p>
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/puppies">
              <Button className="w-full py-6 rounded-xl">View All Puppies</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Ready to meet your new best friend?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Schedule a visit or video call to meet our puppies. We can't wait to help you find the perfect match.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="rounded-2xl px-10 py-6 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
