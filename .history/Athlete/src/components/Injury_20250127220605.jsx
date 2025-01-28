import React, { useState } from 'react';
import { Activity, Calendar, Clock, FileText, PlusCircle, User, ArrowLeft, ChevronRight, Thermometer, Target, Award } from 'lucide-react';

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

function Injury1() {
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
      lastUpdated: '2024-03-18'
    }
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
    milestones: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInjury = {
      ...formData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0]
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
      milestones: []
    });
  };

  const updateInjuryStatus = (id: string, newStatus: 'Active' | 'Recovering' | 'Recovered') => {
    setInjuries(injuries.map(injury => 
      injury.id === id 
        ? { ...injury, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : injury
    ));
  };

  const addMilestone = (id: string, milestone: string) => {
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

  const updatePainLevel = (id: string, level: number) => {
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-yellow-900 text-yellow-200';
      case 'Medium': return 'bg-orange-900 text-orange-200';
      case 'High': return 'bg-red-900 text-red-200';
      default: return 'bg-gray-800 text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-900 text-red-200';
      case 'Recovering': return 'bg-blue-900 text-blue-200';
      case 'Recovered': return 'bg-green-900 text-green-200';
      default: return 'bg-gray-800 text-gray-200';
    }
  };

  const activeInjuries = injuries.filter(injury => injury.status !== 'Recovered');
  const recoveredInjuries = injuries.filter(injury => injury.status === 'Recovered');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showForm ? (
          <>
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
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <h3 className="ml-2 text-lg font-medium text-gray-100">{injury.injuryType}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <select
                            value={injury.status}
                            onChange={(e) => updateInjuryStatus(injury.id, e.target.value as 'Active' | 'Recovering' | 'Recovered')}
                            className="bg-gray-700 text-sm rounded-md border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Active">Active</option>
                            <option value="Recovering">Recovering</option>
                            <option value="Recovered">Recovered</option>
                          </select>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(injury.status)}`}>
                            {injury.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(injury.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(injury.severity)}`}>
                            {injury.severity} Severity
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-300">Pain Level</h4>
                          <div className="flex items-center">
                            <Thermometer className="h-4 w-4 mr-2 text-gray-500" />
                            <input
                              type="range"
                              min="0"
                              max="10"
                              value={injury.painLevel}
                              onChange={(e) => updatePainLevel(injury.id, parseInt(e.target.value))}
                              className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-400">{injury.painLevel}/10</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-300">Recovery Plan</h4>
                        <p className="mt-1 text-sm text-gray-400">{injury.recoveryPlan}</p>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-300">Notes</h4>
                        <p className="mt-1 text-sm text-gray-400">{injury.notes}</p>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-300">Recovery Milestones</h4>
                          <button
                            onClick={() => {
                              const milestone = prompt('Enter new milestone:');
                              if (milestone) addMilestone(injury.id, milestone);
                            }}
                            className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
                          >
                            <PlusCircle className="h-4 w-4 mr-1" />
                            Add Milestone
                          </button>
                        </div>
                        <div className="space-y-2">
                          {injury.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <Award className="h-4 w-4 mr-2 text-yellow-500" />
                              <span className="text-gray-400">{milestone}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          Last updated: {new Date(injury.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recoveredInjuries.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-200 mb-4">Recovery History</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {recoveredInjuries.map((injury) => (
                    <div key={injury.id} className="bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-green-400" />
                          <h3 className="ml-2 text-lg font-medium text-gray-100">{injury.injuryType}</h3>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(injury.status)}`}>
                          {injury.status}
                        </span>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(injury.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(injury.severity)}`}>
                            {injury.severity} Severity
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-300">Recovery Milestones</h4>
                        <div className="space-y-2 mt-2">
                          {injury.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <Award className="h-4 w-4 mr-2 text-yellow-500" />
                              <span className="text-gray-400">{milestone}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-300">Recovery Notes</h4>
                        <p className="mt-1 text-sm text-gray-400">{injury.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto border border-gray-700">
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Injury Type</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Ankle Sprain, Muscle Strain"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.injuryType}
                    onChange={(e) => setFormData({...formData, injuryType: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Date of Injury</label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Severity</label>
                  <select
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.severity}
                    onChange={(e) => setFormData({...formData, severity: e.target.value as 'Low' | 'Medium' | 'High'})}
                  >
                    <option value="Low">Low - Can continue training with caution</option>
                    <option value="Medium">Medium - Limited training possible</option>
                    <option value="High">High - Complete rest required</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Initial Pain Level (0-10)</label>
                  <div className="flex items-center mt-1">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.painLevel}
                      onChange={(e) => setFormData({...formData, painLevel: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-400">{formData.painLevel}/10</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Notes</label>
                  <textarea
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    placeholder="Describe how the injury occurred and current symptoms"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Recovery Plan</label>
                  <textarea
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    placeholder="List any immediate treatment or recovery steps"
                    value={formData.recoveryPlan}
                    onChange={(e) => setFormData({...formData, recoveryPlan: e.target.value})}
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

export default Injury1;