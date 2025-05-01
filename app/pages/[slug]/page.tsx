import { getPagesSlugQuery, getPageBySlugQuery, sanityFetch } from "@/lib/sanity/query";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const data = await sanityFetch({query: getPagesSlugQuery});
  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const page = await sanityFetch({query: getPageBySlugQuery, params: { slug }});
  return {
    title: `${page.title} | DH`,
    description: page.description,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const getPage = async () => {
    try {
      const { slug } = await props.params;
      const page = await sanityFetch({query: getPageBySlugQuery, params: { slug }});
      return page;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  const page = await getPage();
  if (!page) {
    return notFound();
  }
  return <div>{page.title}</div>;
}
