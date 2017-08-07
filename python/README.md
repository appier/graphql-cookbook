GraphQL Cookbook -- Python example
======

## Setup

```
$ git clone https://github.com/appier/graphql-cookbook.git
$ cd graphql-cookbook/python
$ virtualenv -p python3 venv
(venv) $ pip install -r requirements.txt
```

## Running

```
(venv) $ FLASK_APP=app.py flask run
```

* GET `http://localhost:5000/graphql` will get graphiql interface
* POST `http://localhost:5000/graphql` is the endpoint to server
