import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Contact() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // If opened with ?puppy=ID, show the full adoption inquiry form
  const [inquiryFor, setInquiryFor] = useState<{ id?: string; name?: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const puppy = params.get("puppy");
    const name = params.get("name");
    if (puppy || name) {
      setInquiryFor({ id: puppy || undefined, name: name || undefined });
    } else {
      setInquiryFor(null);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    // In a real app you'd send this to an endpoint. For now, show the requested message.
    toast({
      title: "Inquiry Submitted",
      description: "Please contact the seller for the deposit payment before proceeding.",
    });

    form.reset();

    // After sending we could redirect back to puppies or show confirmation
    setLocation("/puppies");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {inquiryFor ? `Adoption Inquiry — ${inquiryFor.name ?? ""}` : "Get in Touch"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {inquiryFor ? "Please fill in the form below to apply for adoption." : "Have questions about a puppy? Want to schedule a visit? We'd love to hear from you."}
            </p>
          </div>
        </section>

        <section className="py-20 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-10">
              <h2 className="font-display text-3xl font-bold">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 mr-6">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Our Location</h3>
                    <p className="text-muted-foreground">123 Dogwood Lane<br/>Pawtown, CA 90210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 mr-6">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 mr-6">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                    <p className="text-muted-foreground">contact@puppylove.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 mr-6">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Visiting Hours</h3>
                    <p className="text-muted-foreground">By appointment only<br/>Weekends available upon request</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-border/50">
              <h2 className="font-display text-2xl font-bold mb-6">
                {inquiryFor ? `Adoption Application${inquiryFor.name ? ` — ${inquiryFor.name}` : ""}` : "Send a Message"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {inquiryFor && (
                  <>
                    <input type="hidden" name="puppyId" value={inquiryFor.id} />
                    <input type="hidden" name="puppyName" value={inquiryFor.name} />
                  </>
                )}

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name and Surname</label>
                    <Input name="fullName" required placeholder="John Doe" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Address</label>
                    <Input name="address" required placeholder="123 Main St, City, State" className="h-12 rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input name="phone" required placeholder="(555) 123-4567" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input name="email" required type="email" placeholder="john@example.com" className="h-12 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Type of Housing</label>
                  <div className="flex gap-4">
                    <label><input name="housing" type="radio" value="house" /> House</label>
                    <label><input name="housing" type="radio" value="apartment" /> Apartment</label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Are you</label>
                  <div className="flex gap-4 items-center">
                    <label><input name="status" type="radio" value="owner" /> Owner</label>
                    <label><input name="status" type="radio" value="tenant" /> Tenant</label>
                    <label className="ml-4"><input name="tenantAgreement" type="checkbox" /> If tenant, landlord agreement obtained?</label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Do you have a garden?</label>
                  <div className="flex gap-4 items-center">
                    <label><input name="hasGarden" type="radio" value="yes" /> Yes</label>
                    <label className="ml-4"><input name="gardenFenced" type="checkbox" /> If yes, fenced?</label>
                    <label className="ml-4"><input name="hasGarden" type="radio" value="no" /> No</label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Household Composition</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input name="numAdults" placeholder="Number of adults" className="h-12 rounded-xl" />
                    <Input name="numChildren" placeholder="Number of children" className="h-12 rounded-xl" />
                    <Input name="agesOfChildren" placeholder="Ages of children (comma separated)" className="h-12 rounded-xl" />
                  </div>
                </div>

                {/* Experience and Animals */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience and Animals</label>
                  <Textarea name="otherAnimals" placeholder="Do you currently have other animals? If yes, please list and state vaccination/socialization status." className="min-h-[120px] rounded-xl resize-none" />
                  <div className="flex gap-4">
                    <label><input name="hadDogsBefore" type="radio" value="yes" /> Have had dogs before</label>
                    <label><input name="hadDogsBefore" type="radio" value="no" /> No</label>
                  </div>
                  <Textarea name="previousAnimalsOutcome" placeholder="What happened to your previous animals?" className="min-h-[80px] rounded-xl resize-none" />
                </div>

                {/* Lifestyle and Logistics */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lifestyle and Logistics</label>
                  <Input name="hoursAlone" placeholder="How many hours per day will the puppy be left alone?" className="h-12 rounded-xl" />
                  <Input name="sleepingLocation" placeholder="Where will the puppy sleep?" className="h-12 rounded-xl" />
                  <Input name="whoTrains" placeholder="Who will take care of training and walks?" className="h-12 rounded-xl" />
                  <Input name="vacationPlan" placeholder="What will happen to the dog during your vacations?" className="h-12 rounded-xl" />
                  <div className="flex items-center gap-4">
                    <label><input name="hasBudget" type="radio" value="yes" /> I have a budget for vet & quality food</label>
                    <label><input name="hasBudget" type="radio" value="no" /> No</label>
                  </div>
                </div>

                {/* Commitment */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Commitment</label>
                  <div className="flex flex-wrap gap-4">
                    <label><input name="understandBehavior" type="radio" value="yes" /> Understand puppy may misbehave</label>
                    <label><input name="commitLongTerm" type="radio" value="yes" /> Ready to commit for 10-15 years</label>
                    <label><input name="acceptVisit" type="radio" value="yes" /> Accept courtesy home visit</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Puppy pickup date</label>
                    <Input name="pickupDate" type="date" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Puppy delivery date (optional)</label>
                    <Input name="deliveryDate" type="date" className="h-12 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional message (optional)</label>
                  <Textarea name="message" placeholder="Anything else you'd like to tell us..." className="min-h-[120px] rounded-xl resize-none" />
                </div>

                <Button type="submit" size="lg" className="w-full py-6 text-lg rounded-xl">
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
