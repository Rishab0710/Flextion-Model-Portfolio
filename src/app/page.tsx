
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Bot, Loader, User, Search, Sparkles } from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Intelligent Question Answering
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Have a question? Ask our AI assistant. Type your query below and get an instant response.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-2">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...register("query")}
                      placeholder="e.g., How do I reset my password?"
                      className="pl-10"
                      disabled={isLoading}
                      autoComplete="off"
                    />
                    {errors.query && <p className="text-sm text-destructive mt-1">{errors.query.message}</p>}
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-[100px] shrink-0">
                    {isLoading ? <Loader className="animate-spin" /> : <>Send <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6 p-2">
              {history.map((item, index) => (
                <div key={index} className={`flex items-start gap-3 ${item.type === 'user' ? 'justify-end' : ''}`}>
                  {item.type === 'ai' && <Avatar className="h-8 w-8 border border-primary"><AvatarFallback className="bg-primary/20"><Bot className="h-4 w-4 text-primary"/></AvatarFallback></Avatar>}
                  <div className={`rounded-lg p-3 text-sm max-w-[80%] ${item.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {item.text}
                  </div>
                  {item.type === 'user' && <Avatar className="h-8 w-8"><AvatarFallback><User className="h-4 w-4"/></AvatarFallback></Avatar>}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 border border-primary"><AvatarFallback className="bg-primary/20"><Bot className="h-4 w-4 text-primary"/></AvatarFallback></Avatar>
                  <div className="rounded-lg p-3 text-sm bg-muted flex items-center space-x-2">
                    <Loader className="animate-spin h-4 w-4" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6 text-center">
              <h2 className="font-headline text-2xl">Select a persona which fits you best</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {personas.map((persona) => (
                  <Card key={persona.name} className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted transition-colors rounded-xl shadow-md">
                    <persona.icon className="w-8 h-8 text-muted-foreground" />
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
