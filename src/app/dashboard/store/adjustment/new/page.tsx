import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import { Spinner } from "~/components/ui/LoadingSkeleton";
import { Textarea } from "~/components/ui/TextArea";

export default function Page() {
  const isLoading = false;
  return (
    <section className="flex items-center justify-center pt-10">
      <form className="ml-[70px]  rounded-lg border-[1px] bg-white py-10 pl-[30px] shadow-sm md:w-[1000px]">
        <h3 className="text-center text-2xl font-medium">Stock Adjustment</h3>

        <section className="mt-10 grid grid-cols-2 gap-y-5">
          <ItemLayout>
            <AssetLabel label="Product" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px]" />
            </div>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Available Stock" />
            <div>
              <Input
                type="number"
                className="h-[45px] bg-[#F0F0F9] md:w-[450px]"
              />
            </div>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Type" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px]" />
            </div>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Stock To Adjust" />
            <div>
              <Input className="h-[45px] bg-[#F0F0F9] md:w-[450px] " />
            </div>
          </ItemLayout>

          <div className="col-span-2 ">
            <ItemLayout>
              <AssetLabel label="Stock After Adjustment" />
              <Input className="h-[45px] bg-[#F0F0F9] w-[930px] " />
            </ItemLayout>
          </div>

          <div className="col-span-2 ">
            <ItemLayout>
              <AssetLabel label="Description" />
              <div>
                <Textarea className=" w-[930px] bg-[#F0F0F9]" />
              </div>
            </ItemLayout>
          </div>
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
