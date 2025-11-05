export type ImovelCardProps = {
  image: string;
  title: string;
  location: string;
  price: string;
  area: string;
  tags: string[];
};

export function ImovelCard({ image, title, location, price, area, tags }: ImovelCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-midnight/20 bg-porcelain/90 shadow-lg shadow-midnight/5 transition-transform duration-300 hover:-translate-y-2 hover:shadow-copper">
      <div className="relative h-64 w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
        <span className="absolute right-4 top-4 rounded-full bg-midnight/80 px-3 py-1 text-xs font-semibold text-copper-200">
          {area}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-1">
          <h3 className="font-display text-xl text-midnight">{title}</h3>
          <p className="text-sm uppercase tracking-[0.2em] text-fog">{location}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-copper-400/40 bg-copper-500/10 px-3 py-1 text-xs text-copper-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-2xl text-copper-500">{price}</span>
          <button className="rounded-full border border-midnight/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-midnight transition-colors duration-300 hover:border-copper-400 hover:bg-copper-500 hover:text-midnight">
            Detalhes
          </button>
        </div>
      </div>
    </article>
  );
}

export default ImovelCard;
