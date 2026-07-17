export type PortfolioProject = {
  src: string;
  title: string;
  location: string;
  ratio?: 'landscape' | 'portrait' | 'square';
  size?: 'feature' | 'standard' | 'compact';
  position?: string;
  lowResolution?: boolean;
};
