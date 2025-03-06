import Image from "next/image";
import Kcc from "@public/main/logos/kcc-logo.svg";
import Bizplay from "@public/main/logos/bizplay-logo.svg";
import Amazon from "@public/main/logos/amazon-logo.svg";
import TheIMC from "@public/main/logos/TheIMC-logo.svg";
import Intellius from "@public/main/logos/intellius-logo.svg";
import FluentT from "@public/main/logos/FluentT-logo.svg";

const Logos = () => {
  const imageSize = "w-[50px] md:w-[100px] lg:w-[120px] xl:w-[172px]";

  return (
    <div className="w-full mt-[20px] md:mt-[85px] flex justify-between items-center">
      <Image
        src={Kcc}
        alt="방송통신위원회 로고"
        width={172}
        className={imageSize}
      />
      <Image
        src={Bizplay}
        alt="bizplay 로고"
        width={172}
        className={imageSize}
      />
      <Image src={Amazon} alt="AWS 로고" width={172} className={imageSize} />
      <Image src={TheIMC} alt="TheIMC 로고" width={172} className={imageSize} />
      <Image
        src={Intellius}
        alt="Intellius 로고"
        width={172}
        className={imageSize}
      />
      <Image
        src={FluentT}
        alt="FluentT 로고"
        width={172}
        className={imageSize}
      />
    </div>
  );
};

export default Logos;
