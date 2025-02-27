"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type CompanyProfileFormProps = {
  handleNode: (name: string) => void;
};

const CompanyProfileForm = ({ handleNode }: CompanyProfileFormProps) => {
  // 파일 업로드 관련
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  // 업로드된 파일 관련
  const fileRef = useRef<File | null>(null);
  // 회사명
  const nameRef = useRef<HTMLInputElement>(null);

  const placeholder = "회사소개서 pdf를 업로드해주세요.";
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
    console.log(fileRef.current);
    console.log(nameRef.current);
    console.log(nameRef.current?.value);
    if (nameRef.current && nameRef.current.value && fileRef.current) {
      handleNode(nameRef.current.value);
      return;
    }
    alert("회사명과 파일을 입력해주세요.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input type="text" placeholder="회사명을 입력해주세요." ref={nameRef} />
      <div className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
        <Button
          onClick={() => handleFileUpload()}
          type="button"
          variant="ghost"
        >
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            onChange={() => handleFileChange()}
            className="hidden"
          />
          {fileName || placeholder}
        </Button>
        <button type="button" onClick={() => handleFileDelete()}>
          X
        </button>
      </div>
      <Button>추가하기</Button>
    </form>
  );
};

export default CompanyProfileForm;
