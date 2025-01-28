import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IndianRupee, Wallet, TrendingUp, AlertCircle, Calendar, Download, Edit2, Save, Plus, Trash2 } from 'lucide-react';

const EditableFinanceDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [totalBalance, setTotalBalance] = useState(425000);
  const [monthlyIncome, setMonthlyIncome] = useState(185000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(95000);
  const [pendingPayments, setPendingPayments] = useState(33000);

  const [incomeData, setIncomeData] = useState([
    { month: 'Jan', sponsorships: 150000, prizeMoney: 75000, endorsements: 200000 },
    { month: 'Feb', sponsorships: 150000, prizeMoney: 90000, endorsements: 200000 },
    { month: 'Mar', sponsorships: 175000, prizeMoney: 120000, endorsements: 225000 }
  ]);

  const [expenseCategories, setExpenseCategories] = useState([
    { id: 1, category: 'Training', amount: 45000, pending: 5000 },
    { id: 2, category: 'Equipment', amount: 30000, pending: 2000 },
    { id: 3, category: 'Travel', amount: 65000, pending: 15000 },
    { id: 4, category: 'Medical', amount: 25000, pending: 8000 },
    { id: 5, category: 'Nutrition', amount: 20000, pending: 3000 }
  ]);

  const handleExpenseChange = (id, field, value) => {
    setExpenseCategories(categories =>
      categories.map(category =>
        category.id === id ? { ...category, [field]: value } : category
      )
    );
  };

  const addExpenseCategory = () => {
    const newId = Math.max(...expenseCategories.map(c => c.id)) + 1;
    setExpenseCategories([...expenseCategories, {
      id: newId,
      category: 'New Category',
      amount: 0,
      pending: 0
    }]);
  };

  const deleteExpenseCategory = (id) => {
    setExpenseCategories(categories => categories.filter(category => category.id !== id));
  };

  const handleIncomeChange = (month, field, value) => {
    setIncomeData(data =>
      data.map(item =>
        item.month === month ? { ...item, [field]: Number(value) } : item
      )
    );
  };

  const addIncomeMonth = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const nextMonth = months[incomeData.length % 12];
    setIncomeData([...incomeData, {
      month: nextMonth,
      sponsorships: 0,
      prizeMoney: 0,
      endorsements: 0
    }]);
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
          <span>{isEditing ? 'Save Changes' : 'Edit Dashboard'}</span>
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Balance', value: totalBalance, icon: IndianRupee, color: 'blue', setter: setTotalBalance },
          { label: 'Monthly Income', value: monthlyIncome, icon: Wallet, color: 'green', setter: setMonthlyIncome },
          { label: 'Monthly Expenses', value: monthlyExpenses, icon: TrendingUp, color: 'orange', setter: setMonthlyExpenses },
          { label: 'Pending Payments', value: pendingPayments, icon: AlertCircle, color: 'red', setter: setPendingPayments }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  {isEditing ? (
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) => stat.setter(Number(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    <p className="text-2xl font-bold">₹{stat.value.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Income Overview</CardTitle>
              {isEditing && (
                <button
                  onClick={addIncomeMonth}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Month</span>
                </button>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  {incomeData.map((data, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-2 border-b">
                      <div>{data.month}</div>
                      {['sponsorships', 'prizeMoney', 'endorsements'].map((field) => (
                        <input
                          key={field}
                          type="number"
                          value={data[field]}
                          onChange={(e) => handleIncomeChange(data.month, field, e.target.value)}
                          className="p-1 border rounded"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Expense Breakdown</CardTitle>
              {isEditing && (
                <button
                  onClick={addExpenseCategory}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Category</span>
                </button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseCategories.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-2 border-b">
                    <div className="flex-grow">
                      {isEditing ? (
                        <input
                          type="text"
                          value={expense.category}
                          onChange={(e) => handleExpenseChange(expense.id, 'category', e.target.value)}
                          className="p-1 border rounded"
                        />
                      ) : (
                        <p className="font-medium">{expense.category}</p>
                      )}
                      {isEditing ? (
                        <input
                          type="number"
                          value={expense.pending}
                          onChange={(e) => handleExpenseChange(expense.id, 'pending', Number(e.target.value))}
                          className="p-1 border rounded mt-1"
                        />
                      ) : (
                        <p className="text-sm text-gray-500">Pending: ₹{expense.pending.toLocaleString()}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      {isEditing ? (
                        <>
                          <input
                            type="number"
                            value={expense.amount}
                            onChange={(e) => handleExpenseChange(expense.id, 'amount', Number(e.target.value))}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Calendar className="h-5 w-5" />
          <span>Schedule Payment</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          <Download className="h-5 w-5" />
          <span>Download Report</span>
        </button>
      </div>
    </div>
  );
};

export default EditableFinanceDashboard;