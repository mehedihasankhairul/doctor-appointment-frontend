import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Custom styles for Swiper
const swiperStyles = `
  .swiper-pagination-bullet-custom {
    width: 12px;
    height: 12px;
    background: #D1D5DB;
    border-radius: 50%;
    opacity: 1;
    transition: all 0.2s ease;
    cursor: pointer;
    margin: 0 4px;
  }
  
  .swiper-pagination-bullet-custom:hover {
    background: #9CA3AF;
    transform: scale(1.1);
  }
  
  .swiper-pagination-bullet-active-custom {
    background: #3B82F6;
    transform: scale(1.25);
  }
  
  .reviews-swiper {
    padding: 20px 0;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = swiperStyles;
  document.head.appendChild(styleSheet);
}

const CustomerReviews = ({ onBookAppointment }) => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      comment: "Dr. Smith is amazing! My vision has improved significantly after the treatment. The staff is very professional and caring.",
      date: "2 weeks ago",
      avatar: "👩‍💼",
      bgColor: "from-pink-400 to-rose-500"
    },
    {
      id: 7,
      name: "মাহিনুর রহমান",
      location: "ঢাকা, বাংলাদেশ",
      rating: 5,
      comment: "চমৎকার সেবা এবং তাদের আন্তরিকতা অবিশ্বাস্য। আমার চিকিৎসার প্রসংগে অনেক ভালো মত ব্যাখ্যা করেছেন।",
      date: "১ সপ্তাহ আগে",
      avatar: "👨‍⚕️",
      bgColor: "from-blue-400 to-cyan-500"
    },
    {
      id: 8,
      name: "তানিয়া আক্তার",
      location: "চট্টগ্রাম, বাংলাদেশ",
      rating: 4,
      comment: "সুন্দর পরিবেশ এবং ভর্তি প্রক্রিয়াটি বেশ সহজ ছিল। আমি অত্যন্ত সন্তুষ্ট।",
      date: "২ মাস আগে",
      avatar: "👩‍⚕️",
      bgColor: "from-purple-400 to-pink-500"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Los Angeles, CA",
      rating: 5,
      comment: "Outstanding service! The clinic is equipped with the latest technology and the doctor explained everything clearly.",
      date: "1 month ago",
      avatar: "👨‍💻",
      bgColor: "from-green-400 to-emerald-500"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Chicago, IL",
      rating: 4,
      comment: "Great experience overall. The appointment was on time and the staff was friendly. Would definitely recommend!",
      date: "3 weeks ago",
      avatar: "👩‍🎓",
      bgColor: "from-yellow-400 to-orange-500"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Houston, TX",
      rating: 5,
      comment: "Been coming here for years. Consistently excellent care and attention to detail. Thank you for keeping my heart healthy!",
      date: "1 week ago",
      avatar: "👨‍🏫",
      bgColor: "from-indigo-400 to-blue-500"
    },
    {
      id: 5,
      name: "Lisa Wang",
      location: "Seattle, WA",
      rating: 5,
      comment: "The best cardiology and medicine clinic in the city! Professional, thorough, and genuinely care about patient wellbeing.",
      date: "2 months ago",
      avatar: "👩‍⚕️",
      bgColor: "from-teal-400 to-cyan-500"
    },
    {
      id: 6,
      name: "James Miller",
      location: "Miami, FL",
      rating: 4,
      comment: "Very satisfied with my visit. Clean facility, modern equipment, and knowledgeable staff. Highly recommended!",
      date: "1 month ago",
      avatar: "👨‍🔬",
      bgColor: "from-violet-400 to-purple-500"
    },
    {
      id: 9,
      name: "আবদুল করিম",
      location: "সিলেট, বাংলাদেশ",
      rating: 5,
      comment: "ডাক্তার সাহেবের ব্যবহার অসাধারণ। হৃদযন্ত্রের সমস্যার জন্য এসেছিলাম, এখন অনেক ভালো আছি।",
      date: "৩ সপ্তাহ আগে",
      avatar: "👨‍🦳",
      bgColor: "from-red-400 to-pink-500"
    },
    {
      id: 10,
      name: "রিনা খাতুন",
      location: "রাজশাহী, বাংলাদেশ",
      rating: 4,
      comment: "পরিচ্ছন্ন পরিবেশ এবং আধুনিক যন্ত্রপাতি। সময়মতো সেবা পেয়েছি।",
      date: "১ মাস আগে",
      avatar: "👩‍🦱",
      bgColor: "from-emerald-400 to-teal-500"
    }
  ];


  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-sm sm:text-base md:text-lg ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}>
          ⭐
        </span>
      ));
  };

  return (
    <section className="bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/3 right-20 w-14 h-14 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '5s' }}></div>
        
        {/* Additional decorative shapes */}
        <div className="absolute top-32 left-1/4 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 transform rotate-45 opacity-30 animate-pulse" style={{ animationDelay: '6s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 transform rotate-12 opacity-25 animate-pulse" style={{ animationDelay: '7s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <header className="text-center ">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read reviews from our satisfied patients and learn about their experiences with our cardiology and medicine
            services.
          </p>
          <div className="mt-6 flex justify-center items-center space-x-2">
            <div className="flex">{renderStars(5)}</div>
            <span className="text-gray-600 font-medium">4.9 out of 5 stars</span>
            <span className="text-gray-500">(250+ reviews)</span>
          </div>
        </header>

        {/* Swiper Reviews Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{
              el: '.swiper-pagination-custom',
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={600}
            className="reviews-swiper py-4"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="px-2">
                  <div className={`bg-gradient-to-br ${review.bgColor} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden h-72`}>
                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-white bg-opacity-20 rounded-full"></div>
                    <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-white bg-opacity-15 rounded-full"></div>
                    <div className="absolute top-1/2 -right-1 w-6 h-6 bg-white bg-opacity-10 rounded-full"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Avatar and Rating */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <span className="text-xl">{review.avatar}</span>
                        </div>
                        <div className="flex space-x-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      
                      {/* Comment */}
                      <div className="flex-1 mb-4">
                        <p className="text-white text-sm leading-relaxed line-clamp-4">
                          "{review.comment}"
                        </p>
                      </div>
                      
                      {/* User Info */}
                      <div className="mt-auto">
                        <h4 className="font-bold text-white text-base mb-1">{review.name}</h4>
                        <p className="text-white text-opacity-90 text-xs mb-1">{review.location}</p>
                        <p className="text-white text-opacity-80 text-xs">{review.date}</p>
                      </div>
                      
                      {/* Quote decoration */}
                      <div className="absolute top-2 left-2 text-white text-opacity-20 text-4xl font-bold">“</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button className="swiper-button-prev-custom absolute left-0 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center transition duration-200 hover:scale-110 z-10">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next-custom absolute right-0 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center transition duration-200 hover:scale-110 z-10">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom flex justify-center mt-8 space-x-2"></div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;

