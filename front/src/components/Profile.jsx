import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { useNavigate } from 'react-router-dom'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const handleViewBookmarks = () => {
        navigate('/profile-bookmarks');
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className="flex items-center gap-3">
                        <Avatar className="hover:scale-105 transition-transform duration-300 h-24 w-24">
                            <AvatarImage
                                src={user?.profile?.profilePhoto || 'https://via.placeholder.com/96'}
                                alt={user?.fullname || 'Profile photo'}
                            />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-end gap-2'>
                        <Button onClick={() => setOpen(true)} variant="outline">
                            <Pen />
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full"
                            size="icon"
                            onClick={handleViewBookmarks}
                        >
                            <Bookmark />
                        </Button>
                    </div>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1 flex-wrap'>
                        {
                            (user?.profile?.skills?.length > 0)
                                ? user.profile.skills.map((item, index) => (
                                    <Badge key={index}>{item}</Badge>
                                ))
                                : <span>NA</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume && user?.profile?.resume
                            ? <a
                                target='_blank'
                                rel='noreferrer'
                                href={user.profile.resume}
                                className='text-blue-500 hover:underline cursor-pointer'
                            >
                                {user.profile.resumeOriginalName}
                            </a>
                            : <span>NA</span>
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
