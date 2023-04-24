export class CreateCard {
  static readonly type = '[Public] Create card';
}

export class BookSlot {
  static readonly type = '[Public] Book slot';
  constructor(public id: number) {}
}
