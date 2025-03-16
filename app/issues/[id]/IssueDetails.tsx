import React from "react";
import Badge from "@/app/componets/Badge";
import { Flex, Box, Blockquote, Heading } from "@radix-ui/themes";
import { Issue } from "@prisma/client";

interface Props {
  issue: Issue;
}

const IssueDetails = ({ issue }: Props) => {
  return (
    <>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap="3">
        <Badge status={issue.status} />
        <p className="text-sm text-gray-500 italic mb-4">
          {new Date(issue.updatedAt).toDateString()}
        </p>
      </Flex>
      <Box maxWidth="400px">
        <Blockquote size="3">{issue.description}</Blockquote>
      </Box>
    </>
  );
};

export default IssueDetails;
