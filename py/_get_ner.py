import spacy
from nltk import sent_tokenize

nlp = spacy.load('id')


class GetNER(object):
    @staticmethod
    def edit_tagged_content(content):
        senttok = sent_tokenize(content)

        for i in range(len(senttok)):
            try:
                s = senttok[i]
                if s.count('"') == 1:
                    senttok[i] = s + ' ' + senttok[i + 1]
                    del senttok[i + 1]
            except:
                pass

        result_text = []
        result_ent = []
        result_ent_label = []
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
                        if ent != '.com':
                            duplicate_word.append(ent)
                            xsent_final = xsent_final.replace(ent, '<mark class="mark {tag}" data-entitas="{ent}">{ent}<span class="tag">{tag}</span></mark>'.format(ent=ent, tag=tag))

                result_text.append("<p>" + xsent_final + "</p>")
                result_ent.append(all_ent)
                result_ent_label.append(entity)
        return result_text, result_ent, result_ent_label
