import Button from "~/components/ui/Button";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import Input from "~/components/ui/Input";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { ProductSchema } from "./schema";
import { Spinner } from "~/components/ui/LoadingSkeleton";
import { Textarea } from "~/components/ui/TextArea";

interface AddProductFormProps {
  register: UseFormRegister<ProductSchema>;
  handleSubmit: UseFormHandleSubmit<ProductSchema>;
  onSubmit: (data: ProductSchema) => void;
  errors: FieldErrors<ProductSchema>;
  isLoading: boolean;
}

export default function AddProductForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isLoading,
}: AddProductFormProps) {
  return (
    <form
      className="ml-[70px]  rounded-lg border-[1px] bg-white py-10 pl-[30px] shadow-sm md:w-[1000px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-center text-2xl font-medium">New Product</h3>

      <section className="mt-10 grid grid-cols-2 gap-y-5">
        <div className="col-span-2 ">
          <ItemLayout>
            <AssetLabel label="Category" />
            <div>
              <Input className="h-[45px] w-[930px] bg-[#F0F0F9]" />
            </div>
          </ItemLayout>
        </div>
        <ItemLayout>
          <AssetLabel label="Product Name" />
          <div>
            <Input
              {...register("name")}
              className="h-[45px] bg-[#F0F0F9] md:w-[450px]"
            />
            {errors.name && (
              <p className="text-sm text-red-500">Product Name is required</p>
            )}
          </div>
        </ItemLayout>
        <ItemLayout>
          <AssetLabel label="Stock Available" />
          <div>
            <Input
              {...register("stockAvailable", { valueAsNumber: true })}
              type="number"
              className="h-[45px] bg-[#F0F0F9] md:w-[450px]"
            />
            {errors.stockAvailable && (
              <p className="text-sm text-red-500">Stock is required</p>
            )}
          </div>
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Buying Price" />
          <div>
            <Input
              {...register("buyingPrice")}
              className="h-[45px] bg-[#F0F0F9] md:w-[450px]"
            />
            {errors.buyingPrice && (
              <p className="text-sm text-red-500">Buying Price is required</p>
            )}
          </div>
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Selling Price" />
          <div>
            <Input
              {...register("sellingPrice")}
              className="h-[45px] bg-[#F0F0F9] md:w-[450px] "
            />
            {errors.sellingPrice && (
              <p className="text-sm text-red-500">Selling Price is required</p>
            )}
          </div>
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Stock" />
          <div>
            <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px]" />
          </div>
        </ItemLayout>
        <ItemLayout>
          <AssetLabel label="Reorder stock level" />
          <div>
            <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px] " />
          </div>
        </ItemLayout>
      </section>
      <div className="flex items-center justify-center">
        <Button
          className="mt-[20px] w-[200px] md:mt-[50px] "
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <span className="pr-5">
              <Spinner />
            </span>
          )}
          Create
        </Button>
      </div>
    </form>
  );
}
