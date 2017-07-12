import { Injectable } from '@angular/core';

@Injectable()
export class StaticDataService {
  private columnLabelMapping: any = {
    all: 'All',
    en: 'English',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    es: 'Spanish',
    pt: 'Portugese',
    nl: 'Dutch',
    ja: 'Japanese'
  }

  constructor() { }

  getLanguageNameMappings(code: string) : string {
    return this.columnLabelMapping[code];
  }

}
