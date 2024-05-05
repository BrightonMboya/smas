import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { SalesSchema } from "./schema";
import { Spinner } from "~/components/ui/LoadingSkeleton";

interface EditSaleFormProps {
  register: UseFormRegister<SalesSchema>;
  handleSubmit: UseFormHandleSubmit<SalesSchema>;
  onSubmit: SubmitHandler<SalesSchema>;
  salesRouter: any;
}
export default function EditSaleForm({
  handleSubmit,
  register,
  onSubmit,
  salesRouter,
}: EditSaleFormProps) {
  return (
    <form
      className="pl-[70px] pt-[50px] md:max-w-[90%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-2xl font-medium ">Editing a Sale</h3>
      <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
        <ItemLayout>
          <AssetLabel label="Customer Name" />
          <Input
            placeholder="Inyange Inc"
            {...register("customerName")}
            className="md:w-[400px]"
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Amount" />
          <Input
            placeholder="20"
            className="placeholder:text-gray-400 md:w-[400px]"
            {...register("amount", { valueAsNumber: true })}
            type="number"
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Quantity" />
          <Input
            placeholder="20"
            className="placeholder:text-gray-400 md:w-[400px]"
            {...register("quantity", { valueAsNumber: true })}
            type="number"
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Status" />
          <Input
            placeholder="Cash"
            {...register("status")}
            className="md:w-[400px]"
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Date" />
          <Input
            placeholder=""
            type="date"
            className="md:w-[400px]"
            //   defaultValue={data?.date as unknown as string}
            {...register("date", { valueAsDate: true })}
          />
        </ItemLayout>

        <Input className="hidden" placeholder="" {...register("productsId")} />
      </section>
      <Button
        className="mt-[50px] w-[100px]"
        type="submit"
        disabled={salesRouter.isLoading}
      >
        {salesRouter.isLoading && <Spinner />}
        Save
      </Button>
    </form>
  );
}
