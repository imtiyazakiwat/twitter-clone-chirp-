import React from 'react';
import { Search, Settings } from 'lucide-react';

const Trending = () => {
  const trendingTopics = [
    { category: 'Technology', topic: '#ReactJS', tweets: '25.5K' },
    { category: 'Sports', topic: 'Champions League', tweets: '120.2K' },
    { category: 'Entertainment', topic: '#NewMovie', tweets: '45.1K' },
    { category: 'Politics', topic: '#Elections2024', tweets: '89.3K' },
  ];

  const whoToFollow = [
    {
      name: 'React',
      username: 'reactjs',
      avatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=64&h=64&fit=crop',
      verified: true,
    },
    {
      name: 'TypeScript',
      username: 'typescript',
      avatar: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=64&h=64&fit=crop',
      verified: true,
    },
  ];

  return (
    <div className="w-80 fixed right-0 h-screen p-4 space-y-4">
      <div className="bg-gray-100 rounded-full flex items-center px-4 py-2">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search Chirp"
          className="bg-transparent border-none focus:ring-0 w-full ml-2"
        />
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl">Trends for you</h2>
          <Settings className="w-5 h-5 text-gray-500" />
        </div>
        
        {trendingTopics.map((item, index) => (
          <div key={index} className="py-3 hover:bg-gray-100 cursor-pointer rounded-lg px-2">
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="font-bold">{item.topic}</p>
            <p className="text-sm text-gray-500">{item.tweets} Chirps</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <h2 className="font-bold text-xl mb-4">Who to follow</h2>
        {whoToFollow.map((user, index) => (
          <div key={index} className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
              <div>
                <div className="flex items-center">
                  <span className="font-bold">{user.name}</span>
                  {user.verified && (
                    <svg className="w-4 h-4 ml-1 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <p className="text-gray-500">@{user.username}</p>
              </div>
            </div>
            <button className="bg-black text-white rounded-full px-4 py-1.5 text-sm font-bold hover:bg-gray-800">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;