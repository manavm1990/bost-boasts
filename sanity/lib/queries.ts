import { defineQuery } from "next-sanity";

const POSTS_PER_PAGE = 12;

export const ALL_POST_SLUGS =
  defineQuery(`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current
}`);

export const FIRST_POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`);

export const PAGINATED_POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...${POSTS_PER_PAGE}]{
  _id,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`);
