import React from "react";
import { UrlForm } from "../url-form";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const LinkSection = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-medium">Shorten a long link</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-5">
          <h4 className="text-lg pb-1">Past long URL here</h4>
          <UrlForm formToggle={false} />{" "}
        </div>{" "}
        <div className="flex justify-center items-center">
          <h4 className="text-lg">*No credit card required. </h4>{" "}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkSection;
