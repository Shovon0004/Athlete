import React, { useState } from 'react';
import { Activity, Calendar, Clock, FileText, PlusCircle, User, ArrowLeft, 
         Thermometer, Target, Award, Upload, Download } from 'lucide-react';

function Medical() {
  const athleteName = "Virat Kumar"; // In a real app, this would come from auth

  // State for injuries
  const [injuries, setInjuries] = useState([
    {
      id: '1',
      date: '2024-03-15',
      injuryType: 'Hamstring Strain',
      severity: 'Medium',
      status: 'Recovering',
      notes: 'Grade 2 strain during training session',
      recoveryPlan: 'Physical therapy 3x/week, gradual return to activity',
      painLevel: 4,
      milestones: ['Started walking without pain', 'Completed first physio session'],
      lastUpdated: '2024-03-18',
      prescription: null
    }
  ]);

  // State for form visibility and data
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    injuryType: '',
    severity: 'Low',
    status: 'Active',
    notes: '',
    recoveryPlan: '',
    painLevel: 5,
    milestones: [],
    prescription: null
  });

  // Handle prescription upload
  const handlePrescriptionUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the uploaded file
      const fileUrl = URL.createObjectURL(file);
      setInjuries(injuries.map(injury =>
        injury.id === id
          ? {
              ...injury,
              prescription: {
                name: file.name,
                url: fileUrl,
                uploadDate: new Date().toISOString().split('T')[0]
              }
            }
          : injury
      ));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newInjury = {
      ...formData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0],
      prescription: null
    };
    setInjuries([...injuries, newInjury]);
    setShowForm(false);
    setFormData({
      date: '',
      injuryType: '',
      severity: 'Low',
      status: 'Active',
      notes: '',
      recoveryPlan: '',
      painLevel: 5,
      milestones: [],
      prescription: null
    });
  };

  // Update injury status
  const updateInjuryStatus = (id, newStatus) => {
    setInjuries(injuries.map(injury => 
      injury.id === id 
        ? { ...injury, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : injury
    ));
  };

  // Add milestone
  const addMilestone = (id, milestone) => {
    setInjuries(injuries.map(injury =>
      injury.id === id
        ? { 
            ...injury, 
            milestones: [...injury.milestones, milestone],
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : injury
    ));
  };

  // Update pain level
  const updatePainLevel = (id, level) => {
    setInjuries(injuries.map(injury =>
      injury.id === id
        ? { 
            ...injury, 
            painLevel: level,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : injury
    ));
  };

  // Utility functions for colors
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return 'bg-yellow-900 text-yellow-200';
      case 'Medium': return 'bg-orange-900 text-orange-200';
      case 'High': return 'bg-red-900 text-red-200';
      default: return 'bg-gray-800 text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-900 text-red-200';
      case 'Recovering': return 'bg-blue-900 text-blue-200';
      case 'Recovered': return 'bg-green-900 text-green-200';
      default: return 'bg-gray-800 text-gray-200';
    }
  };

  const activeInjuries = injuries.filter(injury => injury.status !== 'Recovered');
  const recoveredInjuries = injuries.filter(injury => injury.status === 'Recovered');

  // Prescription section component
  const PrescriptionSection = ({ injury }) => (
    <div className="mt-4 border-t border-gray-700 pt-4">
      <h4 className="text-sm font-medium text-gray-300 mb-2">Prescription</h4>
      {injury.prescription ? (
        <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-blue-400" />
            <span className="text-sm text-gray-200">{injury.prescription.name}</span>
          </div>
          <a
            href={injury.prescription.url}
            download
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            <Download className="h-4 w-4 mr-1" />
            <span className="text-sm">Download</span>
          </a>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            onChange={(e) => handlePrescriptionUpload(injury.id, e)}
            className="hidden"
            id={`prescription-${injury.id}`}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <label
            htmlFor={`prescription-${injury.id}`}
            className="flex items-center justify-center p-2 border-2 border-dashed border-gray-600 rounded cursor-pointer hover:border-blue-500"
          >
            <Upload className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm text-gray-400">Upload Prescription</span>
          </label>
        </div>
      )}
    </div>
  );

  // Rest of your JSX remains the same, just add the PrescriptionSection component
  // where you want it to appear in the injury cards

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-400" />
              <div className="ml-2">
                <span className="text-xl font-semibold text-gray-100">My Injury Tracker</span>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-400">{athleteName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showForm ? (
          <>
            {/* Active Injuries Section */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-100">My Injuries</h1>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Report New Injury
              </button>
            </div>

            {activeInjuries.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-200 mb-4">Active & Recovering</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {activeInjuries.map((injury) => (
                    <div key={injury.id} className="bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                      {/* Existing injury card content */}
                      {/* Add PrescriptionSection here */}
                      <PrescriptionSection injury={injury} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recovered Injuries Section */}
            {recoveredInjuries.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-200 mb-4">Recovery History</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {recoveredInjuries.map((injury) => (
                    <div key={injury.id} className="bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                      {/* Existing recovered injury card content */}
                      {/* Add PrescriptionSection here */}
                      <PrescriptionSection injury={injury} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Form Section */
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto border border-gray-700">
            {/* Existing form content */}
            {/* Add prescription upload field to form */}
            <div className="flex items-center mb-6">
              <button
                onClick={() => setShowForm(false)}
                className="mr-4 text-gray-400 hover:text-gray-200"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-100">Report New Injury</h2>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Existing form fields */}
              <div className="space-y-4">
                {/* Add prescription upload to form */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">Upload Prescription (optional)</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFormData({...formData, prescription: e.target.files[0]})}
                    className="mt-1 block w-full text-sm text-gray-400
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:text-sm file:font-semibold
                             file:bg-blue-600 file:text-white
                             hover:file:bg-blue-700"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default Medical;