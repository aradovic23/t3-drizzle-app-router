import TopNav from "../_components/top-nav";

export default function TenantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <TopNav />
      <section className="container mx-auto max-w-7xl px-3">{children}</section>
    </main>
  );
}
