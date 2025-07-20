

import { getYouTubeEmbedUrl } from "../utils/getYoutubeEmbedUrl";


export const YoutubeEmbed = ({link} : {link: string}) => {
    const url = getYouTubeEmbedUrl(link) ?? undefined;
    return (

        <iframe 
            className = "w-full"
            src = {url}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen> 

            </iframe>
    )
} 