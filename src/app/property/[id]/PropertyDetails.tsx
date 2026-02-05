'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Property, Settings } from '@/lib/api';

interface Props {
  property: Property;
  settings?: Settings;
  basePath?: string;
}

const typeLabels: Record<string, string> = {
  apartment: 'Квартира',
  house: 'Дом',
  land: 'Участок',
  commercial: 'Коммерческая'
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: 'В продаже', color: 'bg-green-500' },
  sold: { label: 'Продано', color: 'bg-red-500' },
  reserved: { label: 'Резерв', color: 'bg-yellow-500' }
};

export default function PropertyDetails({ property, settings, basePath = '' }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  
  const price = parseFloat(property.price);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);

  const status = statusLabels[property.status] || statusLabels.active;
  const images = property.images?.length > 0 ? property.images : [];
  const whatsappNumber = settings?.contact_phone?.replace(/\D/g, '') || '';
  const whatsappMessage = encodeURIComponent(`Здравствуйте! Интересует объект: ${property.title}`);

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link 
            href={`${basePath}/`} 
            className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад к объектам
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div>
            {/* Main Image */}
            <div className="aspect-[4/3] bg-neutral-800 rounded-lg overflow-hidden mb-4">
              {images.length > 0 ? (
                <img 
                  src={images[activeImage]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Status & Type */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${status.color}`}>
                {status.label}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-700 text-white">
                {typeLabels[property.type] || property.type}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-4">
              {property.title}
            </h1>

            {/* Location */}
            <div className="flex items-center text-neutral-400 mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.location}
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-blue-400 mb-8">
              {formattedPrice}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Описание</h3>
              <p className="text-neutral-300 whitespace-pre-wrap">
                {property.description || 'Описание отсутствует'}
              </p>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Написать в WhatsApp
                </a>
              )}
              
              {settings?.contact_email && (
                <a
                  href={`mailto:${settings.contact_email}?subject=Запрос по объекту: ${property.title}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-neutral-600 rounded-lg text-white hover:bg-neutral-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Написать на email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
