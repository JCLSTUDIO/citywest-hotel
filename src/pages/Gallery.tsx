import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/lib/constants';

const categories = ['All', 'Rooms', 'Dining', 'Facilities', 'Exterior'] as const;
type Category = (typeof categories)[number];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory.toLowerCase());

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const goNext = () => {
    if (lightbox !== null) setLightbox((lightbox + 1) % filtered.length);
  };
  const goPrev = () => {
    if (lightbox !== null) setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  };

  return (
    <>
      {/* Header */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-espresso pt-20">
        <div className="text-center content-max px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">Gallery</h1>
          <p className="text-text-muted text-lg">Explore CityWest Hotel through our lens</p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="section-padding bg-espresso">
        <div className="content-max">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold text-espresso font-medium'
                    : 'text-text-muted hover:text-white border border-glass-border hover:border-gold/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="break-inside-avoid rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/40 transition-colors duration-300 flex items-end">
                    <p className="text-white text-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-espresso/95 backdrop-blur-lg flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gold transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 sm:left-8 text-white hover:text-gold transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            className="absolute right-4 sm:right-8 text-white hover:text-gold transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].caption}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <p className="text-text-muted text-sm text-center mt-4">
              {filtered[lightbox].caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
