"use client";
import React from "react";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  Brain,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";

const TrendImpact = ({ impact }: { impact: number }) => {
  const color =
    impact > 0
      ? "text-green-500"
      : impact < 0
      ? "text-red-500"
      : "text-yellow-500";
  const Icon =
    impact > 0
      ? TrendingUpIcon
      : impact < 0
      ? TrendingDownIcon
      : AlertTriangleIcon;
  return (
    <span className={`flex items-center ${color}`}>
      <Icon className="w-4 h-4 mr-1" aria-hidden="true" />
      <span aria-live="polite">
        {impact > 0 ? "+" : ""}
        {impact}
      </span>
    </span>
  );
};

export default function AIMarketSuggestions() {
  const [isLoading, setIsLoading] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mongoData, setMongoData] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/ai/get_summary");
        const data = await res.json();
        setMongoData(data[0]);
      } catch (error) {
        console.error("Error fetching AI market suggestions:", error);
        alert("Internal Server Error");
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [isLoading]);

  console.log(mongoData);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const sentimentScore =
    (mongoData.sentiment_summary?.positive /
      mongoData.sentiment_summary?.total) *
    100;
  const liquidityScore =
    (mongoData.liquidity_impact_summary?.positive /
      mongoData.total_articles_analyzed) *
    100;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-4">
            <Brain className="h-8 w-8" aria-hidden="true" />
            <span
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              aria-label="AI Market Suggestions"
            >
              AI Market Suggestions: {mongoData.query}
            </span>
          </h1>

          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            aria-live="polite"
            aria-label="Refresh Analysis"
          >
            <RefreshCwIcon
              className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            Refresh Analysis
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Market Summary</CardTitle>
            <CardDescription>
              AI-generated overview based on {mongoData.total_articles_analyzed}{" "}
              analyzed articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The sentiment for {mongoData.query} is overwhelmingly positive,
              with all {mongoData.sentiment_summary?.positive} analyzed articles
              showing positive sentiment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Market Trends</CardTitle>
            <CardDescription>
              Significant trends affecting {mongoData.query}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {mongoData.critical_events_detected?.map(
                (event: any, index: any) => (
                  <li
                    key={index}
                    className="flex items-center justify-between"
                    role="listitem"
                  >
                    <div>
                      <h3 className="font-semibold">Critical Event: {event}</h3>
                      <p className="text-sm text-muted-foreground">
                        This event may require immediate attention
                      </p>
                    </div>
                    <TrendImpact impact={-1} />
                  </li>
                )
              )}
            </ul>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Negative</span>
                <span className="text-sm font-medium">Positive</span>
              </div>
              <Progress
                value={sentimentScore}
                className="w-full"
                aria-label="Sentiment Assessment"
                aria-valuenow={sentimentScore}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Current Sentiment: {sentimentScore.toFixed(2)}% Positive
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liquidity Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Low</span>
                <span className="text-sm font-medium">High</span>
              </div>
              <Progress
                value={liquidityScore}
                className="w-full"
                aria-label="Liquidity Impact"
                aria-valuenow={liquidityScore}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Positive Liquidity Impact: {liquidityScore.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>
              Suggested actions based on market analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mongoData.decision_recommendations &&
                Object.entries(mongoData.decision_recommendations).map(
                  ([recommendation, count], index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon
                        className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <p>
                        {recommendation} (Mentioned in {count as string}{" "}
                        articles)
                      </p>
                    </li>
                  )
                )}
            </ul>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Generated on:{" "}
            {mongoData.timestamp && (
              <time
                dateTime={new Date(parseInt(mongoData.timestamp)).toISOString()}
              >
                {new Date(parseInt(mongoData.timestamp)).toLocaleString()}
              </time>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
