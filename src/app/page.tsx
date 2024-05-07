"use client";

import { Toaster } from "~/components/ui/toaster";
import { Hero, Pricing, FAQs, Footer } from "~/components/marketing";
import {
  Features,
  FeaturesAutomation,
  FeaturesCalendar,
  FeaturesKeyboard,
  FeaturesNewsletter,
  FeaturesStats,
  FeaturesUnsubscribe,
} from "~/components/marketing/Features";

export default function DashboardPage() {
  return (
    <main className="">
      <Toaster />
      <Hero />
      {/* <Features /> */}
      <FeaturesUnsubscribe />
      <FeaturesStats />
      <FeaturesAutomation />
      <FeaturesNewsletter />
      <FeaturesKeyboard />
      <FeaturesCalendar />
      <Pricing />
      <FAQs />
      <Footer />
    </main>
  );
}
