import { createTRPCRouter } from "~/server/api/trpc";
import { products } from "./routers/products";
import { accounting } from "./routers/expenses";
import { supplier } from "./routers/suppliers";
import { invoices } from "./routers/invoces";
import { sales } from "./routers/sales";
import { debts } from "./routers/debts";
import { dashboard } from "./routers/dashboard";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  products,
  accounting,
  supplier,
  invoices,
  sales,
  debts,
  dashboard,
});

// export type definition of API
export type AppRouter = typeof appRouter;
