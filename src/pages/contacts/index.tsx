import { NoAsset } from "~/components/Assets";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/contacts/Header";

export default function Page() {
  return (
     <Layout>
    <main className="pl-5">
      <Header title="Contacts" />
      <NoAsset
        bigTitle="You haven't added your contacts yet"
        smallTitle="It's easier to manage, and contact your contact. Go ahead and them now"
        c2a="Add Contacts"
        c2aUrl="/contacts/new"
      />
    </main>
    </Layout>
  );
}
