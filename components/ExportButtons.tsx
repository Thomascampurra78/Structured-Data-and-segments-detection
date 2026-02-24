
import React from 'react';
import { FileSpreadsheet, Presentation } from 'lucide-react';
import * as XLSX from 'xlsx';
import pptxgen from 'pptxgenjs';
import { UrlAnalysis } from '../types';

interface ExportButtonsProps {
  results: UrlAnalysis[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ results }) => {
  const exportToExcel = () => {
    const data = results.map(r => ({
      'URL': r.url,
      'Segment': r.segment,
      'Schema Type': r.schemaType,
      'JSON-LD': r.jsonLd,
      'Explanation': r.explanation
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Schema Data');
    
    worksheet['!cols'] = [
      { wch: 40 },
      { wch: 15 },
      { wch: 20 },
      { wch: 60 },
      { wch: 40 }
    ];

    const timestamp = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `seo_structured_data_${timestamp}.xlsx`, { bookType: 'xlsx' });
  };

  const exportToPPT = () => {
    const ppt = new pptxgen();
    
    let slide = ppt.addSlide();
    slide.addText('Structured Data & URL Overview', {
      x: 0.5, y: 1.5, w: '90%', h: 1,
      fontSize: 44, color: '363636', bold: true, align: 'center'
    });
    slide.addText(`Bulk Processing Report (${results.length} URLs)`, {
      x: 0.5, y: 2.5, w: '90%', h: 0.5,
      fontSize: 24, color: '666666', align: 'center'
    });

    results.forEach((item) => {
      const itemSlide = ppt.addSlide();
      
      itemSlide.addText(item.schemaType, {
        x: 0.5, y: 0.3, w: 9, h: 0.5,
        fontSize: 28, bold: true, color: '2563EB'
      });

      itemSlide.addText('URL:', { x: 0.5, y: 1.0, w: 1, h: 0.3, fontSize: 14, bold: true });
      itemSlide.addText(item.url, { x: 0.5, y: 1.3, w: 9, h: 0.4, fontSize: 11, color: '0000EE' });

      itemSlide.addText('Logic:', { x: 0.5, y: 1.9, w: 1, h: 0.3, fontSize: 14, bold: true });
      itemSlide.addText(item.explanation, { x: 0.5, y: 2.2, w: 9, h: 0.4, fontSize: 11 });

      itemSlide.addText('Structured Data:', { x: 0.5, y: 2.8, w: 2, h: 0.3, fontSize: 14, bold: true });
      itemSlide.addText(item.jsonLd, {
        x: 0.5, y: 3.2, w: 9, h: 4,
        fontSize: 8,
        fontFace: 'Courier New',
        color: '333333',
        fill: { color: 'F3F4F6' },
        valign: 'top',
        wrap: true
      });
    });

    ppt.writeFile({ fileName: `bulk_schema_presentation.pptx` });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-12 mb-16">
      <button
        onClick={exportToExcel}
        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20"
      >
        <FileSpreadsheet className="w-5 h-5" />
        Excel Export
      </button>
      <button
        onClick={exportToPPT}
        className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-orange-500/20"
      >
        <Presentation className="w-5 h-5" />
        PPT Export
      </button>
    </div>
  );
};

export default ExportButtons;
