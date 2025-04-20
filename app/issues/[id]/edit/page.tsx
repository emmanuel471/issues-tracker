import React from "react";
import { prisma } from "@/prisma/migrations/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: Promise<{ id: string }>;
}
const EditIssue = async ({ params }: Props) => {
  const { id } = await params;
  const existingIssue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!existingIssue) return notFound();

  return <IssueForm existingIssue={existingIssue} />;
};

export default EditIssue;
