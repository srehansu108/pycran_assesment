# 🖥️ Pycran Dashboard Project

![Project Logo](./path/to/logo.png) <!-- Optional: Include a logo or an image -->

## 📚 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Frontend Installation](#frontend-installation)
  - [Backend Installation](#backend-installation)
  - [Fetching Data Installation](#fetching-data-installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🌟 Overview
The **Pycran Dashboard Project** is a comprehensive web application designed to provide an intuitive dashboard for managing and visualizing data. This project aims to simplify data management and enhance user experience through a responsive interface and dynamic functionalities.

## 🛠️ Features
- **User-friendly Interface:** A clean and responsive design.
- **Data Visualization:** Interactive charts and graphs for data representation.
- **Real-time Data Fetching:** Fetch data from APIs for up-to-date information.
- **CRUD Operations:** Create, Read, Update, and Delete functionalities for managing data.
- **Authentication:** Secure user authentication and authorization.

## 💻 Technologies Used
- **Frontend:** 
  - React.js
  - Vite
  - Styled Components
- **Backend:** 
  - Node.js
  - Express.js
  - PostgreSQL
- **Fetching Data:** 
  - Python
- **Others:**
  - dotenv for environment variable management
  - Axios for making API calls

## 🚀 Installation
To get started with this project, follow these steps:

### 📋 Prerequisites
- **Node.js** (version **v21.2.0**)
- **Vite** (version **5.2.7 win32-x64 node-v21.2.0**)
- **Python** (version **3.12.0**)
- **MongoDB** or **PostgreSQL**

### 📥 Clone the Repository
```bash
git clone https://github.com/srehansu108/pycran_assesment.git
cd pycran_assesment
```

### 🔧 Frontend Installation
Navigate to the Frontend folder and install dependencies:
```bash
cd Frontend
npm install
```
### ⚙️ Backend Installation
Navigate to the Backend folder and install dependencies:
```bash
cd Backend
npm install
```
Install any required Python packages (make sure you have a virtual environment set up):
```bash
pip install -r requirements.txt
```

### 🔑 Environment Variables
Create a .env file in the Fetching Data folder with the following content:
```bash
API_KEY=your_api_key
DATABASE_URL=your_database_url
Make sure to replace your_api_key and your_database_url with actual values relevant to your project.
```

### 🏗️ Usage
To start the application, follow these commands:

### 🌐 Start Backend Server
```bash
Copy code
npm start
```

### 🚀 Start Frontend Server
In another terminal, navigate to the Frontend folder and run:
```bash
npm run dev
```

### 📜 Run Data Fetching Script
Run your Python script as needed:
```bash
python dataFetch.py
```
### 📂 Folder Structure
```bash
Pycran_assessment/
│
├── Frontend/                # Frontend application
│   ├── src/                 # Source code
│   ├── public/              # Public assets
│   ├── .gitignore           # Git ignore file
│   └── package.json         # Frontend dependencies
│
├── Backend/                 # Backend application
│   ├── src/                 # Source code
│   ├── .gitignore           # Git ignore file
│   └── package.json         # Backend dependencies
│
├── Fetching Data/           # Data fetching scripts
│   ├── .env                 # Environment variables
│   ├── script.py            # Python script
│   └── requirements.txt     # Python dependencies
│
└── README.md                # Project documentation
```
