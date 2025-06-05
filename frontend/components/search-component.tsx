"use client"

import * as React from "react"
import { SearchIcon, TrendingUpIcon, BrainCircuitIcon } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export default function FinancialAISearch() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [aiResponse, setAIResponse] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const responseRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === " " && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  React.useEffect(() => {
    if (aiResponse) {
      responseRef.current?.focus()
    }
  }, [aiResponse])

  const handleSearch = async () => {
    // Simulating AI response - replace with actual API call
    setAIResponse(`AI analysis for: "${query}"`)
    setQuery("")
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-64 lg:w-96"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <BrainCircuitIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        <span className="hidden lg:inline-flex">Ask AI about market trends...</span>
        <span className="inline-flex lg:hidden">Market AI...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">
            {navigator.platform.toLowerCase().includes("mac") ? "⌘" : "Ctrl"}
          </span>{" "}
          Space
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        label="AI Market Analysis"
      >
        <div className="flex items-center border-b px-3 w-full">
          <CommandInput
            ref={inputRef}
            placeholder="Ask about financial markets, risks, or trends..."
            value={query}
            onValueChange={setQuery}
            className="w-[400px]"
          />
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggested Queries">
            <CommandItem onSelect={() => setQuery("Analyze current market volatility")}>
              <TrendingUpIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Analyze current market volatility</span>
            </CommandItem>
            <CommandItem onSelect={() => setQuery("Predict interest rate impact")}>
              <TrendingUpIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Predict interest rate impact</span>
            </CommandItem>
            <CommandItem onSelect={() => setQuery("Assess global economic risks")}>
              <TrendingUpIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Assess global economic risks</span>
            </CommandItem>
          </CommandGroup>
          {query && (
            <CommandItem onSelect={handleSearch}>
              <SearchIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Search: {query}</span>
            </CommandItem>
          )}
        </CommandList>
        {aiResponse && (
          <div className="border-t px-3 py-4">
            <h3 className="mb-2 text-sm font-medium" id="ai-response-heading">
              AI Market Analysis:
            </h3>
            <div
              ref={responseRef}
              tabIndex={-1}
              role="region"
              aria-labelledby="ai-response-heading"
              className="text-sm text-muted-foreground focus:outline-none"
            >
              {aiResponse}
            </div>
          </div>
        )}
      </CommandDialog>
    </>
  )
}