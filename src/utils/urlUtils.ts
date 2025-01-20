export const isUrlValid = (url: string) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlPattern.test(url);
};

export const extractPathOrDomain = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;

    if (path && path !== "/") {
      const segments = path.split("/").filter((segment) => segment.length > 0);
      return segments.pop();
    } else {
      const mainDomain = parsedUrl.hostname.split(".").slice(0, -1).join("-");
      return mainDomain;
    }
  } catch (error: unknown) {
    console.error("Invalid URL:", error.message);
    return null;
  }
};
