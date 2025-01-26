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
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <img
          src="https://via.placeholder.com/500"
          alt="Placeholder"
          className="rounded-xl shadow-lg"
        />
      </div>

      {/* Right Side - Calendar */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-semibold mb-6">Schedule Your Appointments</h2>

        {/* Calendar */}
        <Calendar onChange={handleDateChange} value={date} />

        <div className="mt-6">
          <button
            onClick={addAppointment}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Appointment
          </button>
        </div>

        {/* Display Appointments */}
        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold mb-4">Appointments on {date.toDateString()}:</h3>
          <ul className="text-gray-700">
            {(appointments[date.toDateString()] || []).map((appointment, index) => (
              <li key={index} className="mb-2">
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
