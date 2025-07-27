import { useState } from "react";
import dayjs from "dayjs";

const FloatingBookingWidget = ({ onBookAppointment }) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const hospitals = [
    {
      id: "moon",
      name: "Moon Hospital",
      address: "123 Main Street, City Center",
      phone: "+1 (555) 123-4567",
      schedule: "03:00 PM to 05:00 PM (Saturday to Thursday)",
      visitDays: [0, 1, 2, 3, 4, 6], // Saturday to Thursday (excluding Friday)
      timeSlots: [
        { start: "15:00", end: "16:00", display: "03:00 PM - 04:00 PM", available: true },
        { start: "16:00", end: "17:00", display: "04:00 PM - 05:00 PM", available: true },
      ],
      specialties: ["Eye Care", "General Medicine", "Emergency Care"],
      features: ["Free Parking", "Wheelchair Accessible", "Insurance Accepted"],
    },
    {
      id: "popular",
      name: "Popular Diagnostic Centre",
      address: "456 Health Avenue, Medical District",
      phone: "+1 (555) 987-6543",
      schedule: "Morning: 08:00 AM to 09:00 AM, Evening: 05:00 PM to 08:00 PM (Saturday to Thursday)",
      visitDays: [0, 1, 2, 3, 4, 6], // Saturday to Thursday (excluding Friday)
      timeSlots: [
        { start: "08:00", end: "09:00", display: "08:00 AM - 09:00 AM", available: true },
        { start: "17:00", end: "18:00", display: "05:00 PM - 06:00 PM", available: true },
        { start: "18:00", end: "19:00", display: "06:00 PM - 07:00 PM", available: true },
        { start: "19:00", end: "20:00", display: "07:00 PM - 08:00 PM", available: true },
      ],
      specialties: ["Eye Diagnostic Services", "Cardiology", "Preventive Care"],
      features: ["Modern Equipment", "Quick Reports", "Online Results"],
    },
  ];

  const getTimeSlots = (hospitalId) => {
    const hospital = hospitals.find(h => h.id === hospitalId);
    return hospital ? hospital.timeSlots : [];
  };

  const timeSlots = selectedHospital ? getTimeSlots(selectedHospital) : [];

  const handleHospitalChange = (hospitalId) => {
    setSelectedHospital(hospitalId);
    setSelectedTime(""); // Reset time selection when hospital changes
  };

  const handleBookNow = () => {
    if (selectedDate && selectedHospital && selectedTime) {
      // Find the selected hospital object
      const selectedHospitalData = hospitals.find(h => h.id === selectedHospital);
      
      // Pass the selected date, hospital, and time to go directly to the booking form
      onBookAppointment(selectedDate, selectedTime, selectedHospitalData);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 relative  left-1/2 transform -translate-x-1/2 z-30 w-full px-4 sm:py-6 lg:px-10 lg:py-12">
      <div
        className="rounded-3xl shadow-2xl p-1 mx-auto relative overflow-hidden"
        style={{ width: "90%", maxWidth: "1200px" }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
          <div
            className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-25 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-4 left-1/3 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-6 right-6 w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-30 animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 left-8 w-6 h-6 bg-gradient-to-br from-purple-400 to-indigo-500 transform rotate-45 opacity-25 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/4 w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "5s" }}
          ></div>
        </div>

        {/* Inner content container */}
        <div className="bg-white rounded-2xl shadow-inner p-4 sm:p-6 lg:p-8 relative z-10">
          {/* Desktop Layout - Horizontal */}
          <div className="hidden lg:flex items-end justify-between gap-4">
            {/* Date Selection */}
            <div className="flex-1">
              <label className="block text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-3">
                📅 Select Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  min={today}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border-2 border-blue-300 p-4 rounded-xl text-base focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-100 to-purple-100"
                />
              </div>
            </div>

            {/* Hospital Selection */}
            <div className="flex-1">
              <label className="block text-sm font-bold text-transparent bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text mb-3">
                🏥 Select Hospital
              </label>
              <div className="relative">
                <select
                  value={selectedHospital}
                  onChange={(e) => handleHospitalChange(e.target.value)}
                  className="w-full border-2 border-green-300 p-4 rounded-xl text-base focus:ring-4 focus:ring-green-200 focus:border-green-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-green-100 to-teal-100 appearance-none"
                >
                  <option value="" disabled selected hidden>
                    Choose a hospital
                  </option>
                  {hospitals.map((hospital) => (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="flex-1">
              <label className="block text-sm font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text mb-3">
                ⏰ Available Times
              </label>
              <div className="relative">
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  disabled={!selectedHospital}
                  className="w-full border-2 border-orange-300 p-4 rounded-xl text-base focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-orange-100 to-red-100 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none"
                >
                  <option value="" disabled selected hidden>
                    {selectedHospital ? "Choose a time" : "Select hospital first"}
                  </option>
                  {timeSlots.map((slot) => (
                    <option key={slot.display} value={slot.display} disabled={!slot.available}>
                      {slot.display} {!slot.available ? "(Booked)" : ""}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="flex-shrink-0">
              <button
                onClick={handleBookNow}
                disabled={!selectedTime}
                className={`
                py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform whitespace-nowrap relative overflow-hidden
                ${
                  selectedTime
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 animate-pulse"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
              >
                {selectedTime && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                )}
                <span className="relative z-10">
                  {selectedTime ? (
                    <span className="flex items-center justify-center">
                      <span className="mr-2 text-2xl">🩺</span>
                      Book Now
                    </span>
                  ) : (
                    "Select Time"
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Layout - Stack on smaller screens */}
          <div className="block lg:hidden">
            <div className="space-y-6">
              {/* Date Selection Mobile */}
              <div>
                <label className="block text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-3">
                  📅 Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    min={today}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border-2 border-blue-300 p-4 rounded-xl text-base focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-100 to-purple-100"
                  />
                </div>
              </div>

              {/* Hospital Selection Mobile */}
              <div>
                <label className="block text-sm font-bold text-transparent bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text mb-3">
                  🏥 Select Hospital
                </label>
                <div className="relative">
                  <select
                    value={selectedHospital}
                    onChange={(e) => handleHospitalChange(e.target.value)}
                    className="w-full border-2 border-green-300 p-4 rounded-xl text-base focus:ring-4 focus:ring-green-200 focus:border-green-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-green-100 to-teal-100 appearance-none"
                  >
                    <option value="" disabled selected hidden>
                      Choose a hospital
                    </option>
                    {hospitals.map((hospital) => (
                      <option key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Time Slot Selection Mobile */}
              <div>
                <label className="block text-sm font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text mb-3">
                  ⏰ Available Times
                </label>
                <div className="relative">
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    disabled={!selectedHospital}
                    className="w-full border-2 border-orange-300 p-4 rounded-xl text-base focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-orange-100 to-red-100 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none"
                  >
                    <option value="" disabled selected hidden>
                      {selectedHospital ? "Choose a time" : "Select hospital first"}
                    </option>
                    {timeSlots.map((slot) => (
                      <option key={slot.display} value={slot.display} disabled={!slot.available}>
                        {slot.display} {!slot.available ? "(Booked)" : ""}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Book Now Button Mobile */}
              <button
                onClick={handleBookNow}
                disabled={!selectedTime}
                className={`
                w-full py-5 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform relative overflow-hidden
                ${
                  selectedTime
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 animate-pulse"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
              >
                {selectedTime && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                )}
                <span className="relative z-10">
                  {selectedTime ? (
                    <span className="flex items-center justify-center">
                      <span className="mr-2 text-2xl">🩺</span>
                      Book Now
                    </span>
                  ) : (
                    "Select Date & Time"
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingBookingWidget;
