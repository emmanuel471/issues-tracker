import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes/components/button";
import Link from "next/link";
import React from "react";

interface Props {
  issueId: number;
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button className="pt-4" style={{ cursor: "pointer", minWidth: 100 }}>
        <Pencil2Icon />
        Edit
      </Button>
    </Link>
  );
};

export default EditIssueButton;
