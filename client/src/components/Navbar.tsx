import { Link } from 'react-router-dom';

const links = [
  { label: 'Coleções', href: '#colecoes' },
  { label: 'Segmentos', href: '#segmentos' },
  { label: 'Soluções', href: '#captacao' },
  { label: 'Sobre', href: '#sobre' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-copper-500/30 bg-midnight/80 font-sans backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl font-semibold text-copper-300">
          NextImob Luxe
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-porcelain/90 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors duration-200 hover:text-copper-300">
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          to="/login"
          className="rounded-full border border-copper-400/60 bg-copper-500/10 px-5 py-2 text-sm font-semibold text-porcelain transition-all duration-300 hover:-translate-y-0.5 hover:bg-copper-500 hover:text-midnight"
        >
          Área do corretor
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
