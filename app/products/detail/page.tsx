export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string } | undefined >
}) {
  const p = await searchParams
  return <div style={{padding: 40}}>slug: {p?.slug || 'none'}</div>
}
