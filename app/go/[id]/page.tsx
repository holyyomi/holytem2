"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { withUTM } from "@/lib/utm";

// 임시 목데이터(나중에 DB로 대체)
const PRODUCTS: Record<string, { title: string; category: string; partner_url: string }> = {
  "1": { title: "예시 상품", category: "season", partner_url: "https://shopping.naver.com/" },
};

export default function GoPage({ params }: { params: { id: string } }) {
  const p = PRODUCTS[params.id];
  const target = useMemo(
    () => (p ? withUTM(p.partner_url, p.category) : "https://shopping.naver.com/"),
    [p]
  );
  const [sec, setSec] = useState(3);

  useEffect(() => {
    const t = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (sec === 0) location.replace(target);
  }, [sec, target]);

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-xl font-semibold">파트너 페이지로 이동합니다…</h1>
      <p className="mt-2 text-gray-600">보안상의 이유로 잠시 후 자동 이동됩니다. ({sec})</p>
      <Link href={target} className="mt-6 underline underline-offset-4">즉시 이동</Link>
      <p className="mt-8 text-[11px] text-gray-500">
        일부 콘텐츠에는 제휴 링크가 포함될 수 있으며, 구매 시 일정 수수료를 받을 수 있습니다.
        본 사이트는 판매자가 아니며, 구매·환불·품질 책임은 판매자에게 있습니다.
      </p>
    </main>
  );
}
