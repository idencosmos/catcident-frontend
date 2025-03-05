import { CardHeader, CardTitle } from "@/components/ui/card";

interface VideoSectionProps {
  content: string; // HomeSection의 content 필드에서 가져온 언어별 데이터
}

export default function VideoSection({ content }: VideoSectionProps) {
  // content가 임베드 코드인지 확인 (iframe 또는 video 태그 포함 여부)
  const isEmbedCode = content.includes("<iframe") || content.includes("<video");
  const videoUrl = !isEmbedCode ? content : undefined;

  return (
    <>
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl">Video Section</CardTitle>
      </CardHeader>
      <div className="mt-4">
        {videoUrl ? (
          // content가 URL일 경우 <video> 태그로 렌더링
          <video src={videoUrl} controls className="w-full" />
        ) : (
          // content가 임베드 코드일 경우 HTML로 렌더링
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
    </>
  );
}
