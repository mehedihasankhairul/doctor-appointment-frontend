import { useState, useEffect } from "react";
import dayjs from "dayjs";
import apiService from '../services/api.js';

const BookingCalendar = ({ onSlotSelect, selectedHospital, onBack }) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch slots when hospital or date changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedHospital || !selectedDate) {
        setSlots([]);
        return;
      }

      // Check for Friday (day 5) - No slots should be available
      const dayOfWeek = dayjs(selectedDate).day();
      if (dayOfWeek === 5) {
        setSlots([]);
        return;
      }

      setLoading(true);
      try {
        // Try to fetch real slots from API first
        const response = await apiService.getSlots(selectedHospital.id || selectedHospital.name, selectedDate);
        if (response && response.slots) {
          setSlots(response.slots);
        } else {
          // Fallback to mock slots if no API data
          const mockSlots = generateMockSlots(selectedDate, selectedHospital);
          setSlots(mockSlots);
        }
      } catch (error) {
        console.error('Error fetching slots from API, using mock data:', error);
        // Fallback to mock slots on API failure
        const mockSlots = generateMockSlots(selectedDate, selectedHospital);
        setSlots(mockSlots);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedHospital, selectedDate]);

  // Generate mock slots for demonstration (until slots API is fully implemented)
  const generateMockSlots = (date, hospital) => {
    const selectedDay = dayjs(date).day();
    
    // Skip Friday (day 5) - hospitals closed
    if (selectedDay === 5) return [];
    
    // Skip if not in hospital's visit days
    if (!hospital?.visitDays?.includes(selectedDay)) return [];
    
    // Generate time slots based on hospital schedule
    const slots = [];
    const startHour = 9;
    const endHour = 17;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const maxAppointments = 20;
        const currentAppointments = Math.floor(Math.random() * maxAppointments);
        const available = currentAppointments < maxAppointments;
        
        slots.push({
          time_slot: timeStr,
          start_time: timeStr,
          available,
          current_appointments: currentAppointments,
          max_appointments: maxAppointments,
          remaining_slots: maxAppointments - currentAppointments
        });
      }
    }
    
    return slots;
  };

  const getTimeSlots = () => {
    if (!selectedHospital || loading) return [];

    const selectedDay = dayjs(selectedDate).day();
    const selectedDateObj = dayjs(selectedDate);
    const now = dayjs();
    
    // Check if the selected date is in the past
    if (selectedDateObj.isBefore(now, 'day')) {
      return [];
    }
    
    // Check if it's Friday (day 5) - both hospitals are closed
    if (selectedDay === 5) {
      return [];
    }
    
    // Check if the selected day is in the hospital's visit days
    if (!selectedHospital.visitDays.includes(selectedDay)) {
      return [];
    }

    // Return the actual slots from the API
    return slots.map(slot => {
      let isAvailable = slot.available;
      
      // If it's today, check if the time slot is in the past
      if (selectedDateObj.isSame(now, 'day')) {
        const slotTime = dayjs(`${selectedDate} ${slot.start_time}`, 'YYYY-MM-DD HH:mm');
        if (slotTime.isBefore(now)) {
          isAvailable = false;
        }
      }
      
      return {
        time: slot.time_slot,
        available: isAvailable,
        current_appointments: slot.current_appointments,
        max_appointments: slot.max_appointments,
        remaining_slots: slot.remaining_slots
      };
    });
  };

  const timeSlots = getTimeSlots();

  const handleTimeSelect = async (slot) => {
    if (slot.available) {
      setSelectedTime(slot.time);
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      onSlotSelect(selectedDate, slot.time);
      setIsLoading(false);
    }
  };

  const handleConfirmSlot = async () => {
    if (selectedTime) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      onSlotSelect(selectedDate, selectedTime);
      setIsLoading(false);
    }
  };

  const getAvailableSlots = () => {
    return timeSlots.filter(slot => slot.available).length;
  };

  const formatSelectedDate = () => {
    return dayjs(selectedDate).format("dddd, MMMM D, YYYY");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Hospital Info */}
        {selectedHospital && (
          <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{selectedHospital.name}</h2>
                <p className="text-sm text-gray-600">{selectedHospital.schedule}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Available Times</p>
                <p className="text-lg font-semibold text-blue-600">{getAvailableSlots()} slots</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Message when no hospital is selected */}
        {!selectedHospital && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">Please Select a Hospital First</h3>
                <p className="text-yellow-700">You need to select a hospital to view available appointment times.</p>
              </div>
            </div>
          </div>
        )}
        {/* Mobile: Vertical Stack, Desktop: Horizontal Layout */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Date Picker Section */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Date</h2>
              <input
                type="date"
                value={selectedDate}
                min={today}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              />
              {selectedDate && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    Selected: {formatSelectedDate()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Available Times</h2>
                <span className="text-sm text-green-600 font-medium">
                  {getAvailableSlots()} slots available
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => handleTimeSelect(slot)}
                      disabled={!slot.available || isLoading}
                      className={`
                        p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 relative
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        ${
                          !slot.available || isLoading
                            ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                            : selectedTime === slot.time
                            ? "bg-blue-500 text-white border-blue-500 shadow-md scale-105"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:scale-105"
                        }
                      `}
                    >
                      {isLoading && selectedTime === slot.time ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div>{slot.time}</div>
                          {slot.remaining_slots !== undefined && (
                            <div className="text-xs opacity-75 mt-1">
                              {slot.remaining_slots}/{slot.max_appointments} left
                            </div>
                          )}
                        </div>
                      )}
                      {!slot.available && (
                        <span className="absolute top-1 right-1 text-xs text-red-500">•</span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">No slots available for this day</p>
                    {dayjs(selectedDate).isBefore(dayjs(), 'day') && (
                      <p className="text-xs text-red-600 mt-2">Past dates are not available for booking</p>
                    )}
                    {dayjs(selectedDate).format('dddd') === 'Friday' && (
                      <p className="text-xs text-amber-600 mt-2">Both hospitals are closed on Fridays</p>
                    )}
                    {dayjs(selectedDate).isSame(dayjs(), 'day') && getAvailableSlots() === 0 && (
                      <p className="text-xs text-orange-600 mt-2">All remaining slots for today have passed</p>
                    )}
                    {loading && (
                      <p className="text-xs text-blue-600 mt-2">Loading available slots...</p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Legend */}
              <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded mr-2"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 border border-gray-300 rounded mr-2"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span>Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-amber-800 mb-3">Before Your Appointment</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-amber-700">
            <div className="flex items-start">
              <span className="mr-2">•</span>
              <span>Arrive 15 minutes early</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">•</span>
              <span>Bring valid ID & insurance card</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">•</span>
              <span>Remove contact lenses before exam</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">•</span>
              <span>Consultation fee: $150</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onBack}
            className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hospital Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
