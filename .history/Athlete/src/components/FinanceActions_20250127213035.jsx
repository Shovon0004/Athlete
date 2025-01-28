import React, { useState } from 'react';


import { Calendar, Download, X } from 'lucide-react';

const SchedulePaymentModal = ({ expenses, onSchedule }) => {
  const [payment, setPayment] = useState({
    category: '',
    amount: '',
    date: '',
    description: '',
    recipient: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule(payment);
    // Reset form
    setPayment({
      category: '',
      amount: '',
      date: '',
      description: '',
      recipient: ''
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        <Calendar className="h-5 w-5" />
        <span>Schedule Payment</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule New Payment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              value={payment.category}
              onChange={(e) => setPayment({...payment, category: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select Category</option>
              {expenses.map((expense) => (
                <option key={expense.id} value={expense.category}>
                  {expense.category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)</label>
            <input
              type="number"
              value={payment.amount}
              onChange={(e) => setPayment({...payment, amount: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Date</label>
            <input
              type="date"
              value={payment.date}
              onChange={(e) => setPayment({...payment, date: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Recipient</label>
            <input
              type="text"
              value={payment.recipient}
              onChange={(e) => setPayment({...payment, recipient: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={payment.description}
              onChange={(e) => setPayment({...payment, description: e.target.value})}
              className="w-full p-2 border rounded-lg"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Schedule Payment
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const DownloadReportModal = ({ incomeData, expenseCategories }) => {
  const [reportConfig, setReportConfig] = useState({
    startDate: '',
    endDate: '',
    includeIncome: true,
    includeExpenses: true,
    format: 'pdf'
  });

  const generateReport = () => {
    // Prepare report data
    const reportData = {
      dateRange: {
        start: reportConfig.startDate,
        end: reportConfig.endDate
      },
      income: reportConfig.includeIncome ? incomeData : [],
      expenses: reportConfig.includeExpenses ? expenseCategories : [],
      timestamp: new Date().toISOString()
    };

    // Convert data to selected format
    const formattedData = formatReportData(reportData, reportConfig.format);
    
    // Create and trigger download
    const blob = new Blob([formattedData], { 
      type: reportConfig.format === 'pdf' ? 'application/pdf' : 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial_report_${new Date().toISOString().split('T')[0]}.${reportConfig.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatReportData = (data, format) => {
    // In a real implementation, this would use proper PDF generation
    // For now, we'll just stringify the JSON
    return JSON.stringify(data, null, 2);
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        <Download className="h-5 w-5" />
        <span>Download Report</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Financial Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={reportConfig.startDate}
                onChange={(e) => setReportConfig({...reportConfig, startDate: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={reportConfig.endDate}
                onChange={(e) => setReportConfig({...reportConfig, endDate: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Include in Report</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportConfig.includeIncome}
                  onChange={(e) => setReportConfig({...reportConfig, includeIncome: e.target.checked})}
                  className="mr-2"
                />
                Income Data
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportConfig.includeExpenses}
                  onChange={(e) => setReportConfig({...reportConfig, includeExpenses: e.target.checked})}
                  className="mr-2"
                />
                Expense Data
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Report Format</label>
            <select
              value={reportConfig.format}
              onChange={(e) => setReportConfig({...reportConfig, format: e.target.value})}
              className="w-full p-2 border rounded-lg"
            >
              <option value="pdf">PDF</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <button
            onClick={generateReport}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Generate and Download Report
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main component that combines both modals
const FinanceActions = ({ expenses, incomeData, expenseCategories }) => {
  const handleSchedulePayment = (paymentDetails) => {
    // Handle the payment scheduling
    console.log('Scheduling payment:', paymentDetails);
    // In a real application, this would make an API call to save the payment
  };

  return (
    <div className="flex space-x-4">
      <SchedulePaymentModal 
        expenses={expenses} 
        onSchedule={handleSchedulePayment} 
      />
      <DownloadReportModal 
        incomeData={incomeData}
        expenseCategories={expenseCategories}
      />
    </div>
  );
};

export default FinanceActions;