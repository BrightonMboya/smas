import { db } from "~/server/db";

export default async function useOrganizationId(organizationEmail: string) {
  try {
    const organizationId = await db.organizations.findUnique({
      where: {
        emailAddress: organizationEmail,
      },
      select: {
        id: true,
      },
    });

    if (organizationId) {
      return organizationId;
    } else {
      return null;
    }
  } catch (cause) {
    console.log(cause, ">>>>>>>><<<<<>>>>>>>?????");
  }
}
