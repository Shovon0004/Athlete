import React from 'react';

const NewsContainer = ({ headlines }) => (
  <div className="container mx-auto space-y-6">
    {headlines.map(({ title, author, url, description }, i) => (
      <NewsArticle
        key={i}
        title={title}
        author={author}
        url={url}
        description={description}
      />
    ))}
  </div>
);

const NewsArticle = ({ title, author, url, description }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
      <h3 className="text-lg font-medium">{title}</h3>
    </a>
    <p className="text-gray-500 mb-2">{author}</p>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default NewsContainer;