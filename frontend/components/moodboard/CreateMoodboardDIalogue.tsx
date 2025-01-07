import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "@tanstack/react-router";
import useUserStore from "@/store/userStore";

// Define the form schema using zod
export const moodBoardFormSchema = z.object({
  name: z.string().min(1, "Moodboard name is required"),
  description: z.string().optional(),
});

export function CreateMoodboardDialog() {
  const navigate = useNavigate();
  const { userInfo } = useUserStore((store) => store);

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(moodBoardFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof moodBoardFormSchema>) => {
    try {
      const logto_userId = userInfo?.sub;
      Object.assign(values, { logto_userId });
      const res = await fetch(
        "http://localhost:8000/api/v1/moodboards/create_moodboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create moodboard");
      }
      const data = await res.json();
      navigate({ to: `/project/moodboard/${data.id}` });
      return res.json();
    } catch (error) {
      console.error("Error creating moodboard:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-cr8-purple hover:bg-cr8-purple/20 text-white w-full"
        >
          Create Moodboard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-cr8-charcoal/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Moodboard
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Moodboard Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter moodboard name"
                      className="bg-cr8-dark/20 border-cr8-charcoal/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter moodboard description"
                      className="bg-cr8-dark/20 border-cr8-charcoal/10 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Start Moodboarding
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
