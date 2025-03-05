
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard, { EventData } from '@/components/EventCard';
import PixelButton from '@/components/PixelButton';
import { Filter } from 'lucide-react';
import CircularGallery from "@/components/CircularGallery";

const categories = [
  "All",
  "Technical",
  "Cultural",
  "Gaming",
  "Workshop",
  "Creative"
];

const EventsPage = () => {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} items={undefined} />
    </div>
  );
};

export default EventsPage;
