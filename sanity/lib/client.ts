import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export default createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
});
