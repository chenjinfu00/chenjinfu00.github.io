"""Translate rendered text nodes without changing citations, markup, or source records."""
import re
import json
from html import escape
from html.parser import HTMLParser
from pathlib import Path

import yaml

TRANSLATIONS = yaml.safe_load((Path(__file__).resolve().parents[1] / 'site_src/zh.yml').read_text())
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}


def translate(value):
    stripped = value.strip()
    translated = TRANSLATIONS.get(stripped)
    if translated is None:
        if ' | Jinfu Chen' in stripped:
            translated = translate(stripped.removesuffix(' | Jinfu Chen')) + ' | 陈劲夫'
        elif stripped.startswith(('Details: ', 'Works in ')):
            prefix, tail = stripped.split(': ', 1) if ': ' in stripped else ('Works in', stripped[9:])
            translated = ('详情：' if prefix == 'Details' else '相关成果：') + translate(tail)
        elif re.fullmatch(r'\d+ (works|presentations)', stripped):
            translated = stripped.split()[0] + (' 项成果' if stripped.endswith('works') else ' 场报告与海报')
        elif ' / ' in stripped:
            translated = ' / '.join(translate(part) for part in stripped.split(' / '))
        else:
            translated = stripped
    return value[:len(value) - len(value.lstrip())] + translated + value[len(value.rstrip()):]


class ChinesePage(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.output = []
        self.raw = None
        self.structured_data = False

    def handle_decl(self, decl):
        self.output.append('<!' + decl + '>')

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in {'script', 'style'}:
            self.raw = tag
            self.structured_data = tag == 'script' and attrs.get('type') == 'application/ld+json'
        if tag == 'html':
            attrs['lang'] = 'zh-CN'
        switch = 'language-switch' in attrs.get('class', '').split()
        if switch:
            attrs.update(href=attrs['href'].removeprefix('/zh') or '/', lang='en', hreflang='en',
                         title='切换到英文版', **{'aria-label': '切换到英文版'})
        elif 'href' in attrs:
            href = attrs['href']
            if href.startswith('/') and not href.startswith(('/assets/', '//')):
                attrs['href'] = '/zh' + href
            elif attrs.get('rel') == 'canonical':
                attrs['href'] = href.replace('https://chenjinfu00.github.io', 'https://chenjinfu00.github.io/zh', 1)
        for key in ('title', 'aria-label', 'placeholder', 'alt', 'content'):
            if key in attrs and not switch:
                attrs[key] = translate(attrs[key])
        if 'data-search' in attrs:
            original = attrs['data-search']
            attrs['data-search'] += ' ' + ' '.join(zh for en, zh in TRANSLATIONS.items() if en.lower() in original)
        if tag == 'meta' and attrs.get('http-equiv') == 'refresh':
            attrs['content'] = attrs['content'].replace('url=/', 'url=/zh/')
        self.output.append('<' + tag + ''.join(' ' + k + ('' if v is None else '="' + escape(v, quote=True) + '"') for k, v in attrs.items()) + '>')

    def handle_endtag(self, tag):
        self.output.append('</' + tag + '>')
        if tag == self.raw:
            self.raw = None

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_data(self, data):
        if self.structured_data and self.raw == 'script':
            def localize_metadata(value):
                if isinstance(value, dict):
                    return {key: localize_metadata(item) for key, item in value.items()}
                if isinstance(value, list):
                    return [localize_metadata(item) for item in value]
                return translate(value) if isinstance(value, str) else value
            data = json.dumps(localize_metadata(json.loads(data)), ensure_ascii=False)
        self.output.append(data if self.raw else escape(translate(data), quote=False))

    def handle_comment(self, data):
        self.output.append('<!--' + data + '-->')


def chinese_page(html):
    parser = ChinesePage()
    parser.feed(html)
    parser.close()
    return ''.join(parser.output)
