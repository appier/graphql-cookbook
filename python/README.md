GraphQL Cookbook -- Python example
======

## Setup

```
$ https://github.com/appier/graphql-cookbook.git
$ cd graphql-cookbook/python
$ virtualenv -p python3 venv
(venv) $ pip install -r requirements.txt
```

## Running

```
(venv) $ FLASK_APP=app.py flask run
```

* GET `http://localhost:3000` will get graphiql interface
* POST `http://localhost:3000` is the endpoint to server
