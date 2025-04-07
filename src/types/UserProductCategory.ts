export interface BinderWithCards {
  id: string;
  name: string;
  cards: CardWithCondition[];
}

export interface CardWithCondition {
  id: string;
  name: string;
  imagesSmallUrl: string;
  conditionData: Condition;
}

export interface Condition {
  id: string;
  name: string;
  value: string;
}