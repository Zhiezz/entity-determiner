import feedparser
from tqdm import tqdm
from datetime import datetime


class GetURL(object):
    @staticmethod
    def get_title_url(url):
        feed_link = feedparser.parse(url)

        link_per_cluster = []
        for fl in feed_link["items"]:
            f_link = fl["summary_detail"]["value"].split('href="')[-1].split(' ')[0]
            link = f_link.replace("google.com/", "google.com/news/rss/")
            link_per_cluster.append(link)

        link_per_cluster_all = []
        for i in tqdm(range(len(link_per_cluster))):
            lpc = link_per_cluster[i]
            f_link = feedparser.parse(lpc)
            for fl in f_link['items']:
                try:
                    img_url = fl['summary'].split('src="')[1].split('"')[0]
                except:
                    img_url = ''
                title = fl['title']
                link = fl['links'][0]['href']
                host = link.split('//')[1].split('/')[0]
                publish_date = datetime.strptime(fl['published'], "%a, %d %b %Y %H:%M:%S GMT").strftime(
                    "%Y-%m-%d %H:%M:%S")

                link_per_cluster_all.append((title, link, host, publish_date, img_url))

        return link_per_cluster_all

    @staticmethod
    def get_all_url():
        category = [['WORLD', 'Dunia'], ['NATION', 'Indonesia'], ['BUSINESS', 'Bisnis'], ['ENTERTAINMENT', 'Hiburan'],
                    ['TECHNOLOGY', 'Teknologi'], ['SPORTS', 'Olahraga'], ['SCIENCE', 'Science'], ['HEALTH', 'Kesehatan']]

        all_url = []
        for c, y in category:
            print(y)
            url = """https://news.google.com/news/rss/headlines/section/topic/{category}.id_id/Indonesia?ned=id_id&hl=id&gl=ID""".format(category=c)
            res = GetURL.get_title_url(url)
            fin_res = {
                "category": y,
                "items": res
            }
            all_url.append(fin_res)

        return all_url
