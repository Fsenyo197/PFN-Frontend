import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import React, { useEffect, useState } from 'react';
import { useFirmsContext } from '@/contexts/FirmsProvider';
import Footer from '../Footer';
import Header from '@/components/Header';
import { Box, Typography, Link } from '@mui/material';
import AccountPlans from '@/components/firms/AccountPlans';

export default function FirmDetails() {
  const { getFirmBySlug, loading } = useFirmsContext();
  const { slug } = useRouter().query;
  const [firm, setFirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchFirm = async () => {
        setIsLoading(true);
        try {
          const foundFirm = await getFirmBySlug(slug);
          setFirm(foundFirm);
        } catch (error) {
          console.error('Error fetching firm details:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchFirm();
    }
  }, [slug, getFirmBySlug]);

  if (isLoading || loading) {
    return <Spinner />;
  }

  // Group prohibited countries by the first letter
  const groupedCountries = firm?.countries_prohibited?.reduce(
    (acc, country) => {
      const firstLetter = country[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(country);
      return acc;
    },
    {}
  );

  return (
    <Box>
      <Header />
      <Box sx={{ padding: 3 }}>
        {firm ? (
          <>
            <Box
              sx={{
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: 4,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                {firm.name}
              </Typography>

              <Typography variant="body1" gutterBottom>
                {firm.about}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  marginTop: 3,
                }}
              >
                <Typography>Firm Type: {firm.firm_type}</Typography>
                <Typography>Drawdown Type: {firm.drawdown_type}</Typography>
                <Typography>Location: {firm.location}</Typography>
                <Typography>
                  Year Established: {firm.year_established}
                </Typography>
                <Typography variant="body1">
                  Website:{' '}
                  <Link href={firm.website} target="_blank" rel="noopener">
                    {firm.website}
                  </Link>
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ marginTop: 4 }}>
              <strong>Trading Platforms</strong>
            </Typography>
            <Typography variant="body2">
              {firm.trading_platforms.join(', ')}
            </Typography>

            <Typography sx={{ marginTop: 4 }}>
              <strong>Payout Options</strong>
            </Typography>
            <Typography variant="body2">
              {firm.payout_options.join(', ')}
            </Typography>

            <Typography sx={{ marginTop: 4 }}>
              <strong>Payment Options</strong>
            </Typography>
            <Typography variant="body2">
              {firm.payment_options.join(', ')}
            </Typography>

            <Typography sx={{ marginTop: 4 }}>
              <strong>Prohibited/Restricted Countries</strong>
            </Typography>
            {groupedCountries &&
              Object.keys(groupedCountries)
                .sort()
                .map((letter) => (
                  <div key={letter}>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                      {letter}
                    </Typography>
                    <Typography variant="body2">
                      {groupedCountries[letter].join(', ')}
                    </Typography>
                  </div>
                ))}

            <AccountPlans accountPlans={firm.account_plans} />
          </>
        ) : (
          <Typography variant="h6" component="p" sx={{ marginTop: 4 }}>
            No firm details available.
          </Typography>
        )}
      </Box>
      <Footer />
    </Box>
  );
}

FirmDetails.useFirmsProvider = true;
