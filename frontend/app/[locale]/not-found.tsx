import DefaultLayout from "@/src/layouts/default";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/routing";

export default function NotFound() {
  const locale = getLocale() as unknown as Locale;

  return (
    <DefaultLayout locale={locale} title={"404"}>
      <div className="container">
        <h1 className="text-h1">404</h1>
        <p className="text-M-regular">Error</p>
      </div>
    </DefaultLayout>
  );
}
