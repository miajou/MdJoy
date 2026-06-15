export interface Chapter {
  num: number;
  title: string;
  titleBn: string;
  sections: string;
}

export interface Section {
  id: string;
  num: number;
  title: string;
  titleBn: string;
  text: string;
  textBn: string;
  chapter: number;
  tag: string[];
  isFavorite?: boolean;
  lawColor?: string;
  lawTitle?: string;
  lawCode?: string;
  lawId?: string;
}

export interface Law {
  id: string;
  code: string;
  title: string;
  titleBn: string;
  year: number;
  category: string;
  color: string;
  icon: string;
  totalSections: number;
  description: string;
  descriptionBn: string;
  chapters: Chapter[];
  sections: Section[];
}

export interface Update {
  id: number;
  law: string;
  type: string;
  date: string;
  summary: string;
  summaryBn: string;
  badge: string;
}
