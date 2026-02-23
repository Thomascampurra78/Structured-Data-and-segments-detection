
export interface UrlAnalysis {
  url: string;
  schemaType: string;
  jsonLd: string;
  explanation: string;
}

export interface AnalysisResponse {
  results: UrlAnalysis[];
}
