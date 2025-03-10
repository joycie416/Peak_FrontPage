import Image from "next/image";
import PEAK from "@public/PEAK-simple-logo.svg";

const LeftHalf = () => {
  return (
    <div className="w-1/2 h-screen p-[30px] flex flex-col justify-between bg-gray-900 text-white max-lg:hidden">
      <Image src={PEAK} alt="PEAK" className="w-[100px]" />
      <p>
        <span className="text-[20px]/[2]">
          “이곳에서 세상의 의미있는 세일즈가 이루어지길.”
        </span>{" "}
        <br />
        <span>Meet for Deal</span>
      </p>
    </div>
  );
};

export default LeftHalf;
