import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDesignation'
})
export class SearchDesignationPipe implements PipeTransform {

  transform(items: any[], SearchJob: string): any[] {
    if (!items) return [];
    if (!SearchJob) return items;

    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(SearchJob.toLowerCase());
      });
    });
  }
}
