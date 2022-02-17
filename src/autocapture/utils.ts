import { IUser } from "../types";
import { EventType, FeatureFlagType, IExptMetricSetting, IZeroCode, UrlMatchType, ICSS } from "./types";

// test if the current page url mathch the given url
export function isUrlMatch(matchType: UrlMatchType, url: string): boolean {
    const current_page_url = window.location.href;
    if (url === null || url === undefined || url === '') {
      return true;
    }
    
    switch(matchType){
      case UrlMatchType.Substring:
        return current_page_url.includes(url);
      default:
        return false;
    }
  }

export function groupBy (xs: any, key: string): {[key: string] : any} {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

export function extractCSS(css: string): ICSS[] {
    return css.trim().replace(/(?:\r\n|\r|\n)/g, ';')
      .replace(/\w*([\W\w])+\{/g, '')
      .replace(/(?:\{|\})/g, '')
      .split(';')
      .filter(c => c.trim() !== '')
      .map(c => {
        const style = c.split(':');
        if (style.length === 2) {
          return {
            name: style[0].trim(),
            value: style[1].trim()
          }
        }
        
        return {
          name: '',
          value: ''
        }
      })
      .filter(s => {
        return s.name !== '' && s.value !== ''
      });
  }