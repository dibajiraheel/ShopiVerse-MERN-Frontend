

const CalculateTime = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
    const intervals = [
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
  
    for (let i of intervals) {
      const count = Math.floor(seconds / i.seconds);
      if (count > 0) {
        return `${count} ${i.label}${count !== 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }


  
  
const GetOrderDate = (inputDate) => {
    const date = new Date(inputDate);

    // Format to dd/mm/yyyy
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate

}


const GetCurrentDate = () => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
    const year = now.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate

}



const GetLastSevenDate = () => {
    
    const dates = [];
        const today = new Date();
      
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
      
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
      
          dates.push(`${day}/${month}/${year}`);
        }
        
        return dates;
    
    }
    

export default CalculateTime
    
export { GetCurrentDate, GetLastSevenDate, GetOrderDate }
