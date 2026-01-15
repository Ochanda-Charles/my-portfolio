interface FooterProps {
  isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className={`py-16 px-6 transition-colors ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-7xl mx-auto text-center">
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontSize: '1.125rem' }}>
          © {new Date().getFullYear()} Ochanda Charles Otieno. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
