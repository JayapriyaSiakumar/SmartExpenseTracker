import React, { useContext } from "react";
import { incomeExpenseContext } from "../Context/IncomeExpenseProvider";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

const Dashboard = () => {
  const { totalList, expenseData } = useContext(incomeExpenseContext);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  let foodTotal =
    expenseData.length > 0
      ? expenseData.reduce(
          (acc, curr) => (curr.category === "food" ? acc + +curr.amount : acc),
          0
        )
      : 0;
  console.log(foodTotal);
  let travelTotal =
    expenseData.length > 0
      ? expenseData.reduce(
          (acc, curr) =>
            curr.category === "travel" ? acc + +curr.amount : acc,
          0
        )
      : 0;
  let billTotal =
    expenseData.length > 0
      ? expenseData.reduce(
          (acc, curr) => (curr.category === "bill" ? acc + +curr.amount : acc),
          0
        )
      : 0;
  let othersTotal =
    expenseData.length > 0
      ? expenseData.reduce(
          (acc, curr) =>
            curr.category === "others" ? acc + +curr.amount : acc,
          0
        )
      : 0;
  const chartData = [
    { name: "Food", value: foodTotal },
    { name: "Travel", value: travelTotal },
    { name: "Bill", value: billTotal },
    { name: "others", value: othersTotal },
  ];
  /*  const data = [
    { name: "Group A", value: foodTotal },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ]; */
  const renderCustomizedLabel = ({ name, value }) => {
    return value > 0 ? `${name}: ${value}` : "";
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 bg-white rounded-lg shadow-2xl mt-10">
        {totalList.totalExpense > 0 ? (
          <ResponsiveContainer width="100%" height={450}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false} // Optional: hide the lines connecting labels to slices
                label={renderCustomizedLabel} // Your custom label function
                outerRadius={150}
                fill="#8884d8"
                dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-bold">No Expense</h1>
          </div>
        )}
      </div>
      <div className="col-span-1 gap-4 mt-10 grid grid-cols-1 text-center">
        <div className="block max-w-xs p-6 bg-blue-400 border border-gray-200 rounded-lg shadow-sm hover:bg-blue-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Food Expenses
          </h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">
            $ {foodTotal}
          </p>
        </div>
        <div className="block max-w-xs p-6 bg-green-400 border border-gray-200 rounded-lg shadow-sm hover:bg-green-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Travel Expenses
          </h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">
            $ {travelTotal}
          </p>
        </div>
        <div className="block max-w-xs p-6 bg-yellow-300 border border-gray-200 rounded-lg shadow-sm hover:bg-yellow-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bill Expenses
          </h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">
            $ {billTotal}
          </p>
        </div>
        <div className="block max-w-xs p-6 bg-orange-300 border border-gray-200 rounded-lg shadow-sm hover:bg-orange-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Other Expenses
          </h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">
            $ {othersTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
