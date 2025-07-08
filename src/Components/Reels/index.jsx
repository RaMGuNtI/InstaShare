import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [currentReel, setCurrentReel] = useState(0);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  // Mock reels data (in real app, this would come from API)
  const mockReels = [
    {
      id: 1,
      user_id: 'user1',
      user_name: 'john_doe',
      profile_pic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      caption: 'Amazing sunset vibes! 🌅 #sunset #nature',
      likes_count: 1234,
      comments_count: 89,
      is_liked: false,
      is_saved: false,
      music: 'Original Audio - john_doe'
    },
    {
      id: 2,
      user_id: 'user2',
      user_name: 'jane_smith',
      profile_pic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      caption: 'Dancing through life! 💃 #dance #mood',
      likes_count: 2567,
      comments_count: 156,
      is_liked: true,
      is_saved: false,
      music: 'Trending Audio - Popular Song'
    },
    {
      id: 3,
      user_id: 'user3',
      user_name: 'travel_guru',
      profile_pic: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      caption: 'Exploring hidden gems 🗺️ #travel #adventure',
      likes_count: 3421,
      comments_count: 234,
      is_liked: false,
      is_saved: true,
      music: 'Adventure Vibes - Epic Music'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReels(mockReels);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Auto-play current video and pause others
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentReel) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [currentReel]);

  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight;
    const newCurrentReel = Math.round(scrollTop / itemHeight);
    
    if (newCurrentReel !== currentReel && newCurrentReel < reels.length) {
      setCurrentReel(newCurrentReel);
    }
  };

  const toggleLike = (reelId) => {
    setReels(reels.map(reel => 
      reel.id === reelId 
        ? { 
            ...reel, 
            is_liked: !reel.is_liked,
            likes_count: reel.is_liked ? reel.likes_count - 1 : reel.likes_count + 1
          }
        : reel
    ));
  };

  const toggleSave = (reelId) => {
    setReels(reels.map(reel => 
      reel.id === reelId 
        ? { ...reel, is_saved: !reel.is_saved }
        : reel
    ));
  };

  if (loading) {
    return (
      <div className="reels-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="reels-container" onScroll={handleScroll}>
      {reels.map((reel, index) => (
        <div key={reel.id} className="reel-item">
          <video
            ref={el => videoRefs.current[index] = el}
            className="reel-video"
            loop
            muted
            playsInline
            poster={reel.profile_pic}
          >
            <source src={reel.video_url} type="video/mp4" />
          </video>
          
          <div className="reel-overlay">
            <div className="reel-user-info">
              <img 
                src={reel.profile_pic} 
                alt={reel.user_name}
                className="reel-profile-pic"
                onClick={() => navigate(`/profile/${reel.user_id}`)}
              />
              <span className="reel-username">{reel.user_name}</span>
              <button className="follow-btn">Follow</button>
            </div>
            
            <div className="reel-caption">
              <p>{reel.caption}</p>
              <div className="reel-music">
                <span>🎵 {reel.music}</span>
              </div>
            </div>
          </div>
          
          <div className="reel-actions">
            <div className="action-item" onClick={() => toggleLike(reel.id)}>
              {reel.is_liked ? (
                <FaHeart className="action-icon liked" />
              ) : (
                <FaRegHeart className="action-icon" />
              )}
              <span>{reel.likes_count}</span>
            </div>
            
            <div className="action-item">
              <FaComment className="action-icon" />
              <span>{reel.comments_count}</span>
            </div>
            
            <div className="action-item">
              <FaShare className="action-icon" />
            </div>
            
            <div className="action-item" onClick={() => toggleSave(reel.id)}>
              {reel.is_saved ? (
                <FaBookmark className="action-icon saved" />
              ) : (
                <FaRegBookmark className="action-icon" />
              )}
            </div>
            
            <div className="action-item">
              <BsThreeDotsVertical className="action-icon" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reels;