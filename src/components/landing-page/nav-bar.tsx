import React from 'react';

import Link from 'next/link';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center'>
      <div className='flex justify-start items-end gap-8'>
        <div>
          <span className='sr-only'>Shortly App Name</span>
          <h1 className='text-4xl font-bold'>Shortly</h1>
        </div>
        <div className='flex gap-5 text-xl font-semibold'>
          <Link href='/'>
            Home
          </Link>
          <Link href='/features'>
            Features
          </Link>
          <Link href='/about-us'>
            About Us
          </Link>
        </div>
      </div>
      <div>
        <Button variant='default' asChild>
          <Link href='/sign-in' className='text-lg font-semibold'>
            Sign In
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
