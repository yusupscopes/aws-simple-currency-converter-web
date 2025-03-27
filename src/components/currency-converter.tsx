"use client";

import { useState } from "react";
import { ArrowRight, ArrowRightLeft, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Sample currencies based on common ones
const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "INR", name: "Indian Rupee" },
];

interface ConversionResult {
  from_currency: string;
  to_currency: string;
  amount: number;
  exchange_rate: number;
  converted_amount: number;
  datetime: string;
  countries: string[];
}

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IDR");
  const [amount, setAmount] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast("Invalid amount", {
        description: "Please enter a valid positive number",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, you would fetch from an actual API
      // For this example, we'll simulate an API call with the sample data
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockResult: ConversionResult = {
        from_currency: fromCurrency,
        to_currency: toCurrency,
        amount: Number(amount),
        exchange_rate:
          fromCurrency === "USD" && toCurrency === "IDR" ? 16345.0 : 1.2, // Mock rate
        converted_amount: 0,
        datetime: new Date().toISOString(),
        countries: toCurrency === "IDR" ? ["Indonesia"] : ["Unknown"],
      };

      mockResult.converted_amount =
        mockResult.amount * mockResult.exchange_rate;

      setResult(mockResult);
    } catch (error) {
      toast("Conversion failed", {
        description: "There was an error converting your currency",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Currency Converter
        </CardTitle>
        <CardDescription className="text-center">
          Convert between currencies with real-time exchange rates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <Label htmlFor="from-currency">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger id="from-currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 flex-shrink-0 mb-0.5"
            onClick={handleSwap}
          >
            <ArrowRightLeft className="h-4 w-4" />
            <span className="sr-only">Swap currencies</span>
          </Button>

          <div className="space-y-2">
            <Label htmlFor="to-currency">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger id="to-currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">
                {result.amount.toFixed(2)} {result.from_currency}
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
              <div className="font-bold">
                {result.converted_amount.toFixed(2)} {result.to_currency}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                Exchange rate: 1 {result.from_currency} ={" "}
                {result.exchange_rate.toFixed(4)} {result.to_currency}
              </p>
              <p>Last updated: {new Date(result.datetime).toLocaleString()}</p>
              {result.countries.length > 0 && (
                <p>Country: {result.countries.join(", ")}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleConvert} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            "Convert"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
