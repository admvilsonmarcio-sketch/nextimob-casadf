import { Footer } from '../components/Footer';
import { HeroSection } from '../components/HeroSection';
import { ImovelCard, type ImovelCardProps } from '../components/ImovelCard';
import { Navbar } from '../components/Navbar';

const destaqueImoveis: ImovelCardProps[] = [
  {
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80',
    title: 'Mansão Lago Paranoá',
    location: 'Lago Sul • Brasília',
    price: 'R$ 18.900.000',
    area: '1.200 m²',
    tags: ['Pé-direito duplo', 'Marina privativa', 'Casa inteligente'],
  },
  {
    image: 'https://images.unsplash.com/photo-1613977256644-1ecc70409f9d?auto=format&fit=crop&w=1600&q=80',
    title: 'Penthouse Vista JK',
    location: 'Asa Norte • Brasília',
    price: 'R$ 12.400.000',
    area: '680 m²',
    tags: ['Rooftop lounge', 'Vista panorâmica', 'Automação Lutron'],
  },
  {
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80',
    title: 'Residência Jardim Botânico',
    location: 'Jardim Botânico • Brasília',
    price: 'R$ 7.850.000',
    area: '540 m²',
    tags: ['Piscina borda infinita', 'Spa privativo', 'Paisagismo Burle Marx'],
  },
];

const colecoes = [
  {
    title: 'Coleção Lago Sul',
    description: 'Residências icônicas com vista para o lago, marinas privativas e acabamentos artesanais.',
  },
  {
    title: 'Coleção Park Way',
    description: 'Fazendas urbanas com helicentrismo, áreas gourmet e tecnologia integrada.',
  },
  {
    title: 'Coleção Asa Norte',
    description: 'Coberturas tríplex conectadas a hubs culturais e experiências gastronômicas de alto padrão.',
  },
];

const segmentos = [
  'Residencial Ultra Premium',
  'Empreendimentos Corporativos Classe A',
  'Branded Residences & Hospitality',
  'Investment Advisory & Family Offices',
];

export function Home() {
  return (
    <div className="min-h-screen bg-porcelain font-sans text-dune">
      <Navbar />
      <main>
        <HeroSection />

        <section id="colecoes" className="bg-porcelain py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-3xl text-midnight sm:text-4xl">Coleções assinadas</h2>
                <p className="mt-3 max-w-2xl text-porcelain/60 sm:text-dune/70">
                  Curadoria de bairros e conceitos arquitetônicos para direcionar investimentos estratégicos e experiências
                  residenciais sob medida.
                </p>
              </div>
              <a
                href="#captacao"
                className="inline-flex items-center justify-center rounded-full border border-copper-400/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-midnight transition-colors duration-300 hover:bg-copper-500 hover:text-midnight"
              >
                Conheça o concierge
              </a>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {colecoes.map((colecao) => (
                <div key={colecao.title} className="rounded-xl border border-midnight/10 bg-white/80 p-8 shadow-lg shadow-midnight/5">
                  <h3 className="font-display text-2xl text-midnight">{colecao.title}</h3>
                  <p className="mt-4 text-sm text-dune/80">{colecao.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="segmentos" className="bg-white/60 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 max-w-3xl">
              <h2 className="font-display text-3xl text-midnight sm:text-4xl">Segmentos premium</h2>
              <p className="mt-3 text-sm text-dune/70">
                Experiência full service para transações residenciais e comerciais com suporte jurídico, fiscal e de marketing de
                influência.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {segmentos.map((segmento) => (
                <div key={segmento} className="rounded-xl border border-midnight/10 bg-porcelain/70 p-8">
                  <h3 className="font-display text-xl text-midnight">{segmento}</h3>
                  <p className="mt-3 text-sm text-dune/70">
                    Estruturas de dados e storytelling imobiliário para atrair compradores globais e acelerar negociações de alto
                    ticket.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-porcelain py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="font-display text-3xl text-midnight sm:text-4xl">Imóveis em destaque</h2>
                <p className="mt-3 max-w-2xl text-sm text-dune/70">
                  Seleção exclusiva com tour virtual, concierge digital e inteligência de precificação.
                </p>
              </div>
              <a
                href="#captacao"
                className="inline-flex items-center justify-center rounded-full bg-copper-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-midnight shadow-copper transition-transform duration-300 hover:-translate-y-0.5"
              >
                Solicitar acesso VIP
              </a>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {destaqueImoveis.map((imovel) => (
                <ImovelCard key={imovel.title} {...imovel} />
              ))}
            </div>
          </div>
        </section>

        <section id="captacao" className="bg-midnight py-24 text-porcelain">
          <div className="mx-auto max-w-6xl rounded-3xl bg-midnight/40 p-10 shadow-copper sm:p-16">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <span className="rounded-full border border-copper-400/40 px-4 py-1 text-xs uppercase tracking-[0.35em] text-copper-200">
                  Captação estratégica
                </span>
                <h2 className="font-display text-3xl text-porcelain">Transforme seu portfólio com o NextImob.</h2>
                <p className="text-sm text-porcelain/70">
                  Nosso concierge acelera a venda de imóveis de luxo com narrativas cinematográficas, mídia segmentada e
                  relacionamento personalizado com compradores internacionais.
                </p>
              </div>
              <div className="space-y-6">
                <div className="rounded-2xl border border-copper-400/30 bg-midnight/60 p-6">
                  <h3 className="font-display text-xl text-copper-200">Planos para proprietários</h3>
                  <p className="mt-3 text-sm text-porcelain/70">
                    Avaliação estratégica, estratégia de mídia em 360° e relatórios semanais de performance.
                  </p>
                </div>
                <div className="rounded-2xl border border-copper-400/30 bg-midnight/60 p-6">
                  <h3 className="font-display text-xl text-copper-200">Concierge para corretores</h3>
                  <p className="mt-3 text-sm text-porcelain/70">
                    Tecnologia de CRM integrada ao Google Workspace, captação inteligente e pipeline automatizado.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="mailto:concierge@nextimob.com"
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-copper-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-midnight transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Falar com concierge
                  </a>
                  <a
                    href="/login"
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-copper-400/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-porcelain transition-colors duration-300 hover:bg-copper-500 hover:text-midnight"
                  >
                    Entrar no portal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
