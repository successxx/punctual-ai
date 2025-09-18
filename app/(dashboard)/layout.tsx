'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Home,
  Settings,
  LogOut,
  Copy,
  CheckCircle
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
    toast.success('Logged out successfully')
  }

  const copyBookingLink = () => {
    if (user?.username) {
      const link = `${window.location.origin}/${user.username}`
      navigator.clipboard.writeText(link)
      setCopied(true)
      toast.success('Booking link copied!')
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Availability', href: '/dashboard/availability', icon: Clock },
    { name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-light text-gray-900">punctual.ai</h1>
          </div>

          {/* User info and booking link */}
          <div className="px-6 pb-4 border-b border-gray-200">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">Your booking page:</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-blue-600 font-medium truncate flex-1">
                    punctual.ai/{user.username}
                  </p>
                  <button
                    onClick={copyBookingLink}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    ${isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors w-full"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-8 px-8">
          {children}
        </main>
      </div>
    </div>
  )
}