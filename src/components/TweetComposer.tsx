import React, { useState } from 'react';
import { Image, Smile, MapPin } from 'lucide-react';

const TweetComposer = () => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle tweet submission
    setContent('');
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex space-x-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full resize-none border-none focus:ring-0 text-xl placeholder-gray-500"
            rows={3}
          />
          
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-4 text-blue-500">
              <button type="button" className="p-2 hover:bg-blue-50 rounded-full">
                <Image className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 hover:bg-blue-50 rounded-full">
                <Smile className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 hover:bg-blue-50 rounded-full">
                <MapPin className="w-5 h-5" />
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!content.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Chirp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetComposer;