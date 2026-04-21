import { redirect } from "next/navigation";

export default async function LocaleCatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; rest: string[] }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
