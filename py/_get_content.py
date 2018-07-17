import re
import string
from goose3 import Goose


class GetContent(object):
    @staticmethod
    def remove_baca(text):
        baca_word = ['Informasi Menarik Terbaru', 'Membaca:', 'Baca juga', 'Baca :', 'BACA JUGA:', 'Penulis :',
                     'Penulis: ',
                     'Artikel ini telah tayang di', 'Baca:', 'BACA :', 'Baca Juga:', 'Baca artikel sumber',
                     'Baca Selengkapnya:',
                     'Simak pula video pilihan berikut:', 'Saksikan tayangan video menarik berikut ini:',
                     'Saksikan Video Pilihan Berikut Ini:']

        junk_word = []
        for word in baca_word:
            for i in text.split('.'):
                if i.find(word) >= 0:
                    junk_word.append(i)

        for j in junk_word:
            text = text.replace(j, ' ')
        return text

    @staticmethod
    def brut_split(text):
        for alf in list(string.ascii_uppercase):
            text = text.replace('.{a}'.format(a=alf), '. {a}'.format(a=alf))

        return text

    @staticmethod
    def remove_publisher(text):
        pre = text[:100]
        suf = text[100:]
        try:
            try:
                final = pre.split(' - ')[1] + suf
                return final
            except:
                final = pre.split(' -')[1] + suf
                return final
        except:
            return text

    @staticmethod
    def get_content(link):
        link = link
        g = Goose({
            'use_meta_language': False,
            'target_language': 'id',
            'enable_image_fetching': False,
        })
        extract = g.extract(url=link)

        content = extract.cleaned_text
        content = GetContent.remove_publisher(content)
        content = content.replace('."', '. ')
        content = content.replace('\n', ' ').replace('   ', ' ').replace('  ', ' ').replace("\'", "").strip('-').strip()
        content = re.sub(r'[^\x00-\x7F]+', '', content)
        content = content.replace(' ...', '.').replace('.. .', '. ')
        content = GetContent.brut_split(content)
        content = content.replace('.CO', '').replace('.COM', '').replace('. CO', '').replace('. COM', '')
        content = content.strip('.').strip() + '.'
        content = GetContent.remove_baca(content)
        spoiler = content[:150] + '...'

        if len(content) <= 500:
            return "Not Valid"
        else:
            return content, spoiler