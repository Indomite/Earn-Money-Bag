export function debounce(callback, time) {
  let timer;
  return function (...props) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback.bind(this, ...props), time);
  }
}