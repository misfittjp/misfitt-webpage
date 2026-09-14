export interface CaseStudyPhoto {
  src: string;
  alt: string;
  orientation?: 'portrait' | 'landscape';
  captionEn: string;
  captionJa: string;
}

export interface CaseStudyItem {
  id: string;
  meta: {
    guest: string;
    origin: string;
    group: string;
    date: string;
    route: string;
  };
  coverImage: string;
  en: {
    title: string;
    subtitle: string;
    fieldNote: string;
    dialogue: {
      request: string;
      curation: string;
    };
    guestVoice: string;
  };
  ja: {
    title: string;
    subtitle: string;
    fieldNote: string;
    dialogue: {
      request: string;
      curation: string;
    };
    guestVoice: string;
  };
  gallery: CaseStudyPhoto[];
}
