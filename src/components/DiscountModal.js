import { useState } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Modal, Box, Grid } from "@mui/material";

export default function DiscountModal({ discount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  // Fallback in case the page is not pre-rendered
  if (router.isFallback) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsCopied(false); // Reset copied state when modal closes
    setIsModalOpen(false);
  };

  const claimDiscount = () => {
    window.open(discount.discount_details.website_domain, "_blank"); // Opens the firm's website in a new tab
  };

  const copyCode = () => {
    navigator.clipboard.writeText(discount.discount_details.discount_code);
    setIsCopied(true); // Set copied state to true
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
          Valid for {discount.discount_details.duration} days
        </Typography>

        {/* Styled "Show Code" Button */}
        <Button
          variant="contained"
          onClick={openModal}
          sx={{
            position: "relative",
            padding: "15px 40px",
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#fff",
            backgroundColor: "#02353C",
            borderRadius: 0,
            overflow: "hidden",
            width: { xs: "100%", sm: "auto" },
            maxWidth: "300px",
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              borderWidth: "0 35px 35px 0",
              borderStyle: "solid",
              borderColor: "transparent #fff transparent transparent",
            },
            ":hover": {
              backgroundColor: "#584bcb",
            },
          }}
        >
          Show Code
        </Button>
      </Box>

      {/* Modal for showing the discount code */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 300, sm: 400 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Discount Code
          </Typography>
          <Typography
            id="modal-description"
            variant="h4"
            component="p"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
          >
            {discount.discount_details.discount_code}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={claimDiscount}
              >
                Claim Your Discount
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={copyCode}>
                {isCopied ? "Code Copied!" : "Copy Code"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={closeModal}>
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
