export class CreateCardLong {
  static readonly type = '[Public] Create card long';
}

export class CreateCardShort {
  static readonly type = '[Public] Create card short';
}


export class BookSlot {
  static readonly type = '[Public] Book slot';
  constructor(public id: number, public emailConfirmation: boolean) {}
}

export class UnbookSlot {
  static readonly type = '[Public] Unbook slot';
  constructor(public cardId: number, public slotId: number) {}
}
