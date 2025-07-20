
export const getYouTubeEmbedUrl = (link: string): string | null => {
  try {
    const url = new URL(link);

    if (url.hostname === "youtu.be") {
      const id = url.pathname.slice(1);
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.hostname.includes("youtube.com")) {
      const id = new URLSearchParams(url.search).get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (url.pathname.includes("/embed/")) {
      return link; 
    }

  } catch (err) {
    console.error("Invalid YouTube URL:", err);
    return null;
  }

  return null;
};
