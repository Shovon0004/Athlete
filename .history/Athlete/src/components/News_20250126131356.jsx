import React from 'react';

const News = ({ headlines }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-6">
      <h1 className="text-2xl font-bold mb-4">Top Business Headlines</h1>
      <ul className="space-y-4">
        {headlines.map((article, index) => (
          <li
            key={index}
            className="border-b pb-4 last:border-b-0 last:pb-0"
          >
            <h3 className="text-lg font-medium">
              
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                {article.title}
              </a>
            </h3>
            <p className="text-gray-500 mb-2">{article.author}</p>
            <p className="text-gray-700">{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;