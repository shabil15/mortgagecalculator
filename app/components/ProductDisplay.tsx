"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function ProductDisplay() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-pulse">
        <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
        <p className="text-red-600 text-center font-medium">{error || "Failed to load product"}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={256}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-blue-600">
            ${product.price}
          </span>
          <span className="text-gray-500 text-lg">.00</span>
        </div>
      </div>
    </div>
  );
}
