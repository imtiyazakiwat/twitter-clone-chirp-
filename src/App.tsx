import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import TweetComposer from './components/TweetComposer';
import TweetCard from './components/TweetCard';
import Trending from './components/Trending';
import AuthModal from './components/AuthModal';
import { useAuthStore } from './stores/authStore';
import { useTweetStore } from './stores/tweetStore';
import { supabase } from './lib/supabase';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, loading, loadUser } = useAuthStore();
  const { tweets, loadTweets, toggleLike, toggleRetweet } = useTweetStore();

  useEffect(() => {
    loadUser();
    
    if (user) {
      loadTweets();
      
      // Subscribe to realtime updates
      const tweetsSubscription = supabase
        .channel('public:tweets')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'tweets' 
        }, () => {
          loadTweets();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(tweetsSubscription);
      };
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Toaster position="bottom-center" />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        
        <Sidebar onAuthClick={() => setIsAuthModalOpen(true)} />
        
        <main className="ml-64 mr-80">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
                    <h1 className="text-xl font-bold">Home</h1>
                  </header>

                  {user ? (
                    <TweetComposer />
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-gray-600">
                        Please{' '}
                        <button
                          onClick={() => setIsAuthModalOpen(true)}
                          className="text-blue-500 hover:underline"
                        >
                          sign in
                        </button>{' '}
                        to post chirps
                      </p>
                    </div>
                  )}
                  
                  <div className="divide-y divide-gray-200">
                    {tweets.map((tweet) => (
                      <TweetCard
                        key={tweet.id}
                        tweet={tweet}
                        onLike={toggleLike}
                        onRetweet={toggleRetweet}
                      />
                    ))}
                  </div>
                </>
              }
            />
            <Route
              path="/profile"
              element={user ? <div>Profile page (TODO)</div> : <Navigate to="/" />}
            />
          </Routes>
        </main>

        <Trending />
      </div>
    </Router>
  );
}

export default App;