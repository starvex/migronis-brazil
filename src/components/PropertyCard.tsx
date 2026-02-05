'use client';

import Link from 'next/link';
import { Property } from '@/lib/api';

interface PropertyCardProps {
  property: Property;
  basePath?: string;
}

const typeLabels: Record<string, string> = {
  apartment: 'Квартира',
  house: 'Дом',
  land: 'Участок',
  commercial: 'Коммерческая'
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: 'Активно', color: 'bg-green-500' },
  sold: { label: 'Продано', color: 'bg-red-500' },
  reserved: { label: 'Резерв', color: 'bg-yellow-500' }
};

export default function PropertyCard({ property, basePath = '' }: PropertyCardProps) {
  const price = parseFloat(property.price);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);

  const image = property.images?.[0] || '/placeholder-property.jpg';
  const status = statusLabels[property.status] || statusLabels.active;

  return (
    <Link href={`${basePath}/property/${property.id}`} className="block">
      <div className="card overflow-hidden cursor-pointer group">
        {/* Image */}
        <div className="relative h-48 bg-neutral-800 overflow-hidden">
          {property.images?.length > 0 ? (
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-500">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          )}
          
          {/* Status Badge */}
          <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium text-white ${status.color}`}>
            {status.label}
          </div>
          
          {/* Type Badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium bg-black/60 text-white">
            {typeLabels[property.type] || property.type}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-white line-clamp-1">
            {property.title}
          </h3>
          
          <div className="flex items-center text-neutral-400 text-sm mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.location}
          </div>
          
          <div className="text-xl font-bold text-blue-400">
            {formattedPrice}
          </div>
        </div>
      </div>
    </Link>
  );
}
