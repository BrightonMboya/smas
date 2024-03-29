import { db } from "~/server/db";

export default async function useOrganizationId(organizationEmail: string) {
  return await db.organizations.findUnique({
    where: {
      emailAddress: organizationEmail,
    },
    select: {
      id: true,
    },
  });
}
