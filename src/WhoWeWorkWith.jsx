import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOurWorkSummary } from "./api/public/ourWorkApi";

// Fallback data
const FALLBACK_DATA = [
  {
    id: "1",
    title: "Government",
    computedImageUrl:
      "https://media.istockphoto.com/id/184085544/photo/indian-parliament-in-new-delhi.jpg",
  },
  {
    id: "2",
    title: "Railway",
    computedImageUrl:
      "https://www.rajasthanindiatourdriver.com/img/traintour-train.jpg",
  },
  {
    id: "3",
    title: "Gram Panchayat",
    computedImageUrl:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
  },
];

export default function WhoWeWorkWith() {
  const [workItems, setWorkItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkItems = async () => {
      const result = await getOurWorkSummary();

      if (result.success && result.data?.length > 0) {
        setWorkItems(result.data);
      } else {
        setWorkItems(FALLBACK_DATA);
      }
      setLoading(false);
    };

    fetchWorkItems();
  }, []);

  if (loading) {
    return (
      <section className="py-16 text-center">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            Who We Work With
          </h2>
          <p className="text-gray-600 mt-3">
            We collaborate with various organizations to create lasting impact.
          </p>
        </div>

        {/* ✅ Grid instead of carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {workItems.map((item, index) => (
            <Link
              key={item.id || index}
              to="/our-work#programs"
              className="border rounded-xl overflow-hidden shadow-md hover:scale-105 transition duration-300"
            >
              <img
                src={item.computedImageUrl || item.coverImageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Image+Not+Found";
                }}
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-green-900">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}