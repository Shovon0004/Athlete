import React, { useState } from 'react';
import { 
  Activity, Calendar, Clock, FileText, PlusCircle, User, ArrowLeft, 
  Thermometer, Target, Award, Upload, Download, Heart, Stethoscope,
  Clipboard, AlertCircle, Pills, Timeline, Share2, Filter
} from 'lucide-react';

function Medical() {
  const [activeTab, setActiveTab] = useState('injuries');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample athlete medical data
  const [medicalData, setMedicalData] = useState({
    injuries: [
      {
        id: '1',
        type: 'ACL Tear',
        date: '2024-01-15',
        status: 'Active',
        severity: 'High',
        diagnostics: {
          mriReport: 'Grade III tear',
          xrayFindings: 'No bone damage',
          doctorNotes: 'Surgery recommended'
        },
        treatment: {
          primaryDoctor: 'Dr. Rakesh Kumar',
          specialist: 'Dr. Anjali Sharma',
          hospital: 'Sports Medicine Institute',
          surgeryDate: '2024-02-01',
          rehabilitationPlan: 'Post-surgery physio for 6 months',
          medications: [
            { name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily' }
          ]
        },
        recoveryProgress: [
          { date: '2024-02-15', milestone: 'Started passive movement', notes: 'Good progress' }
        ],
        documents: [],
        nextAppointment: '2024-03-15'
      }
    ],
    medicalHistory: [
      {
        id: '1',
        condition: 'Asthma',
        diagnosisDate: '2020-05-10',
        status: 'Managed',
        medications: ['Albuterol inhaler'],
        notes: 'Exercise-induced asthma, well controlled'
      }
    ],
    vitals: [
      {
        date: '2024-03-01',
        bloodPressure: '120/80',
        heartRate: 65,
        weight: 75.5,
        bodyFat: 12,
        notes: 'Pre-season checkup'
      }
    ]
  });

  // Add new medical record
  const handleAddMedicalRecord = (type, data) => {
    setMedicalData(prev => ({
      ...prev,
      [type]: [...prev[type], { id: Date.now().toString(), ...data }]
    }));
    setShowAddModal(false);
  };

  // Update medical record
  const handleUpdateRecord = (type, id, data) => {
    setMedicalData(prev => ({
      ...prev,
      [type]: prev[type].map(record => 
        record.id === id ? { ...record, ...data } : record
      )
    }));
  };

  // Filter records
  const filteredRecords = (type) => {
    return medicalData[type].filter(record => {
      const matchesSearch = JSON.stringify(record)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  };

  const renderInjuryCard = (injury) => (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-red-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-100 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
            {injury.type}
          </h3>
          <span className={`mt-2 px-3 py-1 rounded-full text-sm ${
            injury.severity === 'High' ? 'bg-red-900 text-red-200' :
            injury.severity === 'Medium' ? 'bg-orange-900 text-orange-200' :
            'bg-yellow-900 text-yellow-200'
          }`}>
            {injury.severity} Severity
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-400">Status:</span>
          <select
            value={injury.status}
            onChange={(e) => handleUpdateRecord('injuries', injury.id, { status: e.target.value })}
            className="mt-1 bg-gray-700 text-gray-200 rounded-md border-gray-600"
          >
            <option value="Active">Active</option>
            <option value="Recovering">Recovering</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Diagnosis</h4>
          <div className="bg-gray-700 rounded-md p-3">
            <p className="text-sm text-gray-300">{injury.diagnostics.mriReport}</p>
            <p className="text-sm text-gray-300 mt-1">{injury.diagnostics.doctorNotes}</p>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Treatment</h4>
          <div className="bg-gray-700 rounded-md p-3">
            <p className="text-sm text-gray-300">Dr: {injury.treatment.primaryDoctor}</p>
            <p className="text-sm text-gray-300">Hospital: {injury.treatment.hospital}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Medications</h4>
        <div className="space-y-2">
          {injury.treatment.medications.map((med, index) => (
            <div key={index} className="flex items-center bg-gray-700 rounded-md p-2">
              <Pills className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-sm text-gray-300">
                {med.name} - {med.dosage} ({med.frequency})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Recovery Progress</h4>
        <div className="space-y-2">
          {injury.recoveryProgress.map((progress, index) => (
            <div key={index} className="flex items-center bg-gray-700 rounded-md p-2">
              <Timeline className="h-4 w-4 mr-2 text-green-400" />
              <span className="text-sm text-gray-300">
                {new Date(progress.date).toLocaleDateString()}: {progress.milestone}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-blue-400" />
            <span className="text-sm text-gray-400">
              Next Appointment: {new Date(injury.nextAppointment).toLocaleDateString()}
            </span>
          </div>
          <button
            onClick={() => {/* Handle share with medical team */}}
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span className="text-sm">Share with Medical Team</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Stethoscope className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold">Medical Management</h1>
                <p className="text-sm text-gray-400">Track injuries, treatments and health records</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Medical Record
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('injuries')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'injuries' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Active Injuries
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Medical History
          </button>
          <button
            onClick={() => setActiveTab('vitals')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'vitals' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Vitals Tracking
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search medical records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Recovering">Recovering</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-6">
          {activeTab === 'injuries' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecords('injuries').map(injury => renderInjuryCard(injury))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecords('medicalHistory').map(record => (
                <div key={record.id} className="bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-medium text-gray-100">{record.condition}</h3>
                  <p className="text-sm text-gray-400 mt-2">
                    Diagnosed: {new Date(record.diagnosisDate).toLocaleDateString()}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-300">Medications</h4>
                    <ul className="mt-2 space-y-2">
                      {record.medications.map((med, index) => (
                        <li key={index} className="text-sm text-gray-400">{med}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecords('vitals').map(vital => (
                <div key={vital.date} className="bg-gray-800 rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-100">
                      Vitals Check - {new Date(vital.date).toLocaleDateString()}
                    </h3>
                    <Heart className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Blood Pressure</p>
                      <p className="text-lg text-gray-100">{vital.bloodPressure}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Heart Rate</p>
                      <p className="text-lg text-gray-100">{vital.heartRate} bpm</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Weight</p>
                      <p className="text-lg text-gray-100">{vital.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Body Fat</p>
                      <p className="text-lg text-gray-100">{vital.bodyFat}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Medical;