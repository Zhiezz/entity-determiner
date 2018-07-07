from py.apps import CRUD
import falcon
import json

app = falcon.API()
CRUD = CRUD()

class Home(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open('html/index.html', 'r') as f:
            resp.body = f.read()

app.add_route('/', Home())

class CSS(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/css'
        with open('css/my_style.css', 'r') as f:
            resp.body = f.read()

app.add_route('/my_style.css', CSS())

class JS(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/javascript'
        with open('js/my_js.js', 'r') as f:
            resp.body = f.read()

app.add_route('/my_js.js', JS())

class LOGO(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/javascript'
        with open('html/logo_tab.png', 'r') as f:
            resp.body = f.read()

app.add_route('/my_logo.png', LOGO())

class First_Load(object):
    def on_post(self, req, resp):
        resp.status = falcon.HTTP_200
        raw_json = req.stream.read()
        result_json = json.loads(raw_json)

        no_entry = result_json['no_entry']
        resp.body = CRUD.firstLoad(no_entry)

app.add_route('/first_load', First_Load())

class Result(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open('html/result.html', 'r') as f:
            resp.body = f.read()

app.add_route('/result', Result())