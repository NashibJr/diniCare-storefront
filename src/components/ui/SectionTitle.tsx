export default function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return <div><div className="text-sm font-bold uppercase tracking-[0.16em] text-primary-500">{eyebrow}</div><h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">{title}</h2>{subtitle&&<p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">{subtitle}</p>}</div>;
}
