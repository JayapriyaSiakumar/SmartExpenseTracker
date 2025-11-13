import React, { useState, useEffect } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const incomeExpenseContext = createContext({});

const IncomeExpenseProvider = ({ children }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [totalList, setTotalList] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });

  //Fetching data for list
  const fetchData = () => {
    const responseIncome = JSON.parse(localStorage.getItem("incomes")) || [];
    const responseExpense = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenseData(responseExpense);
    setIncomeData(responseIncome);
    let totalIncome =
        responseIncome.length > 0
          ? responseIncome.reduce((acc, curr) => acc + +curr.amount, 0)
          : 0,
      totalExpense =
        responseExpense.length > 0
          ? responseExpense.reduce((acc, curr) => acc + +curr.amount, 0)
          : 0;

    setTotalList({
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      netBalance: totalIncome - totalExpense,
    });
  };

  const calculateIncomeTotal = (incomeData) => {
    let totalIncome =
      incomeData.length > 0
        ? incomeData.reduce((acc, curr) => acc + +curr.amount, 0)
        : 0;
    setTotalList((prevItem) => ({
      totalIncome: totalIncome,
      totalExpense: prevItem.totalExpense,
      netBalance: totalIncome - prevItem.totalExpense,
    }));
  };

  const calculateExpenseTotal = (expenseData) => {
    let totalExpense =
      expenseData.length > 0
        ? expenseData.reduce((acc, curr) => acc + +curr.amount, 0)
        : 0;
    setTotalList((prevItem) => ({
      totalIncome: prevItem.totalIncome,
      totalExpense: totalExpense,
      netBalance: prevItem.totalIncome - totalExpense,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <incomeExpenseContext.Provider
      value={{
        incomeData,
        setIncomeData,
        expenseData,
        setExpenseData,
        totalList,
        calculateIncomeTotal,
        calculateExpenseTotal,
      }}>
      {children}
    </incomeExpenseContext.Provider>
  );
};

export default IncomeExpenseProvider;
