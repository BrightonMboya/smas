import Button from "~/components/ui/Button";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import Input from "~/components/ui/Input";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
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
  isLoading
}: AddProductFormProps) {
  return (
    <form
      className="ml-[70px]  rounded-md border-[1px] bg-white py-10 pl-[30px] shadow-sm md:w-[1000px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-2xl font-medium ">New Product</h3>
      <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
        <ItemLayout>
          <AssetLabel label="Product Name" />
          <div>
            <Input
              placeholder="Cement bags"
              {...register("name")}
              className="md:w-[400px]"
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
              placeholder="20"
              {...register("stockAvailable", { valueAsNumber: true })}
              type="number"
              className="md:w-[400px]"
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
              placeholder="200,000"
              {...register("buyingPrice")}
              className="md:w-[400px]"
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
              placeholder="300,000"
              {...register("sellingPrice")}
              className="md:w-[400px]"
            />
            {errors.sellingPrice && (
              <p className="text-sm text-red-500">Selling Price is required</p>
            )}
          </div>
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Notes"
            caption="Enter additional details about this product"
          />

          <Textarea
            placeholder="Add short notes about this product"
            {...register("description")}
            className="md:w-[400px]"
          />
        </ItemLayout>
      </section>
      <Button
        className="mt-[20px] w-[200px] md:mt-[50px]"
        type="submit"
        disabled={isLoading}
      >
        {isLoading && (
          <span className="pr-5">
            <Spinner />
          </span>
        )}
        Save
      </Button>
    </form>
  );
}
