import { useState } from "react";
import { TextField, Box } from "@mui/material";
import { Button } from "./Button";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { BrainModal } from "./BrainModel";
import { BACKEND_URL } from "../config";
import type { ModalProps } from "../utils/Globaltypes";
import { ButtonVariant, ButtonSize } from "../types/button";
const contentSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  link: z
    .string()
    .url("Invalid URL")
    .refine(
      (url) =>
        url.includes("youtube.com") ||
        url.includes("youtu.be") ||
        url.includes("twitter.com") ||
        url.includes("x.com"),
      "Only YouTube and Twitter links are supported",
    ),
});

export const AddContent = ({ open, onClose, refreshContent }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState<{ title?: string; link?: string }>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    const parsed = contentSchema.safeParse({ title, link });

    if (!parsed.success) {
      const fieldErrors: { title?: string; link?: string } = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (field === "title" || field === "link") {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const type =
      link.includes("twitter.com") || link.includes("x.com")
        ? "twitter"
        : "youtube";

    try {
      setLoading(true);
      await axios.post(
        `${BACKEND_URL}/api/v1/mind/content`,
        { ...parsed.data, type },
        { withCredentials: true },
      );

      toast.success("Content added successfully!");
      onClose(false);
      refreshContent?.();
      setTitle("");
      setLink("");
    } catch (err: unknown) {
      if (
        axios.isAxiosError(err) &&
        (err.response?.status === 401 || err.response?.status === 403)
      ) {
        toast.error("Unauthorized");
        navigate("/auth");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrainModal open={open} onClose={() => onClose(false)}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", p: 2 }}
      >
        <div className="p-2 font-medium text-slate-900">
          <h1 className="mb-1 font-medium sm:text-lg md:text-xl">
            Add New Content
          </h1>
        </div>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
        />

        <TextField
          label="Link"
          fullWidth
          margin="normal"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          error={!!errors.link}
          helperText={errors.link}
        />

        <Button
          size={ButtonSize.Medium}
          variant={ButtonVariant.Primary}
          type="submit"
          text={loading ? "Adding..." : "Add Content"}
        />
      </Box>
    </BrainModal>
  );
};
