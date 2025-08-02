import { useState } from "react";
import GoogleMap from './GoogleMap';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="bg-gradient-to-br from-cyan-100 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute top-32 right-12 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-24 left-16 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-8 w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Additional decorative shapes */}
        <div
          className="absolute top-20 right-1/4 w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 transform rotate-45 opacity-25 animate-pulse"
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 transform rotate-12 opacity-20 animate-pulse"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need to schedule an appointment? We're here to help. Contact us today and let us take care
            of your cardiovascular and medical health needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">📍</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Address</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-blue-700 mb-1">Popular Diagnostic Centre Ltd. </p>
                      <p className="text-gray-700 text-sm">
                        House # 57, Laksam Road, Ramghat, Kandirpar, Cumilla, Bangladesh. <br />
                        <a href="https://populardiagnostic.com" target="_blank" rel="noopener noreferrer">
                          www.populardiagnostic.com
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-700 mb-1">Moon Hospital</p>
                      <p className="text-gray-700 text-sm">
                        Room No #617, Shahid Khawaja Nizamuddin Road, Jhautola, Comilla, Bangladesh <br />
                        Mobile: +88 01836-649409
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">📞</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                  <div className="space-y-3">
                    <div></div>
                    <div>
                      <p className="font-semibold text-green-700">Emergency</p>
                      <a href="tel:+8801711987654" className="text-gray-700 hover:text-green-600 transition-colors">
                        +88 01864-569091
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-green-700">Clinic</p>
                      <a href="tel:+88029612345" className="text-gray-700 hover:text-green-600 transition-colors">
                        +88 01836-649409
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">✉️</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">
                    dr.ganeshcs@gmail.com
                    <br />
                    appointments@drganeshcs.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">⏰</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Consultation Hours</h4>
                  <div className="text-gray-700 text-sm">
                    <p>
                      <strong>Sat - Thu:</strong> 10:00 AM - 6:00 PM
                    </p>
                    <p>
                      <strong>Friday:</strong> Closed
                    </p>
                    <p className="text-purple-600 mt-1 text-xs">* Available at both hospitals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="mt-8">
              <GoogleMap
                center={{ lat: 23.249436, lng: 90.957644}}
                zoom={16}
                markers={[
                  {
                    position: { lat: 23.249436, lng: 90.957644},
                    title: "Popular Diagnostic Centre Ltd.",
                    infoWindow: `
                      <div style="padding: 10px; max-width: 250px;">
                        <h3 style="margin: 0 0 8px 0; color: #1e40af; font-weight: bold;">🏥 Popular Diagnostic Centre Ltd.</h3>
                        <p style="margin: 0 0 8px 0; color: #374151; font-size: 14px;">House # 57, Laksam Road, Ramghat, Kandirpar, Cumilla, Bangladesh</p>
                        <p style="margin: 0 0 8px 0; color: #059669; font-weight: bold;">📞 Emergency: +88 01864-569091</p>
                        <p style="margin: 0 0 8px 0; color: #059669; font-weight: bold;">📞 Clinic: +88 01836-649409</p>
                        <p style="margin: 0; color: #7c3aed; font-size: 12px;">✉️ drganeshcs@gmail.com</p>
                      </div>
                    `
                  }
                ]}
                className="w-full h-80 rounded-lg shadow-lg border-2 border-blue-200"
                showDirectionsButton={true}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/80 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/80 backdrop-blur-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white/80 backdrop-blur-sm"
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Book Appointment</option>
                    <option value="consultation">General Consultation</option>
                    <option value="insurance">Insurance Questions</option>
                    <option value="emergency">Emergency</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all bg-white/80 backdrop-blur-sm"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

       </div>
    </div>
  );
};

export default ContactUs;
