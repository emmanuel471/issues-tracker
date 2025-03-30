"use client";

import { AlertDialog, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  trigger: React.ReactNode;
  title: string;
  description: string;
  cancel: React.ReactNode;
  confirm: React.ReactNode;
}

const AlertDialogue = ({
  trigger,
  title,
  description,
  cancel,
  confirm,
}: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {description}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>{cancel}</AlertDialog.Cancel>
          <AlertDialog.Action>{confirm}</AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default AlertDialogue;
