"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { X } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  // form 제출 상태
  const [submitted, setSubitted] = useState(false);

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
      companyRef.current &&
      companyRef.current.value &&
      executiveRef.current &&
      executiveRef.current.value &&
      emailRef.current &&
      emailRef.current.value &&
      fileRef.current
    ) {
      handleNode(
        "new",
        companyRef.current.value.trim(),
        executiveRef.current.value.trim(),
        emailRef.current.value.trim()
      );
      setSubitted(true);
      return;
    }
    alert("회사명, 이메일과 파일을 모두 입력해주세요.");
  };

  const onResetClick = () =>
    // e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
    {
      handleFileDelete();
      setSubitted(false);
      handleNode("reset");
      if (companyRef.current) companyRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
    };

  const handleButtonClick = () => {
    setOpen(true);
  };

  return (
    <div className="w-full h-fit flex items-end absolute bottom-0 right-0 left-0 transparent_to_black_to_b">
      <>
        {!open && (
          <div className="w-full xl:max-w-desktop-width mx-auto pt-5 pb-[30px] gap-2 px-5 xl:px-0">
            <Button
              onClick={() => handleButtonClick()}
              className="rounded-full"
            >
              회사 정보 제출하기
            </Button>
          </div>
        )}
        {open && !submitted && (
          <div className="w-full xl:max-w-desktop-width mx-auto h-fit flex items-start">
            <form
              onSubmit={handleSubmit}
              // className="w-full xl:max-w-desktop-width mx-auto pt-5 pb-[30px] gap-2 grid grid-cols-[4fr_1fr] grid-rows-[1fr_1fr_1fr_1fr] px-5 md:grid-cols-[3fr_2fr] lg:flex xl:px-0"
              className="w-full md:max-w-[400px] pt-5 pb-[30px] gap-2 grid grid-cols-[4fr_1fr] grid-rows-[1fr_1fr_1fr_1fr] px-5 xl:px-0"
            >
              <Input
                type="text"
                placeholder="회사명"
                ref={companyRef}
                className="w-full bg-white font-medium col-start-1 col-end-2 row-start-1 row-end-2 h-8 text-[14px] md:h-10 md:text-[16px]"
              />
              <Input
                type="text"
                placeholder="대표자"
                ref={executiveRef}
                className="w-full bg-white font-medium col-start-1 col-end-2 row-start-2 row-end-3 h-8 text-[14px] md:h-10 md:text-[16px]"
              />
              <Input
                type="email"
                placeholder="대표 이메일"
                ref={emailRef}
                className="w-full bg-white font-medium col-start-1 col-end-2 row-start-3 row-end-4 h-8 text-[14px] md:h-10 md:text-[16px]"
              />
              <div className="w-full flex justify-between align-center bg-white border border-primary rounded-sm bg-transparent row-start-4 row-end-5 h-8 text-[14px] md:h-10 md:flex md:text-[16px]">
                <Button
                  onClick={() => handleFileUpload()}
                  type="button"
                  variant="ghost"
                  className="max-w-full h-full pl-3 py-1 font-medium text-left overflow-hidden"
                >
                  <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    onChange={() => handleFileChange()}
                    className="hidden"
                  />
                  <p
                    className={cn(
                      "w-full max-w-full min-w-0 truncate text-[14px] md:text-[16px]",
                      {
                        "text-muted-foreground": !fileName,
                      }
                    )}
                  >
                    {fileName || placeholder}
                  </p>
                </Button>
                <button
                  type="button"
                  onClick={() => handleFileDelete()}
                  className="px-2"
                >
                  <X color="gray" />
                </button>
              </div>
              <Button
                variant={"default"}
                className="w-full h-full col-start-2 col-end-3 row-start-4 row-end-5 font-medium h-8 text-[14px] p-0 md:h-10 md:px-3 md:text-[16px]"
              >
                추가하기
              </Button>
            </form>
          </div>
        )}
        {open && submitted && (
          <div className="flex flex-col items-start gap-2 absolute bottom-[10%] left-[30px]">
            <Link href={"#"} onClick={() => alert("페이지 이동")}>
              <Button>결과 페이지로 이동</Button>
            </Link>
            <Button
              variant={"ghost"}
              className="h-fit p-0 font-medium text-[12px] text-primary underline hover:unset"
              onClick={onResetClick}
            >
              다시 재출하기
            </Button>
          </div>
        )}
      </>
    </div>
  );
};

export default CompanyProfileForm;
