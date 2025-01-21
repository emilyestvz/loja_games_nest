import { differenceInYears } from 'date-fns';

export function isAdult(birthDate: Date): boolean {
  
  const age = differenceInYears(new Date(), birthDate);
  return age >= 18;
}
