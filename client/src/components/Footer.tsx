import { Link } from "wouter";
import { PawPrint, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-primary/10 p-2 rounded-full">
                <PawPrint className="h-6 w-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">Labrador Retriever Puppies For Adoption and Rescue</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Ethically raised, health-tested puppies ready to become your new best friend.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/puppies" className="text-muted-foreground hover:text-primary transition-colors">Available Puppies</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>
          
          <div className="hidden">
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li>123 Dogwood Lane</li>
              <li>Pawtown, CA 90210</li>
              <li>(555) 123-4567</li>
              <li>contact@puppylove.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Labrador Retriever Puppies For Adoption and Rescue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
