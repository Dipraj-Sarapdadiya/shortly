import React from 'react';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FolderGit2, Github, Linkedin, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <>
      {/* Large screen nav bar */}
      <nav className='hidden lg:flex justify-between items-center'>
        <div className='flex justify-start items-end gap-8'>
          <div>
            <span className='sr-only'>Shortly App Name</span>
            <h1 className='text-4xl font-bold'>Shortly</h1>
          </div>
          <div className='flex gap-5 text-xl font-semibold'>
            <Link href='/'>Home</Link>
            <Link href='/features'>Features</Link>
            <Link href='/about-us'>About Us</Link>
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
      {/* Mobile screen nav bar */}
      <nav className='lg:hidden flex justify-between items-center'>
        <div>
          <span className='sr-only'>Shortly App Name</span>
          <h1 className='text-4xl font-bold'>Shortly</h1>
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost'>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className='flex justify-between h-full items-center flex-col gap-5 text-xl font-semibold pt-8'>
                <div className='flex justify-center flex-col gap-5 text-xl font-semibold'>
                  <Link href='/'>Home</Link>
                  <Link href='/features'>Features</Link>
                  <Link href='/about-us'>About Us</Link>
                </div>
                <div className='flex space-x-8'>
                  <Link href='https://github.com/Dipraj-Sarapdadiya' target='_blank'>
                    <Github />
                  </Link>
                  <Link href='https://github.com/Dipraj-Sarapdadiya/shortly' target='_blank'>
                    <FolderGit2 />
                  </Link>
                  <Link href='https://www.linkedin.com/in/dipraj-sarapdadiya-822973291/' target='_blank'>
                    <Linkedin />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
