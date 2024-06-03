import React from 'react';
import { UrlForm } from '../url-form';

const LinkSection = () => {
  return (
    <div className="w-full h-auto bg-primary-foreground/5 px-4 lg:px-8 py-4 rounded-md">
      <span className="sr-only">Link section</span>
      <div className="font-semibold text-primary-foreground">
        <h2 className="text-2xl">Shorten a long link</h2>
        <div className="py-5">
          <h4 className="text-lg pb-1">Past long URL here</h4>
          <UrlForm formToggle={false} />
        </div>
        <div className="flex justify-center items-center">
          <h4 className="text-lg">*No credit card required. </h4>
        </div>
      </div>
    </div>
  );
};

export default LinkSection;
