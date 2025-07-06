import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center bg-[#DAEAF8] py-16'> {/* Added background color and padding */}
            <div className='flex flex-col gap-5 my-10 container mx-auto px-4'> {/* Added container for better spacing */}
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>"आफ्नो भविष्य आफैंले चयन गर्नुहोस्, Carrerway मार्फत!"</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className='text-lg'>"Your Dream Job is Just a Swipe Away!"</p>
                <div className='flex w-full max-w-2xl shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white'> {/* Made search bar responsive */}
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-3'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] hover:bg-[#5D30B0] h-full px-6">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection












