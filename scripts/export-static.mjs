import { cp, lstat, readdir, rm } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'dist');
const target = join(root, 'html');
const allowed = new Set(['.html', '.css', '.js', '.mjs', '.json', '.txt', '.xml', '.svg', '.webp', '.mp4', '.woff', '.woff2', '.ttf', '.otf', '.ico']);

async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink() || entry.name.startsWith('.')) throw new Error(`Recurso no publicable: ${entry.name}`);
    if (entry.isDirectory()) await inspect(path);
    else if (!allowed.has(extname(entry.name).toLowerCase())) throw new Error(`Extensión no publicable: ${entry.name}`);
  }
}

if (!(await lstat(join(source, 'index.html'))).isFile()) throw new Error('Compile el sitio antes de exportarlo.');
await inspect(source);
await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true, errorOnExist: true, force: false });
console.log('HTML y recursos públicos exportados a html/.');
