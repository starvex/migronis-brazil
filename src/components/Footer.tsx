'use client';

import { Settings } from '@/lib/api';

interface FooterProps {
  settings?: Settings;
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();
  
  return (
    <footer id="contact" className="border-t border-neutral-800 bg-black/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {settings?.site_name || 'Migronis Brazil'}
            </h3>
            <p className="text-neutral-400 text-sm">
              Премиальная недвижимость в Santa Catarina, Бразилия.
              Инвестиции и жизнь у океана.
            </p>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Контакты</h4>
            <div className="space-y-2 text-sm">
              {settings?.contact_email && (
                <a 
                  href={`mailto:${settings.contact_email}`}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {settings.contact_email}
                </a>
              )}
              {settings?.contact_phone && (
                <a 
                  href={`tel:${settings.contact_phone}`}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {settings.contact_phone}
                </a>
              )}
            </div>
          </div>
          
          {/* Location */}
          <div>
            <h4 className="font-semibold text-white mb-4">Локация</h4>
            <p className="text-neutral-400 text-sm">
              Santa Catarina, Brasil<br />
              Florianópolis • Balneário Camboriú<br />
              Itapema • Porto Belo
            </p>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-500 text-sm">
          © {year} {settings?.site_name || 'Migronis Brazil'}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
