import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Award, Home, Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-accent" />,
      title: "Love & Care",
      desc: "Every puppy is raised in our home with boundless love and attention."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Health First",
      desc: "Strict breeding standards ensuring healthy genetics and happy lives."
    },
    {
      icon: <Home className="w-8 h-8 text-blue-500" />,
      title: "Family Socialization",
      desc: "Accustomed to kids, noises, and family life before they come to you."
    },
    {
      icon: <Smile className="w-8 h-8 text-yellow-500" />,
      title: "Lifetime Support",
      desc: "We don't just sell puppies; we build relationships for the dog's life."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="py-20 bg-secondary/30 text-center">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">About Labrador Retriever Puppies For Adoption and Rescue</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting loving families with healthy, happy puppies since 2010.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg text-muted-foreground"
              >
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                <p className="mb-6">
                  At Labrador Retriever Puppies For Adoption and Rescue, we believe that dogs aren't just pets—they're family. Our journey began over a decade ago with a simple mission: to raise puppies the right way. No kennels, no cages, just a loving home environment where each puppy gets the start they deserve.
                </p>
                <p>
                  We specialize in ethically breeding Golden Retrievers and Labradors, focusing on temperament and health above all else. When you adopt from us, you're not just getting a dog; you're gaining a loyal companion raised with purpose and heart.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl rotate-3 bg-secondary">
                  <img 
                    src="https://scontent.fdla4-1.fna.fbcdn.net/v/t39.30808-6/606058250_122112077715100518_6078449662331098456_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFuZAACDUDuwBkIy5pMyoR7YfG64am_Jj5h8brhqb8mPra4wdo6pH36gDLcdN9YRWeZ2sgZhjOYiUiNyR5co8E_&_nc_ohc=Ynu2qWDEmwIQ7kNvwGLxnMC&_nc_oc=AdlokyZ17IN0nsI-_LdqFM3cvf4DRVFq6UreWxgcAu0VrpxigIZg49ni6hzavZD-cGk&_nc_zt=23&_nc_ht=scontent.fdla4-1.fna&_nc_gid=1ivfWpz2IeOj1gNIsmQcmQ&oh=00_Afpr448sK5n-nVXxnQrUW0ySeSZnvsoS_fcCY9dgFO77TA&oe=696440B9" 
                    alt="Happy dogs playing" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white border-y border-border/50">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-center mb-16">Why Choose Us?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background p-8 rounded-3xl text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-border">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
