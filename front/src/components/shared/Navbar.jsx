import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import logo from "../../assets/logo.png"

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${USER_API_END_POINT}/logout`,
        { withCredentials: true }
      )
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Logout failed")
    }
  }

  // Utility classes for links
  const linkClass =
    "text-lg font-medium hover:text-[#6A38C2] transition-colors duration-200"

  return (
    <div className="bg-[#FFFFFF] shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Job Portal Logo" className="h-10" />
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies" className={linkClass}>
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className={linkClass}>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className={linkClass}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className={linkClass}>
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className={linkClass}>
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="px-4 py-2 active:scale-95 transition-transform duration-150 hover:border-[#6A38C2] hover:text-[#6A38C2]"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  className="bg-[#6A38C2] text-white px-4 py-2 rounded-lg active:scale-95 transition-transform duration-150 hover:bg-[#D6C8FF]"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer hover:scale-105 hover:shadow-md transition-transform duration-300">
                  <AvatarImage
                    src={user.profile?.profilePhoto}
                    alt={user.fullname}
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="hover:scale-105 transition-transform duration-300">
                      <AvatarImage
                        src={user.profile?.profilePhoto}
                        alt={user.fullname}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-lg">
                        {user.fullname}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {user.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col divide-y divide-gray-200">
                    {user.role === 'student' && (
                      <Button
                        variant="link"
                        className="flex items-center gap-2 px-0 hover:text-[#6A38C2] active:scale-95 transition duration-150"
                      >
                        <User2 size={18} />
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    )}

                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="flex items-center gap-2 px-0 pt-2 hover:text-red-600 active:scale-95 transition duration-150"
                    >
                      <LogOut size={18} />
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
