import { Status } from "@prisma/client";
import React from "react";
import { Flex, Badge as RadixBadge } from "@radix-ui/themes";

interface Props {
  status: Status;
}

const StatusBadge = ({ status }: Props) => {
  let color: "green" | "blue" | "orange" = "orange";
  let label = "Open";

  if (status === "CLOSED") {
    color = "green";
    label = "Closed";
  } else if (status === "IN_PROGRESS") {
    color = "blue";
    label = "In Progress";
  }

  return (
    <Flex gap="2">
      <RadixBadge color={color}>{label}</RadixBadge>
    </Flex>
  );
};

export default StatusBadge;
