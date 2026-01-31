"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Search, Send, History, Check } from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ResultsView } from "@/components/results-view";
import { LoadingView } from "@/components/loading-view";

const formSchema = z.object({
  query: z.string().min(3, "Query must be at least 3 characters long."),
});

type FormValues = z.infer<typeof formSchema>;

const personas = [
  { name: "Investment Advisor", icon: User },
  { name: "High Net-Worth Individual", icon: User },
  { name: "Family Office", icon: User },
  { name: "Chief Investment Officer", icon: User },
];

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);

    try {
      // Simulate API call for 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setShowResults(true);
      reset();
    } catch (error) {
      console.error(error);
      setShowResults(false);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get an answer from the AI.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background md:px-6">
          <div className="flex items-center gap-2">
            <Image src="https://webapp.flextion.ai/assets/img/logo-ani-svg.svg" alt="FLEXTION Logo" width={150} height={32} />
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-secondary-foreground">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center">
          {isLoading ? (
            <LoadingView />
          ) : showResults ? (
            <ResultsView />
          ) : (
            <div className="p-4 md:p-8 w-full">
              <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center gap-4 py-8">
                  <Image
                    src="https://webapp.flextion.ai/assets/img/logo-ani-svg.svg"
                    alt="FLEXTION Logo"
                    width={200}
                    height={42}
                    className="filter-none"
                  />
                  <p className="text-lg text-muted-foreground">What do you need help with?</p>
                  
                  <div className="w-full max-w-2xl flex flex-col items-start gap-3">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          {...register("query")}
                          placeholder="Ask a Question"
                          className="w-full rounded-full bg-[hsl(0,3%,21%)] border-input h-14 pl-12 pr-14 text-sm"
                          disabled={isLoading}
                          autoComplete="off"
                        />
                        <Button type="submit" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 text-muted-foreground hover:bg-accent" disabled={isLoading}>
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>
                      {errors.query && <p className="text-xs text-destructive mt-2 text-left pl-4">{errors.query.message}</p>}
                    </form>

                    <div className="flex items-center gap-2">
                      <Button variant="secondary" className="rounded-full h-8 px-3 text-xs">
                        <Check className="mr-2 h-4 w-4" />
                        FAQ
                      </Button>
                      <Button variant="secondary" className="rounded-full h-8 px-3 text-xs">
                        <History className="mr-2 h-4 w-4" />
                        History
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 text-center">
                  <h2 className="font-headline text-xl">Select a persona which fits you best</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                    {personas.map((persona) => (
                      <Card 
                        key={persona.name} 
                        className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-card text-card-foreground hover:bg-accent transition-colors rounded-xl shadow-md border-transparent"
                      >
                        <persona.icon className="w-8 h-8" />
                        <p className="font-semibold text-center text-xs">{persona.name}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
