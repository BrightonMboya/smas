"use client";
import { Label } from "~/components/ui/label";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { api } from "~/trpc/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Spinner } from "~/components/ui/LoadingSkeleton";
import { useToast } from "~/utils/hooks/useToast";
import { Skeleton } from "~/components/ui/Skeleton";

function ProfileSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-6 w-[200px]" />
      <Skeleton className="h-6 w-full" />

      <Skeleton className="h-6 w-[200px]" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
}

const organizationSchema = z.object({
  organization_name: z.string(),
  email: z.string().email(),
});

type OrganizationSchema = z.infer<typeof organizationSchema>;

export default function ProfileSettings() {
  const utils = api.useUtils();
  const { data, isLoading } = api.auth.getProfileData.useQuery();
  const { toast } = useToast();

  const orgRouter = api.organization.editOrganization.useMutation({
    onSuccess: () => {
      toast({
        title: "Organization updated",
        description: "Your organization has been updated",
        duration: 3000,
      });
    },
    onSettled: () => {
      utils.auth.getProfileData.invalidate();
    },
    onError: (err, data, ctx) => {
      toast({
        title: "Failed to save organization",
        description: err.message,
        variant: "destructive",
        duration: 5000,
      });
      console.log(err);
    },
  });
  const { register, handleSubmit, setValue } = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      organization_name: data?.user_metadata.organization_name,
      email: data?.email,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("organization_name", data.user_metadata.organization_name);
      setValue("email", data?.email!);
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<OrganizationSchema> = async (data) => {
    orgRouter.mutate({ organization_name: data.organization_name });
  };

  return (
    <div className="rounded-md border bg-white">
      <div className="rounded-t-md border-b bg-neutral-50 px-4 py-2 sm:px-6 md:py-3">
        <span className="mb-4 text-base font-medium sm:text-lg">
          Profile Information
        </span>
      </div>
      <div className="space-y-5 p-4 sm:px-6 lg:w-[60%]">
       {isLoading && <ProfileSkeleton/>}
        {data && !isLoading && (
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("organization_name")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                readOnly
                className="read-only:cursor-not-allowed"
                {...register("email")}
              />
            </div>

            <Button
              className="mt-5 w-[200px] disabled:cursor-not-allowed"
              disabled={orgRouter.isLoading}
            >
              {orgRouter.isLoading && <Spinner />}
              Save
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
