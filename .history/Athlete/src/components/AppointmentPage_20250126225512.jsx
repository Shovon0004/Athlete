import React, { useState } from "react";
import Calendar from "react-calendar";
import { ToastContainer, toast } from "react-toastify";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";

const AppointmentPage = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState({});

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const addAppointment = () => {
    const appointmentText = prompt("Enter appointment details:");
    if (appointmentText) {
      const dateKey = date.toDateString();
      const updatedAppointments = { ...appointments };
      if (!updatedAppointments[dateKey]) {
        updatedAppointments[dateKey] = [];
      }
      updatedAppointments[dateKey].push(appointmentText);
      setAppointments(updatedAppointments);
      toast.success("Appointment added!");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      {/* Left Side - Image */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="relative w-4/5">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Placeholder"
            className="rounded-3xl shadow-lg"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 rounded-3xl flex items-center justify-center text-white text-3xl font-bold">
            Your Image
          </div>
        </div>
      </div>

      {/* Right Side - Calendar */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-12 rounded-l-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Appointments</h2>

        {/* Calendar */}
        <div className="bg-gray-100 rounded-lg p-4 shadow">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="react-calendar text-gray-800"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={addAppointment}
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 shadow-md transition duration-300"
          >
            Add Appointment
          </button>
        </div>

        {/* Display Appointments */}
        <div className="mt-8 w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Appointments on {date.toDateString()}:
          </h3>
          <ul className="text-gray-700 space-y-2">
            {(appointments[date.toDateString()] || []).map((appointment, index) => (
              <li key={index} className="p-2 bg-blue-100 rounded-lg shadow-md">
                - {appointment}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AppointmentPage;
