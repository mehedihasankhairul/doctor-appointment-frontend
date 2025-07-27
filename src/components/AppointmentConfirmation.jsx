const AppointmentConfirmation = ({ appointment, onNewAppointment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full">
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">✓</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h2>
        <p className="text-gray-600">Your appointment has been successfully booked.</p>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Hospital:</span>
            <span className="text-gray-600">{appointment.hospital?.name || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Date:</span>
            <span className="text-gray-600">{formatDate(appointment.date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Time:</span>
            <span className="text-gray-600">{appointment.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Patient:</span>
            <span className="text-gray-600">{appointment.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Phone:</span>
            <span className="text-gray-600">{appointment.phoneNumber}</span>
          </div>
          {appointment.hospital?.address && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Hospital Address:</span>
              <span className="text-gray-600">{appointment.hospital.address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Patient Information</h4>
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Age:</span>
              <p className="text-gray-600 mt-1">{appointment.age} years old</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Gender:</span>
              <p className="text-gray-600 mt-1">{appointment.gender}</p>
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Address:</span>
            <p className="text-gray-600 mt-1">{appointment.address}</p>
          </div>
          {appointment.problemDescription && (
            <div>
              <span className="font-medium text-gray-700">Problem Description:</span>
              <p className="text-gray-600 mt-1">{appointment.problemDescription}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Please arrive 15 minutes before your scheduled appointment</li>
          <li>• Bring a valid ID and insurance card if applicable</li>
          <li>• If you wear contact lenses, please remove them before the examination</li>
          <li>• Call us if you need to reschedule or cancel your appointment</li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={onNewAppointment}
          className="bg-blue-500 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-600 transition-all"
        >
          Book Another Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
