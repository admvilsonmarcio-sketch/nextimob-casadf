export function Footer() {
  return (
    <footer id="sobre" className="bg-midnight py-12 text-porcelain">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <div className="space-y-4">
          <span className="font-display text-2xl text-copper-300">NextImob Luxe</span>
          <p className="text-sm text-porcelain/70">
            Uma plataforma imobiliária projetada para corretores visionários e clientes que exigem excelência.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg text-copper-200">Atendimento</h4>
          <ul className="mt-4 space-y-2 text-sm text-porcelain/70">
            <li>Whatsapp: +55 (61) 99999-0000</li>
            <li>Email: concierge@nextimob.com</li>
            <li>Brasília • Lago Sul</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-copper-200">Coleções</h4>
          <ul className="mt-4 space-y-2 text-sm text-porcelain/70">
            <li>Residências Lago Sul</li>
            <li>Penthouse Park Way</li>
            <li>Mansões Jardim Botânico</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-copper-200">Conecte-se</h4>
          <p className="mt-4 text-sm text-porcelain/70">
            Receba insights exclusivos sobre o mercado de luxo e convites para experiências NextImob.
          </p>
          <form className="mt-6 flex gap-2">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="w-full rounded-full border border-copper-500/40 bg-midnight/60 px-4 py-3 text-sm text-porcelain placeholder:text-porcelain/40 focus:border-copper-300 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-copper-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-midnight transition-transform duration-300 hover:-translate-y-0.5"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 px-6 text-xs text-porcelain/50 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} NextImob. Todos os direitos reservados.</span>
        <div className="flex gap-6">
          <a href="#" className="transition-colors duration-200 hover:text-copper-300">
            Política de privacidade
          </a>
          <a href="#" className="transition-colors duration-200 hover:text-copper-300">
            Termos de uso
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
