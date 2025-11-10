'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageProps {
  src: string;
  alt: string;
}

interface AcervoGalleryProps {
  images: ImageProps[];
}

export function AcervoGallery({ images }: AcervoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const currentImage = images[currentIndex];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="container mx-auto px-4 py-12"
    >
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Nossa Coleção</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => handleOpen(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-semibold">Ver Detalhes</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 border-none bg-transparent">
          <div className="relative flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            {currentImage && (
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={800}
                height={600}
                className="max-h-[80vh] object-contain"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          {currentImage && (
            <p className="text-center text-white mt-4 text-lg">{currentImage.alt}</p>
          )}
        </DialogContent>
      </Dialog>
    </motion.section>
  );
}