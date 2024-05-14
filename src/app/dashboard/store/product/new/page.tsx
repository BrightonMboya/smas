import Button from "~/components/ui/Button";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import Input from "~/components/ui/Input";
import { Spinner } from "~/components/ui/LoadingSkeleton";

export default function Page() {
    const isLoading = false;
  return (
    <section className="flex items-center justify-center pt-10">
      <form className="ml-[70px]  rounded-lg border-[1px] bg-white py-10 pl-[30px] shadow-sm md:w-[1000px]">
        <h3 className="text-center text-2xl font-medium">New Store Product</h3>

        <section className="mt-10 grid grid-cols-2 gap-y-5">
          <div className="col-span-2 ">
            <ItemLayout>
              <AssetLabel label="Store" />
              <div>
                <Input className="h-[45px] w-[930px] bg-[#F0F0F9]" />
              </div>
            </ItemLayout>
          </div>
          <ItemLayout>
            <AssetLabel label="Product Name" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px]" />
            </div>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Stock Available" />
            <div>
              <Input
                type="number"
                className="h-[45px] bg-[#F0F0F9] md:w-[450px]"
              />
            </div>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Buying Price" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px]" />
            </div>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Selling Price" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px] " />
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
    </section>
  );
}
