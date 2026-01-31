"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Bot, Loader, User, Search, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateAnswer, summarizeHistory } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";

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

const faqs = [
  {
    question: "What is FLEXTION?",
    answer: "FLEXTION is a next-generation platform designed to enhance creativity and productivity through advanced artificial intelligence. It offers a suite of tools for content creation, data analysis, and workflow automation.",
  },
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by navigating to the login page and clicking the 'Forgot Password' link. You will receive an email with instructions on how to set a new password.",
  },
  {
    question: "What are the subscription plans available?",
    answer: "We offer several subscription plans: Free, Pro, and Enterprise. The Free plan gives you basic access. The Pro plan unlocks advanced features for individual users, and the Enterprise plan provides custom solutions for teams and organizations. You can find more details on our pricing page.",
  },
  {
    question: "Is there a free trial for the Pro plan?",
    answer: "Yes, we offer a 14-day free trial for our Pro plan. This allows you to explore all the premium features before committing to a subscription. No credit card is required to start the trial.",
  },
];

export default function Home() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
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

  const handleSummarize = async () => {
    const userQueries = history.filter(item => item.type === 'user').map(item => item.text);
    if (userQueries.length === 0) {
      toast({
        title: "History is empty",
        description: "Ask some questions first to get a summary.",
      });
      return;
    }
    
    setIsSummarizing(true);
    try {
      const result = await summarizeHistory(userQueries);
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to summarize history.",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background/95 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold font-headline">FLEXTION</h1>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </header>

        <main className="flex-1 grid md:grid-cols-[1fr_350px] gap-8 p-4 md:p-8">
          <div className="flex flex-col gap-8">
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

            <div className="space-y-4">
              <h2 className="font-headline text-2xl">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          
          <aside className="flex flex-col">
            <Card className="shadow-lg flex-1 flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-headline text-xl">History</CardTitle>
                <Button variant="outline" size="sm" onClick={handleSummarize} disabled={isSummarizing || history.filter(i => i.type === 'user').length === 0}>
                  {isSummarizing ? <Loader className="animate-spin mr-2 h-4 w-4" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Summarize
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-6 p-2">
                  {history.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">Your conversation history will appear here.</p>
                  ) : (
                    history.map((item, index) => (
                      <div key={index} className={`flex items-start gap-3 ${item.type === 'user' ? 'justify-end' : ''}`}>
                        {item.type === 'ai' && <Avatar className="h-8 w-8 border border-primary"><AvatarFallback className="bg-primary/20"><Bot className="h-4 w-4 text-primary"/></AvatarFallback></Avatar>}
                        <div className={`rounded-lg p-3 text-sm max-w-[80%] ${item.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          {item.text}
                        </div>
                        {item.type === 'user' && <Avatar className="h-8 w-8"><AvatarFallback><User className="h-4 w-4"/></AvatarFallback></Avatar>}
                      </div>
                    ))
                  )}
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
              </CardContent>
            </Card>
          </aside>
        </main>
      </div>
      
      <AlertDialog open={!!summary} onOpenChange={(open) => !open && setSummary(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              History Summary
            </AlertDialogTitle>
            <AlertDialogDescription>
              Here is an AI-generated summary of your recent questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="text-sm text-muted-foreground max-h-[400px] overflow-y-auto pr-4">
            {summary}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
