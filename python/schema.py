import graphene
from datetime import datetime

class Time(graphene.ObjectType):
  hour = graphene.Int()
  minute = graphene.Int()
  second = graphene.Int()

  def resolve_hour(self, args, context, info):
    return self.hour

  def resolve_minute(self, args, context, info):
    return self.minute

  def resolve_second(self, args, context, info):
    return self.second

class Query(graphene.ObjectType):
  server_time = graphene.Field(graphene.String)
  server_time_obj = graphene.Field(Time)

  def resolve_server_time(self, args, context, info):
    return str(datetime.now())

  def resolve_server_time_obj(self, args, context, info):
    return datetime.now()

schema = graphene.Schema(query=Query, types=[Time, ])
