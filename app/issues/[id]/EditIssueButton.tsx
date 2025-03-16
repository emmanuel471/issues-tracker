import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  issueId: number;
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button className="pt-4">
        <Pencil2Icon />
        Edit
      </Button>
    </Link>
  );
};

export default EditIssueButton;
