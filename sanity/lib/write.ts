import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-only client for writing documents (e.g. editorial submissions).
 * Only ever call this from a Server Action or Route Handler — the write
 * token must never reach the browser bundle.
 */
export default createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
