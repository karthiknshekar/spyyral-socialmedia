import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Image, Stack, Card } from 'react-bootstrap';
import { FaPaperPlane, FaSearch, FaArrowLeft, FaImage, FaSmile } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

// Dummy data for demonstration
const dummyChats = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      online: true,
    },
    lastMessage: 'Hey, are you coming to the event?',
    timestamp: '2m ago',
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      online: false,
    },
    lastMessage: 'Thanks for the help!',
    timestamp: '1h ago',
    unread: 0,
  },
  {
    id: 3,
    user: {
      name: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      online: true,
    },
    lastMessage: 'The community meetup was great!',
    timestamp: '3h ago',
    unread: 1,
  },
];

const dummyMessages = [
  {
    id: 1,
    text: 'Hey! How are you?',
    sent: false,
    timestamp: '10:00 AM'
  },
  {
    id: 2,
    text: 'I\'m good, thanks! Just checking out the local events.',
    sent: true,
    timestamp: '10:02 AM'
  },
  {
    id: 3,
    text: 'That\'s great! Are you coming to the community meetup this weekend?',
    sent: false,
    timestamp: '10:03 AM'
  },
  {
    id: 4,
    text: 'Yes, I\'ll be there! Looking forward to meeting everyone.',
    sent: true,
    timestamp: '10:05 AM'
  }
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(dummyMessages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sent: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const filteredChats = dummyChats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container fluid className="px-0 pb-5 vh-100 pt-4 mt-4">
        <Row className="h-100 g-0">
          {/* Chat List Column */}
          <Col md={4} lg={3} className={`h-100 border-end ${selectedChat ? 'd-none d-md-block' : ''}`}>
            <Card className="h-100 border-0 rounded-0">
              <Card.Header className="bg-white border-bottom p-3">
                <h5 className="mb-3">Messages</h5>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaSearch className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-start-0 shadow-none"
                  />
                </InputGroup>
              </Card.Header>
              <Card.Body className="p-0 overflow-auto">
                <Stack>
                  {filteredChats.map((chat) => (
                    <Button
                      key={chat.id}
                      variant="light"
                      className={`text-start p-3 border-bottom rounded-0 ${
                        selectedChat?.id === chat.id ? 'active' : ''
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="position-relative">
                          <Image
                            src={chat.user.avatar}
                            alt={chat.user.name}
                            roundedCircle
                            width={48}
                            height={48}
                          />
                          {chat.user.online && (
                            <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-white rounded-circle" 
                                  style={{ width: '12px', height: '12px' }} />
                          )}
                        </div>
                        <div className="flex-grow-1 min-width-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 text-truncate">{chat.user.name}</h6>
                            <small className="text-muted ms-2">{chat.timestamp}</small>
                          </div>
                          <p className="mb-0 small text-muted text-truncate">
                            {chat.lastMessage}
                          </p>
                        </div>
                        {chat.unread > 0 && (
                          <span className="badge bg-primary rounded-pill">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </Button>
                  ))}
                </Stack>
              </Card.Body>
            </Card>
          </Col>

          {/* Chat Content Column */}
          <Col md={8} lg={9} className={`h-100 ${!selectedChat ? 'd-none d-md-block' : ''}`}>
            <Card className="h-100 border-0 rounded-0">
              {selectedChat ? (
                <>
                  <Card.Header className="bg-white border-bottom p-3">
                    <div className="d-flex align-items-center gap-3">
                      <Button
                        variant="link"
                        className="d-md-none p-0 text-dark"
                        onClick={handleBackToList}
                      >
                        <FaArrowLeft size={20} />
                      </Button>
                      <div className="position-relative">
                        <Image
                          src={selectedChat.user.avatar}
                          alt={selectedChat.user.name}
                          roundedCircle
                          width={40}
                          height={40}
                        />
                        {selectedChat.user.online && (
                          <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-white rounded-circle" 
                                style={{ width: '12px', height: '12px' }} />
                        )}
                      </div>
                      <div>
                        <h6 className="mb-0">{selectedChat.user.name}</h6>
                        <small className="text-muted">
                          {selectedChat.user.online ? 'Online' : 'Offline'}
                        </small>
                      </div>
                    </div>
                  </Card.Header>

                  <Card.Body className="p-3 overflow-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`d-flex mb-3 ${message.sent ? 'justify-content-end' : 'justify-content-start'}`}
                      >
                        <div className={`p-3 rounded-3 ${message.sent ? 'bg-primary text-white' : 'bg-light'}`}
                             style={{ maxWidth: '75%', borderBottomRightRadius: message.sent ? '5px' : null,
                                    borderBottomLeftRadius: !message.sent ? '5px' : null }}>
                          <div>{message.text}</div>
                          <div className="text-end mt-1">
                            <small className={message.sent ? 'text-white-50' : 'text-muted'}>
                              {message.timestamp}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </Card.Body>

                  <Card.Footer className="bg-white border-top p-3">
                    <Form onSubmit={handleSendMessage}>
                      <InputGroup>
                        <Button variant="link" className="text-muted">
                          <FaSmile size={20} />
                        </Button>
                        <Form.Control
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="border-0 bg-light rounded-pill shadow-none px-3"
                        />
                        <Button variant="link" className="text-muted">
                          <FaImage size={20} />
                        </Button>
                        <Button 
                          type="submit" 
                          variant="primary" 
                          className="rounded-circle d-flex align-items-center justify-content-center p-2"
                          style={{ width: '38px', height: '38px' }}
                          disabled={!newMessage.trim()}
                        >
                          <FaPaperPlane size={16} />
                        </Button>
                      </InputGroup>
                    </Form>
                  </Card.Footer>
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                  Select a chat to start messaging
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
      <Navbar />
    </>
  );
};

export default Messages; 