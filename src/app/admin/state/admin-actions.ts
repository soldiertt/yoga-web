import {Slot} from "../../shared/model/slot";

export class LoadAdminState {
  static readonly type = '[Admin] Load admin state';
}
export class CreateSlot {
  static readonly type = '[Admin] Create slot';
  constructor(public slot: Partial<Slot>) {}
}
export class DeleteSlot {
  static readonly type = '[Admin] Delete slot';
  constructor(public id: number) {}
}
export class LoadSlotParticipants {
  static readonly type = '[Admin] Load slot participants';
  constructor(public id: number) {}
}
export class ValidateCard {
  static readonly type = '[Admin] Validate card';
  constructor(public id: number) {}
}
export class DeleteCard {
  static readonly type = '[Admin] Delete card';
  constructor(public id: number) {}
}
