'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  quality?: number;
};

export default function ParallaxImage({
  src,
  alt,
  sizes,
  className = '',
  imageClassName = '',
  priority = false,
  quality = 90,
}: ParallaxImageProps) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <motion.div
      ref={root}
      className={`relative overflow-hidden ${className}`}
      initial={reducedMotion ? false : { clipPath: 'inset(0 0 14% 0)' }}
      whileInView={reducedMotion ? undefined : { clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute -inset-y-[6%] inset-x-0 will-change-transform"
        style={reducedMotion ? undefined : { y: imageY }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={imageClassName}
        />
      </motion.div>
    </motion.div>
  );
}
