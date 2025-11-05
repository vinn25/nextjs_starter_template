# NutriTrack – Calorie & Nutrition Calculator Web Application  
*A web application to calculate your calorie intake, build with Next.js + TypeScript + Tailwind CSS.*

## 🔍 Table of Contents  
- [NutriTrack – Calorie \& Nutrition Calculator Web Application](#nutritrack--calorie--nutrition-calculator-web-application)
  - [🔍 Table of Contents](#-table-of-contents)
  - [📝 About the Project](#-about-the-project)
  - [✨ Features](#-features)
  - [🧰 Tech Stack](#-tech-stack)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Clone the repo](#clone-the-repo)
- [Install dependencies](#install-dependencies)
- [or](#or)

## 📝 About the Project  
NutriTrack is a web application designed for small to medium gym management or individual users who want to track their calorie intake and nutrition. It offers:  
- A user-friendly interface built with Next.js and TypeScript  
- A modular UI using Tailwind CSS for fast styling and responsiveness  
- State management via Redux (as you’re already using)  
- Back-end APIs (you and your teammate Wahid are building) for nutrition data and user flows  
- Designed to be extendable: e.g., food log history, dashboard visualisation of nutrition, export of data

The project aligns with your (the user’s) final-year academic project: “Pengembangan Sistem Manajemen Gym Berbasis Web … dengan Analisis Visual Data Member …”. While this repo focuses on the calorie & nutrition calculator side, it can also integrate into a larger gym-management system.

## ✨ Features  
- Calculate daily calorie needs based on user metrics (age, gender, weight, height, activity level)  
- Input consumption of food items and compute macro-nutrients (protein, carbs, fats)  
- Visual dashboard summarising nutrition intake  
- Responsive design supporting desktop and mobile  
- Ready to be extended: e.g., integrate with gym member profiles, schedule tracking, analytics dashboards  

## 🧰 Tech Stack  
- **Frontend**: Next.js (React framework) with TypeScript  
- **Styling**: Tailwind CSS  
- **State Management**: Redux  
- **Backend (planned/optional)**: API routes within Next.js acting as serverless endpoints or standard Node.js backend
- **Deployment**: Vercel (or similar) for easy hosting and CI/CD  

## 🚀 Getting Started  
### Prerequisites  
- Node.js (v16+ recommended)  
- npm or yarn  
- (Optional) PostgreSQL (if you enable backend and data persistence)  

### Installation  
```bash
# Clone the repo  
git clone https://github.com/vinn25/calorie-calculator.git  
cd calorie-calculator  

# Install dependencies  
npm install  
# or  
yarn install  