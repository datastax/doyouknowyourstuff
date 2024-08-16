export const processUrl = (url: string) => {
  // Parse the URL
  const parsedUrl = new URL(url);

  // Combine hostname and pathname, remove 'www.' if present
  let parts = parsedUrl.hostname.replace("www.", "") + parsedUrl.pathname;

  // Remove trailing slash if present
  parts = parts.replace(/\/$/, "");

  // Convert to lowercase
  let slug = parts.toLowerCase();

  // Replace non-alphanumeric characters with underscores
  slug = slug.replace(/[^a-z0-9]/g, "_");

  // Replace multiple consecutive underscores with a single one
  slug = slug.replace(/_+/g, "_");

  // Remove leading and trailing underscores
  slug = slug.replace(/^_+|_+$/g, "");

  // Clamp the slug to 48 characters
  slug = slug.substring(0, 48);

  return slug;
};
