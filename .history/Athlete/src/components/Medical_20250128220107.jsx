import React, { useState, useEffect } from "react";
import {
  Activity,
  Calendar,
  Pills,
  PlusCircle,
  AlertCircle,
  Timeline,
  Share2,
  Stethoscope,
  Heart,
} from "lucide-react";

function Medical() {
  const [activeTab, setActiveTab] = useState("injuries");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [medicalData, setMedicalData] = useState({
    injuries: [
      {
        id: "1",
        type: "ACL Tear",
        date: "2024-01-15",
        status: "Active",
        severity: "High",
        diagnostics: {
          mriReport: "Grade III tear",
          doctorNotes: "Surgery recommended",
        },
        treatment: {
          primaryDoctor: "Dr. Rakesh Kumar",
          hospital: "Sports Medicine Institute",
          medications: [
            { name: "Ibuprofen", dosage: "400mg", frequency: "Twice daily" },
          ],
        },
        recoveryProgress: [
          { date: "2024-02-15", milestone: "Started passive movement" },
        ],
        nextAppointment: "2024-03-15",
      },
    ],
    medicalHistory: [
      {
        id: "1",
        condition: "Asthma",
        diagnosisDate: "2020-05-10",
        status: "Managed",
        medications: ["Albuterol inhaler"],
      },
    ],
    vitals: [
      {
        date: "2024-03-01",
        bloodPressure: "120/80",
        heartRate: 65,
        weight: 75.5,
        bodyFat: 12,
      },
    ],
  });

  // Filter medical data
  const filteredRecords = (type) =>
    medicalData[type].filter((record) => {
      const matchesSearch = JSON.stringify(record)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || record.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

  const InjuryCard = ({ injury }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-red-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-100 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
            {injury.type}
          </h3>
          <span
            className={`mt-2 px-3 py-1 rounded-full text-sm ${
              injury.severity === "High"
                ? "bg-red-900 text-red-200"
                : "bg-yellow-900 text-yellow-200"
            }`}
          >
            {injury.severity} Severity
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-400">Status:</span>
          <select
            value={injury.status}
            onChange={(e) =>
              setMedicalData((prev) => ({
                ...prev,
                injuries: prev.injuries.map((i) =>
                  i.id === injury.id
                    ? { ...i, status: e.target.value }
                    : i
                ),
              }))
            }
            className="mt-1 bg-gray-700 text-gray-200 rounded-md"
          >
            <option value="Active">Active</option>
            <option value="Recovering">Recovering</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <h4 className="text-sm font-medium text-gray-300 mb-2">Treatment</h4>
      <p className="text-sm text-gray-300">Doctor: {injury.treatment.primaryDoctor}</p>
      <p className="text-sm text-gray-300">Hospital: {injury.treatment.hospital}</p>
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === "injuries") {
      return filteredRecords("injuries").map((injury) => (
        <InjuryCard key={injury.id} injury={injury} />
      ));
    } else if (activeTab === "history") {
      return filteredRecords("medicalHistory").map((history) => (
        <div key={history.id} className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-100">
            {history.condition}
          </h3>
          <p className="text-sm text-gray-400">
            Diagnosed: {new Date(history.diagnosisDate).toLocaleDateString()}
          </p>
        </div>
      ));
    } else if (activeTab === "vitals") {
      return filteredRecords("vitals").map((vital) => (
        <div key={vital.date} className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-100">
            Vitals Check - {new Date(vital.date).toLocaleDateString()}
          </h3>
        </div>
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4">
        <h1 className="text-xl font-bold">Medical Management</h1>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 ${
              activeTab === "injuries" ? "bg-blue-600" : "bg-gray-800"
            }`}
            onClick={() => setActiveTab("injuries")}
          >
            Injuries
          </button>
        </div>

        <div>{renderTabContent()}</div>
      </main>
    </div>
  );
}

export default Medical;
