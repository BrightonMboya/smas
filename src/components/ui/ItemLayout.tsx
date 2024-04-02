export function AssetLabel({
  label,
  caption,
}: {
  label: string;
  caption?: string;
}) {
  return (
    <div className="max-w-[400px] ">
      <h3 className="text-base font-medium">{label}</h3>
      <h3 className="text-sm">{caption}</h3>
    </div>
  );
}

export function ItemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-lg items-center md:gap-[50px] space-y-[10px] md:grid md:grid-cols-2">
      {children}
    </div>
  );
}
