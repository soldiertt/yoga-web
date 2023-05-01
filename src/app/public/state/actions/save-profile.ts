import {YogaUser} from "../../../root/model/yoga-user";

export class SaveProfile {
  static readonly type = '[Public] Save profile';
  constructor(public user: Partial<YogaUser>) {
  }
}
