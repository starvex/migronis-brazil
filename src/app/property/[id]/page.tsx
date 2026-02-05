import { getProperty, getProperties, getSettings, Property } from "@/lib/api";
import PropertyDetails from "./PropertyDetails";

interface Props {
  params: Promise<{ id: string }>;
}

// Generate static params for all properties
export async function generateStaticParams() {
  try {
    const data = await getProperties();
    return data.data.map((property) => ({
      id: String(property.id),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const property = await getProperty(id);
    return {
      title: `${property.title} | Migronis Brazil`,
      description: property.description?.slice(0, 160),
    };
  } catch {
    return {
      title: "Объект недвижимости | Migronis Brazil",
    };
  }
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  
  let property: Property | null = null;
  let settings;
  
  try {
    [property, settings] = await Promise.all([
      getProperty(id),
      getSettings()
    ]);
  } catch (err) {
    console.error('Failed to load property:', err);
    settings = {};
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Объект не найден</h1>
          <a href="/" className="btn-primary inline-block">
            Вернуться на главную
          </a>
        </div>
      </div>
    );
  }

  return <PropertyDetails property={property} settings={settings} />;
}
