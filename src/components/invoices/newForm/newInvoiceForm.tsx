"use client";
import Button from "../../ui/Button";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InvoiceItemForm from "./InvoiceItemForm";
import BasicInfoForm from "./BasicInfoForm";
import { inferProcedureInput } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import { ToastAction } from "~/components/ui/Toast";
import { useToast } from "~/utils/hooks/useToast";
import { Spinner } from "~/components/ui/LoadingSkeleton";
import { useRouter } from "next/navigation";
import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/Card";
import Total from "./TotalAmount";
import { invoiceSchema, type InvoiceSchema, defaultInvoiceItems } from "./schema";


export default function NewInvoiceForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceItems: [...defaultInvoiceItems],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "invoiceItems",
  });

  const router = useRouter();

  const { toast } = useToast();

  const { mutateAsync, isLoading } = api.invoices.create.useMutation({
    onSuccess: () => {
      toast({
        description: "Invoice Added succesfully",
      });
      router.push("/dashboard/invoices");
    },

    onError: (error: { message: any }) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 1500,
      });
    },
  });

  const onSubmit: SubmitHandler<InvoiceSchema> = (data) => {
    type Input = inferProcedureInput<AppRouter["invoices"]["create"]>;
    const input: Input = {
      ...data,
    };
    try {
      mutateAsync(input);
    } catch (cause) {
      console.log(cause);
      toast({
        variant: "destructive",
        title: "Faield to add invoices",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 1500,
      });
    }
  };
  console.log(errors);
  return (
    <section className="mt-5 flex items-center justify-center">
      <Card className="">
        <CardHeader className="">
          <CardTitle className="text-sm font-medium">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col pb-10"
          >
            <BasicInfoForm register={register} />
            <h3 className="text-prmary pt-10 text-xl font-medium">
              Invoice Items
            </h3>

            {fields.map((field, index) => (
              <InvoiceItemForm
                idx={index}
                keyIdentifier={field.id}
                register={register}
                key={field.id}
                watch={watch}
              />
            ))}
            <Total control={control} />

            <Button
              className="mt-5 w-[300px] "
              onClick={() => {
                append(defaultInvoiceItems);
              }}
              type="button"
              variant="outline"
            >
              Add New Item
            </Button>

            <Button className="mt-10" type="submit">
              {isLoading ? <Spinner /> : " Save Invoice"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
