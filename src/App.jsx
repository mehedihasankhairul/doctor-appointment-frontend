import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FloatingBookingWidget from "./components/FloatingBookingWidget";
import BookingCalendar from "./components/BookingCalendar";
import PatientForm from "./components/PatientForm";
import AppointmentConfirmation from "./components/AppointmentConfirmation";
import CustomerReviews from "./components/CustomerReviews";
import ContactUs from "./components/ContactUs";
import DoctorPortal from "./components/DoctorPortal";
import HospitalSelection from "./components/HospitalSelection";
import ContentManager from "./components/ContentManager";
import HomeContentSection from "./components/HomeContentSection";
import DoctorLogin from "./components/DoctorLogin";
import SecureDoctorPortal from "./components/SecureDoctorPortal";
import DoctorProfile from "./components/DoctorProfile";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import { isPortalSubdomain, getMainDomainUrl } from "./utils/subdomain";

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentStep, setCurrentStep] = useState("hospital"); // hospital, calendar, form, confirmation
  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    hospital: {}
  });
  const [fullAppointment, setFullAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [notification, setNotification] = useState(null);

  // Check if we're on the portal subdomain and auto-show doctor portal
  useEffect(() => {
    if (isPortalSubdomain()) {
      setActiveSection('doctor-portal');
    }
  }, []);

  const handleSlotSelect = (date, time) => {
    setAppointment(prev => ({ ...prev, date, time }));
    setCurrentStep("form");
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: Date.now().toString(), // Simple ID generation
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setFullAppointment(newAppointment);
    setAppointments(prev => [...prev, newAppointment]);
    setCurrentStep("confirmation");
    showNotification("Appointment booked successfully!", "success");
    console.log("Appointment booked:", newAppointment);
  };

  const handleUpdateAppointment = (appointmentId, updates) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, ...updates }
          : apt
      )
    );
  };

  const handleBackToCalendar = () => {
    setCurrentStep("calendar");
  };

  const handleNewAppointment = () => {
    setCurrentStep("hospital");
    setAppointment({ date: "", time: "", hospital: {} });
    setFullAppointment(null);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    // Reset appointment flow when switching sections
    if (section !== 'appointment') {
      setCurrentStep("hospital");
      setAppointment({ date: "", time: "", hospital: {} });
      setFullAppointment(null);
    }
  };

  const handleBookAppointment = (date, time, hospital) => {
    setActiveSection('appointment');
    if (date && time && hospital) {
      // Redirect to the patient form directly from FloatingBookingWidget
      setAppointment({ date, time, hospital });
      setCurrentStep("form");
    } else if (appointment.hospital && Object.keys(appointment.hospital).length > 0) {
      // Go to form if hospital is selected before
      setCurrentStep("form");
    } else {
      // Otherwise, go to hospital selection
      setCurrentStep("hospital");
    }
  };

  const handleToggleDoctorPortal = () => {
    if (activeSection === 'doctor-portal') {
      setActiveSection('home');
    } else {
      setActiveSection('doctor-portal');
    }
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Show doctor portal if selected
  if (activeSection === 'doctor-portal') {
    return (
      <AuthProvider>
        <SecureDoctorPortal 
          onTogglePortal={handleToggleDoctorPortal}
        />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
        
        {/* Notification */}
        {notification && (
          <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            <div className="flex items-center">
              <span className="mr-2">
                {notification.type === 'success' ? '✅' :
                 notification.type === 'error' ? '❌' : 'ℹ️'}
              </span>
              {notification.message}
            </div>
          </div>
        )}
      
      {/* Home Section */}
      {activeSection === 'home' && (
        <div className="relative">
          <div className="">
            <HeroSection onBookAppointment={handleBookAppointment} />
          </div>
          <FloatingBookingWidget onBookAppointment={handleBookAppointment} />
          <div className="">
            <CustomerReviews onBookAppointment={handleBookAppointment} />
          </div>
          <div className="">
            <HomeContentSection onBookAppointment={handleBookAppointment} />
          </div>
          <div className="">
            <ContactUs />
          </div>
        </div>
      )}
      
      {/* Appointment Section */}
      {activeSection === 'appointment' && (
        <>
          {currentStep === "calendar" && (
            <BookingCalendar 
              onSlotSelect={handleSlotSelect} 
              selectedHospital={appointment.hospital}
              onBack={() => setCurrentStep("hospital")}
            />
          )}

          {currentStep === "hospital" && (
            <HospitalSelection
              onHospitalSelect={(hospital) => {
                setAppointment(prev => ({ ...prev, hospital }));
                setCurrentStep("calendar");
              }}
              onBack={() => setActiveSection("home")}
            />
          )}

          {currentStep === "form" && (
            <PatientForm
              appointment={appointment}
              onSubmit={handleFormSubmit}
              onBack={() => setCurrentStep("calendar")}
            />
          )}

          {currentStep === "confirmation" && fullAppointment && (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto">
                <AppointmentConfirmation
                  appointment={fullAppointment}
                  onNewAppointment={handleNewAppointment}
                />
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Reviews Section */}
      {activeSection === 'reviews' && (
        <div className="pt-16">
          <CustomerReviews onBookAppointment={handleBookAppointment} />
        </div>
      )}
      
      {/* Profile Section */}
      {activeSection === 'profile' && (
        <div className="pt-16">
          <DoctorProfile />
        </div>
      )}
      
      {/* Contact Section */}
      {activeSection === 'contact' && (
        <div className="pt-16">
          <ContactUs />
        </div>
      )}
      </div>
    </AuthProvider>
  );
}

export default App;
