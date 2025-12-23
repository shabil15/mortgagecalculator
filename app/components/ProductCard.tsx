interface ProductCardProps {
  icon: string;
  title: string;
  href?: string;
  description?: string;
}

export default function ProductCard({ 
  icon, 
  title, 
  href = "#",
  description 
}: ProductCardProps) {
  return (
    <a
      href={href}
      className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-300 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex flex-col h-full min-h-[220px]">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors duration-300">
            <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-auto leading-relaxed">
            {description}
          </p>
        )}

        {/* Arrow Button */}
        <div className="mt-6 flex items-center justify-start">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-all duration-300 group-hover:scale-110">
            <span className="text-gray-700 group-hover:text-white text-lg transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
