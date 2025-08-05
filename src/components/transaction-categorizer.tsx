"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wand2, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  categorizeTransaction,
  type CategorizeTransactionOutput,
} from "@/ai/flows/categorize-transaction";
import { Badge } from "./ui/badge";

const formSchema = z.object({
  description: z.string().min(3, "Please enter at least 3 characters."),
});

export function TransactionCategorizer() {
  const [result, setResult] = useState<CategorizeTransactionOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await categorizeTransaction({
        transactionDescription: values.description,
      });
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description:
          "Failed to categorize transaction. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          <CardTitle>Transaction Categorizer</CardTitle>
        </div>
        <CardDescription>
          Use AI to automatically categorize transaction descriptions.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 'Payment for electricity bill'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {result && (
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Categorization Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Category
                    </p>
                    <Badge variant="default" className="text-lg">
                      {result.category}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Confidence
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {(result.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Categorizing...
                </>
              ) : (
                "Categorize"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
