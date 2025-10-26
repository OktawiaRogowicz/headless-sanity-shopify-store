import { Locale } from "@/i18n/routing";
import { Translations } from "@/lib/types";
import { useTranslations } from "next-intl";

type FooterProps = {
  footer: any;
  locale: Locale;
  translations?: Translations;
};

export default function Footer({ footer, locale }: FooterProps) {
  const t = useTranslations("footer");

  return (
    <footer className="container py-24 flex flex-col gap-4">
      <p className="text-XS-light text-light-brown">
        {t("design-and-development")}
      </p>
    </footer>
  );
}
