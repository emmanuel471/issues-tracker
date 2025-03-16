import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Flex, Box, Blockquote, Heading } from "@radix-ui/themes";

const IssueDetailsPage = async () => {
  return (
    <div className="p-6">
      <Heading as="h2">
        <Skeleton width={300} height={30} />
      </Heading>
      <Flex gap="3">
        <Skeleton width={100} height={20} />
        <p className="text-sm text-gray-500 italic mb-4">
          <Skeleton width={150} height={15} />
        </p>
      </Flex>
      <Box maxWidth="400px">
        <Blockquote size="3">
          <Skeleton count={3} />
        </Blockquote>
      </Box>
    </div>
  );
};

export default IssueDetailsPage;
