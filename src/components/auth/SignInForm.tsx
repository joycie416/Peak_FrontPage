"use client";

import Image from "next/image";
import PEAK from "@public/PEAK-simple-logo-black.svg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const SignInForm = () => {
  return (
    <div className="flex flex-col items-center m-auto w-full px-5 space-y-5 md:max-w-[350px] lg:px-0">
      <Link href={"/"}>
        <Image src={PEAK} alt="PEAK" className="w-[100px]" />
      </Link>
      <form className="w-full space-y-5">
        <div className="w-full">
          <label>Email</label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="mt-2"
          />
        </div>
        <div className="w-full">
          <label>Password</label>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="mt-2"
          />
        </div>
        <Button className="w-full">로그인</Button>
      </form>
      <p>
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
