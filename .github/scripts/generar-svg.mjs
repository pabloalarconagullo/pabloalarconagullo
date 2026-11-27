// Genera las animaciones SVG del perfil (assets/*.svg). Sin dependencias ni servicios externos.
// Uso: node .github/scripts/generar-svg.mjs
import { mkdirSync, writeFileSync } from 'node:fs';

const FUENTE = "'Segoe UI', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, 'Cascadia Code', Consolas, Menlo, monospace";
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
mkdirSync('assets', { recursive: true });

// ---------- 1. Cabecera ----------
const simbolos = ['§', '{ }', 'Art. 56 ET', 'BOE', '</>', 'LRJS', '§', '=>', 'LGSS', '{ }'];
const flotantes = simbolos.map((s, i) => {
  const x = 40 + ((i * 97) % 560);
  const dur = 9 + (i % 4) * 2;
  const delay = -(i * 1.7);
  return `<text x="${x}" y="300" font-family="${MONO}" font-size="${13 + (i % 3) * 3}" fill="#93c5fd" opacity="0">${esc(s)}
    <animate attributeName="y" values="300;-20" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;.28;.28;0" keyTimes="0;.2;.8;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
  </text>`;
}).join('\n');

const cabecera = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="280" viewBox="0 0 1000 280" role="img" aria-label="Pablo Alarcón Agulló, Graduado Social que programa">
<defs>
  <linearGradient id="fondo" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0b1220"/><stop offset=".55" stop-color="#12284d"/><stop offset="1" stop-color="#1e3a70"/>
  </linearGradient>
  <linearGradient id="brillo" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse" spreadMethod="repeat">
    <stop offset="0" stop-color="#7dd3fc"/><stop offset=".33" stop-color="#a5b4fc"/><stop offset=".66" stop-color="#f0abfc"/><stop offset="1" stop-color="#7dd3fc"/>
    <animateTransform attributeName="gradientTransform" type="translate" values="-600 0;600 0" dur="6s" repeatCount="indefinite"/>
  </linearGradient>
  <filter id="difuso" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="40"/></filter>
  <pattern id="puntos" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#ffffff" opacity=".07"/></pattern>
  <clipPath id="marco"><rect width="1000" height="280" rx="20"/></clipPath>
</defs>
<g clip-path="url(#marco)">
  <rect width="1000" height="280" fill="url(#fondo)"/>
  <circle cx="180" cy="60" r="120" fill="#3b82f6" opacity=".35" filter="url(#difuso)">
    <animate attributeName="cx" values="180;320;180" dur="14s" repeatCount="indefinite"/>
  </circle>
  <circle cx="820" cy="230" r="130" fill="#a855f7" opacity=".30" filter="url(#difuso)">
    <animate attributeName="cy" values="230;150;230" dur="12s" repeatCount="indefinite"/>
  </circle>
  <rect width="1000" height="280" fill="url(#puntos)"/>
  ${flotantes}

  <g font-family="${FUENTE}">
    <text x="60" y="118" font-size="50" font-weight="800" fill="#ffffff" opacity="0">Pablo Alarcón Agulló
      <animate attributeName="opacity" from="0" to="1" dur=".9s" begin=".2s" fill="freeze"/>
      <animateTransform attributeName="transform" type="translate" from="0 18" to="0 0" dur=".9s" begin=".2s" fill="freeze"/>
    </text>
    <text x="62" y="166" font-size="28" font-weight="700" fill="url(#brillo)" opacity="0">Graduado Social que programa
      <animate attributeName="opacity" from="0" to="1" dur=".9s" begin=".7s" fill="freeze"/>
      <animateTransform attributeName="transform" type="translate" from="0 14" to="0 0" dur=".9s" begin=".7s" fill="freeze"/>
    </text>
    ${['Derecho del Trabajo', 'Seguridad Social', 'Legal-tech'].map((t, i) => {
      const anchos = [176, 156, 106];
      const x = 62 + anchos.slice(0, i).reduce((a, b) => a + b + 12, 0);
      return `<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin="${1.2 + i * 0.25}s" fill="freeze"/>
      <rect x="${x}" y="196" width="${anchos[i]}" height="34" rx="17" fill="#ffffff" fill-opacity=".08" stroke="#93c5fd" stroke-opacity=".45"/>
      <text x="${x + anchos[i] / 2}" y="218" font-size="15" font-weight="600" fill="#dbeafe" text-anchor="middle">${t}</text></g>`;
    }).join('\n    ')}
  </g>

  <!-- Balanza que se dibuja y oscila -->
  <g transform="translate(840 140)" fill="none" stroke="#bfdbfe" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0 -78 V78 M-44 78 H44" stroke-dasharray="210" stroke-dashoffset="210">
      <animate attributeName="stroke-dashoffset" to="0" dur="1.4s" begin=".3s" fill="freeze"/>
    </path>
    <circle cx="0" cy="-84" r="6" fill="#bfdbfe" stroke="none"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" values="-6 0 -70;6 0 -70;-6 0 -70" dur="5s" repeatCount="indefinite"/>
      <path d="M-82 -70 H82" stroke-dasharray="170" stroke-dashoffset="170">
        <animate attributeName="stroke-dashoffset" to="0" dur="1s" begin="1s" fill="freeze"/>
      </path>
      <g opacity="0"><animate attributeName="opacity" to="1" dur=".8s" begin="1.6s" fill="freeze"/>
        <path d="M-82 -70 L-108 -10 M-82 -70 L-56 -10 M-112 -10 Q-82 22 -52 -10 Z" fill="#60a5fa" fill-opacity=".25"/>
        <path d="M82 -70 L56 -10 M82 -70 L108 -10 M52 -10 Q82 22 112 -10 Z" fill="#c084fc" fill-opacity=".25"/>
        <text x="-82" y="2" font-family="${MONO}" font-size="16" fill="#e0f2fe" stroke="none" text-anchor="middle">§</text>
        <text x="82" y="2" font-family="${MONO}" font-size="14" fill="#f5d0fe" stroke="none" text-anchor="middle">&lt;/&gt;</text>
      </g>
    </g>
  </g>
</g>
</svg>`;

// ---------- 2. Línea que se escribe sola ----------
const frases = [
  'Calculadoras de despido, nómina y RETA',
  'Más de 900 sentencias comentadas',
  'Resumen diario del BOE laboral',
  'Apps con Expo, Next.js y Supabase',
  'Datos de clientes: siempre en local',
];
const POR = 4.5, T = frases.length * POR, CH = 12, X0 = 300, TAM = 20;
const tecleo = frases.map((f, i) => {
  const n = [...f].length, ancho = n * CH, t0 = i * POR;
  const tiempos = [0], anchos = [0];
  const escribir = 1.8, borrar = 0.5, inicioBorrado = POR - 0.9;
  for (let k = 1; k <= n; k++) { tiempos.push(t0 + (k / n) * escribir); anchos.push(k * CH); }
  tiempos.push(t0 + inicioBorrado); anchos.push(ancho);
  for (let k = n - 1; k >= 0; k -= 3) { tiempos.push(t0 + inicioBorrado + ((n - k) / n) * borrar); anchos.push(k * CH); }
  tiempos.push(t0 + inicioBorrado + borrar + 0.01); anchos.push(0);
  if (t0 > 0) { tiempos.splice(1, 0, t0); anchos.splice(1, 0, 0); }
  tiempos.push(T); anchos.push(0);
  const kt = tiempos.map((t) => (t / T).toFixed(4)).join(';');
  const visible = `<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;${(t0 / T).toFixed(4)};${((t0 + POR - 0.05) / T).toFixed(4)};${((t0 + POR - 0.04) / T).toFixed(4)};1" calcMode="discrete" dur="${T}s" repeatCount="indefinite"/>`;
  return `<clipPath id="c${i}"><rect x="${X0}" y="0" height="60" width="0"><animate attributeName="width" values="${anchos.join(';')}" keyTimes="${kt}" calcMode="discrete" dur="${T}s" repeatCount="indefinite"/></rect></clipPath>
  <g opacity="${i === 0 ? 1 : 0}">${visible}
    <text x="${X0}" y="38" font-family="${MONO}" font-size="${TAM}" font-weight="600" fill="#2f81f7" textLength="${ancho}" lengthAdjust="spacing" clip-path="url(#c${i})">${esc(f)}</text>
    <rect y="18" width="3" height="26" fill="#a371f7" x="${X0}">
      <animate attributeName="x" values="${anchos.map((a) => X0 + a + 2).join(';')}" keyTimes="${kt}" calcMode="discrete" dur="${T}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
    </rect>
  </g>`;
}).join('\n  ');

const escritura = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="60" viewBox="0 0 1000 60" role="img" aria-label="${frases.join('. ')}">
  <text x="${X0 - 28}" y="38" font-family="${MONO}" font-size="${TAM}" font-weight="700" fill="#3fb950">❯</text>
  ${tecleo}
</svg>`;

// ---------- 3. Cifras ----------
const cifras = [
  ['+900', 'sentencias comentadas', '#60a5fa'],
  ['20', 'calculadoras laborales', '#818cf8'],
  ['Diario', 'resumen del BOE', '#c084fc'],
  ['+25', 'proyectos propios', '#f472b6'],
];
const tarjetas = cifras.map(([num, txt, color], i) => {
  const x = 20 + i * 245, b = 0.2 + i * 0.25;
  return `<g opacity="0">
    <animate attributeName="opacity" to="1" dur=".6s" begin="${b}s" fill="freeze"/>
    <animateTransform attributeName="transform" type="translate" from="0 12" to="0 0" dur=".6s" begin="${b}s" fill="freeze"/>
    <rect x="${x}" y="14" width="225" height="112" rx="16" fill="#0d1a33" stroke="${color}" stroke-opacity=".5"/>
    <text x="${x + 22}" y="70" font-family="${FUENTE}" font-size="38" font-weight="800" fill="${color}">${num}</text>
    <text x="${x + 22}" y="98" font-family="${FUENTE}" font-size="15" fill="#cbd5e1">${txt}</text>
    <rect x="${x + 22}" y="110" height="3" rx="1.5" fill="${color}" width="0"><animate attributeName="width" to="181" dur="1.2s" begin="${b + 0.3}s" fill="freeze"/></rect>
  </g>`;
}).join('\n  ');
const cifrasSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="140" viewBox="0 0 1000 140" role="img" aria-label="${cifras.map((c) => c[0] + ' ' + c[1]).join(', ')}">
  ${tarjetas}
</svg>`;

// ---------- 4. Ola final ----------
const ola = (a) => `M0 60 C 150 ${60 - a} 350 ${60 + a} 500 60 S 850 ${60 - a} 1000 60 V120 H0 Z`;
const pie = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="120" viewBox="0 0 1000 120" role="img" aria-label="Gracias por pasarte">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#1e3a70"/><stop offset=".5" stop-color="#4f46e5"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs>
<path fill="url(#g)" opacity=".45" d="${ola(30)}"><animate attributeName="d" values="${ola(30)};${ola(-30)};${ola(30)}" dur="8s" repeatCount="indefinite"/></path>
<path fill="url(#g)" d="${ola(-18)}" transform="translate(0 14)"><animate attributeName="d" values="${ola(-18)};${ola(18)};${ola(-18)}" dur="6s" repeatCount="indefinite"/></path>
<text x="500" y="106" font-family="${FUENTE}" font-size="16" font-weight="600" fill="#ffffff" text-anchor="middle">Gracias por pasarte · ¿Hablamos? graduadosocialred.es</text>
</svg>`;

writeFileSync('assets/cabecera.svg', cabecera);
writeFileSync('assets/escribiendo.svg', escritura);
writeFileSync('assets/cifras.svg', cifrasSvg);
writeFileSync('assets/pie.svg', pie);
console.log('SVG generados en assets/');
