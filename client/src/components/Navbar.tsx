import { Link, useLocation } from "wouter";
import { PawPrint, Menu, X, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/puppies", label: "Available Puppies" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const isAdmin = !!user;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
            <PawPrint className="h-6 w-6 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
            PuppyLove
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {isAdmin && (
            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5 text-primary">
                <ShieldCheck className="w-4 h-4" />
                Admin Dashboard
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-6 space-y-4 shadow-lg animate-accordion-down">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-base font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link 
              href="/admin" 
              className="block text-base font-medium text-primary pt-4 border-t border-border"
              onClick={() => setIsOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
