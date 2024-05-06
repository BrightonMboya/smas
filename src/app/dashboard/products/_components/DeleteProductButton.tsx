"use client";
import { LoaderButton } from "~/app/dashboard/settings/_components/loaderButton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import Button from "~/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import Input from "~/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import { useToast } from "~/utils/hooks/useToast";

export const deleteSchema = z.object({
  confirm: z.string().refine((v) => v === "delete", {
    message: "Please type 'delete' to confirm",
  }),
});

export function DeleteProductButton({ productId }: { productId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const utils = api.useUtils();
  const { mutateAsync, isLoading } = api.products.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product deleted",
        duration: 5000,
      });
    },
    onSettled: () => {
      setIsOpen(false);
      utils.products.all.invalidate();
    },
    onMutate: (product) => {
      utils.products.all.cancel();
      const prevData = utils.products.all.getData();
      const newData = prevData?.filter((p) => p.id !== product.productId);
      utils.products.all.setData(undefined, newData);
      return { prevData };
    },
    onError: (err, data, ctx) => {
      toast({
        title: "Error",
        description: `${err.message}`,
        variant: "destructive",
        duration: 5000,
      });
      utils.products.all.setData(undefined, ctx?.prevData);
    },
  });

  const form = useForm<z.infer<typeof deleteSchema>>({
    resolver: zodResolver(deleteSchema),
    defaultValues: {
      confirm: "",
    },
  });

  function onSubmit() {
    mutateAsync({
      productId,
    });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-fit" variant="destructive" type="button">
          Delete Product
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            By deleting this product, you will also delete all of the sales
            associated with it. Please type <strong>delete</strong> to confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <LoaderButton isLoading={isLoading} variant="destructive">
                Delete
              </LoaderButton>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
