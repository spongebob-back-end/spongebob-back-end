import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="App">
      <h1>{showLoginForm ? 'Login' : 'Register'}</h1>
      {showLoginForm ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <RegistrationForm toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default App;
