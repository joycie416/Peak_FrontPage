import SignInForm from "@/components/auth/SignInForm";
import React from "react";
import LeftHalf from "./LeftHalf";

const SignInPage = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-primary/80">
      <LeftHalf />
      <SignInForm />
    </div>
  );
};

export default SignInPage;
