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

### Version
[![Python](https://img.shields.io/badge/python-3.6-09a3d5.svg?style=flat)](#)

### Author
zhiezzpct@gmail.com
