import { NextResponse } from "next/server";

const BASIC_REALM = 'Basic realm="HolyTem Admin"';

export function middleware(req: Request) {
  const url = new URL(req.url);
  // /admin 보호만 적용
  if (!url.pathname.startsWith("/admin")) return NextResponse.next();

  // IP 화이트리스트
  const allowed = (process.env.ADMIN_ALLOWED_IPS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  // Vercel 프록시 뒤의 실제 IP
  const fwd = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  const ip = fwd || req.headers.get("x-real-ip") || "";

  if (allowed.length && !allowed.includes(ip)) {
    return new NextResponse("Forbidden (IP not allowed)", {
      status: 403,
      headers: { "X-Robots-Tag": "noindex" },
    });
  }

  // Basic Auth
  const auth = req.headers.get("authorization") || "";
  const [type, cred] = auth.split(" ");
  if (type !== "Basic" || !cred) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": BASIC_REALM, "X-Robots-Tag": "noindex" },
    });
  }
  const [user, pass] = Buffer.from(cred, "base64").toString().split(":");
  if (
    user !== process.env.ADMIN_USER ||
    pass !== process.env.ADMIN_PASS
  ) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": BASIC_REALM, "X-Robots-Tag": "noindex" },
    });
  }

  // /admin 은 크롤링 금지
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
