import { useState } from 'react';

import '../styles/SigninPage.css';
import '../constants/Variables.css';

import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';

function SigninPage() {
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  /**
   * Function to open the signup dialog.
   */
  const openSignupDialog = () => {
    setIsSignupFormOpen(true);
  };

  /**
   * Function to close the signup dialog.
   */
  const closeSignupDialog = () => {
    setIsSignupFormOpen(false);
  };

  return (
    <>
      <div className="wrapper">
        <SigninForm openSignupDialog={openSignupDialog} />
      </div>
      <SignupForm
        isSignupFormOpen={isSignupFormOpen}
        closeSignupDialog={closeSignupDialog}
      />
    </>
  );
}

export default SigninPage;
