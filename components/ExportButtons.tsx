
import React from 'react';
import { FileSpreadsheet, Presentation } from 'lucide-react';
import * as XLSX from 'xlsx';
import pptxgen from 'pptxgenjs';
import { WebsiteSegment } from '../types';

interface ExportButtonsProps {
  segments: WebsiteSegment[];
  domain: string;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ segments, domain }) => {
  const exportToExcel = () => {
    const data = segments.map(s => ({
      'Segment': s.segmentName,
      'URL Example': s.urlExample,
      'JSON-LD Format': s.jsonLd
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Segments');
    
    // Auto-size columns
    const maxWidth = 50;
    worksheet['!cols'] = [
      { wch: 20 },
      { wch: 40 },
      { wch: maxWidth }
    ];

    XLSX.writeFile(workbook, `${domain}_seo_structured_data.xlsx`);
  };

  const exportToPPT = () => {
    const ppt = new pptxgen();
    
    // Title Slide
    let slide = ppt.addSlide();
    slide.addText('Structured Data & Segment Overview', {
      x: 0.5, y: 1.5, w: '90%', h: 1,
      fontSize: 44, color: '363636', bold: true, align: 'center'
    });
    slide.addText(`Website Analysis: ${domain}`, {
      x: 0.5, y: 2.5, w: '90%', h: 0.5,
      fontSize: 24, color: '666666', align: 'center'
    });

    // Segment Slides
    segments.forEach((seg) => {
      const segSlide = ppt.addSlide();
      
      segSlide.addText(seg.segmentName, {
        x: 0.5, y: 0.5, w: 9, h: 0.5,
        fontSize: 32, bold: true, color: '2563EB'
      });

      segSlide.addText('Example URL:', { x: 0.5, y: 1.2, w: 2, h: 0.3, fontSize: 18, bold: true });
      segSlide.addText(seg.urlExample, { x: 0.5, y: 1.5, w: 9, h: 0.4, fontSize: 14, color: '0000EE' });

      segSlide.addText('JSON-LD Description:', { x: 0.5, y: 2.2, w: 4, h: 0.3, fontSize: 18, bold: true });
      segSlide.addText(seg.description, { x: 0.5, y: 2.5, w: 9, h: 0.4, fontSize: 14 });

      segSlide.addText('Structured Data (JSON-LD):', { x: 0.5, y: 3.2, w: 4, h: 0.3, fontSize: 18, bold: true });
      segSlide.addText(seg.jsonLd, {
        x: 0.5, y: 3.5, w: 9, h: 3,
        fontSize: 10,
        fontFace: 'Courier New',
        color: '333333',
        fill: { color: 'F3F4F6' },
        valign: 'top',
        wrap: true
      });
    });

    ppt.writeFile({ fileName: `${domain}_seo_presentation.pptx` });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-12 mb-16">
      <button
        onClick={exportToExcel}
        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20"
      >
        <FileSpreadsheet className="w-5 h-5" />
        Export to Excel (.xlsx)
      </button>
      <button
        onClick={exportToPPT}
        className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-orange-500/20"
      >
        <Presentation className="w-5 h-5" />
        Export to PowerPoint (.pptx)
      </button>
    </div>
  );
};

export default ExportButtons;
