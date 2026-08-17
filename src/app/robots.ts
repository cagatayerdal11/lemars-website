import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// AI/LLM tarayıcıları AÇIKÇA izinlidir — LEMARS'ın AI yanıt motorlarında
// (ChatGPT, Perplexity, Gemini, Claude vb.) doğru şekilde görünmesi hedeflenir.
const AI_BOTS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "anthropic-ai",
  "Claude-User",
  "Claude-SearchBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Diğer / Others
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "CCBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
      { userAgent: AI_BOTS, allow: "/", disallow: ["/admin", "/api"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
