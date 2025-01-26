import React from 'react';

const NewsContainer = ({ headlines }) => (
  <div className="container mx-auto">
    <News headlines={headlines} />
  </div>
);

const News = ({ headlines }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 my-6">
    <h1 className="text-2xl font-bold mb-4">Top Business Headlines</h1>
    <ul className="space-y-4">
      {headlines.map(({ title, author, url, description }, i) => (
        <li key={i} className="border-b pb-4 last:border-b-0 last:pb-0">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
            <h3 className="text-lg font-medium">{title}</h3>
          </a>
          <p className="text-gray-500 mb-2">{author}</p>
          <p className="text-gray-700">{description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default NewsContainer;