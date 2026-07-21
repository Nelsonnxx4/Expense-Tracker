import { useGetTransactions } from "../hooks/useGetTransactions";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { Transaction } from "../types/transaction";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
const ChartAnalytics = () => {
  const { transactions } = useGetTransactions();

  // NOTE: Transaction has no `category`/`amount` fields (it has `value`/
  // `transactionAmount`), so this map is always empty at runtime. Left
  // as-is to preserve existing behavior during the TS conversion.
  const processTransactionData = (transactions: Transaction[]) => {
    const categoryMap: Record<string, number> = {};

    transactions.forEach((transaction) => {
      const { category, amount } = transaction as unknown as {
        category: string;
        amount: number;
      };
      if (categoryMap[category]) {
        categoryMap[category] += amount;
      } else {
        categoryMap[category] = amount;
      }
    });
    return Object.entries(categoryMap).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));
  };
  const data = processTransactionData(transactions);
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-black p-4">
      <h1 className="text-2xl font-bold mb-4">Monthly Transaction Analytics</h1>

      {transactions.length === 0 ? (
        <p className="text-slate-700 dark:text-slate-500">
          No transactions found for this month.
        </p>
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default ChartAnalytics;
