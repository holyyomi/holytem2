export function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "Disallow: /admin",
      "Sitemap: " + (process.env.NEXT_PUBLIC_SITE_URL || "") + "/sitemap.xml",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
}
