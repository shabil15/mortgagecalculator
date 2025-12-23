import MortgageCalculator from "./components/MortgageCalculator";
import ProductDisplay from "./components/ProductDisplay";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Mortgage Calculator */}
      <MortgageCalculator />

      {/* API Integration - Product Display */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              API Integration Example
            </h2>
            <p className="text-gray-600">
              Fetching product data from external API
            </p>
          </div>
          <div className="max-w-md">
            <ProductDisplay />
          </div>
        </div>
      </section>
    </div>
  );
}
