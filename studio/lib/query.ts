import { groq } from "next-sanity";
import client from "./client";

export const sanityFetch =  ({query, params}: {query: string, params?: Record<string, string>}) => {
  return client.fetch(query, params);
}

export const getAllPagesSlugQuery = groq`*[_type == "page" && defined(slug.current)] {
  "slug": slug.current
}`;

//dynamic pages
export const getPagesSlugQuery = groq`*[_type == "page" && isDynamicRoute == true && defined(slug.current)] {
  "slug": slug.current
}`;
export const getPageBySlugQuery = groq`*[_type == "page" && isDynamicRoute == true && slug.current == $slug][0]`;


//hardcoded pages
export const getStaticPagesSlugQuery = groq`*[_type == "page" && isDynamicRoute == false && defined(slug.current)] {
  "slug": slug.current
}`;
export const getStaticPageBySlugQuery = groq`*[_type == "page" && isDynamicRoute == false && slug.current == $slug][0]`;
