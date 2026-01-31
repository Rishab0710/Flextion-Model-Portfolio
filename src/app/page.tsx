
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader, User, Search, Send, History, Check } from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateAnswer } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  query: z.string().min(3, "Query must be at least 3 characters long."),
});

type FormValues = z.infer<typeof formSchema>;

type HistoryItem = {
  type: 'user';
  text: string;
} | {
  type: 'ai';
  text: string;
};

const personas = [
  { name: "Investment Advisor", icon: User },
  { name: "High Net-Worth Individual", icon: User },
  { name: "Family Office", icon: User },
  { name: "Chief Investment Officer", icon: User },
];

export default function Home() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
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
    setHistory((prev) => [...prev, { type: 'user', text: data.query }]);

    try {
      const answer = await generateAnswer(data.query);
      setHistory((prev) => [...prev, { type: 'ai', text: answer }]);
      reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get an answer from the AI.",
      });
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory.pop();
        return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background/95 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-2">
            <Image src="https://webapp.flextion.ai/assets/img/logo-ani-svg.svg" alt="FLEXTION Logo" width={150} height={32} />
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center gap-6 py-8">
              <Image src="https://webapp.flextion.ai/assets/img/logo-ani-svg.svg" alt="FLEXTION Logo" width={240} height={48} style={{filter: 'brightness(0) invert(1)'}} />
              <p className="text-xl text-muted-foreground">What do you need help with?</p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register("query")}
                    placeholder="Ask a Question"
                    className="w-full rounded-full bg-background border-2 border-border h-14 pl-12 pr-14 text-base"
                    disabled={isLoading}
                    autoComplete="off"
                  />
                  <Button type="submit" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 text-muted-foreground hover:bg-white/5" disabled={isLoading}>
                    {isLoading ? <Loader className="animate-spin" /> : <Send className="h-5 w-5" />}
                  </Button>
                </div>
                {errors.query && <p className="text-sm text-destructive mt-2 text-left pl-4">{errors.query.message}</p>}
              </form>

              <div className="flex items-center gap-2">
                <Button variant="secondary" className="rounded-full bg-[hsl(27,15%,85%)] text-neutral-800 hover:bg-[hsl(27,15%,80%)]">
                  <Check className="mr-2 h-4 w-4" />
                  FAQ
                </Button>
                <Button variant="secondary" className="rounded-full bg-[hsl(27,15%,85%)] text-neutral-800 hover:bg-[hsl(27,15%,80%)]">
                  <History className="mr-2 h-4 w-4" />
                  History
                </Button>
              </div>
            </div>

            <div className="space-y-6 text-center">
              <h2 className="font-headline text-2xl">Select a persona which fits you best</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {personas.map((persona) => (
                  <Card 
                    key={persona.name} 
                    className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-[hsl(27,15%,85%)] text-neutral-800 hover:bg-[hsl(27,15%,80%)] transition-colors rounded-xl shadow-md border-transparent"
                  >
                    <persona.icon className="w-8 h-8 text-neutral-600" />
                    <p className="font-semibold text-center text-sm">{persona.name}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
