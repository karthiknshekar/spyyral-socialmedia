import { useState } from 'react';
import { Container, Card, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaPlus, FaUsers } from 'react-icons/fa';
import Navbar from '../components/Navbar';

// Dummy data for demonstration
const dummyCommunities = [
  {
    id: 1,
    name: 'Local Tech Enthusiasts',
    description: 'A community for tech lovers in the area',
    members: 234,
    image: 'https://via.placeholder.com/50',
    joined: true,
  },
  {
    id: 2,
    name: 'Neighborhood Watch',
    description: 'Keeping our community safe together',
    members: 456,
    image: 'https://via.placeholder.com/50',
    joined: false,
  },
  // Add more dummy communities as needed
];

const Communities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleCreateCommunity = (e) => {
    e.preventDefault();
    // TODO: Implement community creation logic
    console.log('Creating community:', newCommunity);
    setShowCreateModal(false);
  };

  return (
    <div className="page-container">
      <Container>
        {/* Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
          <h4 className="mb-0">Communities</h4>
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            className="d-flex align-items-center gap-2"
          >
            <FaPlus /> Create Community
          </Button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-start-0"
            />
          </InputGroup>
        </div>

        {/* Communities List */}
        <div className="grid-layout">
          {dummyCommunities.map((community) => (
            <Card key={community.id} className="h-100">
              <Card.Body>
                <div className="d-flex flex-column h-100">
                  <div className="d-flex align-items-start mb-3">
                    <div className="aspect-ratio-square" style={{ width: '60px' }}>
                      <img
                        src={community.image}
                        alt={community.name}
                        className="aspect-ratio-content rounded"
                      />
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <h5 className="mb-1 text-truncate">{community.name}</h5>
                      <p className="mb-2 text-muted small text-truncate-2">
                        {community.description}
                      </p>
                      <div className="d-flex align-items-center text-muted small">
                        <FaUsers className="me-1" />
                        {community.members} members
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Button
                      variant={community.joined ? 'outline-primary' : 'primary'}
                      size="sm"
                      className="w-100"
                    >
                      {community.joined ? 'Joined' : 'Join'}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      {/* Create Community Modal */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Community</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCommunity}>
            <Form.Group className="mb-3">
              <Form.Label>Community Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter community name"
                value={newCommunity.name}
                onChange={(e) =>
                  setNewCommunity({ ...newCommunity, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter community description"
                value={newCommunity.description}
                onChange={(e) =>
                  setNewCommunity({
                    ...newCommunity,
                    description: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Community Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewCommunity({
                    ...newCommunity,
                    image: e.target.files[0],
                  })
                }
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create Community
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Navbar />
    </div>
  );
};

export default Communities; 