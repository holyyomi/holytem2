export function withUTM(u: string, category: string) {
  const url = new URL(u);
  url.searchParams.set("utm_source", "holytem");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", category);
  return url.toString();
}
