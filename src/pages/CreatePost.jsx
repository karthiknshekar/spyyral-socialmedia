import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaImage, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement post creation logic
    console.log({
      content,
      image: selectedImage,
      tags
    });
    navigate('/feed');
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Card className="border-0 shadow-sm">
          <Card.Body>
            <div className="d-flex align-items-center mb-4">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User"
                className="rounded-circle me-3"
                width="40"
                height="40"
              />
              <div>
                <h6 className="mb-0">Create Post</h6>
                <small className="text-muted">Share what's happening in your area</small>
              </div>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="What's happening?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="create-post-textarea"
                  rows={4}
                />
              </Form.Group>

              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={handleRemoveImage}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}

              <div className="tag-container">
                {tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>

              <Form.Group className="mb-3">
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Add tags (press Enter)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag(e);
                      }
                    }}
                  />
                  <Button
                    variant="outline-primary"
                    onClick={handleAddTag}
                  >
                    Add
                  </Button>
                </div>
              </Form.Group>

              <div className="d-flex gap-2 mb-4">
                <Button
                  variant="outline-primary"
                  as="label"
                  htmlFor="image-upload"
                >
                  <FaImage className="me-2" />
                  Add Photo
                </Button>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageChange}
                />
                <Button variant="outline-primary">
                  <FaMapMarkerAlt className="me-2" />
                  Add Location
                </Button>
              </div>

              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={!content.trim() && !selectedImage}
                >
                  Post
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate('/feed')}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Navbar />
    </div>
  );
};

export default CreatePost; 