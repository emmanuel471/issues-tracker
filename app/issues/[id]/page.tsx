"use client";

import { Box, Button, Blockquote, Flex, Grid, Heading } from "@radix-ui/themes";
import { notFound, useRouter } from "next/navigation";
import EditIssueButton from "../_components/EditIssueButton";
import IssueDetails from "../_components/IssueDetails";
import AlertDialogue from "../_components/AlertDialogue";
import React, { useEffect, useState } from "react";
import { Issue } from "@prisma/client";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { API_ENDPOINTS } from "@/route-config";
import IssueSelector from "../_components/IssueSelector";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailsPage = ({ params }: Props) => {
  const router = useRouter();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );

  useEffect(() => {
    const unwrapParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      const fetchIssue = async () => {
        try {
          const response = await axios.get(
            API_ENDPOINTS.issue_by_id(resolvedParams.id)
          );
          if (response.status === 200) {
            setIssue(response.data);
          } else {
            notFound();
          }
        } catch (error) {
          console.error("Error fetching issue:", error);
          notFound();
        }
      };

      fetchIssue();
    }
  }, [resolvedParams]);

  const onConfirmDel = async () => {
    if (resolvedParams) {
      try {
        const response = await axios.delete(
          API_ENDPOINTS.issue_by_id(resolvedParams.id)
        );
        if (response.status == 200) {
          alert("Deleted");
          router.push("/issues");
          router.refresh();
        }
      } catch (error) {
        console.log(error);
        alert("could not delete");
      }
    }
  };

  if (!issue) {
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
  }

  return (
    <Grid className="pt-4" gap="2" columns={{ initial: "1", md: "2" }}>
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex
          direction={{ initial: "row", md: "column" }}
          maxWidth="100px"
          gap="1"
        >
          <IssueSelector />
          <EditIssueButton issueId={issue.id} />
          <AlertDialogue
            trigger={
              <Button color="red" style={{ minWidth: 100 }}>
                <MdDeleteForever size={20} />
                Delete
              </Button>
            }
            title="Confirm Deletion"
            description="Are you sure you want to delete this issue?"
            cancel={
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            }
            confirm={
              <Button onClick={onConfirmDel} variant="solid" color="red">
                Confirm
              </Button>
            }
          />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
