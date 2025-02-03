import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';

const OfferCard = ({ offerDetails }) => {
  const { name, profession, price, schedule, estimatedHours, description } = offerDetails;

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profession}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
          Price: ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Schedule: {schedule}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Estimated Hours: {estimatedHours}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          Accept Offer
        </Button>
        <Button size="small" variant="outlined">
          Reject Offer
        </Button>
      </CardActions>
    </Card>
  );
};

export default OfferCard;
