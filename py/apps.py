import MySQLdb as mdb
import json

class CRUD(object):
	def __init__(self):
		self.host = '127.0.0.1'
		self.user = 'root'
		self.password = 'qwerty'
		self.db = 'entity_determiner'

	def firstLoad(self, no_entry):
		category = ['WORLD','NATION','BUSINESS','TECHNOLOGY','ENTERTAINMENT','SPORTS','SCIENCE','HEALTH']
		con = mdb.connect(self.host, self.user, self.password, self.db, charset='utf8')

		result = []
		for cat in category:
		    sql = '''
		    SELECT id_news, url, title, content, category 
		    FROM news 
		    WHERE category = "{cat}"
		    LIMIT 3'''.format(cat=cat)

		    cur = con.cursor()
		    cur.execute(sql)
		    data = cur.fetchall()

		    temp = []
		    for dt in data:
		        data_json = {
		            'id_news': dt[0],
		            'url': dt[1],
		            'title': dt[2],
		            'content': dt[3],
		            'category': dt[4]
		        }
		        temp.append(data_json)

		    res = {
		        'cat': cat,
		        'news': temp
		    }
		    result.append(res)

		con.close()

		return json.dumps(result)