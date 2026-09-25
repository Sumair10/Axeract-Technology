export const BRAND_COLOR = "#155662";

/** Runs before hydration so the first paint already carries the right theme. */
export const BOOT_SCRIPT = `
(function(){try{
var d=document.documentElement;
var t=localStorage.getItem('axeract-theme');
d.dataset.theme=(t==='dark'||t==='light')?t:'light';
if(location.search.indexOf('noanim')>-1)d.dataset.noanim='1';
if(location.search.indexOf('theme=dark')>-1)d.dataset.theme='dark';
}catch(e){document.documentElement.dataset.theme='light'}})();
`;
