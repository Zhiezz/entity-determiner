from py import GetURL, Database

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
print('Done')
