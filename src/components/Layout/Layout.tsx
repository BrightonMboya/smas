import * as React from "react";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import SignUpForm from "~/components/auth/SignUpPage";
import LoginForm from "~/components/auth/LoginPage";

import SideBar from "./SideBar";
type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
  
      {/* <SignedIn> */}
        <section>
          <div className="flex md:space-x-[250px] ">
            <SideBar />
            <main className="mt-10 md:mt-0">{children}</main>
          </div>
        </section>
      {/* </SignedIn> */}

     
    </>
  );
}
