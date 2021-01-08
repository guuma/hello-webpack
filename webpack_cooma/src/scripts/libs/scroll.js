class ScrollObserver {
  constructor(elements, cb, options) {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
      once: true,
    };
    this.elements = document.querySelectorAll(elements);
    this.cb = cb;
    // this.options = Object.assign(defaultOptions, options);
    // スプレッド構文でも同じように書ける
    this.options = { ...defaultOptions, ...options };
    this.once = this.options.once;
    this._init();
  }
  _init() {
    const callback = function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.cb(entry.target, true);
          if (this.once) {
            observer.unobserve(entry.target);
          }
        } else {
          this.cb(entry.target, false);
        }
      });
    };
    // IntersectionObserverはwindowオブジェクトに属するクラス
    // なのでここでのthisはwindowとなる
    this.io = new IntersectionObserver(callback.bind(this), this.options);
    console.log(this.io);
    this.elements.forEach((ele) => this.io.observe(ele));
  }
  destroy() {
    this.io.disconnect();
  }
}