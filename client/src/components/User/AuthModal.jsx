import React, { useState } from 'react';
import Login from './Login/login';  
import Register from './Register/register';  

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <dialog id="auth_modal" className="modal">
      <div className="modal-box relative"> {/* Set position relative here */}
        <button 
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
          onClick={() => document.getElementById('auth_modal').close()}
        >
          ✕
        </button>
        {/* Toggle between Login and Register */}
        {isLogin ? (
          <Login toggle={toggleForm} />
        ) : (
          <Register toggle={toggleForm} />
        )}
      </div>
    </dialog>
  );
};

export default AuthModal;
