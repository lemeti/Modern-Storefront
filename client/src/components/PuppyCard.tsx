import { Link } from "wouter";
import { type Puppy } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface PuppyCardProps {
  puppy: Puppy;
}

export function PuppyCard({ puppy }: PuppyCardProps) {
  return (
    <Card className="group overflow-hidden rounded-3xl border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={puppy.imageUrl}
          alt={puppy.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {puppy.isFeatured && (
          <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-accent opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white hover:scale-110">
          <Heart className="w-5 h-5 fill-current" />
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {puppy.name}
          </h3>
        </div>
        
        <div className="space-y-1 mb-4">
          <p className="text-sm font-medium text-primary uppercase tracking-wide">
            {puppy.breed}
          </p>
          <p className="text-sm text-muted-foreground">
            {puppy.age} months old
          </p>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {puppy.description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-6 pt-0 mt-auto">
        <Link href={`/puppies/${puppy.id}`} className="w-full">
          <Button className="w-full rounded-xl py-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
            Meet {puppy.name}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
