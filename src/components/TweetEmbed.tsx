import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | null) => void;
      };
    };
  }
}

export const TweetEmbed = ({ link }: { link: string }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load(containerRef.current);
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [link]);

  const safeLink = link.replace("://x.com", "://twitter.com");

  return (
    <div ref={containerRef}>
      <blockquote className="twitter-tweet">
        <a href={safeLink}></a>
      </blockquote>
    </div>
  );
};
