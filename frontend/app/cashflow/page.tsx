import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";

// Mock data - replace with actual API call
const cashflowData = {
  totalInflow: 1250000,
  totalOutflow: 980000,
  transactions: [
    { id: 1, type: "inflow", amount: 500000, source: "Investor Funds" },
    { id: 2, type: "outflow", amount: 300000, source: "Stock Purchase" },
    { id: 3, type: "inflow", amount: 750000, source: "Asset Sale" },
    { id: 4, type: "outflow", amount: 680000, source: "Bond Acquisition" },
  ],
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const CashflowChart = ({
  inflow,
  outflow,
}: {
  inflow: number;
  outflow: number;
}) => {
  const total = inflow + outflow;
  const inflowPercentage = (inflow / total) * 100;
  const outflowPercentage = (outflow / total) * 100;

  return (
    <svg className="w-full h-12" viewBox="0 0 100 12">
      <rect x="0" y="0" width={inflowPercentage} height="12" fill="#22c55e" />
      <rect
        x={inflowPercentage}
        y="0"
        width={outflowPercentage}
        height="12"
        fill="#ef4444"
      />
    </svg>
  );
};

export default function MarketCashflow() {
  return (
    <>
      <Navbar />
      <div className="container p-6 mx-auto  space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Total Inflow</CardTitle>
              <CardDescription>Money entering the market</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500 flex items-center">
                <ArrowUpIcon className="mr-2" />
                {formatCurrency(cashflowData.totalInflow)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Outflow</CardTitle>
              <CardDescription>Money leaving the market</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500 flex items-center">
                <ArrowDownIcon className="mr-2" />
                {formatCurrency(cashflowData.totalOutflow)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cashflow Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <CashflowChart
              inflow={cashflowData.totalInflow}
              outflow={cashflowData.totalOutflow}
            />
            <div className="flex justify-between mt-2 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 mr-2"></div>
                Inflow
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 mr-2"></div>
                Outflow
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cashflowData.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <span
                        className={`flex items-center ${
                          transaction.type === "inflow"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.type === "inflow" ? (
                          <ArrowUpIcon className="mr-2" />
                        ) : (
                          <ArrowDownIcon className="mr-2" />
                        )}
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>{transaction.source}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
