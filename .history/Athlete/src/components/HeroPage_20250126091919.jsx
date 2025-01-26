import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Heart, 
  MessageCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

const HeroPage = () => {
  const [currentSchemeSlide, setCurrentSchemeSlide] = useState(0);

  const governmentSchemes = [
    {
      title: 'Khelo India Scholarship',
      description: 'Financial support for promising young athletes',
      background: '/api/placeholder/800/600?text=Khelo+India',
      details: [
        'Annual scholarship up to ₹5 lakhs',
        'Support for training and education',
        'Targets athletes aged 12-18'
      ]
    },
    {
      title: 'Target Olympic Podium Scheme',
      description: 'Elite athlete support for Olympic success',
      background: '/api/placeholder/800/600?text=Olympic+Podium',
      details: [
        'Comprehensive support for elite athletes',
        'Financial assistance up to ₹12 lakhs annually',
        'Personalized coaching and infrastructure'
      ]
    },
    {
      title: 'Northeast Special Sports Policy',
      description: 'Developing sporting talent in northeastern states',
      background: '/api/placeholder/800/600?text=Northeast+Sports',
      details: [
        'Targeted development for northeastern athletes',
        'Infrastructure and training support',
        'Scholarship and exposure programs'
      ]
    }
  ];

  const upcomingMatches = [
    {
      title: 'National Cricket Championship',
      date: '15-22 March 2024',
      location: 'Mumbai, India',
      type: 'National'
    },
    {
      title: 'Asian Swimming Championships',
      date: '5-10 April 2024',
      location: 'Singapore',
      type: 'International'
    }
  ];

  const athletePosts = [
    {
      athlete: 'Neeraj Chopra',
      sport: 'Javelin Throw',
      post: 'Training hard for the upcoming Olympic qualifiers!',
      likes: 5420,
      comments: 342
    },
    {
      athlete: 'PV Sindhu',
      sport: 'Badminton',
      post: 'Excited to share my new training regimen',
      likes: 7890,
      comments: 567
    }
  ];

  const nextSchemeSlide = () => {
    setCurrentSchemeSlide((prev) => (prev + 1) % governmentSchemes.length);
  };

  const prevSchemeSlide = () => {
    setCurrentSchemeSlide((prev) => (prev - 1 + governmentSchemes.length) % governmentSchemes.length);
  };

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSchemeSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Government Schemes Slider */}
      <section className="relative w-full h-[500px] overflow-hidden">
        {governmentSchemes.map((scheme, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSchemeSlide === index ? 1 : 0 }}
            className="absolute inset-0 transition-opacity duration-500"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center filter brightness-50"
              style={{ backgroundImage: `url(${scheme.background})` }}
            />
            
            <div className="relative z-10 flex items-center justify-center h-full text-white px-8">
              <div className="max-w-xl text-center">
                <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">{scheme.title}</h2>
                <p className="text-xl mb-6 drop-shadow-md">{scheme.description}</p>
                
                <ul className="space-y-2 text-left bg-black/50 p-6 rounded-lg">
                  {scheme.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <span className="mr-2 text-blue-400">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Navigation Buttons */}
        <button 
          onClick={prevSchemeSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/40"
        >
          <ChevronLeft className="text-white" />
        </button>
        <button 
          onClick={nextSchemeSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/40"
        >
          <ChevronRight className="text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {governmentSchemes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSchemeSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${currentSchemeSlide === index ? 'bg-white scale-110' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold mb-6">Upcoming Matches</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingMatches.map((match, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-2">{match.title}</h3>
              <div className="flex justify-between text-gray-600">
                <span>📅 {match.date}</span>
                <span>📍 {match.location}</span>
                <span className="font-bold text-blue-600">{match.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Athlete Community Posts Section */}
      <section className="container mx-auto px-4 py-12 bg-gray-50">
        <h2 className="text-3xl font-extrabold mb-6">Athlete Community Posts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {athletePosts.map((post, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center mb-4">
                <Users className="mr-4 text-blue-600" />
                <div>
                  <h3 className="font-semibold">{post.athlete}</h3>
                  <p className="text-gray-500">{post.sport}</p>
                </div>
              </div>
              <p className="mb-4">{post.post}</p>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center">
                  <Heart className="mr-2 text-red-500" /> {post.likes} Likes
                </span>
                <span className="flex items-center">
                  <MessageCircle className="mr-2 text-blue-500" /> {post.comments} Comments
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
