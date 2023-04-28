export class CreateCard {
  static readonly type = '[Public] Create card';
}

export class BookSlot {
  static readonly type = '[Public] Book slot';
  constructor(public id: number, public emailConfirmation: boolean) {}
}

export class UnbookSlot {
  static readonly type = '[Public] Unbook slot';
  constructor(public cardId: number, public slotId: number) {}
}
