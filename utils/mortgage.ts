/**
 * Calculate EMI (Equated Monthly Installment) for a loan
 * @param loanAmount - Principal loan amount
 * @param interestRate - Annual interest rate in percentage
 * @param tenureYears - Loan tenure in years
 * @returns Object containing EMI, total interest, and total payment
 */
export function calculateEMI(
  loanAmount: number,
  interestRate: number,
  tenureYears: number
) {
  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;

  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}

/**
 * Check loan eligibility based on income
 * @param emi - Monthly EMI amount
 * @param monthlyIncome - Monthly income of the borrower
 * @returns Eligibility status and message
 */
export function checkEligibility(emi: number, monthlyIncome: number) {
  const emiToIncomeRatio = (emi / monthlyIncome) * 100;
  const isEligible = emiToIncomeRatio <= 40;

  return {
    isEligible,
    emiToIncomeRatio: Math.round(emiToIncomeRatio),
    message: isEligible
      ? "✅ You are eligible for this loan"
      : "❌ EMI exceeds 40% of your monthly income",
  };
}

/**
 * Format number to currency format
 * @param amount - Amount to format
 * @param currency - Currency code
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ` ${currency}`;
}
