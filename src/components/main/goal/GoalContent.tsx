const GoalContent = () => {
  return (
    <div className="w-full xl:w-desktop-width mx-auto">
      <div className="w-full px-[20px] py-[20px] flex flex-col justify-between text-white md:p-0 md:mt-[100px] md:flex-row">
        <div>
          <p className="text-[35px]/[1] md:text-[45px]/[1]">
            <span>A2A,</span> <br />{" "}
            <span className="font-bold">
              Agent to Agent <br className="md:hidden" />
              economy!
            </span>
          </p>
          <p className="font-pretendard font-medium text-[12px]/[1.5] mt-[15px] md:text-[20px]/[1.5] md:mt-[30px]">
            피크팀이 풀고자 하는 문제는 기업의 영업을 <br /> 가장 효율적으로
            만드는 것입니다.
          </p>
        </div>
        <div className="flex items-center w-full h-fit mt-[15px] md:w-[580px] md:h-[142px] md:pt-[30px] md:mt-0">
          <p className="font-pretendard font-medium break-keep text-[14px]/[1.6] md:text-[16px]/[1.6]">
            생성형 AI는 대형 언어 모델(LLM) 중심에서 ‘AI 에이전트(AI Agent)’로
            빠르게 이동하고 있으며, 피크는 세일즈 활동에서 필요한 기술을
            제공하여 비즈니스 가치를 창출하는데 핵심적인 역할을 하고자
            합니다. Peak 솔루션을 제공하는 더선한(주)는 기술창업자의 마음을
            이해하는 사람들이 모여 히말라야 셰르파의 마음처럼 훌륭한 기술이
            세상에 선보일 수 있도록 돕고자 설립한 기업입니다. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalContent;
