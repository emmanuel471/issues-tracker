"use client";
import { TextField, Button, Text } from "@radix-ui/themes";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import ActionAlert from "@/app/componets/ActionAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import createIssuesSchema from "@/prisma/createIssuesSchema";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssuesSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const CreateNewIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssuesSchema),
  });
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className="max-w-2xl">
      {/* Place at the top */}
      {error && (
        <div className="fixed top-0 left-0 w-full z-50">
          <ActionAlert
            message={error}
            severity="error"
            onClose={() => setError("")}
          />
        </div>
      )}
      <form
        className="space-y-2 p-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
          } catch (error) {
            console.log("Error ", error);
            if (error instanceof Error) {
              setError(error.toString());
            } else {
              setError("An unknown error occurred");
            }
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && (
          <Text as="p" color="red">
            {errors.title.message}
          </Text>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text as="p" color="red">
            {errors.description.message}
          </Text>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateNewIssue;
