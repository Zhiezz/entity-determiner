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


class JS(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/javascript'
        with open('js/my_js.js', 'r') as f:
            resp.body = f.read()


app.add_route('/my_js.js', JS())


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
        result_json = json.loads(raw_json)

        limit = result_json['limit']

        resp.body = CRUD.entitipopuler(limit)


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


class Result(object):
    def on_post(self, req, resp):
        resp.status = falcon.HTTP_200
        raw_json = req.stream.read()
        result_json = json.loads(raw_json)

        idx = result_json['idx']
        table = result_json['table']

        resp.body = CRUD.result(table,idx)


app.add_route('/result', Result())


class Repository(object):
    def on_post(self, req, resp):
        resp.status = falcon.HTTP_200
        raw_json = req.stream.read()
        resp.body = CRUD.repository()


app.add_route('/repository', Repository())


class Tag(object):
    def on_post(self, req, resp):
        resp.status = falcon.HTTP_200
        raw_json = req.stream.read()
        resp.body = CRUD.tag()


app.add_route('/tag', Tag())


class EntitySearch(object):
    def on_post(self, req, resp):
        resp.status = falcon.HTTP_200
        raw_json = req.stream.read()
        result_json = json.loads(raw_json)

        word = result_json['word']

        resp.body = CRUD.search(word)


app.add_route('/entity_search', EntitySearch())
