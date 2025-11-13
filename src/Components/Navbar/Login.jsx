import React, { useState, useContext } from 'react';
import Banner from '../Banner/Banner';
import { AuthContext } from '../Auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Api/axiosInstance'; 

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {

      const result = await signIn(email, password);
      const user = result.user;

      const userData = {
        name: user.displayName || "No Name",
        email: user.email,
        photo: user.photoURL || "",
        createdAt: new Date(),
      };

      await axiosInstance.post("/users", userData);
      console.log("Logged-in user saved/verified in MongoDB");

      const tokenRes = await axiosInstance.post("/login", { email: user.email });
      const token = tokenRes.data.token;

      localStorage.setItem("accessToken", token);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };



  // Google login
  const handleGoogleLogin = async () => {
    setError("");

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: new Date(),
      };

      await axiosInstance.post("/users", userData);
      console.log("Google user saved to MongoDB");


      const tokenRes = await axiosInstance.post("/login", { email: user.email });
      const token = tokenRes.data.token;
      localStorage.setItem("accessToken", token);

      navigate("/");
    } catch (err) {
      console.error("Google sign-in failed:", err);
      setError("Google sign-in failed");
    }
  };




  return (
    <div className=''>




      <div className="flex justify-center mt-32 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Login to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2.5 rounded-xl font-medium hover:bg-yellow-600 transition"
            >
              Login
            </button>

            <div className="flex items-center justify-center mt-4">
              <span className="text-gray-400 text-sm">or</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center border border-gray-300 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-600 mt-5">
              Don’t have an account?{' '}
              <Link to='/register'

                className="text-yellow-600 font-medium hover:underline"
              >
                Register...
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
