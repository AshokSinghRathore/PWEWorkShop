interface formatDateProps {
    date: string | Date;
  }
  
  export function formatDate(date: Date | string,format?:boolean) {
    let _date = typeof date === 'string' ? new Date(date) : date;
    const day = _date.getDate().toString().padStart(2, '0');
    const month = (_date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = _date.getFullYear();
  
    return format?`${year}-${month}-${day}`:`${day}-${month}-${year}`;
  }
  export function formatTime(date:Date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }
  
  export function getNumberOfDays(startDate: Date, endDate: Date) {
    const startMillis = startDate.getTime();
    const endMillis = endDate.getTime();
    const differenceMillis = endMillis - startMillis;
    const daysDifference = Math.ceil(differenceMillis / (1000 * 60 * 60 * 24));
    const numberOfDays = daysDifference;
  
    return numberOfDays;
  }
  
  export function getWeekName(date: Date) {
    const options = {weekday: 'long'};
    // @ts-ignore
    return new Date(date).toLocaleDateString('en-US', options);
  }
  