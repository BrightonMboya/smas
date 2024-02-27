import Link from "next/link";
import {
  CubeIcon,
  PersonIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Button from "../ui/Button";
import { UserButton, useClerk } from "@clerk/nextjs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  PlusCircle,
  Luggage,
  Send,
  Plane,
  Home,
  Receipt,
  BadgePercent,
  LogOutIcon,
} from "lucide-react";

export default function SideBar() {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <section className="fixed bg-lightest min-h-screen">
      <div className="spac flex w-full flex-col items-center justify-center px-5 pt-5 ">
        <UserButton
          appearance={{
            variables: {},
          }}
        />

        {/* <Accordion type="single" collapsible className="text-gray-500">
          <AccordionItem value="mailCommunication">
            <AccordionTrigger>Communications</AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-5">
              <Link href="/mails">
                <div
                  className={`flex items-center justify-center space-x-2
              ${router.pathname === "/mails" ? "text-dark" : "text-gray-500"}
          `}
                >
                  <Send width={20} height={20} />

                  <h3>Send Email</h3>
                </div>
              </Link>

              <Link href="/mails/new">
                <div
                  className={`flex items-center justify-center space-x-2
              ${
                router.pathname === "/mails/new" ? "text-dark" : "text-gray-500"
              }
          `}
                >
                  <EnvelopeClosedIcon width={20} height={20} />

                  <h3>New Email</h3>
                </div>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}

        <Accordion type="single" collapsible className="text-gray-500">
          <AccordionItem value="allTrips">
            <AccordionTrigger>Trip Management</AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-5">
              <Link href="/trips">
                <div
                  className={`flex items-center justify-center space-x-2
              ${router.pathname === "/trips" ? "text-dark" : "text-gray-500"}
          `}
                >
                  <PersonIcon width={20} height={20} />

                  <h3 className="">All Trips</h3>
                </div>
              </Link>

              <Link href="/trips/new">
                <div
                  className={`flex items-center justify-center space-x-2
              ${
                router.pathname === "/trips/new" ? "text-dark" : "text-gray-500"
              }
          `}
                >
                  <PlusCircle width={20} height={20} />

                  <h3 className="">Add Trips</h3>
                </div>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="text-gray-500">
          <AccordionItem value="itienaries">
            <AccordionTrigger>Invoice Management</AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-5">
              <Link href="/invoices">
                <div
                  className={`flex items-center justify-center space-x-2
              ${router.pathname === "/invoices" ? "text-dark" : "text-gray-500"}
          `}
                >
                  <Receipt width={20} height={20} />
                  <h3>Invoices</h3>
                </div>
              </Link>

              <Link href="/invoices/new">
                <div
                  className={`flex items-center justify-center space-x-2
              ${
                router.pathname === "/invoices/new"
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
                >
                  <BadgePercent width={20} height={20} />
                  <h3>New Invoice</h3>
                </div>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="text-gray-500">
          <AccordionItem value="itienaries">
            <AccordionTrigger>Accomodation Management</AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-5">
              <Link href="/trips/accomodations/new">
                <div
                  className={`flex items-center justify-center space-x-2
              ${
                router.pathname === "/trips/accomodations/new"
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
                >
                  <Home width={20} height={20} />

                  <h3 className="">New Accomodation</h3>
                </div>
              </Link>

              <Link href="/trips/accomodations/">
                <div
                  className={`flex items-center justify-center space-x-2
              ${
                router.pathname === "/trips/accomodations/"
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
                >
                  <Home width={20} height={20} />

                  <h3 className="">All</h3>
                </div>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="text-gray-500">
          <AccordionItem value="itienaries">
            <AccordionTrigger>Destination Management</AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-5">
              <Link href="/trips/destinations">
                <div
                  className={`flex items-center justify-center space-x-2
              ${
                router.pathname === "/trips/destinations"
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
                >
                  <Luggage width={20} height={20} />

                  <h3 className="">All Destinations</h3>
                </div>
              </Link>

              <Link href="/trips/destinations/new">
                <div
                  className={`flex items-center justify-center space-x-2
              ${
                router.pathname === "/trips/destinations/new"
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
                >
                  <Luggage width={20} height={20} />

                  <h3 className="">New Destinations</h3>
                </div>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="text-gray-500">
          <AccordionItem value="itienaries">
            <AccordionTrigger>Itienaries Management</AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-5">
              <Link href="/itienaries">
                <div
                  className={`flex items-center justify-center space-x-2
              ${
                router.pathname === "/itienaries"
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
                >
                  <Plane width={20} height={20} />
                  <h3>Itienaries</h3>
                </div>
              </Link>

              <Link href="/itienaries/new">
                <div
                  className={`flex items-center justify-center space-x-2
              ${
                router.pathname === "/itienaries/new"
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
                >
                  <PlusCircle width={20} height={20} />
                  <h3>New Itienary</h3>
                </div>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* <Link href="/accounting">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/accounting")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <span>$</span>

            <h3>Accounting</h3>
          </div>
        </Link> */}

        {/* <Link href="/assets">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/assets")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <CubeIcon width={20} height={20} />

            <h3>Assets</h3>
          </div>
        </Link> */}

        {/* <Link href="/contacts">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/contacts")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <PersonIcon width={20} height={20} />

            <h3>Contacts</h3>
          </div>
        </Link> */}

        <Button
          className="fixed bottom-10 ml-10 w-[150px] space-x-2"
          variant="destructive"
          onClick={() => signOut(() => router.push("/auth/login"))}
        >
          <LogOutIcon />
          <span>Log out</span>
        </Button>
      </div>
    </section>
  );
}
