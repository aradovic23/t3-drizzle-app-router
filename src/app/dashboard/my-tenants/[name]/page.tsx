export default function Page({ params }: { params: { name: string } }) {
  return <div className="grid place-content-center">Tenant {params.name}</div>;
}
