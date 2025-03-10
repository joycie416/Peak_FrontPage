import SignInForm from "@/components/auth/SignInForm";
import LeftHalf from "@/components/auth/LeftHalf";

const SignInPage = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-gray-50">
      <LeftHalf />
      <SignInForm />
    </div>
  );
};

export default SignInPage;
