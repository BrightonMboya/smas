import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/utils/api";
import { format } from "date-fns";
import { Spinner } from "../ui/LoadingSkeleton";

export function RecentSales() {
  const { data, isLoading } = api.accounting.recentSales.useQuery();

  return (
    <div className="space-y-8">
      {isLoading && <Spinner />}
      {data &&
        data?.map((sale) => (
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>
                {sale.customerName
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {sale.customerName}
              </p>
              <p className="text-sm text-muted-foreground">
                {format(sale.date, "yyyy-mm-dd")}
              </p>
            </div>
            <div className="ml-auto font-medium">{sale.amount}</div>
          </div>
        ))}
    </div>
  );
}
