import { createTRPCRouter } from "~/server/api/trpc";
import { products } from "./routers/products";
import { supplier } from "./routers/suppliers";
import { invoices } from "./routers/invoces";
import { sales } from "./routers/sales";
import { debts } from "./routers/debts";
import { dashboard } from "./routers/dashboard";
import { auth } from "./routers/auth";
import { accounting } from "./routers/expenses";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  products,
  accounting,
  supplier,
  // invoices,
  sales,
  debts,
  // dashboard,
  auth,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
// export const createCaller = createCallerFactory(appRouter);
