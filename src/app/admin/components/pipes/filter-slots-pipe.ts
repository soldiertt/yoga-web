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
        return a.courseDate > b.courseDate ? 1 : a.courseDate < b.courseDate ? -1 : 0
      })
  }

  private isFuture(slot: Slot): boolean {
    return DateTime.fromFormat(slot.courseDate, 'yyyy-MM-dd') >= DateTime.now()
  }

}
