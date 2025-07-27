import { useState, useEffect } from "react";

const HeroSection = ({ onBookAppointment }) => {
  const slides = [
    {
      id: 1,

      badge: "বিশেষজ্ঞ ডাক্তারের সেবা",
      title: "বিশ্বস্ত চিকিৎসা,",
      titleHighlight: "আমাদের প্রতিশ্রুতি",
      description:
        "আপনার স্বাস্থ্য আমাদের কাছে প্রাধান্য পায়। অভিজ্ঞ চিকিৎসকদের কাছ থেকে উচ্চমানের এবং ব্যক্তিগতকৃত চিকিৎসা সেবা নিন।",
      image: "https://i.ibb.co/1JsGrZt0/image.png",
      altText: "বিশেষজ্ঞ চিকিৎসক পরামর্শ",
      features: ["বিশেষজ্ঞ চিকিৎসক", "ব্যক্তিগত সেবা", "উচ্চমানের চিকিৎসা", "দ্রুত অ্যাপয়েন্টমেন্ট"],
    },
    {
      id: 2,
      badge: "Heart Care You Can Rely On",
      title: "Your Heart,",
      titleHighlight: "Our Commitment",
      description:
        "Trust our team of expert cardiologists to provide personalized care with the latest in diagnostic and treatment technologies, all focused on your heart health.",
      image: "https://i.ibb.co/QvVD34Xy/Modern-Profile-Photo-Instagram-Post-1.png",
      altText: "Professional Medical Examination",
      features: [
        "Precise Diagnosis",
        "Innovative Treatment Options",
        "Tailored Patient Care",
        "Convenient Same-Day Appointments",
      ],
    },
    {
      id: 3,
      badge: "Comprehensive Patient Care",
      title: "Personalized Treatment,",
      titleHighlight: "Better Health",
      description:
        "Complete patient profiling including age and gender-specific care, ensuring personalized treatment plans for optimal health outcomes.",
      image:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      altText: "Personalized Medical Care",
      features: ["Patient Profiling", "Age-Specific Care", "Gender Considerations", "Follow-up Support"],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Vibrant animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-30 animate-pulse"></div>
              <div
                className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-25 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-30 animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-40 right-10 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-35 animate-pulse"
                style={{ animationDelay: "3s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/4 w-14 h-14 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-25 animate-pulse"
                style={{ animationDelay: "4s" }}
              ></div>
              <div
                className="absolute top-1/3 right-1/3 w-18 h-18 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full opacity-20 animate-pulse"
                style={{ animationDelay: "5s" }}
              ></div>

              {/* Additional decorative shapes */}
              <div
                className="absolute top-32 left-1/3 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 transform rotate-45 opacity-30 animate-pulse"
                style={{ animationDelay: "6s" }}
              ></div>
              <div
                className="absolute bottom-32 right-1/4 w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 transform rotate-12 opacity-25 animate-pulse"
                style={{ animationDelay: "7s" }}
              ></div>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-6rem)] lg:min-h-[80vh]">
                {/* Left Column - Content */}
                <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
                  {/* Badge */}
                  <div className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
                    <span className="mr-2">❤️</span>
                    <span className="truncate">{slide.badge}</span>
                  </div>

                  {/* Main Heading */}
                  <div className="space-y-3 lg:space-y-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                      {slide.title}
                      <span className="block text-blue-600">{slide.titleHighlight}</span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  {/* Key Features - Grid layout for mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    {slide.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 lg:space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 lg:w-5 lg:h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm lg:text-base text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Image */}
                <div className="flex justify-center items-center order-1 lg:order-2">
                  <div className="relative">
                    {/* Main circular image - Responsive sizing */}
                    <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-full overflow-hidden shadow-2xl border-4 lg:border-8 border-white">
                      <img src={slide.image} alt={slide.altText} className="w-full h-full object-cover" />
                    </div>

                    {/* Floating elements - Hidden on small mobile */}
                    <div className="hidden sm:block absolute -top-2 -right-2 lg:-top-4 lg:-right-4 bg-white rounded-full p-2 lg:p-4 shadow-lg">
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg lg:text-2xl">👨‍⚕️</span>
                      </div>
                    </div>

                    <div className="hidden sm:block absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 bg-white rounded-full p-2 lg:p-4 shadow-lg">
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-lg lg:text-2xl">✨</span>
                      </div>
                    </div>

                    <div className="hidden md:block absolute top-1/4 -left-4 lg:-left-8 bg-white rounded-full p-2 lg:p-3 shadow-lg">
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-sm lg:text-xl">🔬</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls - Mobile Responsive */}
      <div className="absolute bottom-5 sm:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-40 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 lg:space-x-4 py-6">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 p-2 lg:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-1.5 lg:space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-blue-600 scale-125" : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 p-2 lg:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
