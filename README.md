# Entity Determiner

Named Entity Recognition untuk berita-berita dari Google News Indonesia.

### Getting Started
How to install:
```
$ virtualenv -p $(which python3.6) .env
$ source .env/bin/activate
(.env) pip install -r requirements.txt
```

How to run:
```
(.env) pyton scrap_google_news.py
(.env) gunicorn server:app --reload
```
