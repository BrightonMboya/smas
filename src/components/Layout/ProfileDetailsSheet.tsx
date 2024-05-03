"use client";
import { LogOutIcon, Mail, MessageSquare, UserRound } from "lucide-react";
import Button from "~/components/ui/Button";
import { Separator } from "~/components/ui/seperator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export function ProfileIcon() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <img
          alt="Avatar"
          className="cursor-pointer rounded-full"
          height="32"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
          style={{
            aspectRatio: "32/32",
            objectFit: "cover",
          }}
          width="32"
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your profile</SheetTitle>
          <SheetDescription>
            Here you will find necessary information about your profile.
          </SheetDescription>
        </SheetHeader>

        <Separator className="mt-5" />
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-3 text-sm">
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />

            <div>
              <p>Tazama Africa Safaris</p>
              <p>brighton.mboya.io@gmail.com</p>
            </div>
          </div>

          <Separator className="mt-5" />
          <div className="flex flex-col space-y-3 text-sm">
            <p>Need Assistance?</p>

            <div className="flex cursor-pointer items-center space-x-2 rounded-md p-3 hover:bg-gray-200">
              <MessageSquare
                height={14}
                width={14}
                className="hover:text-indigo-700"
              />
              <p>Have a question? Ask away</p>
            </div>

            <div className="flex cursor-pointer items-center space-x-2 rounded-md p-3 hover:bg-gray-200">
              <Mail height={14} width={14} className="hover:text-indigo-700" />
              <p>Send us an email</p>
            </div>

            <div className="flex cursor-pointer items-center space-x-2 rounded-md p-3 hover:bg-gray-200">
              <UserRound
                height={14}
                width={14}
                className="hover:text-indigo-700"
              />
              <p>Talk to an expert</p>
            </div>
          </div>
        </div>

        <Button className="fixed bottom-10  space-x-2" variant="destructive">
          <>
            <LogOutIcon />
            <span>Log out</span>
          </>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
