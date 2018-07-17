import spacy
from nltk import sent_tokenize

nlp = spacy.load('id')


class GetNER(object):
    @staticmethod
    def edit_tagged_content(content):
        senttok = sent_tokenize(content)

        result_text = []
        result_ent = []
        for xsent in senttok:
            if len(xsent) > 1:
                doc = nlp(xsent)

                entity = []
                all_ent = []
                for e in doc.ents:
                    entity.append((e.text, e.label_))
                    all_ent.append(e.text)

                xsent_final = xsent
                duplicate_word = []

                for ent, tag in entity:
                    if ent in duplicate_word:
                        pass
                    else:
                        duplicate_word.append(ent)
                        xsent_final = xsent_final.replace(ent, '<mark class="mark {tag}">{ent}<span class="tag">{tag}</span></mark>'.format(ent=ent, tag=tag))

                result_text.append("<p>" + xsent_final + "</p>")
                result_ent.append(all_ent)
        return result_text, result_ent
