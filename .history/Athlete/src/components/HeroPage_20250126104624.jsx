import React from 'react';
import { ChevronLeft, ChevronRight, Medal, Calendar, Briefcase } from 'lucide-react';

const schemes = [
  {
    title: "Khelo India Youth Games",
    description: "Supporting young athletes with annual scholarships of ₹5 lakhs",
    image: "https://v3img.voot.com/v3Storage/assets/khelo_india_horizontal%20(1)-1685024326819.jpg"
  },
  {
    title: "Target Olympic Podium Scheme (TOPS)",
    description: "Elite athlete support program for Olympic preparation",
    image: "https://images.unsplash.com/photo-1579168169279-65a4a7a500d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "National Sports Development Fund",
    description: "Financial assistance for sports infrastructure and training",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];

const upcomingMatches = [
  {
    event: "ICC T20 World Cup 2024",
    location: "West Indies & USA",
    date: "June 1-29, 2024",
    teams: "India vs Australia"
  },
  {
    event: "Asian Games 2024",
    location: "Aichi-Nagoya, Japan",
    date: "September 2024",
    teams: "Multiple Sports"
  },
  {
    event: "Paris Olympics 2024",
    location: "Paris, France",
    date: "July 26 - August 11, 2024",
    teams: "Global Event"
  }
];

const jobOpportunities = [
  {
    company: "Sports Authority of India",
    position: "Sports Officer",
    type: "Government",
    location: "Multiple Locations"
  },
  {
    company: "Indian Railways",
    position: "Sports Quota",
    type: "Government",
    location: "Pan India"
  },
  {
    company: "Reliance Industries",
    position: "Sports Manager",
    type: "Private",
    location: "Mumbai"
  },
  {
    company: "JSW Sports",
    position: "Athletic Trainer",
    type: "Private",
    location: "Bangalore"
  }
];

function HeroPage() {
  const [currentScheme, setCurrentScheme] = React.useState(0);

  const nextScheme = () => {
    setCurrentScheme((prev) => (prev + 1) % schemes.length);
  };

  const prevScheme = () => {
    setCurrentScheme((prev) => (prev - 1 + schemes.length) % schemes.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-20">
      {/* Hero Section with Schemes Slider */}
      <div className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${schemes[currentScheme].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0  bg-opacity-50">
            <div className="container mx-auto px-6 h-full flex items-center">
              <div className="text-white max-w-3xl">
                <h1 className="text-5xl font-bold mb-4">{schemes[currentScheme].title}</h1>
                <p className="text-xl mb-8">{schemes[currentScheme].description}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={prevScheme}
          aria-label="Previous Scheme"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={nextScheme}
          aria-label="Next Scheme"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Upcoming Matches Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-8">
            <Calendar className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Matches</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingMatches.length > 0 ? (
              upcomingMatches.map((match, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{match.event}</h3>
                  <p className="text-gray-600 mb-1">{match.location}</p>
                  <p className="text-gray-600 mb-3">{match.date}</p>
                  <p className="text-blue-600 font-semibold">{match.teams}</p>
                </div>
              ))
            ) : (
              <p>No upcoming matches available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-8">
            <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Career Opportunities</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {jobOpportunities.length > 0 ? (
              jobOpportunities.map((job, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.company}</h3>
                      <p className="text-gray-600 mb-1">{job.position}</p>
                      <p className="text-gray-600">{job.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.type === 'Government' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {job.type}
                    </span>
                  </div>
                  <button className="mt-4 text-blue-600 font-semibold hover:text-blue-700">
                    Apply Now →
                  </button>
                </div>
              ))
            ) : (
              <p>No career opportunities available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroPage;