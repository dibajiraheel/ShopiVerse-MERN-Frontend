import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Switch from "../ui components/Switch"; // Import the toggle switch
import { UpdatePassword, VerifyEmail, VerifyOtp } from "../api/auth/ForgotPassword";
import { useSelector } from "react-redux";

const ForgotPasswordPage = () => {


  const themeMode = useSelector(state => state.themeStore.mode)

  const { control, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const [isSellerMode, setIsSellerMode] = useState(false); // Toggle for Seller Mode
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const handleEmailSubmit = async (data) => {
    
    if (data.email == '') return
    
    setEmailError(false);

    // TODO: Implement API call to send OTP for Customer/Seller
    const userType = isSellerMode ? "seller" : "customer";
    console.log(`Sending OTP for ${userType}:`, data.email);

    const response = await VerifyEmail(data.email, isSellerMode)
    if (!response) {
        setEmailError(true)
        return
    }
    else if (response) {
        setEmailVerified(true)
        setValue('email', '')
        return
    }

  };

  const handleOtpSubmit = async (data) => {
    
    if (data.otp == '') return
    
    setOtpError(false);

    const response = await VerifyOtp(data.otp, isSellerMode)
    if (!response) {
        setOtpError(true)
        return
    }
    else if (response) {
        setOtpVerified(true)
        return
    }
    
  };

  const handlePasswordUpdate = async (data) => {
    
    if (data.newPassword == '') return

    const response = await UpdatePassword(data.newPassword, isSellerMode)
    if (!response) {
        return
    }
    else if (response) {
        navigate("/login")
        return
    }

  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">

      <div className="w-full max-w-md space-y-6 p-8 shadow-lg rounded-2xl backdrop-blur-md">
        <h2 className="text-center text-2xl font-bold">Forgot Password</h2>

        {/* Toggle Switch for Customer/Seller Mode */}
        {!emailVerified ? (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Customer Mode</span>
            <Switch
              defaultChecked={isSellerMode}
              onChange={() => setIsSellerMode((prev) => !prev)}
              classes={`${themeMode == 'dark' ? '' : 'bg-gray-800 toggle-accent'}`}
            />
            <span className="text-sm font-medium">Seller Mode</span>
          </div>
        ) : null}

        {!emailVerified ? (
          <form onSubmit={handleSubmit(handleEmailSubmit)} className="space-y-4">
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
                    value={field.value}
                    onChange={field.onChange}
                    inputClasses={`${
                      themeMode === 'dark'
                        ? 'bg-transparent input-success border-2 text-white'
                        : 'bg-white border-gray-300 text-black'
                    } rounded-md px-3 py-2 w-full`}
                    labelClasses={`text-lg ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}
                  />
                )}
              />
              {emailError ? (
                <p className="mt-1 text-sm text-red-500">Email not registered</p>
              ) : null}
            </div>
            <Button text="Send OTP" classes="w-full bg-blue-500 text-white" />
          </form>
        ) : null
        }
        
        {(emailVerified && otpVerified) ? null : (emailVerified && (!otpVerified)) ? (
          <form onSubmit={handleSubmit(handleOtpSubmit)} className="space-y-4">
            <div>
              <Controller
                name="otp"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    label="OTP"
                    value={field.value}
                    onChange={field.onChange}
                    inputClasses={`${
                      themeMode === 'dark'
                        ? 'bg-transparent input-success border-2 text-white'
                        : 'bg-white border-gray-300 text-black'
                    } rounded-md px-3 py-2 w-full`}
                    labelClasses={`text-lg ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}
                  />
                )}
              />
              {otpError ? (
                <p className="mt-1 text-sm text-red-500">Invalid OTP</p>
              ) : null}
            </div>
            <Button text="Verify OTP" classes="w-full bg-green-500 text-white" />
          </form>
        ) : null
        }

        {otpVerified ? (
          <form onSubmit={handleSubmit(handlePasswordUpdate)} className="space-y-4">
            <div>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    label="New Password"
                    value={field.value}
                    onChange={field.onChange}
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
            <Button text="Update Password" classes="w-full bg-indigo-500 text-white" />
          </form>
        ) : null}

      </div>

    </div>
  );
};

export default ForgotPasswordPage;
