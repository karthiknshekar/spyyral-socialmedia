import { useState } from 'react';
import { Container, Form, Button, Card, Nav, Modal, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FaEdit, FaCog, FaSignOutAlt, FaHeart, FaComment, FaEye } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const profileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .required('Username is required'),
  bio: Yup.string()
    .max(160, 'Bio must be less than 160 characters'),
  location: Yup.string()
    .required('Location is required'),
  interests: Yup.array()
    .of(Yup.string())
    .min(1, 'Select at least one interest')
    .required('Interests are required'),
});

const interestOptions = [
  'Technology', 'Sports', 'Music', 'Art', 'Food',
  'Travel', 'Fashion', 'Gaming', 'Books', 'Movies',
  'Fitness', 'Photography', 'Nature', 'Politics', 'Science'
];

// Dummy user data
const dummyUser = {
  username: 'johndoe',
  name: 'John Doe',
  bio: 'Tech enthusiast | Coffee lover | Always learning',
  location: 'New York, USA',
  avatar: 'https://via.placeholder.com/150',
  coverImage: 'https://via.placeholder.com/1200x300',
  interests: ['Technology', 'Coffee', 'Photography'],
  stats: {
    posts: 42,
    friends: 256,
    communities: 8
  }
};

// Dummy posts data
const dummyPosts = [
  {
    id: 1,
    content: 'Just discovered an amazing local café! The coffee is incredible. 🍵',
    image: 'https://via.placeholder.com/600x400',
    likes: 24,
    comments: 5,
    views: 120,
    timestamp: '2h ago'
  },
  {
    id: 2,
    content: 'Beautiful sunset at the park today! 🌅',
    image: 'https://via.placeholder.com/600x400',
    likes: 45,
    comments: 12,
    views: 230,
    timestamp: '1d ago'
  }
];

const Profile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const isNewUser = false; // This should be determined by your auth logic

  const handleEditProfile = async (values, { setSubmitting }) => {
    try {
      // TODO: Implement profile update logic
      console.log('Profile values:', values);
      setShowEditModal(false);
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isNewUser) {
    return (
      <Container className="py-5">
        <Card className="mx-auto" style={{ maxWidth: '600px' }}>
          <Card.Body className="p-4">
            <h2 className="text-center mb-4">Complete Your Profile</h2>
            <ProfileForm onSubmit={handleEditProfile} initialValues={{
              username: '',
              bio: '',
              location: '',
              interests: [],
              profileImage: null
            }} />
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Cover Image */}
        <div
          className="profile-cover rounded-top"
          style={{ backgroundImage: `url(${dummyUser.coverImage})` }}
        >
          <div className="profile-actions">
            <Button
              variant="light"
              className="rounded-circle p-2"
              onClick={() => setShowEditModal(true)}
            >
              <FaEdit />
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <Card className="border-0">
          <Card.Body>
            <div className="profile-avatar-wrapper text-center">
              <Image
                src={dummyUser.avatar}
                alt={dummyUser.name}
                className="profile-avatar"
                width={120}
                height={120}
              />
              <h4 className="mt-3 mb-1">{dummyUser.name}</h4>
              <p className="text-muted mb-2">@{dummyUser.username}</p>
              <p className="mb-3">{dummyUser.bio}</p>
              <p className="text-muted mb-3">
                <small>📍 {dummyUser.location}</small>
              </p>
              <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
                {dummyUser.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="badge bg-light text-dark border"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="profile-stats border-top border-bottom">
              <div className="profile-stat-item">
                <span className="h5 mb-0">{dummyUser.stats.posts}</span>
                <small className="text-muted">Posts</small>
              </div>
              <div className="profile-stat-item">
                <span className="h5 mb-0">{dummyUser.stats.friends}</span>
                <small className="text-muted">Friends</small>
              </div>
              <div className="profile-stat-item">
                <span className="h5 mb-0">{dummyUser.stats.communities}</span>
                <small className="text-muted">Communities</small>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Tabs */}
        <Nav variant="tabs" className="profile-tabs mb-3">
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'posts'}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'media'}
              onClick={() => setActiveTab('media')}
            >
              Media
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'likes'}
              onClick={() => setActiveTab('likes')}
            >
              Likes
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Posts */}
        <div className="posts-container">
          {dummyPosts.map((post) => (
            <Card key={post.id} className="feed-card">
              <Card.Body>
                <Card.Text>{post.content}</Card.Text>
                {post.image && (
                  <div className="aspect-ratio-16-9 mb-3">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="aspect-ratio-content rounded"
                    />
                  </div>
                )}

                <div className="d-flex flex-wrap gap-2">
                  <Button variant="outline-primary" size="sm">
                    <FaHeart className="me-2" />
                    <span className="d-none d-sm-inline">Like</span>
                    <span className="ms-1">{post.likes}</span>
                  </Button>
                  <Button variant="outline-primary" size="sm">
                    <FaComment className="me-2" />
                    <span className="d-none d-sm-inline">Comment</span>
                    <span className="ms-1">{post.comments}</span>
                  </Button>
                  <Button variant="outline-primary" size="sm">
                    <FaEye className="me-2" />
                    <span className="d-none d-sm-inline">Views</span>
                    <span className="ms-1">{post.views}</span>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileForm
            onSubmit={handleEditProfile}
            initialValues={{
              username: dummyUser.username,
              bio: dummyUser.bio,
              location: dummyUser.location,
              interests: dummyUser.interests,
              profileImage: null
            }}
          />
        </Modal.Body>
      </Modal>

      <Navbar />
    </div>
  );
};

// Separate ProfileForm component
const ProfileForm = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(event) => {
                setFieldValue('profileImage', event.currentTarget.files[0]);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.username && errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.bio && errors.bio}
            />
            <Form.Control.Feedback type="invalid">
              {errors.bio}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              {values.bio.length}/160 characters
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.location && errors.location}
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Interests</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <Form.Check
                  key={interest}
                  type="checkbox"
                  id={`interest-${interest}`}
                  label={interest}
                  checked={values.interests.includes(interest)}
                  onChange={(e) => {
                    const currentInterests = [...values.interests];
                    if (e.target.checked) {
                      currentInterests.push(interest);
                    } else {
                      const index = currentInterests.indexOf(interest);
                      if (index > -1) {
                        currentInterests.splice(index, 1);
                      }
                    }
                    setFieldValue('interests', currentInterests);
                  }}
                  className="interest-checkbox"
                />
              ))}
            </div>
            {touched.interests && errors.interests && (
              <div className="text-danger small mt-1">
                {errors.interests}
              </div>
            )}
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              size="lg"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Profile; 