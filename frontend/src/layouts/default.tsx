import { siteConfigurationQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Locale } from "@/i18n/routing";
import { Translations } from "@/lib/types";
import { ReactNode } from "react";

interface DefaultLayoutProps {
  locale: Locale;
  title?: string;
  translations?: Translations;
  children: ReactNode;
}

const DefaultLayout = async ({
  locale,
  title,
  translations,
  children,
}: DefaultLayoutProps) => {
  const { data: siteConfiguration } = await sanityFetch({
    query: siteConfigurationQuery,
    params: {
      locale,
    },
  });

  return (
    <>
      <Head>{title && <title>{title}</title>}</Head>
      <Header
        header={siteConfiguration.header}
        locale={locale}
        translations={translations}
      />
      <main>{children}</main>
      <Footer
        footer={siteConfiguration.footer}
        locale={locale}
        translations={translations}
      />
    </>
  );
};

export default DefaultLayout;
