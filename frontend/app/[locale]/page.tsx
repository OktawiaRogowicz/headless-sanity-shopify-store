import {getPageQuery, settingsQuery} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import PageBuilder from "@/components/PageBuilder";
import Head from "next/head";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page(props: Props) {
  const params = await props.params;

  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: { ...params, slug: "/" },
  });

  console.log("page: ", page);

  return (
      <>
        <Head>{page?.heading && <title>{page.heading}</title>}</Head>
        <PageBuilder page={page}/>
      </>
  );
}
