import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FevoriteService {
  constructor() {}

  fevotiteCart$: Subject<any> = new Subject();

  initFevoriteLocalStorage() {
    const fData = this.getFevoriteData();
    if (!fData) {
      const initFevorite = {
        items: [],
      };
      const initFevoriteJson = JSON.stringify(initFevorite);
      localStorage.setItem('fevorite', initFevoriteJson);
    }
  }

  getFevoriteData() {
    const fevoriteData = JSON.parse(localStorage.getItem('fevorite') || '{}');
    return fevoriteData;
  }

  setFevoriteItem(itemFev: any) {
    const fevorite = this.getFevoriteData();
    const fevoriteItemExist = fevorite.items.find(
      (item: any) => item.fVideoId === itemFev.fVideoId
    );
    if (fevoriteItemExist) {
      let index = fevorite.items.findIndex(
        (element: any) => element.fVideoId === itemFev.fVideoId
      );

      let fItems = fevorite.items.splice(index, 1);
      localStorage.setItem('fevorite', JSON.stringify(fItems));
      // localStorage.setItem('fevorite', initFevoriteJson);
    } else {
      fevorite.items.push(itemFev);
    }

    //fevorite.items.push(itemFev);
    const FevoriteJson = JSON.stringify(fevorite);
    localStorage.setItem('fevorite', FevoriteJson);
    this.fevotiteCart$.next(fevorite);
    return fevorite;
  }
}
