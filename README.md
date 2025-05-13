# Clinic Management System

## 🚀 Abstract

The Clinic Management System is a digital platform designed to revolutionize healthcare clinic operations by replacing manual processes with a comprehensive, role-specific solution. Tailored for doctors and administrative staff, this system enhances efficiency, optimizes workflows, and improves patient care.

---

## 🌐 Live Demo

[Click here to view the deployed site](https://clinic-management-system-jcks.onrender.com)

## 🏥 Key Features

### Doctor Module:

1. **Patient Management**: Manage patient records, including medical history, appointments, and treatment plans.
2. **Appointment Scheduling**: Schedule and manage appointments efficiently.
3. **Prescription Management**: Write, update, and track prescriptions digitally.
4. **Report Storage**: Securely store and analyze patient medical reports.

### Receptionist Module:

1. **Appointment Booking**: Streamlined scheduling for patient visits.
2. **Patient Registration**: Easy capture of essential patient data.
3. **Billing and Invoicing**: Manage financial transactions and generate invoices.

---

## 💻 Tech Stack

### **Frontend**

- **React.js**: Component-based UI development for seamless user experience.
- **Chakra UI**: Accessible, customizable, and responsive UI components.

### **Backend**

- **Node.js**: Scalable and high-performance server-side development.
- **Express.js**: RESTful API framework for efficient backend routing.
- **MongoDB**: Flexible NoSQL database for secure and scalable data storage.

### **Cloud Services**

- **Cloudinary**: Media management for optimized image and video handling.

---

## 📈 Highlights

1. **Real-Time Revenue Insights**: Monitor daily, weekly, and monthly revenue on the doctor's dashboard with interactive charts.
2. **Seven-Day Login System**: Reduce frequent logins while maintaining robust session security.
3. **Appointment Management**: Delete past appointments in real-time with a simple interface.

---

## how to use

1. **clone repo**

```bash
git clone https://github.com/Udit-kasana/Clinic-management-system.git
```

2. **in backend folder:**
   create .env file with this info

```bash
cd backend
touch .env

MONGODB_URI="" //mongodb uri here
PORT=5000

ACCESS_TOKEN_SECRET=""
ACCESS_TOKEN_EXPIRY=""

REFRESH_TOKEN_SECRET=""
REFRESH_TOKEN_EXPIRY=""

CLOUDINARY_URL=""
ACCESS_TOKEN_SECRET="anything"
ACCESS_TOKEN_EXPIRY="7d"

REFRESH_TOKEN_SECRET="anything"
REFRESH_TOKEN_EXPIRY="7d"
```

3. **got to root folder**

```bash
cd Clinic-management-system
npm install
npm run dev
```

