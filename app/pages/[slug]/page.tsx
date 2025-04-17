import { getPagesSlugQuery, getPageBySlugQuery, sanityFetch   } from "@/lib/sanity/sanity.query";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const data = await sanityFetch({query: getPagesSlugQuery});
  return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const page = await sanityFetch({query: getPageBySlugQuery, params: { slug }});
  return {
    title: `${page.title} | DH`,
    description: page.description,
  } satisfies Metadata;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const page = await sanityFetch({query: getPageBySlugQuery, params: { slug }});
  return <div>{page.title}</div>;
}
