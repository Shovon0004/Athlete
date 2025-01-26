import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Medal, Calendar, Briefcase } from 'lucide-react';

const schemes = [
  {
    title: "Khelo India Youth Games",
    description: "Supporting young athletes with annual scholarships of ₹5 lakhs",
    image: "https://v3img.voot.com/v3Storage/assets/khelo_india_horizontal%20(1)-1685024326819.jpg",
    color: "from-blue-500 to-blue-700"
  },
  {
    title: "Target Olympic Podium Scheme (TOPS)",
    description: "Elite athlete support program for Olympic preparation",
    image: "https://images.bhaskarassets.com/web2images/521/2023/03/21/target-olympic-podium-scheme-tops-86232142_1679385183.jpg",
    color: "from-green-500 to-green-700"
  },
  {
    title: "National Sports Development Fund",
    description: "Financial assistance for sports infrastructure and training",
    image: "https://images.bhaskarassets.com/web2images/521/2023/03/21/target-olympic-podium-scheme-tops-86232142_1679385183.jpg",
    color: "from-purple-500 to-purple-700"
  }
];

function HeroPage() {
  const [currentScheme, setCurrentScheme] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextScheme = () => {
    setCurrentScheme((prev) => (prev + 1) % schemes.length);
  };

  const prevScheme = () => {
    setCurrentScheme((prev) => (prev - 1 + schemes.length) % schemes.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-20">
      {/* Innovative Hero Section with Schemes */}
      <div 
        className={`relative transition-all duration-500 ease-in-out 
          ${isExpanded ? 'h-screen' : 'h-[600px]'} 
          overflow-hidden group`}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r transition-all duration-500"
          style={{
            backgroundImage: `url(${schemes[currentScheme].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${schemes[currentScheme].image})`,
          }}
        >
          <div className="container mx-auto px-6 h-full flex items-center relative">
            <div className="text-white max-w-3xl space-y-6">
              <h1 className="text-5xl font-bold mb-4 transform transition-transform group-hover:translate-x-4">
                {schemes[currentScheme].title}
              </h1>
              <p className="text-xl mb-8 opacity-80 transform transition-transform group-hover:translate-x-6">
                {schemes[currentScheme].description}
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  {isExpanded ? 'Collapse' : 'Expand Details'}
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons with Hover Effects */}
        <button 
          onClick={prevScheme}
          aria-label="Previous Scheme"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button 
          onClick={nextScheme}
          aria-label="Next Scheme"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Expandable Details Section */}
        {isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-8 transform transition-transform">
            <div className="container mx-auto grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Objective</h3>
                <p className="text-gray-600">Comprehensive support for athletes across various sports disciplines.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Benefits</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Financial Assistance</li>
                  <li>Training Support</li>
                  <li>Infrastructure Development</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Impact</h3>
                <p className="text-gray-600">Nurturing talent and promoting sports excellence at national and international levels.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rest of the existing sections remain the same */}
      {/* Upcoming Matches Section */}
      {/* Career Opportunities Section */}
    </div>
  );
}

export default HeroPage;