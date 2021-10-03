import * as moment from 'moment';

export function dateTimeComparator(
  valueA: any,
  valueB: any,
  nodeA: any,
  nodeB: any,
  isInverted: boolean
): number {
  if (moment(valueA, 'DD/MM/YYYY').isAfter(moment(valueB, 'DD/MM/YYYY'))) {
    return 1;
  }
  return -1;
}
