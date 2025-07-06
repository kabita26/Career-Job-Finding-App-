// src/components/Browse.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Navbar from './shared/Navbar';
import Job from './Job';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';          // ⬅️ icon for the search button
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();                              // fetch all jobs once when the component mounts

  const dispatch  = useDispatch();
  const navigate   = useNavigate();
  const { allJobs } = useSelector((state) => state.job);

  const [query, setQuery] = useState('');

  /* -------- handlers -------- */
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query.trim()));
    // stay on /browse but makes this future‑proof if you use a different route
    navigate('/browse');
  };

  /* -------- lifecycle -------- */
  useEffect(() => {
    // reset the search term when the component unmounts
    return () => dispatch(setSearchedQuery(''));
  }, [dispatch]);

  /* -------- render -------- */
  return (
    <div>
      <Navbar />

      {/* Search bar */}
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex w-full max-w-2xl shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white">
          <input
            type="text"
            placeholder="Find your dream job"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
            className="outline-none border-none w-full py-3 bg-transparent"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2] hover:bg-[#5D30B0] h-full px-6"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
