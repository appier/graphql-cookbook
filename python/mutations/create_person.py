import graphene
from ..types.person import Person

class CreatePerson(graphene.Mutation):
  class Input:
    name = graphene.Argument(graphene.String)

  ok = graphene.Field(graphene.Boolean)
  person = graphene.Field(lambda: Person)

  @staticmethod
  def mutate(root, args, context, info):
    #: Should do something that persists
    #: the new Person here
    person = Person(name=args.get('name'))
    ok = True
    return CreatePerson(person=person, ok=ok)
