import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page } from 'react-pdf';
import { useTranslation } from 'react-i18next';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '../setUpPDF.ts';

const buttonStyle:React.CSSProperties = {
  padding: '5px 10px',
  marginRight: '5px',
  marginTop: '5px',
  cursor: 'pointer',
  borderRadius: '5px'
}
const parseSelectedPages = (selectedPages: string, numPages: number): number[] => {
  if (selectedPages === "All") {
    return Array.from({ length: numPages }, (_, i) => i + 1);
  }

  if (selectedPages === "Odd") {
    return Array.from({ length: numPages }, (_, i) => i + 1).filter(page => page % 2 !== 0);
  }

  if (selectedPages === "Even") {
    return Array.from({ length: numPages }, (_, i) => i + 1).filter(page => page % 2 === 0);
  }

  const ranges = selectedPages.split(",");
  const pages: number[] = [];

  ranges.forEach(range => {
    if (!range.includes("-")) {
      const pageNumber = Number(range);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= numPages) {
        pages.push(pageNumber);
      }
    }
    const [start, end] = range.split("-").map(Number);
    if (!isNaN(start) && !isNaN(end)) {
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= numPages) {
          pages.push(i);
        }
      }
    }
  });

  return pages;
};
export default function Preview({ file, selectedPages }: { file: File, selectedPages: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageDimensions, setPageDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumbers(parseSelectedPages(selectedPages, numPages));
  };

  const onPageLoadSuccess = (page: any) => {
    const viewport = page.getViewport({ scale: 1 });
    setPageDimensions({ width: viewport.width, height: viewport.height });
  };

  const getPageSize = useCallback(() => {
    if (!containerRef.current) return { width: 0, height: 0 };

    const containerWidth = containerRef.current.clientWidth;
    const { width, height } = pageDimensions;
    
    if (width > height) { 
      const scale = containerWidth / width;
      return { width: width * scale, height: height * scale };
    }
   
    const scale = 500 / height;
    containerRef.current.style.width = `${width * scale}px`;
    containerRef.current.style.height = `500px`;
    return { width: width*scale, height: 500 };
  }, [pageDimensions]);

  useEffect(() => {
    if (numPages !== null) {
      setPageNumbers(parseSelectedPages(selectedPages, numPages));
      setPageIndex(0);
    }
  }, [selectedPages, numPages]);

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = getPageSize();
      setContainerSize({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getPageSize]);

  return (
    <div ref={containerRef}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {pageNumbers.length > 0 && (
          <Page
            pageNumber={pageNumbers[pageIndex]}
            width={containerSize.width}
            height={containerSize.height}
            onLoadSuccess={onPageLoadSuccess}
            loading={<div style={{ width: containerSize.width, height: containerSize.height }}>Loading...</div>}
          />
        )}
      </Document>
      {numPages && pageNumbers.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "5px" }}>
          <p>
            {t('page')} {pageIndex + 1} {t('of')} {pageNumbers.length}
          </p>
          <button
            disabled={pageIndex <= 0}
            onClick={() => setPageIndex(pageIndex - 1)}
            style={buttonStyle}
          >
            {t('previous')}
          </button>
          <button
            disabled={pageIndex >= pageNumbers.length - 1}
            onClick={() => setPageIndex(pageIndex + 1)}
            style={buttonStyle}
          >
            {t('Next')}
          </button>
        </div>
      )}
    </div>
  );
}