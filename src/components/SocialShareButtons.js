import { IconButton, Typography, Box } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const SocialShareButtons = ({ shareURL, title }) => {
  const shareData = {
    title,
    url: shareURL,
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error(err));
    }
  };

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "space-around" }}>
      <Box sx={{ textAlign: "center" }}>
        <IconButton
          color="primary"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareURL
          )}&text=${encodeURIComponent(title)}`}
          target="_blank"
          aria-label="Share on X"
        >
          <TwitterIcon />
        </IconButton>
        <Typography variant="caption">X</Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <IconButton
          color="primary"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareURL
          )}`}
          target="_blank"
          aria-label="Share on Facebook"
        >
          <FacebookIcon />
        </IconButton>
        <Typography variant="caption">Facebook</Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <IconButton
          color="primary"
          href={`https://t.me/share/url?url=${encodeURIComponent(
            shareURL
          )}&text=${encodeURIComponent(title)}`}
          target="_blank"
          aria-label="Share on Telegram"
        >
          <TelegramIcon />
        </IconButton>
        <Typography variant="caption">Telegram</Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <IconButton color="primary" onClick={handleShare} aria-label="Share">
          <ShareIcon />
        </IconButton>
        <Typography variant="caption">Share</Typography>
      </Box>
    </Box>
  );
};

export default SocialShareButtons;
