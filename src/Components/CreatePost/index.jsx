import React, { useState } from 'react';
import { IoClose, IoImages, IoCamera } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './index.css';

const CreatePost = () => {
  const [step, setStep] = useState(1); // 1: select, 2: edit, 3: share
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [altText, setAltText] = useState('');
  const navigate = useNavigate();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
      setSelectedImage(null);
    }
  };

  const handleShare = () => {
    // In a real app, this would upload the post
    console.log('Sharing post:', { selectedImage, caption, location, altText });
    navigate('/');
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="create-post-overlay">
      <div className="create-post-modal">
        <div className="create-post-header">
          {step > 1 && (
            <button className="back-btn" onClick={handleBack}>
              ←
            </button>
          )}
          <h2>
            {step === 1 && 'Create new post'}
            {step === 2 && 'Edit'}
            {step === 3 && 'Share'}
          </h2>
          {step === 2 && (
            <button className="next-btn" onClick={handleNext}>
              Next
            </button>
          )}
          {step === 3 && (
            <button className="share-btn" onClick={handleShare}>
              Share
            </button>
          )}
          <button className="close-btn" onClick={handleClose}>
            <IoClose />
          </button>
        </div>

        <div className="create-post-content">
          {step === 1 && (
            <div className="select-media">
              <div className="media-icon">
                <IoImages size={96} />
              </div>
              <h3>Drag photos and videos here</h3>
              <label className="select-button">
                Select from computer
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleImageSelect}
                  hidden
                />
              </label>
            </div>
          )}

          {step === 2 && selectedImage && (
            <div className="edit-media">
              <div className="image-preview">
                <img src={selectedImage} alt="Selected" />
              </div>
              <div className="edit-controls">
                <h4>Filters</h4>
                <div className="filters">
                  <div className="filter-option active">Original</div>
                  <div className="filter-option">Clarendon</div>
                  <div className="filter-option">Gingham</div>
                  <div className="filter-option">Moon</div>
                  <div className="filter-option">Lark</div>
                </div>
                <h4>Adjustments</h4>
                <div className="adjustments">
                  <div className="adjustment-item">
                    <label>Brightness</label>
                    <input type="range" min="-100" max="100" defaultValue="0" />
                  </div>
                  <div className="adjustment-item">
                    <label>Contrast</label>
                    <input type="range" min="-100" max="100" defaultValue="0" />
                  </div>
                  <div className="adjustment-item">
                    <label>Saturation</label>
                    <input type="range" min="-100" max="100" defaultValue="0" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && selectedImage && (
            <div className="share-post">
              <div className="post-preview">
                <img src={selectedImage} alt="Post preview" />
              </div>
              <div className="post-details">
                <div className="user-info">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" 
                    alt="Profile" 
                    className="profile-pic"
                  />
                  <span>your_username</span>
                </div>
                
                <textarea
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  maxLength={2200}
                />
                
                <div className="caption-counter">
                  {caption.length}/2,200
                </div>
                
                <input
                  type="text"
                  placeholder="Add location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="location-input"
                />
                
                <details className="accessibility-section">
                  <summary>Accessibility</summary>
                  <p>Alt text describes your photos for people with visual impairments.</p>
                  <input
                    type="text"
                    placeholder="Write alt text..."
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    className="alt-text-input"
                  />
                </details>
                
                <details className="advanced-settings">
                  <summary>Advanced settings</summary>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" />
                      Hide like and view counts on this post
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" />
                      Turn off commenting
                    </label>
                  </div>
                </details>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;