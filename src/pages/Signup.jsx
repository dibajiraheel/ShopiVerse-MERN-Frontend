import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Switch from "../ui components/Switch"; // Import the toggle switch
import Signup from "../api/auth/Signup";
import Login from "../api/auth/Login"
import { useSelector } from "react-redux";
import { AppleIcon } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const themeMode = useSelector(state => state.themeStore.mode)

  const { control, handleSubmit } = useForm();
  const [isSellerMode, setIsSellerMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSignup = async (data) => {
    if (!(data.email && data.password)) return;
    setLoading(true);
    setEmailError(false);

    if (!isSellerMode) {
      const signupResponse = await Signup(data, "customer");
      setLoading(false);

      if (signupResponse === "Email Already Registered As Seller" || signupResponse === "Email Already Registered As Customer") {
        setEmailError(true);
      } 
      else if (signupResponse === "Signed Up Successfully") {
        console.log('SIGN UP SUCCESSFULL');
        const loginResponse = await Login({email: data.email, password: data.password}, 'customer')
        if (loginResponse.statusCode == 200) {
          console.log('LOGIN SUCCESSFULL');
          navigate("/home")
        }
        
      }
    } 
    else {
      const signupResponse = await Signup(data, "seller");
      setLoading(false);

      if (signupResponse === "Email Already Registered As Seller" || signupResponse === "Email Already Registered As Customer") {
        setEmailError(true);
      } 
      else if (signupResponse === "Signed Up Successfully") {
        console.log('SIGN UP SUCCESSFULL');
        const loginResponse = await Login({'email': data.email, 'password': data.password}, 'seller')
        if (loginResponse.statusCode == 200) {
          console.log('LOGIN SUCCESSFULL');
          navigate("/dashboard")
        }
      }
    }

  };


  const handleForgotPassword = async () => {
    // To be implemented
    navigate('/forgot-password')
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 transition-all">
      <div className="w-full max-w-md space-y-6 rounded-2xl p-8 shadow-lg backdrop-blur-md transition-all border-transparent shadow-white scale-90 hover:scale-95 hover:shadow-2xl duration-700">
        <h2 className="text-center text-4xl font-extrabold tracking-wide">
          Welcome to <span className="text-blue-500 italic">ShopiVerse</span>
        </h2>
        <p className="text-center text-sm text-gray-400">
          Your gateway to endless shopping possibilities
        </p>

        {/* Toggle Switch for Seller Mode */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Customer Mode</span>
          <Switch
            defaultChecked={isSellerMode}
            onChange={() => {
              setIsSellerMode((currentIsSellerMode) => !currentIsSellerMode);
            }}
            classes={`${themeMode == 'dark' ? '' : 'bg-gray-800 toggle-accent'}`}
          />
          <span className="text-sm font-medium">Seller Mode</span>
        </div>

        <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
          
            <div>
                <Controller
                name="userName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                    type="text"
                    placeholder="Enter Username"
                    label="Username"
                    {...field}
                    className="w-full"
                    inputClasses={`${
                        themeMode === 'dark'
                        ? 'bg-transparent input-success border-2 text-white'
                        : 'bg-white border-gray-300 text-black'
                    } rounded-md px-3 py-2 w-full`}
                    labelClasses={`text-lg ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}
                    />
                )}
                />
            </div>
          
            <div>
                <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                    {...field}
                    className="w-full"
                    inputClasses={`${
                        themeMode === 'dark'
                        ? 'bg-transparent input-success border-2 text-white'
                        : 'bg-white border-gray-300 text-black'
                    } rounded-md px-3 py-2 w-full`}
                    labelClasses={`text-lg ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}
                    />
                )}
                />
                {emailError && (
                <p className="mt-1 text-sm text-red-500">Email Already registered</p>
                )}
            </div>

            <div>
                <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                    type="password"
                    placeholder="Enter your password"
                    label="Password"
                    {...field}
                    className="w-full"
                    inputClasses={`${
                        themeMode === 'dark'
                        ? 'bg-transparent input-success border-2 text-white'
                        : 'bg-white border-gray-300 text-black'
                    } rounded-md px-3 py-2 w-full`}
                    labelClasses={`text-lg ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}
                    />
                )}
                />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
                <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-500 hover:underline"
                >
                Forgot Password?
                </button>
            </div>

            <Button
                text="Signup"
                classes="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md hover:shadow-lg transition-all"
                disabled={loading}
            />

        </form>

        <div className="relative mt-4 flex items-center justify-center">
          <span className="absolute bg-transparent px-3 text-sm text-gray-600">
            OR
          </span>
          <div className="h-px w-full bg-gray-300"></div>
        </div>

        <Link
          to={
            isSellerMode
              ? "http://localhost:8000/auth/seller/google"
              : "http://localhost:8000/auth/customer/google"
          }
        >
          <Button
            text="Signup with Google"
            classes="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg transition-all"
            disabled={loading}
          />
        </Link>

        {/* Navigate to Signup Page */}
        <div className="text-center text-sm text-gray-600 py-3">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
