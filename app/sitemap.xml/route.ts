export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const urls = ["/", "/t/season", "/t/parents", "/t/kids", "/t/pets", "/t/gadget"].map(
    (p) => `<url><loc>${base}${p}</loc></url>`
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}
