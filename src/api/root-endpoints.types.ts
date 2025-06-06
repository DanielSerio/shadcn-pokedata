export interface DirectoryResponse {
  [key: string]: string;
  ability: string;
  berry: string;
  'berry-firmness': string;
  'berry-flavor': string;
  characteristic: string;
  'contest-effect': string;
  'contest-type': string;
  'egg-group': string;
  'encounter-condition': string;
  'encounter-condition-value': string;
  'encounter-method': string;
  'evolution-chain': string;
  'evolution-trigger': string;
  gender: string;
  generation: string;
  'growth-rate': string;
  item: string;
  'item-attribute': string;
  'item-category': string;
  'item-fling-effect': string;
  'item-pocket': string;
  language: string;
  location: string;
  'location-area': string;
  machine: string;
  move: string;
  'move-ailment': string;
  'move-battle-style': string;
  'move-category': string;
  'move-damage-class': string;
  'move-learn-method': string;
  'move-target': string;
  nature: string;
  'pal-park-area': string;
  'pokeathlon-stat': string;
  pokedex: string;
  pokemon: string;
  'pokemon-color': string;
  'pokemon-form': string;
  'pokemon-habitat': string;
  'pokemon-shape': string;
  'pokemon-species': string;
  region: string;
  stat: string;
  'super-contest-effect': string;
  type: string;
  version: string;
  'version-group': string;
}

/**
 * Directory map of root endpoints
 */
export type Directory = {
  [k in keyof DirectoryResponse]: k;
};