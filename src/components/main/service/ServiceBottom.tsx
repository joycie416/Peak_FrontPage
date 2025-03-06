// import Image from "next/image";
// import Mask from "@public/main/mask-scaled.svg";

const ServiceBottom = () => {
  return (
    <div className="w-full text-white overflow-hidden relative service_bottom_gradient px-5 pt-[50px] pb-[30px] md:px-0 md:pt-[150px] md:pb-[100px]">
      {/* <Image
        src={Mask}
        alt="배경 효과"
        height={590}
        className="h-full absolute top-0 bottom-0 object-cover origin-center"
      /> */}
      <p className="font-bold text-center text-[30px] tracking-[-2px] mb-[15px] md:text-[55px] md:mb-[30px]">
        Hear what our <br />
        customers say about <br className="md:hidden" />
        our AI solutions
      </p>
      <p className="tracking-[-0.75px] font-medium text-center font-pretendard text-[14px]/[1.5] mb-[24px] md:text-[22px]/[1.5] md:mb-[44px]">
        피크팀과의 협력은 저희 비즈니스의 판도를 바꾸어 놓았습니다. <br />
        RPA 솔루션은 반복적인 작업을 자동화하고 유망고객을 찾고 만나는데 <br />
        큰 도움을 주어 매출에 큰 성장을 가져왔습니다.{" "}
        <br className="md:hidden" /> 그 결과에 이보다 더 만족할 수 없습니다.
      </p>
      <p className="font-mediuem text-center font-pretendard text-[10px] leading-[20px] md:text-[16px] md:leading-[35px]">
        - 인공지능팩토리, 김태영 대표이사
      </p>
    </div>
  );
};

export default ServiceBottom;
