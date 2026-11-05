/** Enhance native, independently scrollable carousels. The caller initializes them. */
export function setupCarousels(): void {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector<HTMLElement>('[data-carousel-track]');

    if (!track || track.dataset.carouselInitialized === 'true') return;
    track.dataset.carouselInitialized = 'true';

    const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-carousel-slide]'));
    const links = slides.map((slide) => Array.from(
      slide.querySelectorAll<HTMLAnchorElement>('[data-carousel-link]'),
    ));
    const dots = Array.from(carousel.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]'));
    const previous = carousel.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const next = carousel.querySelector<HTMLButtonElement>('[data-carousel-next]');
    const counter = carousel.querySelector<HTMLElement>('[data-carousel-count]');
    const caption = carousel.querySelector<HTMLElement>('[data-carousel-caption]');
    const count = slides.length;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let currentIndex = 0;
    let lastWidth = track.clientWidth;
    let scrollFrame: number | null = null;
    let pointerActive = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerStartScrollLeft = 0;
    let swipeDetected = false;

    const clampIndex = (index: number): number => Math.max(0, Math.min(index, count - 1));

    function updateUI(index: number): void {
      currentIndex = count > 0 ? clampIndex(index) : 0;

      dots.forEach((dot) => {
        const active = Number(dot.dataset.carouselDot) === currentIndex;
        dot.setAttribute('aria-current', String(active));
        dot.setAttribute('aria-pressed', String(active));
      });

      slides.forEach((slide, slideIndex) => {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-label', `${slideIndex + 1} de ${count}`);
        slide.setAttribute('aria-hidden', String(slideIndex !== currentIndex));
        links[slideIndex].forEach((link) => {
          link.tabIndex = slideIndex === currentIndex ? 0 : -1;
        });
      });

      if (counter) counter.textContent = `${count > 0 ? currentIndex + 1 : 0} / ${count}`;
      if (caption) caption.textContent = slides[currentIndex]?.dataset.caption || '';
      if (previous) previous.disabled = count <= 1;
      if (next) next.disabled = count <= 1;
    }

    function syncFromScroll(): void {
      const width = track!.clientWidth;
      if (width > 0) updateUI(Math.round(track!.scrollLeft / width));
    }

    function cancelScrollFrame(): void {
      if (scrollFrame === null) return;
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = null;
    }

    function goTo(index: number): void {
      if (count <= 1) return;
      cancelScrollFrame();

      // Show the requested slide immediately; scroll events also reflect any
      // intermediate slides while native smooth scrolling reaches this position.
      const target = clampIndex(index);
      updateUI(target);
      track!.scrollTo({
        left: target * track!.clientWidth,
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
      });
    }

    function step(direction: number): void {
      if (count > 1) goTo((currentIndex + direction + count) % count);
    }

    previous?.addEventListener('click', () => step(-1));
    next?.addEventListener('click', () => step(1));

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.carouselDot);
        if (Number.isInteger(index)) goTo(index);
      });
    });

    track.addEventListener('scroll', () => {
      if (pointerActive && track.scrollLeft !== pointerStartScrollLeft) {
        swipeDetected = true;
      }
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = null;
        syncFromScroll();
      });
    }, { passive: true });

    // Browsers without scrollend still synchronize through the scroll listener.
    track.addEventListener('scrollend', () => {
      cancelScrollFrame();
      syncFromScroll();
    }, { passive: true });

    if (links.some((slideLinks) => slideLinks.length > 0)) {
      track.addEventListener('pointerdown', (event: PointerEvent) => {
        pointerActive = true;
        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
        pointerStartScrollLeft = track.scrollLeft;
        swipeDetected = false;
      }, { passive: true });

      track.addEventListener('pointermove', (event: PointerEvent) => {
        if (!pointerActive) return;
        const movedX = event.clientX - pointerStartX;
        const movedY = event.clientY - pointerStartY;
        if (Math.hypot(movedX, movedY) > 10 || track.scrollLeft !== pointerStartScrollLeft) {
          swipeDetected = true;
        }
      }, { passive: true });

      const finishPointerGesture = (): void => {
        if (pointerActive && track.scrollLeft !== pointerStartScrollLeft) {
          swipeDetected = true;
        }
        pointerActive = false;
      };

      track.addEventListener('pointerup', finishPointerGesture, { passive: true });
      track.addEventListener('pointercancel', finishPointerGesture, { passive: true });

      track.addEventListener('click', (event: MouseEvent) => {
        if (event.detail === 0 || !swipeDetected) return;
        const target = event.target;
        if (!(target instanceof Element)) return;
        const link = target.closest<HTMLAnchorElement>('[data-carousel-link]');
        if (link?.closest('[data-carousel-track]') !== track) return;
        event.preventDefault();
      }, { capture: true });
    }

    carousel.addEventListener('keydown', (event: KeyboardEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('[data-carousel]') !== carousel) return;

      const isTrack = target === track;
      const isControl = target instanceof HTMLButtonElement
        && target.closest('.carousel-controls') !== null;
      if (!isTrack && !isControl) return;

      // Enter and Space remain native button activation, including on dots.
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          step(-1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          step(1);
          break;
        case 'Home':
          event.preventDefault();
          goTo(0);
          break;
        case 'End':
          event.preventDefault();
          goTo(count - 1);
          break;
      }
    });

    updateUI(lastWidth > 0 ? Math.round(track.scrollLeft / lastWidth) : 0);

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        const width = track.clientWidth;
        if (width === lastWidth) return;
        lastWidth = width;
        if (width <= 0) return;

        // Re-align the same slide after a breakpoint change. Only a changed
        // width triggers this, so scrolling cannot cause a resize loop.
        cancelScrollFrame();
        track.scrollTo({ left: currentIndex * width, behavior: 'auto' });
        updateUI(currentIndex);
      });
      observer.observe(track);
    }
  });
}
