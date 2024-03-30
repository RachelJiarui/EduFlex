export default function getId (youTubeLink) {
    const match = youTubeLink.match(/v=([^&]+)/);
    const videoId = match ? match[1] : null;
    return videoId
}