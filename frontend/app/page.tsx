"use client";

import {
  ArrowRight,
  ChevronDown,
  CreditCard,
  DollarSign,
  Landmark,
  PieChart,
  Plus,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ScrollArea } from "@/components/ui/scroll-area";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

type NewsType =
  | "raw_material_costs"
  | "laws_and_regulations"
  | "economic_factors"
  | "industry_events"
  | "climate_and_sustainability";

export default function FinancialDashboard() {
  // Mock data for the liquidity forecast chart
  const liquidityForecastData = [
    { date: "2023-06-01", actual: 4000, forecast: 4100 },
    { date: "2023-06-02", actual: 4200, forecast: 4300 },
    { date: "2023-06-03", actual: 4400, forecast: 4200 },
    { date: "2023-06-04", actual: 4100, forecast: 4400 },
    { date: "2023-06-05", actual: 4500, forecast: 4600 },
    { date: "2023-06-06", actual: 4700, forecast: 4800 },
    { date: "2023-06-07", actual: 4800, forecast: 5000 },
  ];

  const [summarizing, setSummarizing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [news, setNews] = useState<any>([]);
  const [selectedType, setSelectedType] = useState<NewsType | null>(null);
  const router = useRouter();

  const handleSummarize = () => {
    if (!selectedType) return;
    setSummarizing(true);
    // Simulating API call
    setTimeout(() => {
      setSummarizing(false);

      router.push("/suggestions");
    }, 1500);
  };

  const handleTypeSelect = async (type: NewsType) => {
    setSelectedType(type);
    try {
      // Simulating API call
      const response = await fetch(`/api/news?type=${type}`, { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto p-6 bg-muted/40">
        <h1 className="sr-only">Financial Dashboard</h1>
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Liquidity
                </CardTitle>
                <DollarSign
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,234,567,890</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cash Position
                </CardTitle>
                <Landmark
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$567,890,123</div>
                <p className="text-xs text-muted-foreground">
                  +1.2% from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Investment Portfolio
                </CardTitle>
                <PieChart
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$789,012,345</div>
                <p className="text-xs text-muted-foreground">
                  +0.8% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Risk Exposure
                </CardTitle>
                <CreditCard
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Low</div>
                <p className="text-xs text-muted-foreground">
                  No significant changes
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Liquidity Forecast</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={liquidityForecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#8884d8"
                      name="Actual"
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#82ca9d"
                      name="Forecast"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Recent Transactions</span>
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push("/cashflow");
                    }}
                    className="flex items-center justify-center"
                  >
                    <span>View Flow</span>
                    <ArrowRight className="ml-2" aria-hidden="true" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  Last 5 transactions across all accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-8" aria-label="Recent transactions list">
                  {[
                    {
                      name: "Wire Transfer",
                      amount: "-$50,000",
                      date: "2023-06-15",
                    },
                    {
                      name: "Interest Income",
                      amount: "+$12,345",
                      date: "2023-06-14",
                    },
                    {
                      name: "Bond Purchase",
                      amount: "-$1,000,000",
                      date: "2023-06-13",
                    },
                    {
                      name: "Dividend Payment",
                      amount: "-$500,000",
                      date: "2023-06-12",
                    },
                    {
                      name: "FX Settlement",
                      amount: "+$75,000",
                      date: "2023-06-11",
                    },
                  ].map((transaction, index) => (
                    <li key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{transaction.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {transaction.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date}
                        </p>
                      </div>
                      <div
                        className={`ml-auto font-medium ${
                          transaction.amount.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                        aria-label={`Amount: ${transaction.amount}`}
                      >
                        {transaction.amount}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-1 pb-2">
                <div>
                  <CardTitle>Recent News</CardTitle>
                  <CardDescription>
                    Market-affecting news from the last 24 hours
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="capitalize"
                        variant="outline"
                        size="sm"
                      >
                        {selectedType
                          ? selectedType.replace(/_/g, " ")
                          : "Select Type"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {[
                        "raw_material_costs",
                        "laws_and_regulations",
                        "economic_factors",
                        "industry_events",
                        "climate_and_sustainability",
                      ].map((type) => (
                        <DropdownMenuItem
                          key={type}
                          onSelect={() => handleTypeSelect(type as NewsType)}
                          className={cn("capitalize")}
                        >
                          {type.replace(/_/g, " ")}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSummarize}
                    disabled={summarizing}
                    className="relative overflow-hidden hover:bg-gradient-to-r from-blue-400 to-purple-500 hover:text-white"
                  >
                    <span className="relative z-10">
                      {summarizing ? "Summarizing..." : "AI Summarization"}
                    </span>
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4" aria-label="Recent market news">
                  <ScrollArea className="h-[200px] rounded-md">
                    {news.map((item: any, index: any) => (
                      <li
                        key={index}
                        className={cn(
                          "cursor-pointer rounded-lg p-3 transition-colors duration-200",
                          item.liquidity_impact ===
                            "Positive Impact on Liquidity" &&
                            "hover:bg-green-100 dark:hover:bg-green-900/20",
                          item.liquidity_impact === "Negative" &&
                            "hover:bg-red-100 dark:hover:bg-red-900/20",
                          item.liquidity_impact === "Neutral" &&
                            "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                        )}
                        onClick={() => console.log(`Clicked: ${item.title}`)}
                      >
                        <div className="flex space-x-2">
                          <p
                            className={cn(
                              "h-3 w-3 rounded-full",
                              item.liquidity_impact ===
                                "Positive Impact on Liquidity" &&
                                "bg-green-400 dark:bg-green-900/20",
                              item.liquidity_impact === "Negative" &&
                                "bg-red-400 dark:bg-red-900/20",
                              item.liquidity_impact === "Neutral" &&
                                "bg-gray-400 dark:bg-gray-800/50"
                            )}
                          >
                            {" "}
                          </p>
                          <p className="text-sm font-medium leading-none">
                            {item.title}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Suggestion: {item.decisions[0] || ""}
                        </p>
                      </li>
                    ))}
                  </ScrollArea>
                </ul>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Perform common treasury operations
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                    New Transaction
                  </Button>
                  <Button variant="outline">Generate Report</Button>
                </div>
                <div>
                  <Select>
                    <SelectTrigger aria-label="Select treasury operation">
                      <SelectValue placeholder="Select operation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash-pooling">Cash Pooling</SelectItem>
                      <SelectItem value="fx-hedging">FX Hedging</SelectItem>
                      <SelectItem value="investment">
                        Manage Investments
                      </SelectItem>
                      <SelectItem value="risk-assessment">
                        Risk Assessment
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
