import { products, phone, money, productPath, contactMessage } from '../data/products';
import { setupCarousels } from './carousel';

/** Progressive enhancement only: the server-rendered links remain usable without JS. */
type DataRecord = Record<string, unknown>;
type Interest = { id: string; option?: string };
type ProductOption = { id: string; label: string; price: number | null };
type SiteProduct = {
  id: string;
  name: string;
  location: string;
  price: number | null;
  options: ProductOption[];
  raw: DataRecord;
};

const STORAGE_KEY = 'activos:last-interest';
const CATEGORIES = new Set(['todos', 'Campo', 'Transporte', 'Energía', 'Inmuebles']);

function isRecord(value: unknown): value is DataRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function firstText(record: DataRecord, keys: readonly string[]): string {
  for (const key of keys) {
    const value = text(record[key]);
    if (value) return value;
  }
  return '';
}

function numericPrice(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && /^\d+(?:\.\d+)?$/.test(value.trim())) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function readOptions(value: unknown): ProductOption[] {
  const entries: unknown[] = Array.isArray(value)
    ? value
    : isRecord(value)
      ? Object.entries(value).map(([id, option]) => (
        isRecord(option) ? { ...option, id: text(option.id) || id } : { id, price: option }
      ))
      : [];
  return entries.flatMap((entry): ProductOption[] => {
    if (!isRecord(entry)) return [];
    const id = text(entry.id);
    if (!id) return [];
    return [{
      id,
      label: firstText(entry, ['label', 'name', 'title']) || (id === 'tanque' ? 'Tanque solo' : 'Camión + tanque'),
      price: numericPrice(entry.price),
    }];
  });
}

function readProducts(value: unknown): SiteProduct[] {
  const entries: unknown[] = Array.isArray(value)
    ? value
    : isRecord(value)
      ? Object.entries(value).map(([id, product]) => (
        isRecord(product) ? { ...product, id: text(product.id) || id } : product
      ))
      : [];
  return entries.flatMap((entry): SiteProduct[] => {
    if (!isRecord(entry)) return [];
    const id = text(entry.id);
    if (!id) return [];
    return [{
      id,
      name: firstText(entry, ['name', 'title']) || id,
      location: firstText(entry, ['location', 'locationLabel', 'locality']),
      price: numericPrice(entry.price),
      options: readOptions(entry.options || (id === 'camion' ? [
        { id: 'conjunto', label: 'Camión + tanque', price: entry.price },
        entry.secondaryOption,
      ] : [])),
      raw: entry,
    }];
  });
}

const catalog = readProducts(products);
const productById = new Map(catalog.map((product) => [product.id, product]));

function validInterest(value: unknown): Interest | null {
  if (!isRecord(value)) return null;
  const id = text(value.id);
  const product = productById.get(id);
  if (!product) return null;
  const option = text(value.option);
  return option && product.options.some((item) => item.id === option) ? { id, option } : { id };
}

function loadInterest(): Interest | null {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? validInterest(JSON.parse(stored) as unknown) : null;
  } catch {
    return null;
  }
}

function rootProduct(): SiteProduct | undefined {
  return productById.get(document.documentElement.dataset.productId || '');
}

let rememberedInterest: Interest | null = null;
let storageWritable = true;

function remember(interest: Interest): void {
  rememberedInterest = validInterest(interest);
  if (!rememberedInterest) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rememberedInterest));
    storageWritable = true;
  } catch {
    storageWritable = false;
    // Private browsing or blocked storage must not prevent this visit's interaction.
  }
}

function freshInterest(): Interest | null {
  return storageWritable ? loadInterest() || rememberedInterest : rememberedInterest;
}

function resolveInterest(element?: HTMLElement): Interest | null {
  // An explicit (even invalid) product never accidentally inherits another product's option.
  if (element?.hasAttribute('data-product-id')) {
    const id = element.dataset.productId || '';
    const product = productById.get(id);
    if (!product) return null;
    const explicitOption = element.dataset.optionId;
    if (explicitOption !== undefined) return validInterest({ id, option: explicitOption });
    const stored = freshInterest();
    return stored?.id === id ? stored : { id };
  }
  const product = rootProduct();
  if (product) {
    if (element?.hasAttribute('data-option-id')) {
      return validInterest({ id: product.id, option: element.dataset.optionId });
    }
    const stored = freshInterest();
    return stored?.id === product.id ? stored : { id: product.id };
  }
  const stored = freshInterest();
  if (stored && element?.hasAttribute('data-option-id')) {
    return validInterest({ id: stored.id, option: element.dataset.optionId });
  }
  return stored;
}

function isPrivateHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.$/, '');
  if (!host || host === 'localhost' || host === '::1' || host === '::' || host.endsWith('.localhost')
    || host.endsWith('.local') || host.endsWith('.internal')) return true;
  if (host.includes(':')) return /^(?:f[cd]|fe[89ab])/i.test(host) || host.startsWith('::ffff:');
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    const [a, b] = host.split('.').map(Number);
    return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254)
      || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)
      || (a === 100 && b >= 64 && b <= 127) || a >= 224;
  }
  return !host.includes('.');
}

function publicOrigin(): string | null {
  const configured = document.documentElement.dataset.publicOrigin?.trim();
  for (const candidate of [configured, window.location.origin]) {
    if (!candidate) continue;
    try {
      const url = new URL(candidate);
      if ((url.protocol === 'https:' || url.protocol === 'http:') && !isPrivateHostname(url.hostname)) {
        return url.origin;
      }
    } catch {
      // Ignore malformed origins rather than putting them into external messages.
    }
  }
  return null;
}

function canonicalPath(product?: SiteProduct): string {
  if (!product) return '/';
  const record = products.find((item) => item.id === product.id);
  return record ? productPath(record) : '/';
}

function siteUrl(product?: SiteProduct): string {
  const path = canonicalPath(product);
  const origin = publicOrigin();
  return origin ? new URL(path, origin).href : path;
}

function priceLabel(price: number | null): string {
  return price === null ? 'Precio a consultar' : money(price);
}

function whatsappText(interest: Interest | null): string {
  const record = interest ? products.find((item) => item.id === interest.id) : undefined;
  return contactMessage(record, interest?.option, publicOrigin() || undefined);
}

function updateWhatsapp(anchor: HTMLAnchorElement): void {
  const number = String(phone).replace(/\D/g, '');
  if (!number) return; // Retain the parent-supplied no-JS link if the data is incomplete.
  anchor.href = `https://wa.me/${number}?text=${encodeURIComponent(whatsappText(resolveInterest(anchor)))}`;
}

function updateInterestUI(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[data-whatsapp]').forEach(updateWhatsapp);
  document.querySelectorAll<HTMLElement>('button[data-option-id]').forEach((button) => {
    const id = button.dataset.productId || rootProduct()?.id;
    const product = id ? productById.get(id) : undefined;
    if (!product) return;
    const stored = freshInterest();
    const selected = stored?.id === product.id ? stored.option : undefined;
    const defaultOption = product.options.find((option) => option.id !== 'tanque')?.id;
    const active = selected || defaultOption || '';
    button.setAttribute('aria-pressed', String((button.dataset.optionId || '') === active));
  });
  document.querySelectorAll<HTMLElement>('[data-current-price], [data-current-option]').forEach((node) => {
    const interest = resolveInterest(node);
    const product = interest ? productById.get(interest.id) : undefined;
    if (!product) return;
    const option = product.options.find((item) => item.id === interest?.option);
    if (node.hasAttribute('data-current-price')) {
      node.textContent = priceLabel(option?.price ?? product.price);
    }
    if (node.hasAttribute('data-current-option')) {
      node.textContent = option?.label || (product.id === 'camion' ? 'Camión + tanque' : 'Precio de venta');
    }
  });
}

let toastTimer: ReturnType<typeof window.setTimeout> | undefined;

function notify(message: string): void {
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  if (!toast) return;
  if (toastTimer !== undefined) window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
    toast.textContent = '';
    toastTimer = undefined;
  }, 6500);
}

function manualCopy(url: string): void {
  const fallback = document.querySelector<HTMLElement>('[data-share-fallback]');
  if (fallback) {
    fallback.hidden = false;
    const input = fallback instanceof HTMLInputElement || fallback instanceof HTMLTextAreaElement
      ? fallback : fallback.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
    if (input) {
      input.value = url;
      input.readOnly = true;
      input.focus();
      input.select();
    } else {
      fallback.textContent = url;
    }
    const dialog = fallback instanceof HTMLDialogElement ? fallback : fallback.closest('dialog');
    if (dialog instanceof HTMLDialogElement && !dialog.open && typeof dialog.showModal === 'function') {
      dialog.showModal();
      input?.focus();
      input?.select();
    }
  }
  notify(`Copia este enlace: ${url}`);
}

async function copyUrl(url: string): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      notify('Enlace copiado.');
      return;
    }
  } catch {
    // Clipboard permission can be refused; try the local compatibility fallback.
  }
  const previousFocus = document.activeElement;
  const textarea = document.createElement('textarea');
  textarea.value = url;
  textarea.readOnly = true;
  textarea.setAttribute('aria-label', 'Enlace para copiar');
  textarea.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;';
  const openDialog = document.querySelector<HTMLDialogElement>('dialog[open]');
  (openDialog || document.body).append(textarea);
  let copied = false;
  try {
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, url.length);
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  } finally {
    textarea.remove();
    if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
      previousFocus.focus({ preventScroll: true });
    }
  }
  if (copied) notify('Enlace copiado.');
  else manualCopy(url);
}

async function share(element: HTMLElement, forceCopy: boolean): Promise<void> {
  const product = element.hasAttribute('data-product-id')
    ? productById.get(element.dataset.productId || '') : rootProduct();
  const url = siteUrl(product);
  if (!forceCopy && publicOrigin() && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title: product?.name || 'Activos en venta',
        text: product ? `Consulta ${product.name}.` : 'Consulta los activos en venta.',
        url,
      });
      return;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') return;
      if (isRecord(error) && error.name === 'AbortError') return;
    }
  }
  await copyUrl(url);
}

function filterCatalog(value: string): void {
  if (!CATEGORIES.has(value)) return;
  const container = document.querySelector<HTMLElement>('#catalogo');
  if (!container) return;
  let visible = 0;
  container.querySelectorAll<HTMLElement>('[data-product-card]').forEach((card) => {
    const category = card.dataset.category || card.querySelector<HTMLElement>('[data-category]')?.dataset.category;
    const show = value === 'todos' || category === value;
    card.hidden = !show;
    if (show) visible += 1;
  });
  document.querySelectorAll<HTMLElement>('[data-filter]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === value));
  });
  document.querySelectorAll<HTMLElement>('[data-catalog-count]').forEach((node) => {
    node.textContent = `${visible} ${visible === 1 ? 'activo disponible' : 'activos disponibles'}`;
  });
}

function setMenu(open: boolean): void {
  const menu = document.querySelector<HTMLElement>('[data-mobile-nav]');
  if (!menu) return;
  menu.hidden = !open;
  document.querySelectorAll<HTMLElement>('[data-menu-toggle]').forEach((toggle) => {
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function initialize(): void {
  rememberedInterest = loadInterest();
  const product = rootProduct();
  if (product) {
    // Revisiting the truck keeps a tank-only choice; visiting any other product resets it.
    remember(rememberedInterest?.id === product.id ? rememberedInterest : { id: product.id });
  }
  updateInterestUI();
  const initialFilter = document.querySelector<HTMLElement>('[data-filter][aria-pressed="true"]')?.dataset.filter;
  if (document.querySelector('#catalogo [data-product-card]')) filterCatalog(initialFilter || 'todos');
  const menu = document.querySelector<HTMLElement>('[data-mobile-nav]');
  if (menu) setMenu(!menu.hidden);
  setupCarousels();

  document.addEventListener('click', (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target;
    const option = target.closest<HTMLElement>('button[data-option-id]');
    if (option) {
      const id = option.dataset.productId || rootProduct()?.id;
      const product = id ? productById.get(id) : undefined;
      const optionId = option.dataset.optionId || '';
      if (product && (!optionId || product.options.some((item) => item.id === optionId))) {
        event.preventDefault();
        remember(optionId ? { id: product.id, option: optionId } : { id: product.id });
        updateInterestUI();
      }
    }
    const whatsapp = target.closest<HTMLAnchorElement>('a[data-whatsapp]');
    if (whatsapp) updateWhatsapp(whatsapp); // Synchronous refresh before the native navigation.
    const shareButton = target.closest<HTMLElement>('[data-share], [data-copy-link]');
    if (shareButton) {
      event.preventDefault();
      void share(shareButton, shareButton.hasAttribute('data-copy-link')).catch(() => {
        const item = shareButton.hasAttribute('data-product-id')
          ? productById.get(shareButton.dataset.productId || '') : rootProduct();
        manualCopy(siteUrl(item));
      });
    }
    const filter = target.closest<HTMLElement>('[data-filter]');
    if (filter) {
      event.preventDefault();
      filterCatalog(filter.dataset.filter || '');
    }
    if (target.closest('[data-menu-toggle]')) {
      event.preventDefault();
      const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');
      if (mobileNav) setMenu(Boolean(mobileNav.hidden));
    } else if (target.closest('[data-mobile-nav] a')) {
      setMenu(false);
    }
  });

  document.addEventListener('auxclick', (event: MouseEvent) => {
    if (event.target instanceof Element) {
      const anchor = event.target.closest<HTMLAnchorElement>('a[data-whatsapp]');
      if (anchor) updateWhatsapp(anchor);
    }
  });
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');
    if (mobileNav && !mobileNav.hidden) {
      setMenu(false);
      document.querySelector<HTMLElement>('[data-menu-toggle]')?.focus();
    }
  });
  window.addEventListener('pageshow', () => {
    const current = rootProduct();
    if (current) {
      const stored = freshInterest();
      remember(stored?.id === current.id ? stored : { id: current.id });
    }
    updateInterestUI();
  });
  window.addEventListener('storage', (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      rememberedInterest = loadInterest();
      updateInterestUI();
    }
  });

  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (header) {
    const updateHeader = (): void => {
      if (window.scrollY > 20) header.dataset.scrolled = '';
      else delete header.dataset.scrolled;
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}
