import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePuppy } from "@/hooks/use-puppies";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, ArrowLeft } from "lucide-react";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Full address is required"),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  housingType: z.enum(["house", "apartment"]),
  ownership: z.enum(["owner", "tenant"]),
  landlordAgreement: z.boolean().optional(),
  hasGarden: z.boolean(),
  isGardenFenced: z.boolean().optional(),
  numAdults: z.coerce.number().min(1),
  numChildren: z.coerce.number().min(0),
  childrenAges: z.string().optional(),
  otherAnimals: z.string().optional(),
  animalsVaccinated: z.string().optional(),
  hadDogsPast: z.boolean(),
  previousAnimalsFate: z.string().optional(),
  hoursAlone: z.coerce.number().min(0),
  sleepingArea: z.string().min(2, "Required"),
  trainingResponsibility: z.string().min(2, "Required"),
  vacationPlan: z.string().min(2, "Required"),
  hasBudget: z.boolean(),
  understandsMisbehavior: z.boolean(),
  readyToCommit: z.boolean(),
  acceptsVisit: z.boolean(),
  pickupDate: z.string().min(1, "Required"),
  deliveryDate: z.string().optional(),
});

type InquiryForm = z.infer<typeof inquirySchema>;

export default function InquiryPage() {
  const [, params] = useRoute("/inquiry/:id");
  const [, setLocation] = useLocation();
  const id = parseInt(params?.id || "0");
  const { data: puppy, isLoading } = usePuppy(id);
  const { toast } = useToast();

  const form = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      housingType: "house",
      ownership: "owner",
      hasGarden: false,
      hadDogsPast: false,
      hasBudget: false,
      understandsMisbehavior: false,
      readyToCommit: false,
      acceptsVisit: false,
      numAdults: 1,
      numChildren: 0,
      hoursAlone: 0,
    },
  });

  const onSubmit = async (data: InquiryForm) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, puppyId: id }),
      });
      const result = await res.json();
      
      toast({
        title: "Inquiry Submitted",
        description: result.message,
      });
      
      setLocation(`/puppies/${id}`);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  if (!puppy) return <div>Puppy not found</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => setLocation(`/puppies/${id}`)} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to {puppy.name}
        </Button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-border shadow-xl"
        >
          <h1 className="text-3xl font-display font-bold mb-8">Inquiry for {puppy.name}</h1>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name and Surname</Label>
                  <Input {...form.register("name")} />
                  {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" {...form.register("email")} />
                  {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input {...form.register("phone")} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Full Address</Label>
                  <Textarea {...form.register("address")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-3">
                  <Label>Type of Housing</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="house" {...form.register("housingType")} /> House
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="apartment" {...form.register("housingType")} /> Apartment
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Are you:</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="owner" {...form.register("ownership")} /> Owner
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="tenant" {...form.register("ownership")} /> Tenant
                    </label>
                  </div>
                  {form.watch("ownership") === "tenant" && (
                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox onCheckedChange={(v) => form.setValue("landlordAgreement", !!v)} />
                      <span className="text-sm">Landlord's agreement obtained?</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox onCheckedChange={(v) => form.setValue("hasGarden", !!v)} />
                  <Label>Do you have a garden?</Label>
                </div>
                {form.watch("hasGarden") && (
                  <div className="flex items-center gap-2 ml-6">
                    <Checkbox onCheckedChange={(v) => form.setValue("isGardenFenced", !!v)} />
                    <span className="text-sm">Is it fenced?</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Number of adults</Label>
                  <Input type="number" {...form.register("numAdults")} />
                </div>
                <div className="space-y-2">
                  <Label>Number of children</Label>
                  <Input type="number" {...form.register("numChildren")} />
                </div>
                <div className="space-y-2">
                  <Label>Ages of children</Label>
                  <Input {...form.register("childrenAges")} />
                </div>
              </div>
            </section>

            {/* Experience and Animals */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2">Experience and Animals</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Do you currently have other animals?</Label>
                  <Textarea {...form.register("otherAnimals")} placeholder="Specify species and ages" />
                </div>
                <div className="space-y-2">
                  <Label>If yes, are they vaccinated and sociable with puppies?</Label>
                  <Input {...form.register("animalsVaccinated")} />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox onCheckedChange={(v) => form.setValue("hadDogsPast", !!v)} />
                  <Label>Have you had dogs in the past?</Label>
                </div>
                <div className="space-y-2">
                  <Label>What happened to your previous animals?</Label>
                  <Input {...form.register("previousAnimalsFate")} />
                </div>
              </div>
            </section>

            {/* Lifestyle and Logistics */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2">Lifestyle and Logistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hours per day puppy left alone</Label>
                  <Input type="number" {...form.register("hoursAlone")} />
                </div>
                <div className="space-y-2">
                  <Label>Where will the puppy sleep?</Label>
                  <Input {...form.register("sleepingArea")} />
                </div>
                <div className="space-y-2">
                  <Label>Who will take care of training/walks?</Label>
                  <Input {...form.register("trainingResponsibility")} />
                </div>
                <div className="space-y-2">
                  <Label>Plan for vacations?</Label>
                  <Input {...form.register("vacationPlan")} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox onCheckedChange={(v) => form.setValue("hasBudget", !!v)} />
                <Label>Do you have a budget for vet expenses and quality food?</Label>
              </div>
            </section>

            {/* Commitment */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2">Commitment</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox onCheckedChange={(v) => form.setValue("understandsMisbehavior", !!v)} />
                  <span className="text-sm">Do you understand that a puppy may misbehave?</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox onCheckedChange={(v) => form.setValue("readyToCommit", !!v)} />
                  <span className="text-sm">Are you ready to commit for the next 10 to 15 years?</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox onCheckedChange={(v) => form.setValue("acceptsVisit", !!v)} />
                  <span className="text-sm">Do you accept a courtesy visit before or after adoption?</span>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Puppy pickup date</Label>
                <Input type="date" {...form.register("pickupDate")} />
              </div>
              <div className="space-y-2">
                <Label>Puppy delivery date (optional)</Label>
                <Input type="date" {...form.register("deliveryDate")} />
              </div>
            </section>

            <Button type="submit" className="w-full py-6 text-lg rounded-xl" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
              Submit Inquiry
            </Button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
