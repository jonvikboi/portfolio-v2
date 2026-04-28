"use client";

interface InvertedCornersProps {
  top?: boolean;
  bottom?: boolean;
  className?: string; // e.g. "bg-black/40 backdrop-blur-lg"
}

export function InvertedCorners({ top, bottom, className = "" }: InvertedCornersProps) {
  return (
    <>
      {top && (
        <div 
          className={`absolute -top-[80px] left-0 w-full h-[80px] z-[5] pointer-events-none ${className}`}
          style={{
            maskImage: 'radial-gradient(circle at top right, transparent 80px, black 81px), radial-gradient(circle at top left, transparent 80px, black 81px)',
            WebkitMaskImage: 'radial-gradient(circle at top right, transparent 80px, black 81px), radial-gradient(circle at top left, transparent 80px, black 81px)',
            maskSize: '80px 80px, 80px 80px',
            WebkitMaskSize: '80px 80px, 80px 80px',
            maskRepeat: 'no-repeat, no-repeat',
            WebkitMaskRepeat: 'no-repeat, no-repeat',
            maskPosition: 'left bottom, right bottom',
            WebkitMaskPosition: 'left bottom, right bottom',
          }}
        />
      )}
      {bottom && (
        <div 
          className={`absolute -bottom-[80px] left-0 w-full h-[80px] z-[5] pointer-events-none ${className}`}
          style={{
            maskImage: 'radial-gradient(circle at bottom right, transparent 80px, black 81px), radial-gradient(circle at bottom left, transparent 80px, black 81px)',
            WebkitMaskImage: 'radial-gradient(circle at bottom right, transparent 80px, black 81px), radial-gradient(circle at bottom left, transparent 80px, black 81px)',
            maskSize: '80px 80px, 80px 80px',
            WebkitMaskSize: '80px 80px, 80px 80px',
            maskRepeat: 'no-repeat, no-repeat',
            WebkitMaskRepeat: 'no-repeat, no-repeat',
            maskPosition: 'left top, right top',
            WebkitMaskPosition: 'left top, right top',
          }}
        />
      )}
    </>
  );
}
