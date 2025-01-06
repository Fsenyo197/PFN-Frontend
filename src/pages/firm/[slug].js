import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import React, { useEffect, useState } from 'react';
import { useFirmsContext } from '@/contexts/FirmsProvider';
import Footer from '../Footer';
import Header from '@/components/Header';
import {
  Box,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import AccountPlans from '@/components/firms/AccountPlans';

export default function FirmDetails() {
  const { getFirmBySlug, loading } = useFirmsContext();
  const { slug } = useRouter().query;
  const [firm, setFirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rules configuration array with `isReversed` flag
  const rulesConfig = [
    {
      key: 'weekend_holding_rule',
      label: 'Can I hold trades during the weekend',
      isReversed: true,
    },
    {
      key: 'consistency_rule',
      label: 'Does the firm have a consistency rule',
      isReversed: false,
    },
    {
      key: 'copy_trading_rule',
      label: 'Is copying trades from personal accounts allowed',
      isReversed: true,
    },
    {
      key: 'two_percent_rule',
      label:
        'Does the firm have a maximum loss percentage rule (3%, 2%, or 1%) per trade',
      isReversed: false,
    },
    {
      key: 'stop_loss_rule',
      label: 'Is setting a stop-loss for trades mandatory',
      isReversed: false,
    },
    {
      key: 'vpn_and_vps_rule',
      label: 'Is using a VPN or VPS to trade allowed',
      isReversed: true,
    },
  ];

  useEffect(() => {
    if (slug) {
      const fetchFirm = async () => {
        setIsLoading(true);
        try {
          const foundFirm = await getFirmBySlug(slug);
          setFirm(foundFirm);
        } catch (error) {
          setError('Error fetching firm details');
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

  // Helper function to format rules based on the `isReversed` flag
  const formatRule = (value, isReversed) => {
    if (isReversed) {
      return value === true ? 'No' : value === false ? 'Yes' : 'Not Indicated';
    }
    return value === true ? 'Yes' : value === false ? 'No' : 'Not Indicated';
  };

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

            {/* Rules Section */}
            <Typography variant="h6" sx={{ marginTop: 4 }}>
              <strong>Trading Rules</strong>
            </Typography>
            <List sx={{ listStyleType: 'disc', pl: 2 }}>
              {rulesConfig.map((rule) => (
                <ListItem key={rule.key} sx={{ display: 'list-item', pl: 0 }}>
                  <Typography>
                    {rule.label}? {formatRule(firm[rule.key], rule.isReversed)}
                  </Typography>
                </ListItem>
              ))}
            </List>

            {/* Notable Uncovered Trading Rules Section */}
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Notable Uncovered Trading Rules
            </Typography>

            <List sx={{ listStyleType: 'disc', pl: 2 }}>
              <ListItem sx={{ display: 'list-item', pl: 0 }}>
                <ListItemText primary="News Trading: Most firms have similar policies on news trading. They generally prohibit opening or closing positions within a specified time window before and after scheduled news releases." />
              </ListItem>
              <ListItem sx={{ display: 'list-item', pl: 0 }}>
                <ListItemText primary="Expert Advisors (EAs): All listed firms allow the use of personal Expert Advisors (EAs) for automated trading. However, some firms may have restrictions or require prior approval for certain strategies." />
              </ListItem>
            </List>

            {/* Trading Platforms Section */}
            <Typography variant="h6" sx={{ marginTop: 4 }}>
              <strong>Trading Platforms</strong>
            </Typography>
            <Typography variant="body1">
              {firm.trading_platforms.join(', ')}
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 4 }}>
              <strong>Payout Options</strong>
            </Typography>
            <Typography variant="body1">
              {firm.payout_options.join(', ')}
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 4 }}>
              <strong>Payment Options</strong>
            </Typography>
            <Typography variant="body1">
              {firm.payment_options.join(', ')}
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 4 }}>
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
                    <Typography variant="body1">
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
