import { User } from "@prisma/client";
import { API_ENDPOINTS } from "@/route-config";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueSelector = () => {
  const [value, setValue] = useState("");

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get(API_ENDPOINTS.users).then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) {
    return null;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueSelector;
