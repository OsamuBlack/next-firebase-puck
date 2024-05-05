export default function layout({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}) {
  console.log(puckPath);
  return (
    <div>
      <h1>Layout</h1>
    </div>
  );
}
