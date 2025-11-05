export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-midnight text-porcelain">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-luxurious-house-4016/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/30" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 sm:py-32 lg:flex-row lg:items-center">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-copper-400/40 bg-copper-500/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-copper-200">
            Curadoria Premium
          </span>
          <h1 className="font-display text-4xl font-semibold leading-tight text-porcelain sm:text-5xl lg:text-6xl">
            Exclusividade e sofisticação para conectar pessoas a imóveis singulares.
          </h1>
          <p className="max-w-xl text-base text-porcelain/80 sm:text-lg">
            O NextImob apresenta coleções selecionadas de residências icônicas, experiências digitais
            personalizadas e inteligência de mercado para elevar o padrão do mercado imobiliário de alto padrão.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#colecoes"
              className="inline-flex items-center justify-center rounded-full bg-copper-500 px-6 py-3 text-sm font-semibold text-midnight shadow-copper transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explorar coleções
            </a>
            <a
              href="#captacao"
              className="inline-flex items-center justify-center rounded-full border border-copper-400/60 px-6 py-3 text-sm font-semibold text-porcelain transition-colors duration-300 hover:bg-copper-500 hover:text-midnight"
            >
              Quero anunciar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
