import { useState } from "react";
import AuthLogo from "../../assets/auth_logo.svg";
import ggle from "../../assets/google.svg";
import Twitter from "../../assets/twitter.svg";
import { CiMail } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../../../firebaseConfig";
const Login = () => {
  const [isLoading, setIsLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  onAuthStateChanged(auth, (user) => {
    console.log(user);
  });
  const handleLogin = () => {
    const email = "a@b.com";
    const password = "123456789";
    const persistSession = 1;
    setPersistence(
      auth,
      persistSession ? inMemoryPersistence : browserSessionPersistence
    ).then(() => {
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          //TODO: Set loggedIn state and navigate
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          //TODO: Handle error
        });
    });
  };
  return (
    <div className="flex h-screen">
      <div className="hidden md:block md:w-1/2 overflow-hidden">
        <img className="object-cover h-full w-full" src={AuthLogo} alt="Logo" />
      </div>
      <div className="w-full md:w-1/2 flex items-center md:px-16 bg-white overflow-y-auto">
        <div className="max-w-md p-6">
          <h2 className="text-center text-dark font-bold pt-48 mb-1 text-2xl">
            Log In
          </h2>
          <p className="text-dark font-normal text-base">
            Enter your credentials to access your account
          </p>
          <div className="pt-6 space-y-6 ">
            <div className="space-y-2 relative">
              <label
                htmlFor="username"
                className="text-sm font-normal text-dark-100"
              >
                Email Address
              </label>
              <br />
              <div className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center pointer-events-none">
                <CiMail className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="username"
                type="text"
                className="rounded-md px-4 py-3 w-full border border-gray outline-none"
                name="username"
                autoComplete="off"
                autoFocus
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2 relative">
              <label
                htmlFor="password-input"
                className="text-sm font-normal text-dark-100"
              >
                Password
              </label>
              <div className="absolute inset-y-0 right-0 pr-3 top-5 flex items-center">
                {showPassword ? (
                  <IoEyeOutline
                    className="h-4 w-4 text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                    aria-hidden="true"
                  />
                ) : (
                  <IoEyeOffOutline
                    className="h-54w-4 text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                    aria-hidden="true"
                  />
                )}
              </div>
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                className="rounded-md px-4 py-3 w-full border border-gray outline-none"
                name="password"
                required
                autoComplete="off"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember for 30 days
              </label>
            </div>
            <a href="#" className="text-sm text-primary font-normal">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium mt-6 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log Into Account
          </button>
          <div className="flex items-center justify-center space-x-4 mt-4 mb-4">
            <div className="border-b border-[#F0F2F5] w-16 lg:w-36 h-2"></div>
            <p className="text-center text-sm mt-3 mb-3 cursor-pointer">or</p>
            <div className="border-b border-[#F0F2F5] w-16 lg:w-36 h-2"></div>
          </div>
          <div className="space-y-4">
            <button className="w-full p-2.5 text-dark-200 font-semibold border border-gray outline-none rounded-md bg-brand-white text-base font-600 flex items-center justify-center cursor-pointer">
              <img src={ggle} alt="Google-icon" className="mr-2 w-5" />
              Continue with Google
            </button>
            <button className="w-full p-2.5 text-dark-200 font-semibold border border-gray outline-none rounded-md bg-brand-white text-base font-600 flex items-center justify-center cursor-pointer">
              <img src={Twitter} alt="Google-icon" className="mr-2 w-5" />
              Continue with Twitter
            </button>
          </div>
          <p className="text-grey text-sm mt-4 text-center">
            Are you new here?
            <Link to="/register" className="text-sm text-primary pl-2">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;