import React, { useState, useRef, useEffect } from 'react';
import { Row, Col } from '../../helpers.jsx';
import { Svg, IC } from '../../icons.jsx';
import { FB, FD } from '../../tokens.js';

const MOCK_MESSAGES = {
  'Sneha R.': [
    { id: '1', sender: 'them', text: 'Hey! Congrats on the hackathon!!', timeLabel: 'TODAY AT 10:10 AM', showTime: true },
    { id: '2', sender: 'me', text: 'Thank you so much Sneha!', timeLabel: '', showTime: false },
    { id: '3', sender: 'them', text: 'What did you build?', timeLabel: '', showTime: false },
    { id: '4', sender: 'me', text: 'An AI resume analyzer in 24hrs', timeLabel: '', showTime: false },
    { id: '5', sender: 'them', text: 'That sounds incredible!', timeLabel: 'TODAY AT 10:18 AM', showTime: true },
    { id: '6', sender: 'me', text: 'We won 1st place!', timeLabel: '', showTime: false },
  ],
  'Dev M.': [
    { id: '1', sender: 'them', text: 'Can we collab on the OSS project?', timeLabel: 'MONDAY AT 9:00 AM', showTime: true },
    { id: '2', sender: 'me', text: 'Absolutely! Which one?', timeLabel: '', showTime: false },
    { id: '3', sender: 'them', text: 'The React component library', timeLabel: '', showTime: false },
    { id: '4', sender: 'me', text: 'I am in. Let us set up a call', timeLabel: '', showTime: false },
  ],
};

const DEFAULT_MESSAGES = [
  { id: '1', sender: 'them', text: 'Hey there!', timeLabel: 'TODAY AT 9:00 AM', showTime: true },
  { id: '2', sender: 'me', text: 'Hi! How are you?', timeLabel: '', showTime: false },
  { id: '3', sender: 'them', text: 'Doing great thanks', timeLabel: '', showTime: false },
];

export default function ChatDetailScreen({ onBack, routeParams }) {
  const user = {
    name: routeParams?.name || 'User',
    initial: routeParams?.avatar?.ch || 'U',
    color: routeParams?.avatar?.bg || '#7C6FF7'
  };
  const initialMessages = MOCK_MESSAGES[user.name] || DEFAULT_MESSAGES;
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const listRef = useRef(null);

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
        sender: 'me',
        text: inputText.trim(),
        timeLabel: '',
        showTime: false,
      },
    ]);
    setInputText('');
  };

  return (
    <Col sx={{ width: "100%", height: "100%", backgroundColor: '#F2F0EB', overflow: "hidden" }}>
      {/* Header */}
      <Row ai="center" jc="space-between" sx={{
        padding: "10px 12px",
        backgroundColor: '#FFFFFF',
        borderBottom: "1px solid #F0EDE8",
        flexShrink: 0
      }}>
        <Row ai="center" sx={{ gap: 10, flex: 1 }}>
          <button
            onClick={onBack}
            style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F2F0EB', display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}
          >
            <Svg d="M15 18l-6-6 6-6" s={22} c="#1A1A1A" w={2} />
          </button>
          <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: user.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF', fontFamily: FB }}>{user.initial}</span>
          </div>
          <Col sx={{ gap: 1 }}>
            <Row ai="center" sx={{ gap: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', fontFamily: FB }}>{user.name}</span>
              <Svg d="M9 18l6-6-6-6" s={14} c="#8E8E93" w={2} />
            </Row>
            <span style={{ fontSize: 11, color: '#34C759', fontWeight: 500, fontFamily: FB }}>Online</span>
          </Col>
        </Row>
        <Row ai="center" sx={{ gap: 8 }}>
          <button style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F2F0EB', display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}>
            <Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" s={19} c="#1A1A1A" />
          </button>
          <button style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F2F0EB', display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}>
            <Svg d="M23 7l-7 5 7 5V7z M1 5h14v14H1z" s={21} c="#1A1A1A" />
          </button>
        </Row>
      </Row>

      {/* Messages */}
      <div ref={listRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "14px 14px 4px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
        {messages.map((item) => {
          const isMe = item.sender === 'me';
          return (
            <div key={item.id} style={{ display: "flex", flexDirection: "column" }}>
              {item.showTime && item.timeLabel !== '' && (
                <div style={{ fontSize: 11, color: '#AEAEB2', textAlign: 'center', margin: "14px 0", fontWeight: 500, letterSpacing: 0.3, fontFamily: FB }}>
                  {item.timeLabel}
                </div>
              )}
              <Row ai="flex-end" jc={isMe ? "flex-end" : "flex-start"} sx={{ marginBottom: 4, gap: 8 }}>
                {!isMe && (
                  <div style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: user.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 2, flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#FFFFFF', fontFamily: FB }}>{user.initial}</span>
                  </div>
                )}
                <div style={{
                  maxWidth: "72%", padding: "10px 14px", borderRadius: 20,
                  borderBottomRightRadius: isMe ? 4 : 20,
                  borderBottomLeftRadius: isMe ? 20 : 4,
                  backgroundColor: isMe ? '#E8441A' : '#EFEFEA'
                }}>
                  <span style={{ fontSize: 15, lineHeight: "21px", color: isMe ? '#FFFFFF' : '#1A1A1A', fontFamily: FB }}>
                    {item.text}
                  </span>
                </div>
              </Row>
            </div>
          );
        })}
        {/* Seen label */}
        <div style={{ fontSize: 11, color: '#AEAEB2', textAlign: 'right', paddingRight: 16, paddingBottom: 6, fontFamily: FB, marginTop: 4 }}>
          Seen just now
        </div>
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
