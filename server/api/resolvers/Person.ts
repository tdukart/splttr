import { PersonResolvers } from '../../generated/resolvers';
import { TypeMap } from './types/TypeMap';

export interface PersonParent {
  id: string;
  name: string;
}

const Person: PersonResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  name: parent => parent.name,
};

export default Person;
