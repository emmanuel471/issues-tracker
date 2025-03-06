import { Button } from "@radix-ui/themes/components/button";
import Link from "next/link";
import React from "react";

const CreateIssueBtn = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">Create Issue</Link>
      </Button>
    </div>
  );
};

export default CreateIssueBtn;
