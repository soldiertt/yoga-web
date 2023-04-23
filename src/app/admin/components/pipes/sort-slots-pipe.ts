import {Pipe, PipeTransform} from "@angular/core";
import {Slot} from "../../../shared/model/slot";

@Pipe({
  name: "sortSlots",
  pure: false
})
export class SortSlotsPipe implements PipeTransform {

  transform(value: Slot[] | null, ...args: any[]): Slot[] {
    if (!value) { return []; }
    if (value.length <= 1) { return value; }
    return value.slice().sort((a, b) => {
      return a.courseDate > b.courseDate ? 1 : a.courseDate < b.courseDate ? -1 : 0
    })
  }

}
