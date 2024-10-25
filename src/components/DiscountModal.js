import { useState, useEffect } from "react";
import { Typography, Button, Modal, Box, Grid } from "@mui/material";
import {
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
  differenceInSeconds,
  isValid,
  format,
} from "date-fns";

export default function DiscountModal({ discount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const postDate = new Date(discount.date);
      if (!isValid(postDate)) {
        setTimeLeft("Invalid date");
        return;
      }

      const expiryDate = new Date(postDate);
      expiryDate.setDate(
        expiryDate.getDate() + discount.discount_details.duration
      );
      const now = new Date();

      if (now > expiryDate) {
        setTimeLeft("Expired");
      } else {
        const diffInSeconds = differenceInSeconds(expiryDate, now);

        if (diffInSeconds < 60) {
          setTimeLeft(`${diffInSeconds} seconds`);
        } else if (diffInSeconds < 3600) {
          setTimeLeft(`${differenceInMinutes(expiryDate, now)} minutes`);
        } else if (diffInSeconds < 86400) {
          setTimeLeft(`${differenceInHours(expiryDate, now)} hours`);
        } else {
          setTimeLeft(`${differenceInDays(expiryDate, now)} days`);
        }
      }
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(intervalId);
  }, [discount]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsCopied(false);
    setIsModalOpen(false);
  };

  const claimDiscount = () => {
    window.open(discount.discount_details.website_domain, "_blank");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(discount.discount_details.discount_code);
    setIsCopied(true);
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
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            color: timeLeft === "Expired" ? "red" : "textSecondary",
          }}
        >
          {timeLeft === "Expired" ? "Code Expired" : `Valid for ${timeLeft}`}
        </Typography>

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
          disabled={timeLeft === "Expired"}
        >
          Show Code
        </Button>
      </Box>

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
            {discount.discount_details.discount_percentage}% discount from{" "}
            {discount.discount_details.firm_name}
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
                fullWidth
                onClick={claimDiscount}
                sx={{
                  backgroundColor: "#02353C",
                  color: "#fff",
                  ":hover": {
                    backgroundColor: "#022d35",
                  },
                }}
                disabled={timeLeft === "Expired"}
              >
                Claim Your Discount
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={copyCode}
                sx={{
                  borderColor: "#02353C",
                  color: "#02353C",
                  ":hover": {
                    borderColor: "#022d35",
                    color: "#022d35",
                  },
                }}
              >
                {isCopied ? "Code Copied!" : "Copy Code"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={closeModal}
                sx={{
                  borderColor: "#02353C",
                  color: "#02353C",
                  ":hover": {
                    borderColor: "#022d35",
                    color: "#022d35",
                  },
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
