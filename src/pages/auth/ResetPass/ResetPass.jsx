import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPass = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // You should add your password reset logic here, e.g., using Firebase Authentication
    // In this example, we're just logging the email and simulating a successful email sent.
    
    console.log('Reset password for email:', email);

    // Set the state to indicate that an email has been sent successfully
    setIsEmailSent(true);
  };

  return (
    <div >
      
        <h2 className="text-3xl text-center font-semibold mb-4">Reset Password</h2>
        {!isEmailSent ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Enter Your Email
                </label>
                <input
                  className="input input-primary w-full"
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full mb-4"
              >
                Send Reset Email
              </button>
            </form>
          </>
        ) : (
          <div className="text-green-500 text-center">
            Password reset email has been sent. Please check your inbox.
          </div>
        )}
        <p className='text-right'>
       <Link className='font-bold text-primary' to="/auth/login">Log In</Link>
        </p>
    </div>
  );
};

export default ResetPass;
