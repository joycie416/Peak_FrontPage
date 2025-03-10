"use client";

import Image from "next/image";
import PEAK from "@public/PEAK-simple-logo-black.svg";
import Google from "@public/google-logo.svg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (checkboxRef.current) {
      if (!checkboxRef.current.checked) {
        alert("약관 및 정책 확인에 체크해주세요.");
        return;
      }
      if (checkboxRef.current.checked) {
        if (!formData.get("email") || !formData.get("password")) {
          alert("이메일과 비밀번호를 모두 입력해주세요.");
          return;
        }

        alert("회원가입 성공!");
        router.push("/");
      }
    }
  };

  const handleGoogleSignUp = () => {
    if (checkboxRef.current) {
      if (!checkboxRef.current.checked) {
        alert("약관 및 정책 확인에 체크해주세요.");
        return;
      }
      if (checkboxRef.current.checked) {
        alert("소셜 로그인 성공!");
        router.push("/");
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-6 m-auto space-y-5 md:max-w-[400px] md:p-6 md:bg-white md:border md:border-gray-70 md:rounded-[8px] md:drop-shadow-[0_6px_6px_rgba(0,0,0,0.1)]">
      <Link href={"/"}>
        <Image src={PEAK} alt="PEAK" className="w-[100px]" />
      </Link>
      <label
        htmlFor="terms_and_policy_checkbox"
        className="w-full max-md:h-12 px-5 py-2 flex items-center bg-white border rounded-[8px] has-[:checked]:border-primary has-[:checked]:bg-secondary"
      >
        <input
          id="terms_and_policy_checkbox"
          type="checkbox"
          ref={checkboxRef}
          className="mr-5 peer"
        />
        <p className="flex-grow text-[12px] text-left line-clamp-2 peer-checked:text-primary">
          By signing up, I agree to our{" "}
          <Link
            href={"https://www.koreaodm.com/customer/"}
            className="underline hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and <br className="max-md:hidden" />{" "}
          <Link
            href={"https://www.koreaodm.com/customer/"}
            className="underline hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </label>

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
        <Button className="w-full h-10">회원가입</Button>
      </form>
      <div className="w-full flex items-center">
        <hr className="w-full bg-gray-70" /> <p className="mx-2">or</p>
        <hr className="w-full bg-gray-70" />
      </div>
      <Button onClick={() => handleGoogleSignUp()} className="w-full h-10">
        <div className="p-[2px] bg-white rounded-full">
          <Image src={Google} alt="Google_logo" />
        </div>
        <p>Sign up with Google</p>
      </Button>
    </div>
  );
};

export default SignUpForm;
