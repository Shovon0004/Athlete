import React, { useState } from 'react';
import { 
  Activity, Calendar, Clock, FileText, PlusCircle, User, ArrowLeft, 
  Thermometer, Target, Award 
} from 'lucide-react';

interface Injury {
  id: string;
  date: string;
  injuryType: string;
  severity: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Recovering' | 'Recovered';
  notes: string;
  recoveryPlan: string;
  painLevel: number;
  milestones: string[];
  lastUpdated: string;
}

function Injury() {
  const athleteName = "Virat Kumar"; // In a real app, this would come from auth
  const [injuries, setInjuries] = useState<Injury[]>([
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
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Injury, 'id' | 'lastUpdated'>>({
    date: '',
    injuryType: '',
    severity: 'Low',
    status: 'Active',
    notes: '',
    recoveryPlan: '',
    painLevel: 5,
    milestones: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInjury: Injury = {
      ...formData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setInjuries((prevInjuries) => [...prevInjuries, newInjury]);
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: '',
      injuryType: '',
      severity: 'Low',
      status: 'Active',
      notes: '',
      recoveryPlan: '',
      painLevel: 5,
      milestones: [],
    });
  };

  const updateInjuryStatus = (id: string, newStatus: 'Active' | 'Recovering' | 'Recovered') => {
    setInjuries((prevInjuries) =>
      prevInjuries.map((injury) =>
        injury.id === id
          ? { ...injury, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
          : injury
      )
    );
  };

  const addMilestone = (id: string, milestone: string) => {
    setInjuries((prevInjuries) =>
      prevInjuries.map((injury) =>
        injury.id === id
          ? {
              ...injury,
              milestones: [...injury.milestones, milestone],
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : injury
      )
    );
  };

  const updatePainLevel = (id: string, level: number) => {
    setInjuries((prevInjuries) =>
      prevInjuries.map((injury) =>
        injury.id === id
          ? {
              ...injury,
              painLevel: level,
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : injury
      )
    );
  };

  const getSeverityColor = (severity: Injury['severity']) => {
    const colors = {
      Low: 'bg-yellow-900 text-yellow-200',
      Medium: 'bg-orange-900 text-orange-200',
      High: 'bg-red-900 text-red-200',
    };
    return colors[severity] || 'bg-gray-800 text-gray-200';
  };

  const getStatusColor = (status: Injury['status']) => {
    const colors = {
      Active: 'bg-red-900 text-red-200',
      Recovering: 'bg-blue-900 text-blue-200',
      Recovered: 'bg-green-900 text-green-200',
    };
    return colors[status] || 'bg-gray-800 text-gray-200';
  };

  const activeInjuries = injuries.filter((injury) => injury.status !== 'Recovered');
  const recoveredInjuries = injuries.filter((injury) => injury.status === 'Recovered');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-400" aria-label="Logo" />
              <div className="ml-2">
                <span className="text-xl font-semibold">My Injury Tracker</span>
                <div className="flex items-center text-sm text-gray-400">
                  <User className="h-4 w-4 mr-1" aria-label="User" />
                  {athleteName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showForm ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Injuries</h1>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                aria-label="Report New Injury"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Report New Injury
              </button>
            </div>

            {/* Active Injuries */}
            {activeInjuries.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Active & Recovering</h2>
                {/* Render Active Injuries */}
                {activeInjuries.map((injury) => (
                  <div key={injury.id}>{/* Details Here */}</div>
                ))}
              </div>
            )}

            {/* Recovered Injuries */}
            {recoveredInjuries.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Recovery History</h2>
                {/* Render Recovered Injuries */}
                {recoveredInjuries.map((injury) => (
                  <div key={injury.id}>{/* Details Here */}</div>
                ))}
              </div>
            )}
          </>
        ) : (
          {/* Injury Form */}
          <form>{/* Form Content */}</form>
        )}
      </main>
    </div>
  );
}

export default Injury;
