import React, { useState } from 'react';
import { Activity, Calendar, Clock, FileText, PlusCircle, User, ArrowLeft, ChevronRight, Thermometer, Target, Award, Pill } from 'lucide-react';

function App() {
  const athleteName = "Virat Kumar";
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
      prescriptions: [
        {
          id: '1',
          medication: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Twice daily',
          startDate: '2024-03-15',
          endDate: '2024-03-22',
          notes: 'Take with food'
        }
      ]
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    injuryType: '',
    severity: 'Low',
    status: 'Active',
    notes: '',
    recoveryPlan: '',
    painLevel: 5,
    milestones: []
  });

  const [prescriptionForm, setPrescriptionForm] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInjury = {
      ...formData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0],
      prescriptions: []
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

  const handlePrescriptionSubmit = (injuryId) => {
    const newPrescription = {
      ...prescriptionForm,
      id: Date.now().toString()
    };
    
    setInjuries(injuries.map(injury => 
      injury.id === injuryId
        ? {
            ...injury,
            prescriptions: [...injury.prescriptions, newPrescription],
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : injury
    ));
    
    setShowPrescriptionForm(null);
    setPrescriptionForm({
      medication: '',
      dosage: '',
      frequency: '',
      startDate: '',
      endDate: '',
      notes: ''
    });
  };

  const updateInjuryStatus = (id, newStatus) => {
    setInjuries(injuries.map(injury => 
      injury.id === id 
        ? { ...injury, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : injury
    ));
  };

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

  // Rest of the JSX remains exactly the same as it was in the TypeScript version
  return (
    // ... Same JSX as before ...
  );
}

export default M;