import Button from "~/components/ui/Button";
import TestimonialsAvatars from "./testimonials-avatar";
import Link from "next/link";

export function CTAButtons() {
  return (
    <div className="mt-10 grid items-center justify-center gap-x-6 gap-y-2 sm:flex">
      <Link href="/auth/sign-up">
        <Button color="white" className="font-cal">
          Get Started
        </Button>
      </Link>
      <div className="font-cal mt-6 flex flex-col items-center justify-center md:mt-0">
        <TestimonialsAvatars priority={true} />
      </div>
    </div>
  );
}
