import graphene
from datetime import datetime

class Query(graphene.ObjectType):
  serverTime = graphene.String()

  def resolve_serverTime(self, args, context, info):
    return str(datetime.now())

schema = graphene.Schema(query=Query)
