import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user')) || {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };
    setUser(savedUser);
  }, []);

  const handleUpdateProfile = () => {
    localStorage.setItem('user', JSON.stringify(user));
    alert('Profile updated successfully!');
    setEditMode(false);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      localStorage.removeItem('user');
      alert('Account deleted successfully.');
      navigate('/register');
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile Management</h1>
      {editMode ? (
        <div className="edit-profile">
          <label>
            Name:
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <button onClick={handleUpdateProfile}>Save Changes</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div className="view-profile">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
