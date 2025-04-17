import { groq } from "next-sanity";
import client from "./sanity.client";

export const sanityFetch =  ({query, params}: {query: string, params?: any}) => {
  return client.fetch(query, params);
}

export const getPagesSlugQuery = groq`*[_type == "page" && defined(slug.current)] {
  "slug": slug.current
}`;

export const getPageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]`;


