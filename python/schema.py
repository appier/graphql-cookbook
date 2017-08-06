import graphene
from datetime import datetime, timezone, timedelta
from .types.time import Time
from .types.time_input import TimeInput

class Query(graphene.ObjectType):
  server_time = graphene.Field(graphene.String)
  server_time_obj = graphene.Field(Time)
  server_time_with_input = graphene.Field(
    graphene.String,
    timezone=graphene.Argument(graphene.Int, default_value=8),
    offset=graphene.Argument(TimeInput, default_value=dict())
  )

  def resolve_server_time(self, args, context, info):
    return str(datetime.now())

  def resolve_server_time_obj(self, args, context, info):
    return datetime.now()

  def resolve_server_time_with_input(self, args, context, info):
    tz = timezone(timedelta(hours=args['timezone']))
    delta = timedelta(
      hours=args['offset'].get('hour', 0),
      minutes=args['offset'].get('minute', 0),
      seconds=args['offset'].get('second', 0)
    )
    return str(datetime.now(tz) + delta)

schema = graphene.Schema(query=Query)
