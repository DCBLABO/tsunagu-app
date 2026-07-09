import Link from "next/link";

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-orange-500 text-white shadow-lg shadow-orange-200 hover:bg-orange-600"
      : "border border-orange-200 bg-white/75 text-orange-800 hover:bg-orange-50";

  return (
    <Link className={`inline-flex items-center justify-center rounded-full px-5 py-3 font-bold transition ${styles}`} href={href}>
      {children}
    </Link>
  );
}
