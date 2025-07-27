import { useState, useEffect } from "react";
import dayjs from "dayjs";
import ContentManager from "./ContentManager";
import apiService from '../services/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';


const DoctorPortal = ({ onTogglePortal }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hospitalFilter, setHospitalFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("appointments");
  const [showAppointmentsList, setShowAppointmentsList] = useState(true); // Show appointments by default
  const [showCalendar, setShowCalendar] = useState(false); // Calendar collapsed by default

  const { isAuthenticated, loginAsDoctor } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadAppointments();
    } else {
      loginAsDoctor(); // Mock login for development/testing
    }
  }, [isAuthenticated]);

const getAppointmentCountsByDate = () => {
  const counts = {};
  appointments.forEach((appointment) => {
    if (counts[appointment.date]) {
      counts[appointment.date] += 1;
    } else {
      counts[appointment.date] = 1;
    }
  });
  return counts;
};

const generateCalendarDays = () => {
  const currentDate = dayjs(selectedDate);
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startOfCalendar = startOfMonth.startOf('week');
  const endOfCalendar = endOfMonth.endOf('week');
  
  const days = [];
  let day = startOfCalendar;
  
  while (day.isBefore(endOfCalendar) || day.isSame(endOfCalendar)) {
    days.push(day);
    day = day.add(1, 'day');
  }
  
  return days;
};

const isToday = (date) => {
  return dayjs().isSame(date, 'day');
};

const isSelected = (date) => {
  return dayjs(selectedDate).isSame(date, 'day');
};

const isCurrentMonth = (date) => {
  return dayjs(selectedDate).isSame(date, 'month');
};

const loadAppointments = async () => {
    setAppointmentsLoading(true);
    console.log('🔄 Loading appointments from API...');
    console.log('🔑 Auth token:', apiService.authToken ? 'Present' : 'Missing');
    try {
      const response = await apiService.getAllAppointments();
      console.log('✅ API response:', response);
      console.log('📊 Appointments count:', response.appointments?.length || 0);
      setAppointments(response.appointments || []);
    } catch (error) {
      console.error('❌ Error loading appointments:', error);
      console.error('📄 Error details:', {
        message: error.message,
        stack: error.stack
      });
      // Set empty array on error to prevent UI issues
      setAppointments([]);
    } finally {
      setAppointmentsLoading(false);
    }
  };

  // Appointment status handling
  const handleStatusChange = async (appointmentId, newStatus, doctorNotes = "") => {
    try {
      // Update appointment via API
      await apiService.updateAppointment(appointmentId, {
        status: newStatus,
        ...(doctorNotes && { doctor_notes: doctorNotes })
      });
      
      // Update local state
      setAppointments(prevAppointments => 
        prevAppointments.map(apt => 
          apt.id === appointmentId 
            ? { 
                ...apt, 
                status: newStatus,
                ...(doctorNotes && { doctorNotes }),
                updated_at: new Date().toISOString()
              }
            : apt
        )
      );
      
      // Send notification to patient
      sendNotificationToPatient(appointmentId, newStatus);
      
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment status');
    }
  };

  const sendNotificationToPatient = (appointmentId, status) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      // Simulate email/SMS notification
      console.log(`📧 Notification sent to ${appointment.name} (${appointment.phoneNumber})`);
      console.log(`📱 Status updated to: ${status}`);
      console.log(`📧 Email: "Your appointment on ${appointment.date} at ${appointment.time} has been ${status.toLowerCase()}"`);
    }
  };

  const openNotesModal = (appointment) => {
    setSelectedAppointment(appointment);
    setNotes(appointment.doctorNotes || "");
    setShowNotesModal(true);
  };

  const saveNotes = async () => {
    if (selectedAppointment) {
      try {
        await apiService.updateAppointment(selectedAppointment.id, {
          doctor_notes: notes
        });
        
        // Update local state
        setAppointments(prevAppointments => 
          prevAppointments.map(apt => 
            apt.id === selectedAppointment.id
              ? { ...apt, doctorNotes: notes, updated_at: new Date().toISOString() }
              : apt
          )
        );
        
        setShowNotesModal(false);
        setSelectedAppointment(null);
        setNotes("");
      } catch (error) {
        console.error('Error saving notes:', error);
        alert('Failed to save notes');
      }
    }
  };

  // Get unique hospitals from appointments
  const getAvailableHospitals = () => {
    const hospitalSet = new Set();
    appointments.forEach(appointment => {
      if (appointment.hospital && appointment.hospital.name) {
        hospitalSet.add(JSON.stringify({
          id: appointment.hospital.id,
          name: appointment.hospital.name
        }));
      }
    });
    return Array.from(hospitalSet).map(hospitalStr => JSON.parse(hospitalStr));
  };

  // Filter appointments by selected date, search term, status, and hospital
  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = appointment.date === selectedDate; // Show appointments for selected date only
    const matchesSearch = searchTerm === "" || 
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phoneNumber.includes(searchTerm) ||
      (appointment.email && appointment.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    const matchesHospital = hospitalFilter === "all" || 
      (appointment.hospital && appointment.hospital.id === hospitalFilter);
    return matchesDate && matchesSearch && matchesStatus && matchesHospital;
  });

  const formatDate = (dateString) => {
    return dayjs(dateString).format("dddd, MMMM D, YYYY");
  };

  const getTotalAppointments = () => {
    return appointments.filter(apt => apt.date === selectedDate).length;
  };

  const getTodayAppointments = () => {
    const today = dayjs().format("YYYY-MM-DD");
    return appointments.filter(apt => apt.date === today).length;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800", 
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      "follow-up": "bg-purple-100 text-purple-800",
      "no-show": "bg-gray-100 text-gray-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusCounts = () => {
    const todayAppointments = appointments.filter(apt => apt.date === selectedDate);
    return {
      pending: todayAppointments.filter(apt => apt.status === 'pending').length,
      confirmed: todayAppointments.filter(apt => apt.status === 'confirmed').length,
      completed: todayAppointments.filter(apt => apt.status === 'completed').length,
      cancelled: todayAppointments.filter(apt => apt.status === 'cancelled').length,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Doctor Portal</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Cardiology and Medicine Clinic - Appointment Management</p>
            </div>
            <button
              onClick={onTogglePortal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all w-full sm:w-auto"
            >
              Back to Booking
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <div className="space-y-2">
                {/* Date input for quick selection */}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                
                {/* Calendar toggle button */}
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
                  <svg className={`w-4 h-4 transition-transform ${showCalendar ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {/* Calendar component - only show when expanded */}
              {showCalendar && (
<div className="w-full mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              {/* Calendar Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setSelectedDate(dayjs(selectedDate).subtract(1, 'month').format('YYYY-MM-DD'))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-lg font-semibold text-gray-800">
                  {dayjs(selectedDate).format('MMMM YYYY')}
                </h3>
                <button
                  onClick={() => setSelectedDate(dayjs(selectedDate).add(1, 'month').format('YYYY-MM-DD'))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {generateCalendarDays().map((day, index) => {
                  const formattedDate = day.format('YYYY-MM-DD');
                  const appointmentCounts = getAppointmentCountsByDate();
                  const appointmentCount = appointmentCounts[formattedDate] || 0;
                  const isTodayDate = isToday(day);
                  const isSelectedDate = isSelected(day);
                  const isCurrentMonthDate = isCurrentMonth(day);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(formattedDate)}
                      className={`
                        relative p-2 text-sm transition-all rounded-lg
                        ${isSelectedDate 
                          ? 'bg-blue-500 text-white' 
                          : isCurrentMonthDate 
                            ? 'hover:bg-gray-100 text-gray-800' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }
                        ${isTodayDate && !isSelectedDate ? 'ring-2 ring-blue-300' : ''}
                        ${appointmentCount > 0 && !isSelectedDate ? 'bg-blue-50' : ''}
                      `}
                    >
                      <div className="text-center">
                        <div className="font-medium">{day.format('D')}</div>
                        {appointmentCount > 0 && (
                          <div className={`
                            mt-1 text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] flex items-center justify-center
                            ${isSelectedDate 
                              ? 'bg-white text-blue-500 shadow-sm' 
                              : 'bg-red-500 text-white shadow-md'
                            }
                          `}>
                            {appointmentCount}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Today button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setSelectedDate(dayjs().format('YYYY-MM-DD'))}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Go to Today
                </button>
              </div>
            </div>
              )}
            </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Hospital
              </label>
              <select
                value={hospitalFilter}
                onChange={(e) => setHospitalFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Hospitals</option>
                {getAvailableHospitals().map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="follow-up">Follow-up</option>
                <option value="no-show">No Show</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Patient
              </label>
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-1">
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'appointments'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('appointments')}
            >
              📅 Appointments
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'content'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('content')}
            >
              📱 Content Management
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'appointments' && (
          <>
            <button 
              onClick={() => setShowAppointmentsList(!showAppointmentsList)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mb-6"
            >
              {showAppointmentsList ? 'Hide Appointments' : 'Show Appointments'}
            </button>
            {showAppointmentsList && (
            <>
            {/* Stats for appointments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Selected Date</p>
                    <p className="text-lg font-semibold text-gray-800">{formatDate(selectedDate)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Today's Appointments</p>
                    <p className="text-lg font-semibold text-gray-800">{getTodayAppointments()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Filtered Results</p>
                    <p className="text-lg font-semibold text-gray-800">{filteredAppointments.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointments List */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Appointments for {formatDate(selectedDate)}
                </h2>
              </div>
              
              <div className="p-4 sm:p-6">
                {appointmentsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500 text-lg">Loading appointments...</p>
                  </div>
                ) : filteredAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 text-lg">No appointments found for this date</p>
                    <p className="text-gray-400 text-sm mt-1">Try selecting a different date or clearing the search</p>
                    <p className="text-gray-400 text-xs mt-2">Debug: Total appointments: {appointments.length}, Selected date: {selectedDate}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment, index) => (
                      <div key={appointment.id || index} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:bg-gray-50 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            {/* Mobile-first responsive header */}
                            <div className="space-y-3">
                              {/* Patient Name and Basic Info Row */}
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-lg font-semibold text-gray-800">{appointment.name}</h3>
                                  {/* Gender Icon */}
                                  {appointment.gender && (
                                    <div className="flex items-center space-x-1">
                                      {appointment.gender === 'Male' ? (
                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 12a4 4 0 00-3.465 2.036A6.965 6.965 0 0010 16a6.965 6.965 0 003.465-1.964A4 4 0 0010 12z" clipRule="evenodd" />
                                        </svg>
                                      ) : (
                                        <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 12a4 4 0 00-3.465 2.036A6.965 6.965 0 0010 16a6.965 6.965 0 003.465-1.964A4 4 0 0010 12z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                      <span className={`text-xs font-medium hidden sm:inline ${
                                        appointment.gender === 'Male' ? 'text-blue-600' : 'text-pink-600'
                                      }`}>
                                        {appointment.gender}
                                      </span>
                                    </div>
                                  )}
                                  {/* Age Display */}
                                  {appointment.age && (
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                                      {appointment.age}y
                                    </span>
                                  )}
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full w-fit">
                                  {appointment.time}
                                </span>
                              </div>
                              
                              {/* Status and Hospital Tags Row */}
                              <div className="flex flex-wrap gap-2">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(appointment.status || 'pending')}`}>
                                  {(appointment.status || 'pending').charAt(0).toUpperCase() + (appointment.status || 'pending').slice(1)}
                                </span>
                                {appointment.hospital && (
                                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                    🏥 <span className="hidden sm:inline ml-1">{appointment.hospital.name}</span>
                                    <span className="sm:hidden ml-1">Hospital</span>
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                              <div className="space-y-2">
                                <p><strong>Phone:</strong> <a href={`tel:${appointment.phoneNumber}`} className="text-blue-600 hover:underline">{appointment.phoneNumber}</a></p>
                                <p><strong>Email:</strong> {appointment.email ? <a href={`mailto:${appointment.email}`} className="text-blue-600 hover:underline">{appointment.email}</a> : 'Not provided'}</p>
                                <p><strong>Address:</strong> <span className="break-words">{appointment.address}</span></p>
                                {/* Additional Patient Info */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                                  {appointment.gender && (
                                    <div className="flex items-center space-x-1">
                                      <strong>Gender:</strong>
                                      <span className={`font-medium ${
                                        appointment.gender === 'Male' ? 'text-blue-600' : 'text-pink-600'
                                      }`}>
                                        {appointment.gender}
                                      </span>
                                    </div>
                                  )}
                                  {appointment.age && (
                                    <div className="flex items-center space-x-1">
                                      <strong>Age:</strong> <span className="font-medium text-gray-800">{appointment.age} years</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div>
                                {appointment.problemDescription && (
                                  <div>
                                    <p><strong>Problem Description:</strong></p>
                                    <p className="text-gray-700 mt-1">{appointment.problemDescription}</p>
                                  </div>
                                )}
                                {appointment.doctorNotes && (
                                  <div className="mt-2">
                                    <p><strong>Doctor Notes:</strong></p>
                                    <p className="text-gray-700 mt-1 text-xs bg-gray-100 p-2 rounded">{appointment.doctorNotes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="border-t border-gray-200 pt-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                            <button
                              onClick={() => handleStatusChange(appointment.id || index, 'confirmed')}
                              className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-2 rounded transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id || index, 'completed')}
                              className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-2 rounded transition-colors"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id || index, 'cancelled')}
                              className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-2 rounded transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id || index, 'follow-up')}
                              className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium px-3 py-2 rounded transition-colors"
                            >
                              Follow-up
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id || index, 'no-show')}
                              className="bg-gray-500 hover:bg-gray-600 text-white text-xs font-medium px-3 py-2 rounded transition-colors"
                            >
                              No Show
                            </button>
                            <button
                              onClick={() => openNotesModal(appointment)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium px-3 py-2 rounded transition-colors"
                            >
                              Add Notes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            </>
            )}
          </>
        )}
        
        {activeTab === 'content' && (
          <ContentManager isDoctor={true} />
        )}

        {/* Notes Modal */}
        {showNotesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Add Doctor Notes for {selectedAppointment?.name}
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter doctor notes..."
                className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => {
                    setShowNotesModal(false);
                    setSelectedAppointment(null);
                    setNotes("");
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNotes}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPortal;
