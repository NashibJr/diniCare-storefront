export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="border-b border-gray-100 bg-gradient-to-br from-primary-50 via-white to-yellow-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-gray-500">{subtitle}</p>
      </div>
    </section>
  );
}
