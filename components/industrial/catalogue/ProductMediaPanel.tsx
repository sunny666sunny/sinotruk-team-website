'use client';

import { useState } from 'react';
import { SiteImage } from '@/components/SiteImage';

type ProductMediaPanelProps = {
  images: string[];
  name: string;
};

export function ProductMediaPanel({ images, name }: ProductMediaPanelProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  if (!images.length) {
    return (
      <div className="grid min-h-72 place-items-center border border-[var(--industrial-line)] bg-[var(--industrial-panel)] text-sm text-[var(--industrial-muted)]">
        Product image not published
      </div>
    );
  }

  const activeIndex = Math.max(0, images.indexOf(activeImage));

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e3e9e7]">
        <SiteImage
          src={images[activeIndex]}
          alt={`${name}, gallery view ${activeIndex + 1}`}
          fill
          sizes="(min-width: 1024px) 75vw, 100vw"
          className="object-contain"
        />
        <span className="absolute bottom-3 right-3 bg-[#081113]/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--industrial-text)]">
          {activeIndex + 1} / {images.length}
        </span>
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6" aria-label={`${name} gallery`}>
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              aria-label={`Show ${name} gallery view ${index + 1}`}
              aria-pressed={index === activeIndex}
              className="relative aspect-[4/3] min-h-11 overflow-hidden border border-[var(--industrial-line)] bg-[#e3e9e7] aria-pressed:border-[var(--industrial-accent)]"
            >
              <SiteImage
                src={image}
                alt={`${name}, gallery thumbnail ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 12vw, 33vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
