
export interface UrlAnalysis {
  url: string;
  segment: string;
  schemaType: string;
  jsonLd: string;
  explanation: string;
}

export interface AnalysisResponse {
  results: UrlAnalysis[];
}
