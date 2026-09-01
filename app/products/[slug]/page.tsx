export default async function Page(props: any) {
  const params = await props.params
  return <div style={{padding: 40}}>slug: {params.slug}</div>
}
