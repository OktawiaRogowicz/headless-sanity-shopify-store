import type { Metadata } from "next";
import Head from "next/head";

import PageBuilderPage from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";
import { GetPageQueryResult } from "@/sanity.types";
import { notFound } from "next/navigation";
import DefaultLayout from "@/src/layouts/default";
import PageBuilder from "@/components/PageBuilder";
import { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: {
      ...params,
      slug: `/${params.slug}`,
    },
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({
      query: getPageQuery,
      params: {
        ...params,
        slug: `/${params.slug}`,
      },
    }),
  ]);

  if (!page?._id) {
    return notFound();
  }

  return (
    <DefaultLayout
      locale={params.locale}
      translations={page?.translations}
      title={page?.heading}
    >
      <PageBuilder page={page} />
    </DefaultLayout>
  );
}
