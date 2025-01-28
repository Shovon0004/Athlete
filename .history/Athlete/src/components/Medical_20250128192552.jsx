import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const Medical = () => {
  const [injuryData, setInjuryData] = useState({
    injuryType: "",
    injuryDate: "",
    recoveryStatus: "",
    medicalNotes: "",
    prescription: null,
  });

  const [records, setRecords] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInjuryData({ ...injuryData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setInjuryData({ ...injuryData, prescription: file });
    setUploadProgress(100); // Simulate upload progress
    setTimeout(() => setUploadProgress(0), 1000);
  };

  const handleAddRecord = () => {
    if (
      injuryData.injuryType &&
      injuryData.injuryDate &&
      injuryData.recoveryStatus
    ) {
      setRecords([...records, injuryData]);
      setInjuryData({
        injuryType: "",
        injuryDate: "",
        recoveryStatus: "",
        medicalNotes: "",
        prescription: null,
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-dark-900 text-white">
      {/* Form Section */}
      <Card className="bg-gray-800 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Injury Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tooltip content="Enter the type of injury">
            <Input
              className="bg-gray-700 text-white"
              placeholder="Injury Type"
              name="injuryType"
              value={injuryData.injuryType}
              onChange={handleChange}
            />
          </Tooltip>
          <Tooltip content="Select the date of injury">
            <Input
              className="bg-gray-700 text-white"
              type="date"
              placeholder="Injury Date"
              name="injuryDate"
              value={injuryData.injuryDate}
              onChange={handleChange}
            />
          </Tooltip>
          <Tooltip content="Enter the current recovery status">
            <Input
              className="bg-gray-700 text-white"
              placeholder="Recovery Status"
              name="recoveryStatus"
              value={injuryData.recoveryStatus}
              onChange={handleChange}
            />
          </Tooltip>
          <Textarea
            className="bg-gray-700 text-white"
            placeholder="Medical Notes (Optional)"
            name="medicalNotes"
            value={injuryData.medicalNotes}
            onChange={handleChange}
          />
          <div>
            <label className="block mb-2 font-semibold">Upload Prescription (Optional):</label>
            <Input
              className="bg-gray-700 text-white"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileUpload}
            />
            {uploadProgress > 0 && (
              <Progress value={uploadProgress} className="mt-2" />
            )}
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 w-full" onClick={handleAddRecord}>
            Add Injury Record
          </Button>
        </CardContent>
      </Card>

      {/* Records Section */}
      <Card className="bg-gray-800 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Injury Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 overflow-y-auto max-h-[400px]">
          {records.length === 0 ? (
            <p className="text-center text-gray-400">No injury records added yet.</p>
          ) : (
            records.map((record, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-gray-700 space-y-2"
              >
                <p><strong>Injury Type:</strong> {record.injuryType}</p>
                <p><strong>Injury Date:</strong> {record.injuryDate}</p>
                <p><strong>Recovery Status:</strong> {record.recoveryStatus}</p>
                {record.medicalNotes && (
                  <p><strong>Notes:</strong> {record.medicalNotes}</p>
                )}
                {record.prescription && (
                  <p>
                    <strong>Prescription:</strong> {record.prescription.name}
                  </p>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Medical;
