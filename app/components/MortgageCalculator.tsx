"use client";

import { useState, useMemo } from "react";
import { calculateEMI, checkEligibility } from "@/utils/mortgage";

interface EligibilityResult {
  isEligible: boolean;
  message: string;
  emiToIncomeRatio: number;
}

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [loanTenure, setLoanTenure] = useState<number>(1);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);

  const loanAmount = propertyPrice - downPayment;
  
  const { emi, totalInterest } = useMemo(() => {
    const result = calculateEMI(loanAmount, interestRate, loanTenure);
    return {
      emi: isNaN(result.emi) || !isFinite(result.emi) ? 0 : result.emi,
      totalInterest: isNaN(result.totalInterest) || !isFinite(result.totalInterest) ? 0 : result.totalInterest
    };
  }, [loanAmount, interestRate, loanTenure]);

  const eligibility = useMemo(() => {
    return checkEligibility(emi, monthlyIncome);
  }, [emi, monthlyIncome]);

  const downPaymentPercentage = propertyPrice > 0 ? ((downPayment / propertyPrice) * 100).toFixed(0) : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-6 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
            Mortgage Calculator
          </h1>
          <p className="text-gray-600 text-sm">Calculate your monthly payments and loan eligibility</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - Inputs */}
          <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Loan Details</h2>
            <div className="space-y-4">
              {/* Property Price */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Property Price</label>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">₹ INR</span>
                </div>
                <input
                  type="text"
                  placeholder="0"
                  value={propertyPrice === 0 ? '' : propertyPrice.toLocaleString()}
                  onChange={(e) => {
                    const val = e.target.value.replace(/,/g, '');
                    if (!isNaN(Number(val))) setPropertyPrice(Number(val) || 0);
                  }}
                  className="w-full text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-gray-900 outline-none pb-2 transition-colors duration-200 bg-transparent"
                />
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Down Payment <span className="text-gray-500 ml-1">({downPaymentPercentage}%)</span>
                  </label>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">₹ INR</span>
                </div>
                <input
                  type="text"
                  placeholder="0"
                  value={downPayment === 0 ? '' : downPayment.toLocaleString()}
                  onChange={(e) => {
                    const val = e.target.value.replace(/,/g, '');
                    if (!isNaN(Number(val))) setDownPayment(Number(val) || 0);
                  }}
                  className="w-full text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-gray-900 outline-none pb-2 transition-colors duration-200 bg-transparent"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Interest Rate</label>
                  <span className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">%</span>
                </div>
                <input
                  type="number"
                  placeholder="0"
                  step="0.1"
                  value={interestRate === 0 ? '' : interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                  className="w-full text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-gray-900 outline-none pb-2 transition-colors duration-200 bg-transparent"
                />
                <div className="mt-2">
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Loan Tenure</label>
                  <span className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">Years</span>
                </div>
                <input
                  type="number"
                  placeholder="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value) || 1)}
                  className="w-full text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-gray-900 outline-none pb-2 transition-colors duration-200 bg-transparent"
                />
                <div className="mt-2">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 year</span>
                    <span>30 years</span>
                  </div>
                </div>
              </div>

              {/* Monthly Income */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Monthly Income</label>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">₹ INR</span>
                </div>
                <input
                  type="text"
                  placeholder="0"
                  value={monthlyIncome === 0 ? '' : monthlyIncome.toLocaleString()}
                  onChange={(e) => {
                    const val = e.target.value.replace(/,/g, '');
                    if (!isNaN(Number(val))) setMonthlyIncome(Number(val) || 0);
                  }}
                  className="w-full text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-gray-900 outline-none pb-2 transition-colors duration-200 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-3">
            {/* EMI Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 shadow-xl text-white">
              <p className="text-xs uppercase tracking-wider mb-1 text-gray-300 font-medium">
                Monthly EMI
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold">₹</span>
                <span className="text-4xl md:text-5xl font-extrabold leading-none" suppressHydrationWarning>
                  {(isNaN(emi) || !isFinite(emi) ? 0 : Math.floor(emi)).toLocaleString()}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs text-gray-200 leading-relaxed">
                  Based on a loan of <span className="font-bold text-white">₹{loanAmount.toLocaleString()}</span> at{" "}
                  <span className="font-bold text-white">{interestRate}%</span> interest for{" "}
                  <span className="font-bold text-white">{loanTenure} years</span>
                </p>
              </div>
            </div>

            {/* Total Interest Card */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
              <p className="text-xs uppercase tracking-wider text-gray-600 mb-1 font-semibold">Total Interest Payable</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-600">₹</span>
                <span className="text-3xl font-bold text-gray-900 leading-none" suppressHydrationWarning>
                  {(isNaN(totalInterest) || !isFinite(totalInterest) ? 0 : Math.floor(totalInterest)).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Eligibility Card */}
            {eligibility && (propertyPrice > 0 || downPayment > 0 || interestRate > 0 || monthlyIncome > 0) && (
              <div
                className={`rounded-2xl p-4 shadow-lg border-2 transition-all duration-300 ${
                  eligibility.isEligible
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      eligibility.isEligible ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <span className="text-white text-xl font-bold">
                      {eligibility.isEligible ? "✓" : "✕"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">
                      Loan Eligibility
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        eligibility.isEligible ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {eligibility.message}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-medium pl-12">
                  EMI is {eligibility.emiToIncomeRatio}% of your monthly income
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
