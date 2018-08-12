import MySQLdb as mdb
from datetime import datetime, timedelta
from collections import Counter
import json
import operator


class CRUD(object):
    @staticmethod
    def mod_tgl_indo(tgl):
        tgl = tgl.split(',')

        hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

        if len(tgl[2]) > 1:
            _bln = str(tgl[2]).replace('0', '')
        else:
            _bln = tgl[2]

        _hari = hari[int(tgl[0])]
        _bulan = bulan[int(_bln) - 1]

        _tgl = "{0}, {1} {2} {3} - {4}".format(_hari, tgl[1], _bulan, tgl[3], tgl[4])
        return _tgl

    @staticmethod
    def firstload():
        db_host = '127.0.0.1'
        db_user = 'root'
        db_password = 'qwerty'
        db_name = 'entity_determiner'
        db_charset = 'utf8'

        tables = ['indonesia', 'dunia', 'bisnis', 'teknologi', 'hiburan', 'olahraga', 'science', 'kesehatan']

        all_result = []
        for t in tables:
            if t == 'indonesia':
                query = """SELECT * FROM {table_name} ORDER BY published_at DESC LIMIT 5""".format(table_name=t)
            else:
                query = """SELECT * FROM {table_name} ORDER BY published_at DESC LIMIT 3""".format(table_name=t)

            connect = mdb.connect(db_host, db_user, db_password, db_name, charset=db_charset)
            cursor = connect.cursor()
            cursor.execute(query)
            result = cursor.fetchall()
            connect.close()

            for r in result:
                json_result = {
                    'category': t,
                    'id': r[0],
                    'title': r[1],
                    'clean_content': r[2],
                    'tagged_content': r[3],
                    'spoiler_content': r[4],
                    'entity': r[5],
                    'entity_label': r[6],
                    'url': r[7],
                    'host': r[8],
                    'published_at': CRUD.mod_tgl_indo(r[9].strftime('%w, %d, %m, %Y, %H:%M:%S')),
                    'img_url': r[10]
                }
                all_result.append(json_result)

        return json.dumps(all_result)

    @staticmethod
    def entitipopuler(limit):
        db_host = '127.0.0.1'
        db_user = 'root'
        db_password = 'qwerty'
        db_name = 'entity_determiner'
        db_charset = 'utf8'

        today = datetime.today()
        # today = datetime.today() - timedelta(1)
        today = today.strftime("%Y-%m-%d")
        start_today = today + " 00:00:00"
        end_today = today + " 23:59:59"

        tables = ['indonesia', 'dunia', 'bisnis', 'teknologi', 'hiburan', 'olahraga', 'science', 'kesehatan']

        all_entity = []
        for t in tables:
            query = """SELECT entity FROM {table_name} WHERE published_at BETWEEN '{start_today}' AND '{end_today}'""".format(
                table_name=t, start_today=start_today, end_today=end_today)

            connect = mdb.connect(db_host, db_user, db_password, db_name, charset=db_charset)
            cursor = connect.cursor()
            cursor.execute(query)
            result = cursor.fetchall()
            connect.close()

            entity = []
            for r in result:
                entity.append(r[0].split('*'))

            for ent in entity:
                for e in ent:
                    if len(e) > 2:
                        all_entity.append(e)

        cnt = Counter()
        for item in all_entity:
            cnt[item] += 1

        sorted_cnt = sorted(cnt.items(), key=operator.itemgetter(1), reverse=True)

        return json.dumps(sorted_cnt[:limit])

    @staticmethod
    def category(cat, page):
        db_host = '127.0.0.1'
        db_user = 'root'
        db_password = 'qwerty'
        db_name = 'entity_determiner'
        db_charset = 'utf8'

        today = datetime.today()
        # today = datetime.today() - timedelta(1)
        today = today.strftime("%Y-%m-%d")
        start_today = today + " 00:00:00"
        end_today = today + " 23:59:59"

        query = """SELECT * FROM {cat} WHERE published_at BETWEEN '{start_today}' AND '{end_today}' ORDER BY published_at DESC LIMIT 10 OFFSET {page}""".format(
            cat=cat, page=page, start_today=start_today, end_today=end_today)

        connect = mdb.connect(db_host, db_user, db_password, db_name, charset=db_charset)
        cursor = connect.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        connect.close()

        all_result = []
        for r in result:
            json_result = {
                'category': cat,
                'id': r[0],
                'title': r[1],
                'clean_content': r[2],
                'tagged_content': r[3],
                'spoiler_content': r[4],
                'entity': r[5],
                'entity_label': r[6],
                'url': r[7],
                'host': r[8],
                'published_at': CRUD.mod_tgl_indo(r[9].strftime('%w, %d, %m, %Y, %H:%M:%S'))
            }
            all_result.append(json_result)

        if len(all_result) != 0:
            return json.dumps(all_result)
        else:
            return json.dumps("False")

    @staticmethod
    def result(table, idx):
        db_host = '127.0.0.1'
        db_user = 'root'
        db_password = 'qwerty'
        db_name = 'entity_determiner'
        db_charset = 'utf8'

        query = """SELECT * FROM {table} WHERE id = {id}""".format(table=table, id=idx)

        connect = mdb.connect(db_host, db_user, db_password, db_name, charset=db_charset)
        cursor = connect.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        connect.close()

        all_result = []
        for r in result:
            el = r[6].split('*')
            el_clean = []
            for e in el:
                if e not in el_clean:
                    el_clean.append(e)

            _el = []
            for e in el_clean:
                _e = e.split('#')
                if _e[0] != '' and _e[0] != '.com':
                    try:
                        _el.append([_e[0], _e[1]])
                    except:
                        pass

            json_result = {
                'id': r[0],
                'title': r[1],
                'clean_content': r[2],
                'tagged_content': r[3],
                'spoiler_content': r[4],
                'entity': r[5],
                'entity_label': _el,
                'url': r[7],
                'host': r[8],
                'published_at': CRUD.mod_tgl_indo(r[9].strftime('%w, %d, %m, %Y, %H:%M:%S')),
                'img_url': r[10]
            }
            all_result.append(json_result)

        return json.dumps(all_result)

    @staticmethod
    def repository():
        db_host = '127.0.0.1'
        db_user = 'root'
        db_password = 'qwerty'
        db_name = 'entity_determiner'
        db_charset = 'utf8'

        tables = ['indonesia', 'dunia', 'bisnis', 'teknologi', 'hiburan', 'olahraga', 'science', 'kesehatan']

        today = datetime.today()
        # today = datetime.today() - timedelta(1)
        today = today.strftime("%Y-%m-%d")
        start_today = today + " 00:00:00"
        end_today = today + " 23:59:59"

        all_result = []
        for t in tables:
            query = """SELECT * FROM {table_name} WHERE published_at BETWEEN '{start_today}' AND '{end_today}' ORDER BY published_at DESC""".format(
                table_name=t, start_today=start_today, end_today=end_today)

            connect = mdb.connect(db_host, db_user, db_password, db_name, charset=db_charset)
            cursor = connect.cursor()
            cursor.execute(query)
            result = cursor.fetchall()
            connect.close()

            for r in result:
                json_result = {
                    'category': t,
                    'id': r[0],
                    'title': r[1],
                    'clean_content': r[2],
                    'tagged_content': r[3],
                    'spoiler_content': r[4],
                    'entity': r[5],
                    'entity_label': r[6],
                    'url': r[7],
                    'host': r[8],
                    'published_at': CRUD.mod_tgl_indo(r[9].strftime('%w, %d, %m, %Y, %H:%M:%S')),
                    'img_url': r[10]
                }
                all_result.append(json_result)

        return json.dumps(all_result)

    @staticmethod
    def tag():
        fopen = open('py/Indonesian_Manually_Tagged_Corpus.tsv','r').readlines()

        fdata = []
        for f in fopen:
            if len(f) > 1:
                fd = f.replace('\n','').split('\t')
                fdata.append(fd)

        return json.dumps(fdata[:50])

    @staticmethod
    def search(word):
        db_host = '127.0.0.1'
        db_user = 'root'
        db_password = 'qwerty'
        db_name = 'entity_determiner'
        db_charset = 'utf8'

        tables = ['indonesia', 'dunia', 'bisnis', 'teknologi', 'hiburan', 'olahraga', 'science', 'kesehatan']
        all_result = []
        all_category = []
        for t in tables:
            if t == 'indonesia':
                query = """SELECT * FROM {table_name} WHERE clean_content LIKE '%{word}%' ORDER BY published_at DESC""".format(table_name=t, word=word)
            else:
                query = """SELECT * FROM {table_name} WHERE clean_content LIKE '%{word}%' ORDER BY published_at DESC""".format(table_name=t, word=word)

            connect = mdb.connect(db_host, db_user, db_password, db_name, charset=db_charset)
            cursor = connect.cursor()
            cursor.execute(query)
            result = cursor.fetchall()
            connect.close()

            for r in result[:5]:
                json_result = {
                    'category': t,
                    'id': r[0],
                    'title': r[1],
                    'clean_content': r[2],
                    'tagged_content': r[3],
                    'spoiler_content': r[4],
                    'entity': r[5],
                    'entity_label': r[6],
                    'url': r[7],
                    'host': r[8],
                    'published_at': CRUD.mod_tgl_indo(r[9].strftime('%w, %d, %m, %Y, %H:%M:%S')),
                    'img_url': r[10]
                }
                all_result.append(json_result)

            if len(result) > 0:
                all_category.append(t)

        return json.dumps((all_result, all_category))

    @staticmethod
    def statistik():
        db_host = '127.0.0.1'
        db_user = 'root'
        db_password = 'qwerty'
        db_name = 'entity_determiner'
        db_charset = 'utf8'
        tables = ['indonesia', 'dunia', 'bisnis', 'teknologi', 'hiburan', 'olahraga', 'science', 'kesehatan']

        today = datetime.today()
        # today = datetime.today() - timedelta(1)
        today = today.strftime("%Y-%m-%d")
        start_today = today + " 00:00:00"
        end_today = today + " 23:59:59"

        all_result = []
        for t in tables:
            query = """SELECT entity_label FROM {table_name} WHERE published_at BETWEEN '{start_today}' AND '{end_today}' ORDER BY published_at DESC""".format(
                table_name=t, start_today=start_today, end_today=end_today)

            connect = mdb.connect(db_host, db_user, db_password, db_name, charset=db_charset)
            cursor = connect.cursor()
            cursor.execute(query)
            result = cursor.fetchall()
            connect.close()

            entity = []
            for res in result:
                for r in res[0].split('*'):
                    try:
                        if r.split('#')[1] == "PERSON":
                            entity.append(r.split('#')[0])
                    except:
                        pass

            cnt = Counter()
            for e in entity:
                cnt[e] += 1

            sorted_cnt = sorted(cnt.items(), key=operator.itemgetter(1), reverse=True)

            final_ent = []
            for sc in sorted_cnt:
                final_ent.append(sc[0])

            jsond = {
                'category': t,
                'count': len(result),
                'entitas': final_ent[:5]
            }
            all_result.append(jsond)

        return json.dumps(all_result)
