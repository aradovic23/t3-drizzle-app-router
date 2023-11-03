import Link from "next/link";

export default function TenantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <nav className="container mx-auto mb-4 flex h-12 items-center bg-slate-100">
        <Link href="/">
          <p className="font-bold">
            multi tenant <span className="text-blue-600">app</span>.
          </p>
        </Link>
      </nav>
      <section className="container mx-auto max-w-5xl px-3">{children}</section>
    </main>
  );
}
