'use client';

import { useState } from 'react';
import { SiteImage } from '@/components/SiteImage';
import type { ProductGalleryItem } from '@/lib/product-detail/types';

type ProductMediaPanelProps = {
  images: ProductGalleryItem[];
  name: string;
};

export function ProductMediaPanel({ images, name }: ProductMediaPanelProps) {
  const [activeImage, setActiveImage] = useState(images[0]?.image);

  if (!images.length) {
    return (
      <div className="grid min-h-72 place-items-center border border-[var(--industrial-line)] bg-[var(--industrial-panel)] text-sm text-[var(--industrial-muted)]">
        Product image not published
      </div>
    );
  }

  const activeIndex = Math.max(0, images.findIndex((item) => item.image === activeImage));
  const active = images[activeIndex];

  return (
    <div>
      <figure className="border border-[var(--industrial-line)] bg-[#081113]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <SiteImage
          src={active.image}
          alt={active.alt}
          fill
          sizes="(min-width: 1024px) 75vw, 100vw"
          className="object-contain"
        />
        <span className="absolute bottom-3 right-3 bg-[#081113]/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--industrial-text)]">
          {activeIndex + 1} / {images.length}
        </span>
        </div>
        <figcaption className="border-t border-[var(--industrial-line)] bg-[var(--industrial-panel)] p-5 text-[var(--industrial-text)]"><strong className="block text-lg uppercase">{active.title}</strong><span className="mt-2 block text-sm leading-6 text-[var(--industrial-muted)]">{active.description}</span></figcaption>
      </figure>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6" aria-label={`${name} gallery`}>
          {images.map((item, index) => (
            <button
              key={item.image}
              type="button"
              onClick={() => setActiveImage(item.image)}
              aria-label={`Show ${name} gallery view ${index + 1}`}
              aria-pressed={index === activeIndex}
              className="relative aspect-[4/3] min-h-11 overflow-hidden border border-[var(--industrial-line)] bg-[#081113] aria-pressed:border-[var(--industrial-accent)]"
            >
              <SiteImage
                src={item.image}
                alt={`${item.alt}, thumbnail`}
                fill
                sizes="(min-width: 1024px) 12vw, 33vw"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
