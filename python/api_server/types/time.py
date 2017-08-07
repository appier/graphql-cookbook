import graphene

class Time(graphene.ObjectType):
  hour = graphene.Int()
  minute = graphene.Int()
  second = graphene.Int()

  #: The below are trivial resolvers, can be omitted
  #:
  def resolve_hour(obj, args, context, info):
    return obj.hour

  def resolve_minute(obj, args, context, info):
    return obj.minute

  def resolve_second(obj, args, context, info):
    return obj.second

