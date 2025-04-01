import { redirect } from "next/navigation";

export default async function RootLocalePage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;

  redirect(`/${locale}/home`);
}
