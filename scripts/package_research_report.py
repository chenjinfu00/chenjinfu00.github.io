"""Bundle the bilingual research report into a portable single HTML file."""
from pathlib import Path
import base64
import re

ROOT=Path(__file__).resolve().parents[1]
REPORT=ROOT/'research-report'
html=(REPORT/'index.html').read_text()
css=(REPORT/'assets/style.css').read_text()
content=(REPORT/'assets/content.js').read_text()
app=(REPORT/'assets/app.js').read_text()
for name in ['membrane-result.png','thermalization-result.png']:
    encoded=base64.b64encode((REPORT/'assets'/name).read_bytes()).decode()
    content=content.replace('assets/'+name,'data:image/png;base64,'+encoded)
html=re.sub(r'<link rel="stylesheet" href="assets/style\.css(?:\?[^"]*)?">',lambda _: '<style>'+css+'</style>',html)
html=re.sub(r'\s*<script src="assets/(content|app)\.js(?:\?[^"]*)?" defer></script>','',html)
html=html.replace('</body>','<script>'+content+'</script><script>'+app+'</script></body>')
target=REPORT/'Jinfu-Chen-Research-Report.html'
target.write_text(html)
print('Offline report saved:',target.name)
