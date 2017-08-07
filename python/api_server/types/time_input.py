import graphene

class TimeInput(graphene.InputObjectType):
  hour = graphene.Int()
  minute = graphene.Int()
  second = graphene.Int()
