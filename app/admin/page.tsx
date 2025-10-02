export const dynamic = "force-dynamic";
export default function AdminPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold">HolyTem 관리자</h1>
      <p className="mt-3 text-sm text-gray-600">
        (IP 화이트리스트 + Basic Auth 통과 시 볼 수 있어요)
      </p>
    </main>
  );
}
