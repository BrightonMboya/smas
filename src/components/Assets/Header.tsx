import Button from "~/components/ui/Button";
import Link from "next/link";

interface Props {
  href: string;
  title: string;
}

export default function Header({ href, title }: Props) {
  return (
    <div className="flex items-center justify-between pt-[40px] md:w-[1000px] ">
      {/* <h3 className="text-3xl font-medium ">{`${title}`}</h3> */}
      <div className="flex items-center gap-2">
        <Button variant="ghost">Export</Button>
        <Link href={`${href}`}>
          <Button>{`New ${title}`}</Button>
        </Link>
      </div>
    </div>
  );
}
