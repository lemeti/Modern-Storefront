import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type PuppyInput, type PuppyResponse } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// GET /api/puppies
export function usePuppies() {
  return useQuery({
    queryKey: [api.puppies.list.path],
    queryFn: async () => {
      const res = await fetch(api.puppies.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch puppies");
      const data = await res.json();
      return api.puppies.list.responses[200].parse(data);
    },
  });
}

// GET /api/puppies/:id
export function usePuppy(id: number) {
  return useQuery({
    queryKey: [api.puppies.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.puppies.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch puppy");
      const data = await res.json();
      return api.puppies.get.responses[200].parse(data);
    },
    enabled: !isNaN(id),
  });
}

// POST /api/puppies
export function useCreatePuppy() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: PuppyInput) => {
      // Validate locally first to catch simple issues
      const validated = api.puppies.create.input.parse(data);
      
      const res = await fetch(api.puppies.create.path, {
        method: api.puppies.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        const error = await res.json();
        throw new Error(error.message || "Failed to create puppy");
      }
      
      return api.puppies.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.puppies.list.path] });
      toast({
        title: "Success",
        description: "Puppy created successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// PUT /api/puppies/:id
export function useUpdatePuppy() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<PuppyInput> }) => {
      const url = buildUrl(api.puppies.update.path, { id });
      
      const res = await fetch(url, {
        method: api.puppies.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        const error = await res.json();
        throw new Error(error.message || "Failed to update puppy");
      }

      return api.puppies.update.responses[200].parse(await res.json());
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [api.puppies.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.puppies.get.path, id] });
      toast({
        title: "Success",
        description: "Puppy updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// DELETE /api/puppies/:id
export function useDeletePuppy() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.puppies.delete.path, { id });
      const res = await fetch(url, { 
        method: api.puppies.delete.method, 
        credentials: "include" 
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to delete puppy");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.puppies.list.path] });
      toast({
        title: "Success",
        description: "Puppy removed from database",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
