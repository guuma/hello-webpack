document.addEventListener('DOMContentLoaded', function () {
  new Main();
});

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this.sides = document.querySelectorAll('.side');
    this._observers = [];
    this._init();
  }
  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }
  _init() {
    new MobileMenu();
    this.hero = new HeroSlider('.swiper-container');
    Pace.on('done', this._scrollInit.bind(this));
  }

  _paceDone() {
    this._scrollInit();
  }
  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
  }
  _navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove('triggered');
    } else {
      this.header.classList.add('triggered');
    }
  }
  _textAnimation(entryTarget, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(entryTarget);
      ta.animate();
    }
  }
  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }
  _sideAnimation(el, inview) {
    if (inview) {
      console.log(this.sides);
      this.sides.forEach((side) => {
        side.classList.add('inview');
      });
    } else {
      this.sides.forEach((side) => {
        side.classList.remove('inview');
      });
    }
  }
  _destroyObservers() {
    this.observers.forEach((obj) => {
      obj.destroy();
    });
  }

  destroy() {
    this._destroyObservers();
  }
  _scrollInit() {
    this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {
      once: false,
    });
    this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);
    this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation, {
      rootMargin: '-200px 0px'
    });
    this.observers = new ScrollObserver(
      '.swiper-container',
      this._toggleSlideAnimation.bind(this),
      { once: false }
    );
    this.observers = new ScrollObserver('.appear', this._inviewAnimation);
    this.observers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), {
      once: false,
      rootMargin: '-300px 0px',
    });
  }
}
