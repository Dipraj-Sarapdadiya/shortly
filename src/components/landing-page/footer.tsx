import React from "react";

import Link from "next/link";

import { FolderGit2, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <>
      <div className="relative flex mt-14 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between mt-5">
        <div>
          <div className="flex space-x-8">
            <div>
              <span className="sr-only">Shortly App Name</span>
              <h1 className="text-4xl font-bold">Shortly</h1>
            </div>
            <div className="flex items-end">
              <h1 className="text-sm lg:text-lg text-right font-semibold">
                © 2024 Shortly | A project by Dipraj Sarapdadiya
              </h1>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex justify-end items-end space-x-5 mx-2">
          <Link href="https://github.com/Dipraj-Sarapdadiya" target="_blank">
            <Github />
          </Link>
          <Link href="https://github.com/Dipraj-Sarapdadiya/shortly" target="_blank">
            <FolderGit2 />
          </Link>
          <Link href="https://www.linkedin.com/in/dipraj-sarapdadiya-822973291/" target="_blank">
            <Linkedin />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
