import React, { useState } from "react";
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
import {
  IndianRupee,
  Wallet,
  TrendingUp,
  AlertCircle,
  Calendar,
  Download,
  Edit2,
  Save,
  Plus,
  Trash2,
} from "lucide-react";

const EditableFinanceDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState([
    { id: 1, label: "Total Balance", value: 425000, icon: IndianRupee, color: "blue" },
    { id: 2, label: "Monthly Income", value: 185000, icon: Wallet, color: "green" },
    { id: 3, label: "Monthly Expenses", value: 95000, icon: TrendingUp, color: "orange" },
    { id: 4, label: "Pending Payments", value: 33000, icon: AlertCircle, color: "red" },
  ]);

  const [incomeData, setIncomeData] = useState([
    { month: "Jan", sponsorships: 150000, prizeMoney: 75000, endorsements: 200000 },
    { month: "Feb", sponsorships: 150000, prizeMoney: 90000, endorsements: 200000 },
    { month: "Mar", sponsorships: 175000, prizeMoney: 120000, endorsements: 225000 },
  ]);

  const [expenseCategories, setExpenseCategories] = useState([
    { id: 1, category: "Training", amount: 45000, pending: 5000 },
    { id: 2, category: "Equipment", amount: 30000, pending: 2000 },
    { id: 3, category: "Travel", amount: 65000, pending: 15000 },
    { id: 4, category: "Medical", amount: 25000, pending: 8000 },
    { id: 5, category: "Nutrition", amount: 20000, pending: 3000 },
  ]);

  const handleExpenseChange = (id, field, value) => {
    setExpenseCategories((categories) =>
      categories.map((category) =>
        category.id === id ? { ...category, [field]: value } : category
      )
    );
  };

  const addExpenseCategory = () => {
    const newId = Math.max(...expenseCategories.map((c) => c.id)) + 1;
    setExpenseCategories([
      ...expenseCategories,
      { id: newId, category: "New Category", amount: 0, pending: 0 },
    ]);
  };

  const deleteExpenseCategory = (id) => {
    setExpenseCategories((categories) => categories.filter((category) => category.id !== id));
  };

  const handleIncomeChange = (month, field, value) => {
    setIncomeData((data) =>
      data.map((item) =>
        item.month === month ? { ...item, [field]: Number(value) } : item
      )
    );
  };

  const addIncomeMonth = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const nextMonth = months[incomeData.length % 12];
    setIncomeData([
      ...incomeData,
      { month: nextMonth, sponsorships: 0, prizeMoney: 0, endorsements: 0 },
    ]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Edit Mode Toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isEditing ? <Save className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
          <span>{isEditing ? "Save Changes" : "Edit Dashboard"}</span>
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center space-x-2">
              <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                {isEditing ? (
                  <input
                    type="number"
                    value={stat.value}
                    onChange={(e) =>
                      setStats((prev) =>
                        prev.map((item) =>
                          item.id === stat.id ? { ...item, value: Number(e.target.value) } : item
                        )
                      )
                    }
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  <p className="text-2xl font-bold">₹{stat.value.toLocaleString()}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Income Chart */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Income Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sponsorships" stroke="#8884d8" />
              <Line type="monotone" dataKey="prizeMoney" stroke="#82ca9d" />
              <Line type="monotone" dataKey="endorsements" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Expense Breakdown</h2>
        <div className="space-y-4">
          {expenseCategories.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-2 border-b">
              <div className="flex-grow">
                {isEditing ? (
                  <input
                    type="text"
                    value={expense.category}
                    onChange={(e) =>
                      handleExpenseChange(expense.id, "category", e.target.value)
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  <p className="font-medium">{expense.category}</p>
                )}
                <p className="text-sm text-gray-500">
                  Pending: ₹{expense.pending.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {isEditing ? (
                  <>
                    <input
                      type="number"
                      value={expense.amount}
                      onChange={(e) =>
                        handleExpenseChange(expense.id, "amount", Number(e.target.value))
                      }
                      className="p-1 border rounded w-32"
                    />
                    <button
                      onClick={() => deleteExpenseCategory(expense.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <p className="text-lg font-bold">₹{expense.amount.toLocaleString()}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        {isEditing && (
          <button
            onClick={addExpenseCategory}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-4"
          >
            <Plus className="h-5 w-5" />
            <span>Add Category</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default EditableFinanceDashboard;
