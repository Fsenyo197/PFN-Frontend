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

export default function DiscountPage({ discount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Fallback in case the page is not pre-rendered
  if (router.isFallback) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const claimDiscount = () => {
    window.open(discount.firmWebsite, "_blank"); // Opens the firm's website in a new tab
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {discount.title}
      </Typography>
      <CardMedia
        component="img"
        image={discount.image}
        alt={discount.title}
        sx={{ height: 300, objectFit: "cover", my: 2 }}
      />
      <Box sx={{ my: 2 }}>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: discount.body }}
        />
      </Box>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
        Valid for {discount.duration} days
      </Typography>
      <Button variant="contained" color="primary" onClick={openModal}>
        Show Code
      </Button>

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
            width: 400,
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
            {discount.discountCode}
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
              <Button variant="outlined" fullWidth onClick={closeModal}>
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
}
