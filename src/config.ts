export const apiURL = "http://127.0.0.1:8000/";
export const masterSelection = ['cook', 'bath', 'delivery', 'clean', '‎laundry', 'sleep', 'wash', 'child', 'others'];

export interface dateObject {
  dateOrigin: Date,
  dateString: string,
  dateNumbner: number
}
export function convertDate (date: Date | null): dateObject {
  const newDate = date ? date: new Date();
  const y = newDate.getFullYear();
  const m = ("00" + (newDate.getMonth()+1)).slice(-2);
  const d = ("00" + newDate.getDate()).slice(-2);
  const dateResult = {
    dateOrigin: newDate,
    dateString: y + "-" + m + "-" + d,
    dateNumbner: Number(y + m + d)
  }
  return dateResult;
}