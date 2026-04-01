import React, { useState, useRef, useEffect } from 'react';
import { Row, Col } from '../../helpers.jsx';
import { Svg, IC } from '../../icons.jsx';
import { FB, FD } from '../../tokens.js';

const GROUP_MOCK_MESSAGES = {
  'React Builders': [
    { id: '1', sender: 'Alex J.',   initial: 'A', color: '#7C6FF7', text: 'Hey everyone! Sprint review tomorrow',    timeLabel: 'TODAY AT 9:00 AM', showTime: true,  isMe: false },
    { id: '2', sender: 'Me',        initial: 'R', color: '#E8441A', text: 'I will have the PR ready by tonight',     timeLabel: '', showTime: false, isMe: true  },
    { id: '3', sender: 'Jordan B.', initial: 'J', color: '#4CAF8A', text: 'Same here, almost done with the UI',      timeLabel: '', showTime: false, isMe: false },
    { id: '4', sender: 'Sara K.',   initial: 'S', color: '#5B9BD5', text: 'Tests are passing on my end',             timeLabel: 'TODAY AT 9:45 AM', showTime: true,  isMe: false },
    { id: '5', sender: 'Me',        initial: 'R', color: '#E8441A', text: 'Great work team!',                        timeLabel: '', showTime: false, isMe: true  },
  ],
  'GATE 2026 Prep': [
    { id: '1', sender: 'Priya N.', initial: 'P', color: '#E8441A', text: 'Did everyone finish the mock test?',       timeLabel: 'YESTERDAY AT 8:00 PM', showTime: true,  isMe: false },
    { id: '2', sender: 'Rahul T.', initial: 'R', color: '#5B9BD5', text: 'Yes scored 67 out of 100',                 timeLabel: '', showTime: false, isMe: false },
    { id: '3', sender: 'Me',       initial: 'D', color: '#E8441A', text: 'I got 71! Improving slowly',               timeLabel: '', showTime: false, isMe: true  },
    { id: '4', sender: 'Priya N.', initial: 'P', color: '#E8441A', text: 'Focus on algorithms section',              timeLabel: 'TODAY AT 10:00 AM', showTime: true,  isMe: false },
  ],
  'UI/UX Designers': [
    { id: '1', sender: 'Mia L.',   initial: 'M', color: '#F0A500', text: 'New Figma file is shared in the drive',    timeLabel: 'TODAY AT 11:00 AM', showTime: true,  isMe: false },
    { id: '2', sender: 'Leo M.',   initial: 'L', color: '#9C5BB5', text: 'Love the new color palette',               timeLabel: '', showTime: false, isMe: false },
    { id: '3', sender: 'Me',       initial: 'S', color: '#E8441A', text: 'The typography looks clean',               timeLabel: '', showTime: false, isMe: true  },
    { id: '4', sender: 'Mia L.',   initial: 'M', color: '#F0A500', text: 'Lets finalize by Friday',                  timeLabel: 'TODAY AT 11:30 AM', showTime: true,  isMe: false },
  ],
  'Startup Founders': [
    { id: '1', sender: 'Arjun K.', initial: 'A', color: '#4CAF8A', text: 'Investor meeting next Monday',             timeLabel: 'TODAY AT 8:00 AM', showTime: true,  isMe: false },
    { id: '2', sender: 'Nina L.',  initial: 'N', color: '#7C6FF7', text: 'Deck is ready, reviewed it last night',    timeLabel: '', showTime: false, isMe: false },
    { id: '3', sender: 'Me',       initial: 'C', color: '#E8441A', text: 'Finance slides are updated',               timeLabel: '', showTime: false, isMe: true  },
    { id: '4', sender: 'Arjun K.', initial: 'A', color: '#4CAF8A', text: 'Lets do a dry run Sunday evening',        timeLabel: 'TODAY AT 8:20 AM', showTime: true,  isMe: false },
    { id: '5', sender: 'Me',       initial: 'C', color: '#E8441A', text: 'Sunday 6pm works for me',                 timeLabel: '', showTime: false, isMe: true  },
  ],
};

const DEFAULT_GROUP_MESSAGES = [
  { id: '1', sender: 'Alex', initial: 'A', color: '#7C6FF7', text: 'Welcome to the group!', timeLabel: 'TODAY AT 9:00 AM', showTime: true, isMe: false },
  { id: '2', sender: 'Me',   initial: 'R', color: '#E8441A', text: 'Hey everyone!',          timeLabel: '', showTime: false, isMe: true  },
];

export default function GroupChatScreen({ onBack, routeParams }) {
  const group = routeParams || {
    name: 'Group Chat',
    type: 'Public',
    members: [
      { initial: 'A', color: '#7C6FF7' },
      { initial: 'J', color: '#4CAF8A' },
      { initial: 'S', color: '#5B9BD5' },
    ],
    extraCount: 5,
    memberPreview: 'Alex, Jordan, Sara...',
  };

  const initialMessages = GROUP_MOCK_MESSAGES[group.name] || DEFAULT_GROUP_MESSAGES;
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const listRef = useRef(null);

  const parsedMembers = group.members || [
    { initial: group.memberPreview?.split(', ')[0]?.[0] || 'A', color: '#2563EB' },
    { initial: group.memberPreview?.split(', ')[1]?.[0] || 'B', color: '#9333EA' },
    { initial: group.memberPreview?.split(', ')[2]?.[0] || 'C', color: '#16A34A' }
  ];
  
  const totalCount = parsedMembers.length + (group.extraCount || 0);

  const scrollToBottom = () => {
    if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'Me',
        initial: 'R',
        color: '#E8441A',
        text: inputText.trim(),
        timeLabel: '',
        showTime: false,
        isMe: true,
      },
    ]);
    setInputText('');
  };

  return (
    <Col sx={{ width: "100%", height: "100%", backgroundColor: '#F2F0EB', overflow: "hidden" }}>
      
      {/* Header */}
      <Row ai="center" jc="space-between" sx={{ 
          padding: "10px 10px", 
          backgroundColor: '#FFFFFF', 
          borderBottom: "1px solid #F0EDE8",
          flexShrink: 0,
          gap: 8
      }}>
        <Row ai="center" sx={{ gap: 10, flex: 1, minWidth: 0 }}>
          <button
              onClick={onBack}
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F2F0EB', display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", flexShrink: 0 }}
          >
              <Svg d="M15 18l-6-6 6-6" s={22} c="#1A1A1A" w={2} />
          </button>
          
          <Row ai="center" sx={{ flex: 1, minWidth: 0, gap: 10 }}>
            {/* Overlapping avatar stack */}
            <Row ai="center" sx={{ flexShrink: 0 }}>
              {parsedMembers.slice(0, 3).map((m, index) => (
                <div key={index} style={{
                    width: 30, height: 30, borderRadius: 15,
                    backgroundColor: m.color,
                    border: "2px solid #FFFFFF",
                    marginLeft: index > 0 ? -10 : 0,
                    zIndex: 3 - index,
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#FFFFFF', fontFamily: FB }}>{m.initial}</span>
                </div>
              ))}
              {(group.extraCount > 0) && (
                <div style={{
                    width: 30, height: 30, borderRadius: 15,
                    backgroundColor: '#DEDAD4',
                    border: "2px solid #FFFFFF",
                    marginLeft: -10,
                    zIndex: 0,
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <span style={{ fontSize: 8, fontWeight: 800, color: '#6B7280', fontFamily: FB }}>+{group.extraCount}</span>
                </div>
              )}
            </Row>

            <Col sx={{ gap: 1, flex: 1, minWidth: 0 }}>
              <Row ai="center" sx={{ gap: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', fontFamily: FB, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{group.name}</span>
                  <Svg d="M9 18l6-6-6-6" s={13} c="#8E8E93" w={2} />
              </Row>
              <span style={{ fontSize: 11, color: '#8E8E93', fontWeight: 500, fontFamily: FB }}>{totalCount} members</span>
            </Col>
          </Row>
        </Row>
        
        <Row ai="center" sx={{ gap: 6, flexShrink: 0 }}>
          <button style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F2F0EB', display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}>
              <Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" s={19} c="#1A1A1A" />
          </button>
          <button style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F2F0EB', display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}>
              <Svg d="M23 7l-7 5 7 5V7z M1 5h14v14H1z" s={21} c="#1A1A1A" />
          </button>
        </Row>
      </Row>

      {/* Messages */}
      <div ref={listRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "14px 14px 12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
        {messages.map((item) => {
            return (
                <div key={item.id} style={{ display: "flex", flexDirection: "column" }}>
                    {item.showTime && item.timeLabel !== '' && (
                        <div style={{ fontSize: 11, color: '#AEAEB2', textAlign: 'center', margin: "14px 0", fontWeight: 500, letterSpacing: 0.3, fontFamily: FB }}>
                            {item.timeLabel}
                        </div>
                    )}
                    <Row ai="flex-end" jc={item.isMe ? "flex-end" : "flex-start"} sx={{ marginBottom: 6, gap: 8 }}>
                        {!item.isMe && (
                            <div style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: item.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 2, flexShrink: 0 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#FFFFFF', fontFamily: FB }}>{item.initial}</span>
                            </div>
                        )}
                        <Col ai={item.isMe ? "flex-end" : "flex-start"} sx={{ maxWidth: "72%", gap: 3 }}>
                            {!item.isMe && (
                                <span style={{ fontSize: 11, fontWeight: 600, color: '#8E8E93', marginLeft: 4, fontFamily: FB }}>{item.sender}</span>
                            )}
                            <div style={{
                                padding: "10px 14px", borderRadius: 20,
                                borderBottomRightRadius: item.isMe ? 4 : 20,
                                borderBottomLeftRadius: item.isMe ? 20 : 4,
                                backgroundColor: item.isMe ? '#E8441A' : '#EFEFEA'
                            }}>
                                <span style={{ fontSize: 15, lineHeight: "21px", color: item.isMe ? '#FFFFFF' : '#1A1A1A', fontFamily: FB }}>
                                    {item.text}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        })}
      </div>

      {/* Input bar */}
      <Row ai="center" sx={{
          padding: "10px 12px", backgroundColor: '#FFFFFF', borderTop: "1px solid #F0EDE8", gap: 10, flexShrink: 0
      }}>
        <button style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none" }}>
            <Svg d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" s={26} c="#E8441A" w={1.5} />
        </button>
        
        <div style={{ flex: 1, backgroundColor: '#EFEFEA', borderRadius: 20, padding: "8px 14px", minHeight: 38, display: "flex", alignItems: "center" }}>
            <input
                placeholder="Message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                maxLength={500}
                style={{ width: "100%", fontSize: 15, color: '#1A1A1A', background: "transparent", border: "none", outline: "none", fontFamily: FB }}
            />
        </div>
        
        <button style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none" }}>
            <Svg d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8" s={24} c="#8E8E93" w={1.5} />
        </button>
        <button style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none" }}>
            <Svg d={IC.img} s={24} c="#8E8E93" w={1.5} />
        </button>
        <button style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none" }}>
            <Svg d="M12 22A10 10 0 1 1 12 2a10 10 0 0 1 0 20z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01 M15 9h.01" s={24} c="#8E8E93" w={1.5} />
        </button>
        
        <button
            onClick={sendMessage}
            disabled={inputText.trim().length === 0}
            style={{
                width: 34, height: 34, borderRadius: 17,
                backgroundColor: inputText.trim().length > 0 ? '#E8441A' : '#DEDAD4',
                display: "flex", alignItems: "center", justifyContent: "center", border: "none",
                cursor: inputText.trim().length > 0 ? "pointer" : "default",
                transition: "background-color 0.2s"
            }}
        >
            <Svg d={IC.arrow} s={17} c={inputText.trim().length > 0 ? '#FFFFFF' : '#AEAEB2'} w={2} />
        </button>
      </Row>
    </Col>
  );
}
