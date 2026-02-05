import { getProperties, getSettings, Property, Settings } from "@/lib/api";
import PropertiesGrid from "@/components/PropertiesGrid";

export default async function Home() {
  let properties: Property[] = [];
  let settings: Settings = {};
  
  try {
    const [propsData, settingsData] = await Promise.all([
      getProperties(),
      getSettings()
    ]);
    properties = propsData.data;
    settings = settingsData;
  } catch (err) {
    console.error('Failed to load data:', err);
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Real Estate in<br />
            <span className="text-blue-400">Santa Catarina</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Premium properties in Brazil's most beautiful region.
            Investments, oceanfront living, your new home.
          </p>
          <a 
            href="#properties" 
            className="btn-primary inline-block"
          >
            View Properties
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-neutral-800 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">60+</div>
              <div className="text-neutral-400 text-sm">Properties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">7</div>
              <div className="text-neutral-400 text-sm">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">10+</div>
              <div className="text-neutral-400 text-sm">Years of Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">100%</div>
              <div className="text-neutral-400 text-sm">Legal Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">Properties</h2>
          <p className="text-neutral-400 mb-8">Current listings from Migronis</p>
          
          <PropertiesGrid initialProperties={properties} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Consultation?
          </h2>
          <p className="text-neutral-400 mb-8">
            Contact us to find the perfect property for your goals —
            investment, relocation, or vacation.
          </p>
          {settings?.contact_phone && (
            <a 
              href={`https://wa.me/${settings.contact_phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact via WhatsApp
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
