import { useState } from 'react';

import '../styles/LoginPage.css';
import '../constants/Variables.css';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function LoginPage() {
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  const openSignupDialog = () => {
    setIsSignupFormOpen(true);
  };

  const closeSignupDialog = () => {
    setIsSignupFormOpen(false);
  };

  return (
    <>
      <div className="wrapper">
        <LoginForm openSignupDialog={openSignupDialog} />
      </div>
      <SignupForm
        isSignupFormOpen={isSignupFormOpen}
        closeSignupDialog={closeSignupDialog}
      />
    </>
  );
}

export default LoginPage;
