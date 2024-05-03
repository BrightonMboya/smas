## SMAS

This software is intended to help small businesses record and manage their expense and sales.

It Includes:-

- Invoice Management
- Accounting
- Supplier Management
- Stock Management and more

## Stack Used
- NextJS for front-end
- Prisma -  for table managements and migrations
- Supabase - Data hosting, storage, and auth
- trpc - For handling mutations, queries etc

## Authentication

This project uses Supabase Auth. For self hosting, follow the supabase guide on self hosting supabase. The reason is to be able to use Supabase RLS since we are building a multi-tenant application.

Auth should work pretty well once you configure the environment variables well.


## Client Onboarding
Getting the client onboarding right is the important step when creating a multitenant saas like this one. This makes sure that an organization cant see the data of the other organization.

The first step is signing up a user

## Setting up Supabase RLS.
We will enable RLS for every table in the project, users should be able to perform CRUD if the id matches the uid in the database

Head over to the sql editor section of supabase and paste the following sql query, it enables the RLS on all tables

To grant the permission to our tables for the authenticated roles, we need to turn them on the postgres database. This will allow the authenticated role to get access to our database, if you wont do this step and perform  RLS, you wont be able to see the data in the client.

Go to the sql editor and paste the following sql query

```sql
grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "public" TO anon;
```


Then the following sql what is doing is adding RLS to all of the tables making sure organizations can do crud ops to the data belonging to them based on the organization_id

```sql
alter table "public"."Debts" enable row level security;
create policy "Enable crud ops on debts"
on "public"."Debts"
to authenticated
using (
  (select auth.uid())::text = organizations_id
);

alter table "public"."Expenses" enable row level security;
create policy "crud ops on expenses"
on "public"."Expenses"
to authenticated
using (
    ((( SELECT auth.uid() AS uid))::text = organizations_id)
);

alter table "public"."Products" enable row level security;
create policy "crud ops on products table"
on "public"."Products"
to authenticated
using (
    ((( SELECT auth.uid() AS uid))::text = organization_id)
);


alter table "public"."Sales" enable row level security;
create policy "crud ops on sales table"
on "public"."Sales"
to authenticated
using (
    ((( SELECT auth.uid() AS uid))::text = organization_id)
);


alter table "public"."Suppliers" enable row level security;
create policy "crud ops on suppliers"
on "public"."Suppliers"
to authenticated
using (
    ((( SELECT auth.uid() AS uid))::text = organization_id)
);

alter table "public"."Invoices" enable row level security;
create policy "crud ops on invoices"
on "public"."Invoices"
to authenticated
using (
     ((( SELECT auth.uid() AS uid))::text = organization_id)
);

alter table "public"."Organizations" enable row level security;
create policy "organizations can view their own data"
on "public"."Organizations"
to authenticated
using (
     ((( SELECT auth.uid() AS uid))::text = organization_id)
);
```


# Todo

- [x] debug why fonts are not loading
- [x] chnage the font to inter
- [] add user profile widget on the layout screen
- [x] try to change the full ui inspired by medusa ui
- [] Add a feature of admin to add more teams
- [] Add email confirmation feature when signing up
- [] integrate payment system in the application with DPO
- [] if the user hasnt paid for subscription they shouldnt see the app