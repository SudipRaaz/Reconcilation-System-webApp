'use client';
import { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Transition } from '@headlessui/react';
import Link from 'next/link';

const menuItems = [
  {
    title: 'Dashboard',
    subtitles: ['Overview', 'Analytics', 'Reports'],
  },
  {
    title: 'Rooms',
    subtitles: ['All Rooms', 'Add Room', 'Room Types'],
  },
  {
    title: 'Bookings',
    subtitles: ['All Bookings', 'Add Booking', 'Calendar'],
  },
  {
    title: 'Users',
    subtitles: ['All Users', 'Add User', 'User Roles'],
  },
  // Add more menu items as needed
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenus, setActiveMenus] = useState({});
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  // Handle screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 400px)');
    setIsMediumScreen(mediaQuery.matches);

    const handleResize = () => setIsMediumScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  // Toggle individual menu collapse
  const toggleMenu = (title) => {
    setActiveMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Render function for menu items
  const renderMenuItems = () =>
    menuItems.map((item) => (
      <div key={item.title} className="mt-2">
        <button
          onClick={() => toggleMenu(item.title)}
          className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        >
          <span className="text-white font-medium">{item.title}</span>
        </button>
        <Transition
          show={activeMenus[item.title]}
          enter="transition-all duration-300"
          enterFrom="max-h-0 opacity-0"
          enterTo="max-h-screen opacity-100"
          leave="transition-all duration-200"
          leaveFrom="max-h-screen opacity-100"
          leaveTo="max-h-0 opacity-0"
        >
          <div className="ml-4 mt-1">
            {item.subtitles.map((subtitle) => (
              <Link href={`/${subtitle.toLowerCase().replace(/\s+/g, '-')}`} key={subtitle}>
                <p className="block py-1 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                  {subtitle}
                </p>
              </Link>
            ))}
          </div>
        </Transition>
      </div>
    ));

  return (
    <>
      {/* Mobile & Medium Screen: Menu Button */}
      <div className="bg-gray-800 text-white flex items-center p-4 md:hidden">
        <button onClick={() => setSidebarOpen(true)}>
          <FiMenu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">Hostel App</h1>
      </div>

      {/* Sidebar Overlay */}
      <Transition
        show={sidebarOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      </Transition>

      {/* Sidebar */}
      <Transition
        show={sidebarOpen || isMediumScreen}
        enter="transition-transform duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 w-64 p-4 z-50 transform ${
            !sidebarOpen && !isMediumScreen ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl font-bold">Hostel App</h2>
            {/* Close button for mobile */}
            {!isMediumScreen && (
              <button onClick={() => setSidebarOpen(false)} className="text-white">
                ✕
              </button>
            )}
          </div>

          {/* Menu Items */}
          <nav>{renderMenuItems()}</nav>
        </div>
      </Transition>

      {/* Compact Sidebar for Medium Screens */}
      {isMediumScreen && (
        <div className="hidden md:flex flex-col items-center bg-gray-800 h-full w-16 p-4 fixed top-0 left-0 z-40">
          <button onClick={() => setSidebarOpen((prev) => !prev)} className="text-white mb-4">
            <FiMenu size={24} />
          </button>
          {/* You can add icons or initials here to represent menu items */}
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="w-full h-12 flex items-center justify-center mb-2 cursor-pointer hover:bg-gray-700 rounded-md"
              onClick={() => toggleMenu(item.title)}
              title={item.title}
            >
              <span className="text-white font-bold text-lg">
                {item.title.charAt(0)}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Sidebar;
