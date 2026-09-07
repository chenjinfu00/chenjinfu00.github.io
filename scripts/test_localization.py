"""Check language consistency without modifying formal bibliographic records."""
import json
import unittest
from html.parser import HTMLParser
from pathlib import Path
import yaml

from localize_site import chinese_page

ROOT = Path(__file__).resolve().parents[1]


class PageText(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.in_body = False
        self.raw = False
        self.text = []
        self.citations = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        if tag == 'body':
            self.in_body = True
        if tag in {'script', 'style'}:
            self.raw = True
        attrs = dict(attrs)
        if 'data-citation' in attrs:
            self.citations.append(attrs['data-citation'])

    def handle_endtag(self, tag):
        if tag == 'body':
            self.in_body = False
        if tag in {'script', 'style'}:
            self.raw = False

    def handle_data(self, data):
        if self.in_body and not self.raw:
            self.text.append(data)


class LanguageTests(unittest.TestCase):
    def test_publication_venues_keep_original_names(self):
        for file in (ROOT / '_publications').glob('*.md'):
            record = yaml.safe_load(file.read_text().split('---', 2)[1])
            venue = record['venue']
            with self.subTest(venue=venue):
                for source in (
                    f'<span class="venue">{venue}</span>',
                    f'<span class="eyebrow">{venue} / 2026</span>',
                ):
                    self.assertEqual(chinese_page(source), source)
                detail = ROOT / 'zh' / record['permalink'].strip('/') / 'index.html'
                self.assertIn(venue, ' '.join(PageText(detail.read_text()).text))

    def test_all_generated_pages(self):
        files = json.loads((ROOT / 'site_src/generated-files.json').read_text())
        for file in files:
            with self.subTest(file=file):
                content = (ROOT / file).read_text()
                page = PageText(content)
                text = ' '.join(page.text)
                if file.startswith('zh/'):
                    self.assertNotIn('Jinfu Chen', text)
                    self.assertNotIn('Google Scholar', text)
                    self.assertIn('陈劲夫', text)
                    english = PageText((ROOT / file.removeprefix('zh/')).read_text())
                    self.assertEqual(page.citations, english.citations)
                else:
                    self.assertNotIn('陈劲夫', text)
                    self.assertIn('Jinfu Chen', text)
                if 'class="monogram"' in content:
                    self.assertIn('/assets/site/jfc-monogram.svg', content)

    def test_structured_name(self):
        source = '<script type="application/ld+json">{"name":"Jinfu Chen","jobTitle":"Postdoctoral researcher"}</script>'
        rendered = chinese_page(source)
        data = json.loads(rendered.split('>', 1)[1].split('</script>')[0])
        self.assertEqual(data['name'], '陈劲夫')
        self.assertEqual(data['jobTitle'], '博士后研究员')


if __name__ == '__main__':
    unittest.main()
