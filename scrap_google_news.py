from py import GetURL, Database
import time

start_time = time.time()
url = GetURL()
db = Database
print('Downloading all URL')
print()
all_url = url.get_all_url()
print()
print('Save to DB')
print()
db.save_to_db(all_url)
print()
finish_time = time.strftime('%H:%M:%S', time.gmtime(time.time() - start_time))
print('Done in : %s' % finish_time)
