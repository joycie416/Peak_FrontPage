"use client";

import Image from "next/image";
import PEAK from "@public/PEAK-simple-logo-black.svg";
import Google from "@public/google-logo.svg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get("email") || !formData.get("password")) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    alert("로그인 성공!");
    router.push("/");
  };

  const handleGoogleSignIn = () => {
    alert("소셜 로그인 성공!");
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center w-full px-6 m-auto space-y-5 md:max-w-[400px] md:p-6 md:bg-white md:border md:border-gray-70 md:rounded-[8px] md:drop-shadow-[0_6px_6px_rgba(0,0,0,0.1)]">
      <Link href={"/"}>
        <Image src={PEAK} alt="PEAK" className="w-[100px]" />
      </Link>
      <form onSubmit={onSubmit} className="w-full space-y-5">
        <div className="w-full">
          <label>Email</label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="h-10 mt-2 bg-white"
          />
        </div>
        <div className="w-full">
          <label>Password</label>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="h-10 mt-2 bg-white"
          />
        </div>
        <Button className="w-full h-10">로그인</Button>
      </form>
      <div className="w-full flex items-center">
        <hr className="w-full bg-gray-70" /> <p className="mx-2">or</p>
        <hr className="w-full bg-gray-70" />
      </div>
      <Button onClick={() => handleGoogleSignIn()} className="w-full h-10">
        <div className="p-[2px] bg-white rounded-full">
          <Image src={Google} alt="Google_logo" />
        </div>
        <p>Sign in with Google</p>
      </Button>
      <hr className="w-full bg-gray-70" />
      <p>
        Don't have an account?{" "}
        <Link href={"/signup"} className="underline text-primary">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
