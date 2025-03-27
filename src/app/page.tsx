import CurrencyConverter from "@/components/currency-converter"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <h1 className="text-2xl font-bold">Currency Converter</h1>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <CurrencyConverter />
      </div>
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Currency Converter. All rights reserved.
        </div>
      </footer>
    </main>
  )
}

