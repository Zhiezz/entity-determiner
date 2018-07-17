from py import CRUD
import falcon
import json

app = falcon.API()
crud = CRUD()


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


class LOGO(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        with open('assets/logo_tab.png', 'r') as f:
            resp.body = f.read()


app.add_route('/logo_tab.png', LOGO())


class Result(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open('html/result.html', 'r') as f:
            resp.body = f.read()


app.add_route('/result', Result())


class Repository(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open('html/repository.html', 'r') as f:
            resp.body = f.read()


app.add_route('/repository', Repository())


class Tag(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open('html/tag.html', 'r') as f:
            resp.body = f.read()


app.add_route('/tag', Tag())


class About(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open('html/about.html', 'r') as f:
            resp.body = f.read()


app.add_route('/about', About())


class Help(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open('html/help.html', 'r') as f:
            resp.body = f.read()


app.add_route('/help', Help())


class FirstLoad(object):
    def on_post(self, req, resp):
        resp.status = falcon.HTTP_200
        raw_json = req.stream.read()
        resp.body = CRUD.firstload()


app.add_route('/firstload', FirstLoad())


class EntitiPopuler(object):
    def on_post(self, req, resp):
        resp.status = falcon.HTTP_200
        raw_json = req.stream.read()
        resp.body = CRUD.entitipopuler()


app.add_route('/entitipopuler', EntitiPopuler())


class Category(object):
    def on_post(self, req, resp):
        resp.status = falcon.HTTP_200
        raw_json = req.stream.read()
        result_json = json.loads(raw_json)

        cat = result_json['category']
        page = result_json['page']

        resp.body = CRUD.category(cat,page)


app.add_route('/category', Category())
