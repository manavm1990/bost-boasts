type SharePayload = {
  url: string;
  title: string;
  text?: string;
};

function encodeShareParams(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params))
    if (value) search.set(key, value);

  return search.toString();
}

export const emailShareUrl = ({ url, title, text }: SharePayload) =>
  `mailto:?${encodeShareParams({
    subject: title,
    body: `${shareText({ title, text })}\n\n${url}`,
  })}`;

export const facebookShareUrl = ({ url }: Pick<SharePayload, "url">) =>
  `https://www.facebook.com/sharer/sharer.php?${encodeShareParams({ u: url })}`;

export const linkedInShareUrl = ({ url }: Pick<SharePayload, "url">) =>
  `https://www.linkedin.com/sharing/share-offsite/?${encodeShareParams({ url })}`;

/** Prefer a short description, then fall back to the title for share text. */
export const shareText = ({
  title,
  text,
}: Pick<SharePayload, "title" | "text">) =>
  text?.replace(/\s+/g, " ").trim() || title;

export const xShareUrl = ({ url, title, text }: SharePayload) =>
  `https://x.com/intent/tweet?${encodeShareParams({
    url,
    text: shareText({ title, text }),
  })}`;
