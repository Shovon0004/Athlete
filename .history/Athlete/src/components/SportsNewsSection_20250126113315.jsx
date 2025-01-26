import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Briefcase } from 'lucide-react';  // existing icons

// ... (other imports and components like schemes, upcomingMatches, etc.)

const SportsNewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sports news from the API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=968ed8d338864e7cb30985681a6b4893');
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sports news", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex items-center mb-8">
          <Calendar className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Sports News</h2>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading news...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.length > 0 ? (
              news.map((article, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-3">{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:text-blue-700">
                    Read more →
                  </a>
                </div>
              ))
            ) : (
              <p>No sports news available.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SportsNewsSection;
