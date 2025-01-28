import React, { useState } from 'react';
import { 
  Activity, Calendar, Clock, FileText, PlusCircle, User, ArrowLeft, 
  Thermometer, Target, Award, Upload, Download, Heart, Stethoscope,
  Clipboard, AlertCircle, Pills, Timeline, Share2, Filter, ChevronDown,
  BarChart, BellRing, Video, MessageCircle, ArrowUpRight, Zap,
  BookMedical, CalendarCheck, LinkIcon
} from 'lucide-react';

function Medical() {
  // Expanded medical data structure
  const [medicalData, setMedicalData] = useState({
    injuries: [
      {
        id: '1',
        type: 'ACL Tear',
        date: '2024-01-15',
        status: 'Active',
        severity: 'High',
        painLevel: 7,
        location: 'Right Knee',
        mechanism: 'Landing from jump',
        sportContext: 'Basketball - Competition',
        diagnostics: {
          mriReport: 'Grade III tear',
          xrayFindings: 'No bone damage',
          doctorNotes: 'Surgery recommended',
          images: ['mri-001.jpg', 'xray-001.jpg'],
          testResults: [
            { date: '2024-01-16', type: 'MRI', result: 'Complete ACL tear' },
            { date: '2024-01-16', type: 'Physical Exam', result: 'Positive Lachman test' }
          ]
        },
        treatment: {
          primaryDoctor: 'Dr. Rakesh Kumar',
          specialist: 'Dr. Anjali Sharma',
          physiotherapist: 'Mr. Rahul Singh',
          hospital: 'Sports Medicine Institute',
          surgeryDate: '2024-02-01',
          surgeryDetails: 'Arthroscopic ACL reconstruction',
          rehabilitationPlan: {
            phase1: 'Weeks 1-4: Control swelling, restore ROM',
            phase2: 'Weeks 5-12: Strengthen muscles, improve balance',
            phase3: 'Weeks 13-24: Sport-specific training',
            currentPhase: 'phase2'
          },
          medications: [
            { 
              name: 'Ibuprofen',
              dosage: '400mg',
              frequency: 'Twice daily',
              startDate: '2024-02-01',
              endDate: '2024-02-14',
              status: 'Completed'
            }
          ],
          exercises: [
            {
              name: 'Straight Leg Raises',
              sets: 3,
              reps: 15,
              frequency: 'Twice daily',
              notes: 'Keep knee locked',
              videoUrl: '/exercises/slr.mp4'
            }
          ]
        },
        recoveryProgress: [
          {
            date: '2024-02-15',
            milestone: 'Started passive movement',
            metrics: {
              rangeOfMotion: '90 degrees',
              strength: '60% of normal',
              swelling: 'Minimal'
            },
            notes: 'Good progress'
          }
        ],
        restrictions: [
          'No running until week 12',
          'No contact sports for 6 months'
        ],
        documents: [],
        nextAppointment: '2024-03-15',
        alerts: [
          {
            type: 'medication',
            message: 'Take evening dose of Ibuprofen',
            timestamp: '2024-02-14T18:00:00'
          }
        ],
        communication: [
          {
            date: '2024-02-10',
            sender: 'Dr. Sharma',
            message: 'ROM improving well, continue current protocol',
            type: 'note'
          }
        ]
      }
    ],
    medicalHistory: [
      {
        id: '1',
        condition: 'Asthma',
        diagnosisDate: '2020-05-10',
        status: 'Managed',
        severity: 'Mild',
        type: 'Chronic',
        medications: [
          {
            name: 'Albuterol inhaler',
            dosage: '2 puffs',
            frequency: 'As needed',
            startDate: '2020-05-10'
          }
        ],
        triggers: ['Heavy exercise', 'Cold weather'],
        managementPlan: 'Pre-exercise inhaler use, warm-up properly',
        specialists: [
          {
            name: 'Dr. Priya Patel',
            specialty: 'Pulmonologist',
            contact: '+91-9876543210'
          }
        ],
        notes: 'Exercise-induced asthma, well controlled',
        lastReview: '2024-01-15'
      }
    ],
    vitals: [
      {
        date: '2024-03-01',
        bloodPressure: '120/80',
        heartRate: 65,
        weight: 75.5,
        bodyFat: 12,
        hydrationLevel: 'Good',
        sleepQuality: 'Good',
        fatigueLevel: 'Low',
        oxygenSaturation: 98,
        temperature: 36.8,
        notes: 'Pre-season checkup'
      }
    ],
    fitnessMetrics: [
      {
        date: '2024-03-01',
        vo2max: 58.5,
        restingHeartRate: 52,
        verticalJump: 65,
        sprintSpeed: 8.2,
        strengthMetrics: {
          squat: 140,
          benchPress: 100,
          deadlift: 160
        }
      }
    ]
  });

  // States for UI management
  const [activeTab, setActiveTab] = useState('injuries');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInjury, setSelectedInjury] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Enhanced filtering system
  const getFilteredRecords = (type) => {
    return medicalData[type].filter(record => {
      const matchesSearch = JSON.stringify(record)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
      const matchesDate = dateRange.start === '' || 
        (new Date(record.date) >= new Date(dateRange.start) &&
         new Date(record.date) <= new Date(dateRange.end || Date.now()));
      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  // Notification system
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      message: 'Physiotherapy session tomorrow at 10 AM',
      timestamp: new Date(),
      read: false
    }
  ]);

  // Treatment progress tracking
  const calculateRecoveryProgress = (injury) => {
    const totalMilestones = injury.treatment.rehabilitationPlan.length;
    const completedMilestones = injury.recoveryProgress.length;
    return (completedMilestones / totalMilestones) * 100;
  };

  // Render injury detail modal
  const renderInjuryDetailModal = () => {
    if (!selectedInjury) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold">{selectedInjury.type}</h2>
            <button 
              onClick={() => setShowDetailsModal(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          {/* Detailed injury information */}
          <div className="p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-400">Status</div>
                <div className="text-lg font-semibold">{selectedInjury.status}</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-400">Days Since Injury</div>
                <div className="text-lg font-semibold">
                  {Math.floor((new Date() - new Date(selectedInjury.date)) / (1000 * 60 * 60 * 24))}
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-400">Recovery Progress</div>
                <div className="text-lg font-semibold">
                  {calculateRecoveryProgress(selectedInjury)}%
                </div>
              </div>
            </div>

            {/* Treatment Timeline */}
            <div className="border-l-2 border-gray-600 pl-4 space-y-4">
              {selectedInjury.recoveryProgress.map((progress, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-6 mt-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">{new Date(progress.date).toLocaleDateString()}</div>
                    <div className="font-medium">{progress.milestone}</div>
                    <div className="text-sm text-gray-400 mt-2">{progress.notes}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Medical Team */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Medical Team</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{selectedInjury.treatment.primaryDoctor}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{selectedInjury.treatment.specialist}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{selectedInjury.treatment.physiotherapist}</span>
                  </div>
                </div>
              </div>

              {/* Rehabilitation Plan */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Current Rehabilitation Phase</h3>
                <div className="space-y-2">
                  {Object.entries(selectedInjury.treatment.rehabilitationPlan)
                    .filter(([key]) => key !== 'currentPhase')
                    .map(([phase, description]) => (
                      <div 
                        key={phase}
                        className={`p-2 rounded ${
                          selectedInjury.treatment.rehabilitationPlan.currentPhase === phase
                            ? 'bg-blue-900'
                            : 'bg-gray-600'
                        }`}
                      >
                        <div className="text-sm font-medium">{description}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Exercise Program */}
            <div className="space-y-4">
              <h3 className="font-medium">Exercise Program</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedInjury.treatment.exercises.map((exercise, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-gray-400">
                          {exercise.sets} sets × {exercise.reps} reps
                        </p>
                      </div>
                      <Video className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{exercise.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render main injury card
  const renderInjuryCard = (injury) => (
    <div 
      className="bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-red-500 cursor-pointer hover:bg-gray-750"
      onClick={() => {
        setSelectedInjury(injury);
        setShowDetailsModal(true);
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-100 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
            {injury.type}
            <span className="ml-2 text-sm text-gray-400">({injury.location})</span>
          </h3>
          <div className="flex items-center mt-2 space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              injury.severity === 'High' ? 'bg-red-900 text-red-200' :
              injury.severity === 'Medium' ? 'bg-orange-900 text-orange-200' :
              'bg-yellow-900 text-yellow-200'
            }`}>
              {injury.severity} Severity
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              injury.status === 'Active' ? 'bg-red-900 text-red-200' :
              injury.status === 'Recovering' ? 'bg-blue-900 text-blue-200' :
              'bg-green-900 text-green-200'
            }`}>
              {injury.status}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Share2 className="h-4 w-4