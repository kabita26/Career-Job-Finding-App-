import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const ProfileBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookmarkedJobs')) || []
    setBookmarks(stored)
  }, [])

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-6">Your Bookmarked Jobs</h1>

        {bookmarks.length === 0 ? (
          <p className="text-center text-gray-500">No bookmarked jobs yet.</p>
        ) : (
          bookmarks.map(job => (
            <div key={job._id} className="border rounded-md shadow-md p-5 mb-5 bg-white">
              <div className="flex items-center gap-4 mb-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={job.company?.logo || 'https://via.placeholder.com/64'} alt={job.company?.name || 'Company Logo'} />
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-gray-600">{job.company?.name}</p>
                  <p className="text-gray-500 text-sm">Location: Nepal</p>
                </div>
              </div>

              <p className="mb-4 text-gray-700">{job.description?.substring(0, 150)}{job.description && job.description.length > 150 ? '...' : ''}</p>

              <div className="flex gap-3 flex-wrap">
                <Badge variant="ghost" className="text-blue-700 font-bold">{job.position} Positions</Badge>
                <Badge variant="ghost" className="text-[#F83002] font-bold">{job.jobType}</Badge>
                <Badge variant="ghost" className="text-[#7209b7] font-bold">{job.salary} LPA</Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProfileBookmarks
