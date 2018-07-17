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
                    'url': r[6],
                    'host': r[7],
                    'published_at': CRUD.mod_tgl_indo(r[8].strftime('%w, %d, %m, %Y, %H:%M:%S'))
                }
                all_result.append(json_result)

        return json.dumps(all_result)

    @staticmethod
    def entitipopuler():
        db_host = '127.0.0.1'
        db_user = 'root'
        db_password = 'qwerty'
        db_name = 'entity_determiner'
        db_charset = 'utf8'

        today = datetime.today() - timedelta(1)
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
        print(sorted_cnt)

        return json.dumps(sorted_cnt[:10])

    @staticmethod
    def category(cat,page):
        db_host = '127.0.0.1'
        db_user = 'root'
        db_password = 'qwerty'
        db_name = 'entity_determiner'
        db_charset = 'utf8'

        today = datetime.today() - timedelta(1)
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
                'id': r[0],
                'title': r[1],
                'clean_content': r[2],
                'tagged_content': r[3],
                'spoiler_content': r[4],
                'entity': r[5],
                'url': r[6],
                'host': r[7],
                'published_at': CRUD.mod_tgl_indo(r[8].strftime('%w, %d, %m, %Y, %H:%M:%S'))
            }
            all_result.append(json_result)

        return json.dumps(all_result)




