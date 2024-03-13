import Layout from "~/components/Layout/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Button } from "react-day-picker";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import { ItemLayout, AssetLabel } from "../contacts/new";
import { SubmitHandler, useForm } from "react-hook-form";
import { productSchema, type ProductSchema } from "./new";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  const { query } = useRouter();
  const { isLoading, data, isError } = api.products.fetchById.useQuery({
    productId: query.productId as unknown as string,
  });

  const { register, handleSubmit } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: data?.name,
      buyingPrice: data?.buyingPrice,
      sellingPrice: data?.sellingPrice,
      description: data?.description!,
      stockAvailable: data?.stockAvailable,
    },
  });

  const onSubmit: SubmitHandler<ProductSchema> = (data) => {};
  return (
    <Layout>
      {isError || (!data && <h3>This product doesnt exist</h3>)}
      {!isLoading && data && (
        <form className="mt-[40px] pl-[30px]" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-2xl font-medium ">Editing Product</h3>
          <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
            <ItemLayout>
              <AssetLabel label="Product Name" />
              <Input placeholder="Cement bags" {...register("name")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Stock Available" />
              <Input
                placeholder="20"
                {...register("stockAvailable", { valueAsNumber: true })}
                type="number"
              />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Buying Price" />
              <Input placeholder="200,000" {...register("buyingPrice")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Selling Price" />
              <Input placeholder="300,000" {...register("sellingPrice")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel
                label="Notes"
                caption="Enter additional details about this product"
              />

              <Textarea
                placeholder="Add short notes about this product"
                {...register("description")}
              />
            </ItemLayout>
          </section>
          <Button
            className="mt-[50px] w-[100px]"
            type="submit"
            disabled={isLoading}
          >
            Save
          </Button>
        </form>
      )}
    </Layout>
  );
}
