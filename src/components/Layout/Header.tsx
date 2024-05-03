import { ProfileIcon } from "./ProfileDetailsSheet";

export default function Header() {
  return (
    <nav className=" h-[60px] w-full  border-b-[1px] border-b-gray-300">
      <div className="flex items-center justify-end gap-4 pr-5 pt-2 text-base text-gray-500">
        <p className="font-medium">Tazama Africa Safaris</p>

        <ProfileIcon />
      </div>
    </nav>
  );
}
