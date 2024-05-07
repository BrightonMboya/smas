
import Button from "~/components/ui/Button";
import TestimonialsAvatars from "./testimonials-avatar";

export function CTAButtons() {
  return (
    <div className="mt-10 grid items-center justify-center gap-x-6 gap-y-2 sm:flex">
      <Button color="white" className="font-cal">
        Pre Order Now for 49.99€{" "}
        <span className="ml-2 text-gray-600 line-through">199€</span>
      </Button>
      <div className="font-cal mt-6 flex flex-col items-center justify-center md:mt-0">
        <TestimonialsAvatars priority={true} />
      </div>
    </div>
  );
}
