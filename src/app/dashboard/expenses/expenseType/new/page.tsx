import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { Spinner } from "~/components/ui/LoadingSkeleton";

export default function Page() {
  const isLoading = false;
  return (
    <section className="flex items-center justify-center pt-[80px]">
      <form className="rounded-lg border-[1px] bg-white py-10 pl-[30px] shadow-sm md:w-[600px]">
        {" "}
        <h3 className="text-center text-2xl font-medium">New Expense Type</h3>
        <label htmlFor="" className="mt-5">
          Name
        </label>
        <Input className="mt-3 h-[45px] w-[500px] bg-[#F0F0F9]" />
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
