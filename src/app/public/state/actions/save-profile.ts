import {UserProfile} from '../../../shared/model/user-profile';

export class SaveProfile {
  static readonly type = '[Public] Save profile';
  constructor(public userProfile: UserProfile) {
  }
}
