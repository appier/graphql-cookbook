from flask import Flask
from api_server.schema import schema
from flask_graphql import GraphQLView

app = Flask(__name__)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))
