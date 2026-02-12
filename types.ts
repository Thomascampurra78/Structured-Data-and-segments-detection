
export interface WebsiteSegment {
  segmentName: string;
  urlExample: string;
  jsonLd: string;
  description: string;
}

export interface AnalysisResponse {
  segments: WebsiteSegment[];
}
