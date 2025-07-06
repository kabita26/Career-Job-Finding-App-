import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='bg-[#DAEAF8] py-16'> {/* Added background color and padding */}
            <div className='max-w-7xl mx-auto px-4'> {/* Added horizontal padding */}
                <h1 className='text-4xl font-bold mb-10 text-center'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'> {/* Responsive grid */}
                    {
                        allJobs.length <= 0 ? 
                        <div className='col-span-3 text-center py-10'>
                            <span className='text-lg text-gray-600'>No job openings available at the moment</span>
                        </div> : 
                        allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default LatestJobs