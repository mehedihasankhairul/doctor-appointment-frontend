import React, { useState } from "react";

const DoctorProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample data - in a real app, this would come from an API or props
  const doctorInfo = {
    name: "Dr. Ganesh Chandra Saurav",
    title: "Cardiologist & General Physician",
    specialization: "MBBS, D-Card, FCCP, FCPS (Medicine) ",
    experience: "15+ years",
    education: [
      "MBBS - Faridpur Medical College, Faridpur",
      "D-Card - National Institute of Cardiovascular Diseases (NICVD), Dhaka",
      "FCPS - Bangladesh College of Physicians and Surgeons (BCPS), Dhaka",
      "MACP - Member, American College of Physicians",
      "MACC - Member, American College of Cardiology",
      "MESC - Member, European Society of Cardiology",
      "CCD - Certificate Course on Diabetology, BIRDEM Hospital, Dhaka",
    ],
    about:
      "Dr. Ganesh Chandra Saurav is a highly experienced ophthalmologist with over 15 years of expertise in comprehensive eye care. He specializes in advanced retinal surgeries, cataract procedures, and modern eye treatments. Known for his compassionate approach and cutting-edge techniques, Dr. Ganesh has successfully treated thousands of patients and is dedicated to preserving and restoring vision.",
    achievements: [
      "Pioneered minimally invasive cataract surgery techniques in Bangladesh",
      "Published over 20 research papers in international medical journals",
      "Recipient of the 'Best Ophthalmologist' award at the National Medical Conference 2023",
      "Led a team in a groundbreaking study on diabetic retinopathy",
      "Trained over 100 junior doctors in advanced eye care techniques",
    ],
    services: [
      "ECG (Electrocardiogram)",
      "Cardiac Risk Assessment",
      "Hypertension Management",
      "Coronary Artery Disease Treatment",
      "Heart Failure Management",
      "General Health Check-ups",
      "Diabetes Management",
      "Thyroid Disorder Treatment",
    ],
  };

  const certificationImages = [
    {
      id: 1,
      src: "../../public/images/certification/certificate.jpg",
      alt: "Cardiology certification",
      caption: "Degree Certificate in Cardiology",
      type: "certificate",
    },
    {
      id: 2,
      src: "../../public/images/certification/card.png",
      alt: "cardiology certification",
      caption: "Fellowship in Cardiology",
      type: "certificate",
    },
    {
      id: 3,
      src: "../../public/images/certification/journal.jpeg",
      alt: "Research Publication",
      caption: "Published Research in Cardiology",
      type: "Publication",
    },
  ];

  const galleryImages = [
    {
      id: 1,
      src: "../../public/images/hangouts/hangout1.jpeg",
      alt: "hangout1",
      caption: "Patient consultation",
    },
    {
      id: 2,
      src: "../../public/images/hangouts/hangout2.jpeg",
      alt: "Modern surgery equipment",
      caption: "State-of-the-art equipment",
    },
    {
      id: 3,
      src: "../../public/images/hangouts/hangout3.jpeg",
      alt: "Eye surgery in progress",
      caption: "Advanced eye surgery",
    },
    { id: 4, src: "../../public/images/hangouts/hangout4.jpeg", alt: "Dr. Ganesh with team", caption: "Medical team" },
    {
      id: 5,
      src: "../../public/images/hangouts/hangout5.jpeg",
      alt: "Award ceremony",
      caption: "Excellence award ceremony",
    },
    {
      id: 6,
      src: "../../public/images/hangouts/hangout6.jpeg",
      alt: "Medical conference",
      caption: "International conference",
    },
    {
      id: 7,
      src: "../../public/images/hangouts/hangout7.jpeg",
      alt: "Community health camp",
      caption: "Community health initiative",
    },
    {
      id: 8,
      src: "../../public/images/hangouts/hangout8.jpeg",
      alt: "Patient recovery",
      caption: "Successful patient recovery",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: `Evaluation of Lipid Disorders in Diabetic Patients: Study in a Tertiary
        Care Hospital, Cumilla, Bangladesh`,
      excerpt: `Lipid disorder is one of the common disorders which is seen in most of the diabetes patients that causes
cardio vascular disorders.`,
      date: "June 17, 2021",
      readTime: "5 min read",
      link: "https://share.google/vcZKI1BXCgudUgd3u",
    },
    {
      id: 2,
      title: `Evaluation of Computed Tomography Guided Fine Needle Aspiration Cytology of Lung Mass with Histological Correlation`,
      excerpt:
        "Aim of our study was to evaluate the pathological spectrum of diseases in the lesions of the lung through CT guided FNAC.",
      date: "November 30, 2022",
      readTime: "7 min read",
      link: "https://www.banglajol.info/index.php/EMCJ/article/view/66724",
    },
    {
      id: 3,
      title: "Evaluation of Thyroid Disorders in Clinical Practices",
      excerpt: `Thyroid disorders are one of the most common endocrine disorders encountered in the South-East Asian
region. The study aimed to evaluate the thyroid disorders.`,
      date: "June 18, 2022",
      readTime: "4 min read",
      link: "https://www.saspublishers.com/article/5339/download/",
    },
    {
      id: 4,
      title: "IgE Abnormalities in Patients with Bronchial Asthma",
      excerpt: `Bronchial asthma is a medical condition that causes a deformity in the airway path of the lungs, causing
them to swell and get narrow. The swelling produces excess mucus in the pathway, making it hard to breathe, and this
results in coughing, short breath,`,
      date: "October 14, 2021",
      readTime: "4 min read",
      link: "https://saspublishers.com/article/4235/download/",
    },
    {
      id: 5,
      title: "Evaluation of Fecal Occult Blood Test for Screening of Colorectal Carcinoma",
      excerpt: `To assess the fecal occult blood by fecal occult blood test of the patients who fulfill the criteria as a screening for colorectal carcinoma... `,
      date: "November 23, 2023",
      readTime: "4 min read",
      link: "https://www.banglajol.info/index.php/EMCJ/article/view/69692",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
            {/* Profile Image Section */}
            <div className="flex-shrink-0 relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur opacity-75"></div>
                <img
                  src="https://i.ibb.co/S4YZtZGt/Modern-Profile-Photo-Instagram-Post.png"
                  alt={doctorInfo.name}
                  className="relative w-60 h-60 object-cover rounded-full border-6 border-white shadow-2xl"
                />
                {/* Status Badge */}
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✓ Available
                </div>
              </div>
            </div>

            {/* Name and Info Section */}
            <div className="text-center lg:text-left flex-1">
              {/* Name with special styling */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 mb-4">
                  <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
                    Dr. Ganesh Chandra Saurav
                  </h1>
                </div>
                <div className="h-1 w-52 bg-gradient-to-r from-blue-300 to-white mx-auto lg:mx-0 mb-4"></div>
              </div>

              {/* Professional Info */}
              <div className="space-y-2 mb-6">
                <p className="text-xl lg:text-2xl text-blue-100 font-medium">{doctorInfo.title}</p>
                <p className="text-lg lg:text-md text-blue-200 font-light">{doctorInfo.specialization}</p>
                <p className="text-base lg:text-lg text-blue-300">Leading Medical Specialist</p>
              </div>

              {/* Experience Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-base lg:text-lg">
                <span className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300">
                  <span className="mr-2">📅</span>
                  {doctorInfo.experience} Experience
                </span>
                <span className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300">
                  <span className="mr-2">🏥</span>
                  Both Hospitals
                </span>
                <span className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300">
                  <span className="mr-2">⭐</span>
                  Expert Surgeon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg p-10 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3 text-4xl">👨‍⚕️</span>
            About Dr. Ganesh Chandra Saurav
          </h2>
          <p className="text-md lg:text-lg text-gray-700 leading-relaxed mb-6 font-light">{doctorInfo.about}</p>

          {/* Education */}
          <div className="mb-8">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-2xl">🎓</span>
              Education & Qualifications
            </h3>
            <ul className="space-y-4">
              {doctorInfo.education.map((edu, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-2 text-xl">•</span>
                  <span className="text-lg lg:text-xl text-gray-700 leading-relaxed">{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-3xl">🏆</span>
              Key Achievements
            </h3>
            <ul className="space-y-4">
              {doctorInfo.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-3 mt-2 text-xl">✓</span>
                  <span className="text-lg lg:text-xl text-gray-700 leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-lg p-10 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3 text-4xl">🏥</span>
            Services & Specializations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {doctorInfo.services.map((service, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-lg p-4 border border-blue-200 hover:bg-blue-100 transition-colors duration-300"
              >
                <div className="flex items-center">
                  <span className="text-blue-600 mr-2 text-xl"></span>
                  <span className="font-medium text-gray-900 text-md lg:text-lg">{service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Achievements Section */}
        <div className="bg-white rounded-lg shadow-lg p-10 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3 text-4xl">🏅</span>
            Certifications & Achievements
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Professional certificates, awards, and patient testimonials showcasing Dr. Ganesh's expertise and
            dedication.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 inline-flex">
              <button
                className="px-6 py-2 rounded-md text-sm font-medium transition-colors bg-blue-600 text-white"
                onClick={() => {
                  /* Add filter logic later */
                }}
              >
                All
              </button>
              <button
                className="px-6 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900"
                onClick={() => {
                  /* Add filter logic later */
                }}
              >
                Certificates
              </button>
              <button
                className="px-6 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900"
                onClick={() => {
                  /* Add filter logic later */
                }}
              >
                Testimonials
              </button>
            </div>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certificationImages.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200"
                onClick={() => setSelectedImage(item)}
              >
                {/* Type Badge */}
                <div
                  className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                    item.type === "certificate"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}
                >
                  {item.type === "certificate" ? "📜 Certificate" : "💬 Testimonial"}
                </div>

                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <p className="text-sm font-medium">{item.caption}</p>
                  </div>
                </div>

                {/* View Icon */}
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-blue-600 text-lg">🔍</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="text-3xl font-bold text-green-700 mb-2">15+</div>
              <div className="text-green-600 font-medium">Professional Certificates</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-3xl font-bold text-blue-700 mb-2">200+</div>
              <div className="text-blue-600 font-medium">Patient Testimonials</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="text-3xl font-bold text-purple-700 mb-2">25+</div>
              <div className="text-purple-600 font-medium">Medical Awards</div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-lg shadow-lg p-10 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3 text-4xl">📸</span>
            Photo Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(image)}
              >
                {console.log(image.src)}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 text-lg font-medium">{image.caption}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-blue-600 text-xl">🔍</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog & Content */}
        <div className="bg-white rounded-lg shadow-lg p-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3 text-4xl">📝</span>
            Latest Articles & Insights
          </h2>
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="border-l-4 border-blue-600 pl-8 py-6 hover:bg-gray-50 transition-colors duration-300 rounded-r-lg"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-300">
                    {post.title}
                  </h3>
                  <div className="space-x-4 text-sm lg:text-base text-gray-500 mt-2 lg:mt-0">
                    <span className="font-bold font-mono"> Published: {post.date}</span>
                  </div>
                </div>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-4 font-light">{post.excerpt}</p>
                <a href={post.link} target="blank" className="text-blue-600 hover:underline">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium inline-flex items-center transition-colors duration-300 text-base">
                    Read Full Article
                    <span className="ml-2 text-xl">→</span>
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-white bg-black bg-opacity-50 rounded-lg p-4">
              <p className="text-center">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
