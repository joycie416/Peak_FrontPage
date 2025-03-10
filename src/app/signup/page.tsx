import LeftHalf from "@/components/auth/LeftHalf";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-gray-50">
      <LeftHalf />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
