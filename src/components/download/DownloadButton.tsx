// src/components/download/DownloadButton.tsx
// CloudFlare R2의 파일을 안전하게 다운로드하는 클라이언트 컴포넌트입니다.
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  fileUrl: string;
  fileName: string; // 확장자 없는 기본 파일명 (예: 리소스 제목)
  buttonText?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

/**
 * CloudFlare R2 파일을 브라우저에서 올바르게 다운로드하는 버튼 컴포넌트
 * Content-Disposition 헤더 문제를 우회하여 파일을 올바르게 다운로드합니다.
 */
export default function DownloadButton({
  fileUrl,
  fileName, // resource.title 값이 전달됨 (확장자 없음)
  buttonText = "Download",
  variant = "default",
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);

      // 파일 가져오기
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error(`다운로드 실패: ${response.status}`);
      }

      // Blob으로 변환
      const blob = await response.blob();

      // 다운로드 링크 생성
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      // URL 객체를 사용하여 쿼리 문자열 제거 및 경로에서 파일명 추출
      const url = new URL(fileUrl);
      const pathname = url.pathname; // 예: /media/2025/03/31-123456.pdf
      const parts = pathname.split("/");
      const actualFileNameFromUrl = parts[parts.length - 1]; // 예: 31-123456.pdf

      // URL 경로에서 실제 파일 확장자 추출 (점(.)이 없는 경우 빈 문자열)
      const fileExtension = actualFileNameFromUrl.includes(".")
        ? actualFileNameFromUrl.substring(
            actualFileNameFromUrl.lastIndexOf(".")
          ) // 예: .pdf
        : "";

      // 최종 다운로드 파일명 설정: prop으로 받은 fileName(제목) + 추출된 확장자
      const finalFileName = `${fileName}${fileExtension}`; // 예: "리소스 제목.pdf"
      link.download = finalFileName;

      // 다운로드 시작
      document.body.appendChild(link);
      link.click();

      // 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
      // 사용자에게 오류 알림 (예: toast 메시지)
      alert("파일 다운로드 중 오류가 발생했습니다.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isDownloading} variant={variant}>
      {isDownloading ? "다운로드 중..." : buttonText}
    </Button>
  );
}
