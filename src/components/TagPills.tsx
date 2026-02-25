export function TagPills({ pills }: { pills: string[] }) {
  return (
    <div className="mb-2 flex flex-wrap gap-x-2 gap-y-1">
      {pills.map((p) => (
        <div
          className="text-main-accent rounded-full bg-gray-200 px-1.5 py-0.5 font-mono text-xs"
          key={`tag_${p}`}
        >
          {p}
        </div>
      ))}
    </div>
  );
}
