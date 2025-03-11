"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useGraphContext } from "@/store/GraphContext";

type CompanyProfileFormProps = {
  handleNode: (
    mode: "new" | "reset",
    company?: string,
    executive?: string,
    email?: string
  ) => void;
};

const CompanyProfileForm = ({ handleNode }: CompanyProfileFormProps) => {
  // form 열린 상태
  const { isFormOpen, setIsFormOpen, isSubmitted, setIsSubmitted } =
    useGraphContext((store) => store);

  // // form 제출 상태
  // const [submitted, setSubitted] = useState(!!newNode);

  // 파일 업로드 관련
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  // 업로드된 파일 관련
  const fileRef = useRef<File | null>(null);
  // 회사명, 대표자, 대표 이메일
  const companyRef = useRef<HTMLInputElement>(null);
  const executiveRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const placeholder = "회사소개서 pdf";

  // 파일 업로드 클릭 시
  const handleFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  // 파일 업로드/변경 시
  const handleFileChange = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      // 파일이 업로드/변경되었을 때 파일 및 파일 이름 변경
      if (fileInputRef.current.files.length > 0) {
        setFileName(fileInputRef.current.files[0].name);
        fileRef.current = fileInputRef.current.files[0];
      }
      // 취소 눌렀을 때 기존 파일 유지
    }
  };

  // 파일 삭제 시
  const handleFileDelete = () => {
    setFileName("");
    fileRef.current = null;
  };

  //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !isSubmitted &&
      companyRef.current &&
      companyRef.current.value.trim() &&
      executiveRef.current &&
      executiveRef.current.value.trim() &&
      emailRef.current &&
      emailRef.current.value.trim() &&
      fileRef.current
    ) {
      handleNode(
        "new",
        companyRef.current.value.trim(),
        executiveRef.current.value.trim(),
        emailRef.current.value.trim()
      );
      setIsSubmitted(true);
      return;
    }
    if (!isSubmitted) alert("회사명, 이메일과 파일을 모두 입력해주세요.");
    if (isSubmitted) alert("이미 제출되었습니다. 새로고침해주세요.");
  };

  const handleUndo = () => {
    if (companyRef.current) companyRef.current.value = "";
    if (executiveRef.current) executiveRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (fileRef.current) fileRef.current = null;
    setIsFormOpen(false);
    handleFileDelete();
  };

  const handleReset = () =>
    // e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
    {
      handleFileDelete();
      setIsSubmitted(false);
      handleNode("reset");
      if (companyRef.current) companyRef.current.value = "";
      if (executiveRef.current) executiveRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (fileRef.current) fileRef.current = null;
    };

  const handleOpenFormClick = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="w-full h-fit flex items-end absolute bottom-0 right-0 left-0 font-pretendard transparent_to_black_to_b">
      <div className="w-full xl:max-w-desktop-width mx-auto">
        {!isFormOpen && (
          <Button
            className="rounded-full font-medium mt-5 mb-[30px] ml-5 px-5 h-8 text-[14px] md:h-10 md:text-[16px] lg:px-[30px] xl:ml-0"
            onClick={() => handleOpenFormClick()}
          >
            회사 정보 제출하기
          </Button>
        )}
        {isFormOpen && !isSubmitted && (
          <form
            onSubmit={handleSubmit}
            className="w-full px-5 pt-5 pb-[30px] flex gap-2 items-end lg:px-[30px] xl:px-0"
          >
            <div className="w-[80%] lg:max-w-[300px] flex flex-col gap-2">
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => handleUndo()}
                className="w-8 h-3 aspect-square p-0"
              >
                <ArrowLeft color="white" />
              </Button>
              <Input
                type="text"
                placeholder="회사명"
                ref={companyRef}
                className="bg-white rounded-sm h-8 text-[14px] md:rounded-md md:h-10 md:text-[16px]"
              />
              <Input
                type="text"
                placeholder="대표자"
                ref={executiveRef}
                className="bg-white rounded-sm h-8 text-[14px] md:rounded-md md:h-10 md:text-[16px]"
              />
              <Input
                type="email"
                placeholder="대표 이메일"
                ref={emailRef}
                className="bg-white rounded-sm h-8 text-[14px] md:rounded-md md:h-10 md:text-[16px]"
              />
              <div className="w-full flex items-center bg-white border border-primary rounded-sm h-8 text-[14px] md:rounded-md md:h-10 md:text-[16px]">
                <Button
                  onClick={() => handleFileUpload()}
                  type="button"
                  variant="ghost"
                  className="flex-grow px-3 overflow-hidden"
                >
                  <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    onChange={() => handleFileChange()}
                    className="hidden"
                  />
                  {/* {fileName || placeholder} */}
                  <div className="w-full min-w-0 flex text-left overflow-hidden">
                    <p
                      className={cn(
                        "truncate font-light text-[14px] md:text-[16px]",
                        {
                          "text-muted-foreground": !fileName,
                        }
                      )}
                    >
                      {fileName || placeholder}
                    </p>
                  </div>
                </Button>
                <button
                  type="button"
                  onClick={() => handleFileDelete()}
                  className="px-2"
                >
                  <X color="gray" className="w-[14px] md:w-[16px]" />
                </button>
              </div>
            </div>
            <Button
              variant={"default"}
              className="w-fit aspect-square p-2 rounded-full h-8 text-[14px] md:h-10 md:text-[16px]"
            >
              <Plus className="w-[14px] md:w-[16px]" />
            </Button>
          </form>
        )}
        {isFormOpen && isSubmitted && (
          <div className="flex flex-col items-start gap-2 px-5 pt-5 pb-[30px] lg:px-[30px] xl:px-0">
            <Link href={"#"} onClick={() => alert("페이지 이동")}>
              <Button className="h-8 text-[14px] md:h-10 md:text-[16px]">
                결과 페이지로 이동
              </Button>
            </Link>
            <Button
              variant={"ghost"}
              className="h-fit p-0 font-medium text-[12px] text-primary underline hover:text-white"
              onClick={() => handleReset()}
            >
              다시 재출하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfileForm;
