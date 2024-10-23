import { useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Button,
  Modal,
  Box,
  Container,
  CardMedia,
  Grid,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/pages/Footer";

export default function DiscountPage({ discount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false); // State to track if code is copied
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
      <CssBaseline />
      <Head>
        <title>{discount.title}</title>
        <meta name="description" content={discount.meta_description} />
        <meta name="keywords" content={discount.meta_keywords} />
      </Head>
      <Header />
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {discount.title}
        </Typography>
        {/* Display Date Published */}
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Published on:{" "}
          {new Date(discount.date_published).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
        {/* Display Category */}
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Category: {article.category}
        </Typography>
        <CardMedia
          component="img"
          image={discount.image}
          alt={discount.title}
          sx={{ height: 300, objectFit: "cover", my: 2 }}
        />

        {/* Image Credit */}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 1, textAlign: "center" }}
        >
          Image credit: {discount.image_credit}
        </Typography>

        <Box sx={{ mt: 2, fontSize: "1.25rem", lineHeight: "1.8" }}>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: discount.body }}
          />
        </Box>

        {/* Centering the subtitle and button */}
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
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
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
                  color="#02353C"
                  fullWidth
                  onClick={claimDiscount}
                >
                  Claim Your Discount
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="#02353C"
                  variant="outlined"
                  fullWidth
                  onClick={copyCode}
                >
                  {isCopied ? "Code Copied!" : "Copy Code"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="#02353C"
                  variant="outlined"
                  fullWidth
                  onClick={closeModal}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container>
      <Footer />
    </>
  );
}
