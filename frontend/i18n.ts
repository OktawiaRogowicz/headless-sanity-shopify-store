import { routing } from "@/i18n/routing";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "pl")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // eslint-disable-next-line
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
