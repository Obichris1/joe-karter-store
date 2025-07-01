// app/search/page.tsx or .jsx
import { Suspense } from 'react';
import SearchPage from '../components/SearchPage';
import { CircularProgress } from '@mui/material';

export default function page() {
  return (
    <Suspense fallback={<div className="text-center py-20">   <CircularProgress size={20} sx={{ color: "#000", fontSize:"2px" }} /> </div>}>
      <SearchPage />
    </Suspense>
  );
}
