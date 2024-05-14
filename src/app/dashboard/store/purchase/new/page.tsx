import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { Spinner } from "~/components/ui/LoadingSkeleton";

export default function Page() {
  const isLoading = false;
  return (
    <section className="flex items-center justify-center pt-10">
      <form className="ml-[70px]  rounded-lg border-[1px] bg-white py-10 pl-[30px] shadow-sm md:w-[1000px]">
        <h3 className="text-center text-2xl font-medium">New Purchase</h3>

        <section className="mt-10 grid grid-cols-2 gap-y-5">
          <ItemLayout>
            <AssetLabel label="Product" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px]" />
            </div>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Purchased Stock" />
            <div>
              <Input
                type="number"
                className="h-[45px] bg-[#F0F0F9] md:w-[450px]"
              />
            </div>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Stock Available" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px]" />
            </div>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="New Stock" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px] " />
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
            <AssetLabel label="Total Amount" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px]" />
            </div>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Paid Amount" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px] " />
            </div>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Reorder Stock level" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px]" />
            </div>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Purchase Date" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px] " />
            </div>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Supplier " />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px]" />
            </div>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Invoice Number" />
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
