import React from 'react';
import { useParams } from 'react-router-dom';
import PublicRSVP from '../components/PublicRSVP';

const RSVPPage = () => {
  const { eventId } = useParams();
  
  return <PublicRSVP eventId={eventId} />;
};

export default RSVPPage;
