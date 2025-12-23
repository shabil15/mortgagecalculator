# Mortgage Calculator - Next.js Application

A modern, responsive mortgage calculator built with Next.js 16, React 19, TypeScript, and Tailwind CSS. This application calculates EMI (Equated Monthly Installment) and checks loan eligibility based on income.

## 🚀 Features

### 1. **Mortgage Calculator**
- **Inputs:**
  - Property Price
  - Down Payment (with slider)
  - Interest Rate (% per year)
  - Loan Tenure (years)
  - Monthly Income

- **Outputs:**
  - Monthly EMI
  - Total Interest
  - Loan Eligibility Message (based on 40% EMI-to-income ratio)

### 2. **API Integration**
- Fetches product data from `https://dummyjson.com/products/1`
- Displays product title, price, and thumbnail image

### 3. **Backend API**
- Contact form API endpoint (`/api/contact`)
- Input validation for name, email, phone, property value, and monthly salary
- RESTful API design with proper error handling

## 📂 Project Structure

```
mortgagecalculator/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── components/
│   │   ├── MortgageCalculator.tsx # Main calculator component
│   │   └── ProductDisplay.tsx     # API integration component
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── utils/
│   └── mortgage.ts                # Utility functions for EMI calculation
└── README.md                      # Project documentation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.3
- **TypeScript**: ^5
- **Styling**: Tailwind CSS 4
- **API**: Next.js API Routes

## 📐 EMI Calculation Formula

```
EMI = [P × R × (1 + R)^N] / [(1 + R)^N – 1]
```

Where:
- **P** = Loan Amount (Property Price − Down Payment)
- **R** = Monthly Interest Rate (Annual Rate / 12 / 100)
- **N** = Loan Tenure in months

## 🧠 Eligibility Logic

- EMI should be ≤ 40% of Monthly Income
- If EMI ≤ 40% → ✅ Eligible
- Else → ❌ Not Eligible

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📡 API Endpoints

### POST `/api/contact`

Submit a contact form with mortgage inquiry details.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "propertyValue": 1000000,
  "monthlySalary": 50000
}
```

**Success Response:**
```json
{
  "status": "success",
  "message": "Lead received",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "timestamp": "2025-12-23T10:30:00.000Z"
  }
}
```
