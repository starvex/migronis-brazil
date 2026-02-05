'use client';

import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Property, getProperties } from '@/lib/api';

const filters = [
  { key: '', label: 'Все' },
  { key: 'apartment', label: 'Квартиры' },
  { key: 'house', label: 'Дома' },
  { key: 'land', label: 'Участки' },
  { key: 'commercial', label: 'Коммерческая' }
];

interface PropertiesGridProps {
  initialProperties: Property[];
  basePath?: string;
}

export default function PropertiesGrid({ initialProperties, basePath = '' }: PropertiesGridProps) {
  const [activeFilter, setActiveFilter] = useState('');
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      try {
        const data = await getProperties(activeFilter || undefined);
        setProperties(data.data);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiltered();
  }, [activeFilter]);

  // Filter only active properties
  const activeProperties = properties.filter(p => p.status === 'active');

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : activeProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProperties.map((property) => (
            <PropertyCard key={property.id} property={property} basePath={basePath} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-500">
          <p>Объектов пока нет</p>
        </div>
      )}
    </div>
  );
}
