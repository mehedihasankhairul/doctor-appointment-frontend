import { useState } from "react";

const HospitalSelection = ({ onHospitalSelect, onBack }) => {
  const [selectedHospital, setSelectedHospital] = useState("");

  const hospitals = [
    {
      id: "moon",
      name: "Moon Hospital",
      address: "123 Main Street, City Center",
      phone: "+1 (555) 123-4567",
      schedule: "03:00 PM to 05:00 PM (Except Friday)",
      visitDays: [0, 1, 2, 3, 4, 6], // Saturday to Thursday (0=Sunday, 6=Saturday)
      timeSlots: [
        { start: "15:00", end: "16:00", display: "03:00 PM - 04:00 PM" },
        { start: "16:00", end: "17:00", display: "04:00 PM - 05:00 PM" }
      ],
      specialties: ["Eye Care", "General Consultation", "Emergency Care"],
      features: ["Free Parking", "Wheelchair Accessible", "Insurance Accepted"]
    },
    {
      id: "popular",
      name: "Popular Diagnostic Centre",
      address: "456 Health Avenue, Medical District",
      phone: "+1 (555) 987-6543",
      schedule: "Morning: 08:00 AM to 09:00 AM, Evening: 05:00 PM to 08:00 PM",
      visitDays: [0, 1, 2, 3, 4, 6], // Saturday to Thursday (0=Sunday, 6=Saturday)
      timeSlots: [
        { start: "08:00", end: "09:00", display: "08:00 AM - 09:00 AM" },
        { start: "17:00", end: "18:00", display: "05:00 PM - 06:00 PM" },
        { start: "18:00", end: "19:00", display: "06:00 PM - 07:00 PM" },
        { start: "19:00", end: "20:00", display: "07:00 PM - 08:00 PM" }
      ],
      specialties: ["Diagnostic Services", "Eye Examination", "Preventive Care"],
      features: ["Modern Equipment", "Quick Reports", "Online Results"]
    }
  ];

  const handleHospitalChange = (e) => {
    const hospitalId = e.target.value;
    setSelectedHospital(hospitalId);
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital.id);
    // Auto-advance to calendar after a short delay
    setTimeout(() => {
      onHospitalSelect(hospital);
    }, 300);
  };

  const selectedHospitalData = hospitals.find(h => h.id === selectedHospital);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Select Hospital
          </h1>
          <p className="text-gray-600">
            Choose your preferred hospital for the appointment
          </p>
        </div>

        <div className="space-y-6">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className={`bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedHospital === hospital.id
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleHospitalClick(hospital)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedHospital === hospital.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}>
                      {selectedHospital === hospital.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {hospital.name}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {hospital.address}
                        </div>
                        
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {hospital.phone}
                        </div>
                        
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {hospital.schedule}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hospital.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {hospital.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onBack}
            className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalSelection;
