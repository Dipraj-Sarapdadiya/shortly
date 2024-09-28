import React from "react";

import Link from "next/link";
import { Button } from "../ui/button";

const CallToAction = () => {
  return (
    <div className="box-1 mt-16 flex flex-col justify-center items-center rounded-lg border bg-card text-card-foreground shadow-sm p-5 space-y-5">
      <h2 className="text-4xl font-semibold text-center">Ready to Elevate?</h2>
      <Button className="w-2/4 lg:w-fit" asChild>
        <Link href="/sign-up">Let&apos;s Begin!</Link>
      </Button>
    </div>
  );
};

export default CallToAction;
