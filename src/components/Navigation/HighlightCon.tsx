import type { RefObject } from 'react';

interface HighlightConProps {
  highlightRef: RefObject<HTMLDivElement | null>;
}

export default function HighlightCon({ highlightRef }: HighlightConProps) {
  return <div className="highlight-con" ref={highlightRef}></div>;
}
