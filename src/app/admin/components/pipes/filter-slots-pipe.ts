import {Pipe, PipeTransform} from "@angular/core";
import {Slot} from "../../../root/model/slot";
import {DateTime} from "luxon";

@Pipe({
  name: "filterSlots",
  pure: false
})
export class FilterSlotsPipe implements PipeTransform {

  transform(value: Slot[] | null, filterType: string): Slot[] {
    if (!value) { return []; }
    return value.filter(s => filterType === 'future' ? this.isFuture(s) : true)
      .slice().sort((a, b) => {
        return a.courseTimestamp > b.courseTimestamp ? 1 : a.courseTimestamp < b.courseTimestamp ? -1 : 0
      })
  }

  private isFuture(slot: Slot): boolean {
    return DateTime.fromISO(slot.courseTimestamp) >= DateTime.now()
  }

}
