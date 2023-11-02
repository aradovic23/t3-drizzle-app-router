export default function Page({ params }: { params: { slug: string } }) {
  return <div className="font-mono">Tenant {params.slug}</div>;
}
