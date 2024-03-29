import { TRPCError } from "@trpc/server";
import z from "zod";

export const organizationEmailSchema = z.object({
  organizationEmail: z.string(),
});

export const FAILED_TO_CREATE = new TRPCError({
  code: "BAD_REQUEST",
  message: "Failed to create a new record",
});

export const NOT_FOUND = new TRPCError({
  code: "NOT_FOUND",
  message: "Record not found",
});

export const FAILED_TO_DELETE = new TRPCError({
  code: "INTERNAL_SERVER_ERROR",
  message: "Failed to delete the record",
});
