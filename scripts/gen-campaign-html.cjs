/* Gera src/data/campaignHtml.js com o conteúdo do HTML da campanha embutido como string,
   pra a WebView nativa carregar via source={{ html }} (sem rede, sem cleartext). */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const htmlPath = path.join(ROOT, 'assets', 'o-limiar-combate.html');
const outPath = path.join(ROOT, 'src', 'data', 'campaignHtml.js');

const html = fs.readFileSync(htmlPath, 'utf8');
// JSON.stringify garante escape correto de aspas, barras, quebras de linha, etc.
const body = 'export default ' + JSON.stringify(html) + ';\n';
fs.writeFileSync(outPath, body, 'utf8');
console.log('Gerado', path.relative(ROOT, outPath), '—', (body.length / 1024).toFixed(0), 'KB');
