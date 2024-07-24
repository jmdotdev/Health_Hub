---
# Health Hub

Health Hub is a comprehensive healthcare platform designed to bridge the gap between patients and doctors. It facilitates easy appointment scheduling, maintains detailed patient medical records, offers a Q&A platform for immediate queries, and manages medication lists along with timely notifications. Built with Angular for the frontend, .NET 7 for the backend, and MSSQL for database management, Health Hub aims to streamline the healthcare process for both patients and medical professionals.

## Features

- **Appointment Scheduling**: Patients can book, reschedule, or cancel appointments with doctors.
- **Medical Records Management**: A secure system to keep track of patient visits, diagnoses, and treatments over time.
- **Q&A Platform**: Patients can ask health-related questions and receive expert answers from doctors.
- **Medication Tracker**: A feature that allows patients to keep an updated list of medications and receive refill reminders.
- **Notifications Center**: Real-time alerts for appointment reminders, health tips, and answers to queries.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following tools installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (which comes with [npm](http://npmjs.com/))
- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [MSSQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/health-hub.git
cd health-hub
```

2. **Set up the backend**

Navigate to the backend directory and restore dependencies:

```bash
cd api
dotnet restore
```

Run the backend server:

```bash
dotnet run
```

3. **Set up the frontend**

Navigate to the frontend directory and install dependencies:

```bash
cd ui
npm install
```

Run the Angular server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` to view the application.

4. **Set up the database**

Ensure MSSQL Server is running. Create a database named `HealthHub` and update the connection string in the `.NET Core` backend `appsettings.json` file accordingly.

Run the database migrations (ensure you are in the backend directory):

```bash
dotnet ef database update
```

### Usage

After installation, you can use the platform by registering as either a patient or a doctor. Patients can book appointments, view their medical records, ask questions, and track their medications. Doctors can manage appointments, answer questions, and access patient records.
---
