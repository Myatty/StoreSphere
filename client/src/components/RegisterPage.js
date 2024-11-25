import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const navigate = useNavigate();

  const sendVerificationEmail = async () => {
    try {
      const response = await fetch('http://localhost:5000/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setVerificationCode(data.verificationCode);
        setVerificationSent(true); 
        alert('Verification email sent!');
      } else {
        alert('Failed to send verification email');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      alert('An error occurred');
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('Please fill out all fields');
      return;
    }

    await sendVerificationEmail();
    setIsRegistered(true);
  };

  const handleVerifyEmail = () => {
    if (enteredCode === verificationCode) {
      const newUser = { name, email, password, verified: true };
      localStorage.setItem('user', JSON.stringify(newUser));
      alert(`Welcome, ${name}! Email verified successfully! Registration complete.`);
      navigate('/login');
    } else {
      alert('Incorrect verification code. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="registerBtn" type="submit">Register</button>
      </form>

      {isRegistered && verificationSent && (
        <div className="verification-container">
          <p>A verification code has been sent to your email. Please enter the code below to verify your email.</p>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter verification code"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              required
            />
          </div>
          <button onClick={handleVerifyEmail} className="verifyBtn">Verify Email</button>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
