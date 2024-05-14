import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { AssetLabel } from "~/components/ui/ItemLayout";
import { Spinner } from "~/components/ui/LoadingSkeleton";

export default function Page() {
  const isLoading = false;
  return (
    <section className="flex items-center justify-center pt-10">
      <form className="ml-[70px]  rounded-lg border-[1px] bg-white py-10 pl-[30px] shadow-sm md:w-[700px]">
        <h3 className="text-center text-2xl font-medium">New Store</h3>

        <section className="mt-10 flex flex-col space-y-5">
          <div className="space-y-3">
            <AssetLabel label="Name" />
            <div>
              <Input className="h-[45px] w-[80%] bg-[#F0F0F9]" />
            </div>
          </div>
          <div className="space-y-3">
            <AssetLabel label="Branch" />
            <div>
              <Input type="number" className="h-[45px] w-[80%] bg-[#F0F0F9]" />
            </div>
          </div>

          <div className="space-y-3">
            <AssetLabel label="User" />
            <div>
              <Input type="number" className="h-[45px] w-[80%] bg-[#F0F0F9]" />
            </div>
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
