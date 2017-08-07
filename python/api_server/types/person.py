import graphene

class Person(graphene.ObjectType):
    name = graphene.String()
    age = graphene.Int()
