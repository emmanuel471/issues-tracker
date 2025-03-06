"use client";
import { TextField, Button } from "@radix-ui/themes";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import ActionAlert from "@/app/componets/ActionAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import createIssuesSchema from "@/prisma/createIssuesSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/app/componets/ErrorMessage";

type IssueForm = z.infer<typeof createIssuesSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const CreateNewIssue = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssuesSchema),
  });
  const [error, setError] = React.useState<string | null>(null);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      setIsSubmitting(false);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      console.log("Error ", error);
      if (error instanceof Error) {
        setError(error.toString());
      } else {
        setError("An unknown error occurred");
      }
    }
  });

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
      <form className="space-y-2 p-5" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Button disabled={isSubmitting} type="submit">
          Submit New Issue{" "}
          {isSubmitting && (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateNewIssue;
