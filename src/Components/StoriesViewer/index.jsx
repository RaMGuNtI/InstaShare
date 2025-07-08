import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import './index.css';

const StoriesViewer = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mock stories data
  const mockStories = [
    {
      id: 1,
      user_id: userId,
      user_name: 'john_doe',
      profile_pic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      story_url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: '2h',
      type: 'image'
    },
    {
      id: 2,
      user_id: userId,
      user_name: 'john_doe',
      profile_pic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      story_url: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: '1h',
      type: 'image'
    },
    {
      id: 3,
      user_id: userId,
      user_name: 'john_doe',
      profile_pic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      story_url: 'https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: '30m',
      type: 'image'
    }
  ];

  useEffect(() => {
    setStories(mockStories);
  }, [userId]);

  useEffect(() => {
    if (!isPaused && stories.length > 0) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [currentStoryIndex, isPaused, stories.length]);

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      navigate(-1);
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  if (stories.length === 0) {
    return <div className="stories-loading">Loading...</div>;
  }

  const currentStory = stories[currentStoryIndex];

  return (
    <div className="stories-viewer">
      <div className="stories-header">
        <div className="progress-bars">
          {stories.map((_, index) => (
            <div key={index} className="progress-bar">
              <div 
                className="progress-fill"
                style={{
                  width: index < currentStoryIndex ? '100%' : 
                         index === currentStoryIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>
        
        <div className="story-user-info">
          <img src={currentStory.profile_pic} alt={currentStory.user_name} />
          <span>{currentStory.user_name}</span>
          <span className="timestamp">{currentStory.timestamp}</span>
        </div>
        
        <button className="close-btn" onClick={handleClose}>
          <IoClose />
        </button>
      </div>

      <div 
        className="story-content"
        onMouseDown={handlePause}
        onMouseUp={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        <img src={currentStory.story_url} alt="Story" />
        
        <div className="story-navigation">
          <div className="nav-area left" onClick={prevStory} />
          <div className="nav-area right" onClick={nextStory} />
        </div>
      </div>

      <div className="story-controls">
        <button className="nav-btn" onClick={prevStory} disabled={currentStoryIndex === 0}>
          <IoChevronBack />
        </button>
        <button className="nav-btn" onClick={nextStory}>
          <IoChevronForward />
        </button>
      </div>
    </div>
  );
};

export default StoriesViewer;