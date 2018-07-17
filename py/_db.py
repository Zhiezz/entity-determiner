import MySQLdb as mdb
from tqdm import tqdm
from py import GetContent, GetNER

gc = GetContent()
gn = GetNER()

db_host = '127.0.0.1'
db_user = 'root'
db_password = 'qwerty'
db_name = 'entity_determiner'
db_charset = 'utf8'


class Database(object):
    @staticmethod
    def save_to_db(all_url):
        for au in all_url:
            news = au['items']
            save_to_db = []
            for i in tqdm(range(len(news))):
                d = news[i]
                try:
                    title, url, host, published_at = d
                    clean_content, spoiler_content = gc.get_content(url)
                    tagged_content, entity = gn.edit_tagged_content(clean_content)
                    tagged_content = '\n'.join(tagged_content)
                    final_ent = []
                    for ent in entity:
                        for e in ent:
                            final_ent.append(e)
                    entity = '*'.join(final_ent)

                    save_to_db.append((title, clean_content, tagged_content, spoiler_content, entity, url, host, published_at))
                except:
                    pass

            print("Total data : %d" % len(save_to_db))
            query = """INSERT IGNORE INTO {table}
                    (title, clean_content, tagged_content, spoiler_content, entity, url, host, published_at)
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s)""".format(table=au['category'].lower())
            attr = tuple(save_to_db)

            connect = mdb.connect(db_host, db_user, db_password, db_name, charset=db_charset)
            cursor = connect.cursor()
            cursor.executemany(query, attr)
            connect.commit()
            connect.close()
