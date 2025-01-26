import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Use a more reliable state update function
  const toggleAuthMode = () => setIsLogin((prev) => !prev);

  return (
    <div className='auth-container'>
      {isLogin ? (
        <>
          <h2>Login</h2>
          <LoginForm />
          <p>
            Don’t have an account?{" "}
            <button onClick={toggleAuthMode}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <h2>Sign Up</h2>
          <SignupForm />
          <p>
            Already have an account?{" "}
            <button onClick={toggleAuthMode}>Login</button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthenticationPage;
