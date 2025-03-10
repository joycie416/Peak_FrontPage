"use client";

import Image from "next/image";
import PEAK from "@public/PEAK-simple-logo-black.svg";
import Google from "@public/google-logo.svg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const SignInForm = () => {
  return (
    <div className="flex flex-col items-center w-full px-6 m-auto space-y-5 md:max-w-[350px] md:p-6 md:bg-white md:border md:border-gray-70 md:rounded-[8px] md:drop-shadow-[0_6px_6px_rgba(0,0,0,0.1)]">
      <Link href={"/"}>
        <Image src={PEAK} alt="PEAK" className="w-[100px]" />
      </Link>
      <Button className="w-full h-10">
        <div className="p-[2px] bg-white rounded-full">
          <Image src={Google} alt="Google_logo" />
        </div>
        <p>Sign in with Google</p>
      </Button>
      <div className="w-full flex items-center">
        <hr className="w-full bg-gray-70" /> <p className="mx-2">or</p>
        <hr className="w-full bg-gray-70" />
      </div>

      <form className="w-full space-y-5">
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
      <p className="text-center">
        By clicking continue, you agree to our <br />{" "}
        <Link
          href={"https://www.koreaodm.com/customer/"}
          className="underline hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href={"https://www.koreaodm.com/customer/"}
          className="underline hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default SignInForm;
