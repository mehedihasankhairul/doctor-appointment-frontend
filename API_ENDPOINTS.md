# Eye Appointment API Endpoints Documentation

Base URL: `http://localhost:3001/api`

## 🏥 Health Check
- **GET** `/health` - Server health check (Public)

## 📅 Appointments
- **POST** `/appointments` - Create new appointment (Public)
- **GET** `/appointments/track/:refNumber` - Track appointment by reference number (Public)
- **GET** `/appointments/all` - Get all appointments (Admin/Doctor only)
  - Query params: `date`, `hospital`, `status`, `limit`, `skip`
- **PUT** `/appointments/:id` - Update appointment status and notes (Admin/Doctor only)
- **GET** `/appointments/stats/overview` - Get appointment statistics (Admin/Doctor only)

## 👤 Authentication & Users
- **POST** `/auth/register` - Register new user (Public)
- **POST** `/auth/login` - User login (Public)
- **GET** `/auth/profile` - Get user profile (Authenticated)
- **PUT** `/auth/profile` - Update user profile (Authenticated)
- **PUT** `/auth/change-password` - Change password (Authenticated)

## 🕒 Slots Management
- **GET** `/slots/:hospitalId/:date` - Get available slots for specific hospital and date (Public)
- **GET** `/slots/:hospitalId/availability/:startDate/:endDate` - Get slot availability for date range (Public)
- **PATCH** `/slots/:hospitalId/:date/:slotTime/reset` - Reset slot capacity (Admin only)

## 💊 Prescriptions
- **POST** `/prescriptions` - Create new prescription (Admin/Doctor only)
- **GET** `/prescriptions/track/:refNumber` - Track prescription by reference number (Public)
- **GET** `/prescriptions/patient/:email` - Get patient prescriptions by email (Authenticated)
- **GET** `/prescriptions` - Get all prescriptions (Admin/Doctor only)
  - Query params: `page`, `limit`, `status`, `hospital`, `patient_email`
- **GET** `/prescriptions/:id` - Get single prescription (Admin/Doctor only)
- **PATCH** `/prescriptions/:id` - Update prescription (Admin/Doctor only)
- **PATCH** `/prescriptions/:id/status` - Update prescription status (Admin/Doctor only)
- **DELETE** `/prescriptions/:id` - Delete prescription (Admin only)
- **GET** `/prescriptions/stats/overview` - Get prescription statistics (Admin/Doctor only)

## ⭐ Reviews
- **GET** `/reviews` - Get all published reviews (Public)
  - Query params: `page`, `limit`, `rating`
- **GET** `/reviews/admin` - Get all reviews including unpublished (Admin/Doctor only)
  - Query params: `page`, `limit`, `status`, `rating`
- **POST** `/reviews` - Create new review (Public/Authenticated)
- **GET** `/reviews/my-reviews` - Get user's reviews (Authenticated)
- **GET** `/reviews/:id` - Get single review (Public/Authenticated)
- **PUT** `/reviews/:id` - Update review (Authenticated - own reviews only)
- **PATCH** `/reviews/:id/publish` - Publish/unpublish review (Admin/Doctor only)
- **DELETE** `/reviews/:id` - Delete review (Authenticated - own reviews, Admin - any)
- **GET** `/reviews/stats/overview` - Get review statistics (Admin/Doctor only)

## 📝 Content Management
- **GET** `/content` - Get content (Public) - Placeholder
- **POST** `/content` - Create content (Admin/Doctor only) - Placeholder
- **PUT** `/content/:id` - Update content (Admin/Doctor only) - Placeholder
- **DELETE** `/content/:id` - Delete content (Admin/Doctor only) - Placeholder

## 📞 Contact
- **POST** `/contact` - Submit contact message (Public) - Placeholder
- **GET** `/contact` - Get contact messages (Admin/Doctor only) - Placeholder

## 🏥 Hospital Information (from Slots)

### Available Hospitals:
1. **Moon Hospital** (ID: `moon`)
   - Visit Days: Saturday to Thursday (closed Friday)
   - Time Slots: 
     - 9:00 AM - 10:00 AM
     - 10:00 AM - 11:00 AM 
     - 11:00 AM - 12:00 PM
     - 12:00 PM - 1:00 PM
     - 2:00 PM - 3:00 PM
     - 3:00 PM - 4:00 PM
     - 4:00 PM - 5:00 PM
     - 5:00 PM - 6:00 PM
   - **Total: 8 slots per day**

2. **Popular Diagnostic Centre** (ID: `popular`)
   - Visit Days: Saturday to Thursday (closed Friday)  
   - Time Slots: 8:00 AM - 9:00 AM, 5:00 PM - 6:00 PM, 6:00 PM - 7:00 PM, 7:00 PM - 8:00 PM
   - **Total: 4 slots per day**

## 🔐 Authentication Requirements

### Public Endpoints
- Health check
- Create appointment
- Track appointment
- Track prescription
- Get published reviews
- Submit review
- Submit contact
- User registration/login
- Get slots

### Authenticated Endpoints
- Get user profile
- Update user profile
- Change password
- Get user's reviews
- Update own reviews
- Delete own reviews
- Get patient prescriptions

### Admin/Doctor Only Endpoints
- Get all appointments
- Update appointments
- Get appointment statistics
- Create prescriptions
- Get all prescriptions
- Update prescriptions
- Delete prescriptions
- Get prescription statistics
- Get admin reviews
- Publish/unpublish reviews
- Get review statistics
- Reset slot capacity
- Content management (when implemented)
- Get contact messages (when implemented)

## 📊 Database Information
- **Database Name**: `doctor-portal`
- **Connection**: MongoDB Atlas
- **Collections**: appointments, users, reviews, prescriptions, slots, content, contacts

## 🔑 Authentication Headers
For authenticated endpoints, include:
```
Authorization: Bearer <JWT_TOKEN>
```

## 📝 Example Usage

### Create Appointment
```bash
curl -X POST http://localhost:3001/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patientName": "John Doe",
    "patientEmail": "john@example.com",
    "patientPhone": "1234567890",
    "patientAge": 30,
    "patientGender": "male",
    "patientAddress": "123 Main St",
    "hospital": "Popular Diagnostic Centre",
    "date": "2025-07-20",
    "time": "17:00"
  }'
```

### Track Appointment
```bash
curl http://localhost:3001/api/appointments/track/APT-20250719-ABCD1234
```

### Get Available Slots
```bash
curl http://localhost:3001/api/slots/popular/2025-07-20
```

### Health Check
```bash
curl http://localhost:3001/api/health
```
