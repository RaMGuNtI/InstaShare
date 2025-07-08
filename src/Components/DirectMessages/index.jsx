import React, { useState, useEffect } from 'react';
import { IoSearch, IoSend, IoChevronBack } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './index.css';

const DirectMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      user: {
        id: 'user1',
        name: 'John Doe',
        username: 'john_doe',
        profile_pic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        is_online: true
      },
      last_message: {
        text: 'Hey! How are you doing?',
        timestamp: '2m',
        is_read: false,
        sender: 'user1'
      },
      messages: [
        {
          id: 1,
          text: 'Hey! How are you doing?',
          sender: 'user1',
          timestamp: '2:30 PM',
          is_read: true
        },
        {
          id: 2,
          text: 'I\'m good! Just working on some projects',
          sender: 'me',
          timestamp: '2:32 PM',
          is_read: true
        }
      ]
    },
    {
      id: 2,
      user: {
        id: 'user2',
        name: 'Jane Smith',
        username: 'jane_smith',
        profile_pic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        is_online: false
      },
      last_message: {
        text: 'Thanks for sharing that post!',
        timestamp: '1h',
        is_read: true,
        sender: 'user2'
      },
      messages: [
        {
          id: 1,
          text: 'Did you see my latest post?',
          sender: 'me',
          timestamp: '1:15 PM',
          is_read: true
        },
        {
          id: 2,
          text: 'Yes! It\'s amazing 😍',
          sender: 'user2',
          timestamp: '1:20 PM',
          is_read: true
        },
        {
          id: 3,
          text: 'Thanks for sharing that post!',
          sender: 'user2',
          timestamp: '1:25 PM',
          is_read: true
        }
      ]
    },
    {
      id: 3,
      user: {
        id: 'user3',
        name: 'Travel Guru',
        username: 'travel_guru',
        profile_pic: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        is_online: true
      },
      last_message: {
        text: 'Check out this amazing place!',
        timestamp: '3h',
        is_read: true,
        sender: 'user3'
      },
      messages: [
        {
          id: 1,
          text: 'Check out this amazing place!',
          sender: 'user3',
          timestamp: '11:30 AM',
          is_read: true
        }
      ]
    }
  ];

  useEffect(() => {
    setConversations(mockConversations);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        is_read: false
      };

      setConversations(conversations.map(conv => 
        conv.id === selectedChat.id 
          ? {
              ...conv,
              messages: [...conv.messages, message],
              last_message: {
                text: newMessage,
                timestamp: 'now',
                is_read: false,
                sender: 'me'
              }
            }
          : conv
      ));

      setSelectedChat(prev => ({
        ...prev,
        messages: [...prev.messages, message]
      }));

      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dm-container">
      {!selectedChat ? (
        <div className="dm-list">
          <div className="dm-header">
            <h2>Messages</h2>
            <BsThreeDotsVertical className="options-icon" />
          </div>
          
          <div className="dm-search">
            <IoSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search messages"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="conversations-list">
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                className="conversation-item"
                onClick={() => setSelectedChat(conversation)}
              >
                <div className="conversation-avatar">
                  <img src={conversation.user.profile_pic} alt={conversation.user.name} />
                  {conversation.user.is_online && <div className="online-indicator" />}
                </div>
                
                <div className="conversation-info">
                  <div className="conversation-header">
                    <span className="conversation-name">{conversation.user.name}</span>
                    <span className="conversation-time">{conversation.last_message.timestamp}</span>
                  </div>
                  <div className="conversation-preview">
                    <span className={!conversation.last_message.is_read && conversation.last_message.sender !== 'me' ? 'unread' : ''}>
                      {conversation.last_message.text}
                    </span>
                    {!conversation.last_message.is_read && conversation.last_message.sender !== 'me' && (
                      <div className="unread-dot" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="dm-chat">
          <div className="chat-header">
            <button className="back-btn" onClick={() => setSelectedChat(null)}>
              <IoChevronBack />
            </button>
            <div className="chat-user-info">
              <img src={selectedChat.user.profile_pic} alt={selectedChat.user.name} />
              <div>
                <span className="chat-user-name">{selectedChat.user.name}</span>
                <span className="chat-user-status">
                  {selectedChat.user.is_online ? 'Active now' : 'Active 1h ago'}
                </span>
              </div>
            </div>
            <BsThreeDotsVertical className="options-icon" />
          </div>

          <div className="chat-messages">
            {selectedChat.messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
              >
                <div className="message-bubble">
                  <span>{message.text}</span>
                </div>
                <span className="message-time">{message.timestamp}</span>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              className="send-btn"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectMessages;