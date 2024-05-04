
export const formatPrice = (number) => {

    if (number >= 1000000) {
      return (number / 1000000).toFixed(0) + 'M'; // Divide by 1,000,000 and append 'M'
    } else if (number >= 100000) {
      return (number / 1000).toFixed(0) + 'k'; // Divide by 1,000 and append 'k'
    } else if (number >= 10000) {
      return (number / 1000).toFixed(0) + 'k'; // Divide by 1,000 and append 'k' with one decimal place
    } else if (number >= 1000) {
      return (number / 1000).toFixed(0) + 'k'; // Divide by 1,000 and append 'k'
    } else {
      return number; // Just return the number itself for values less than 1000
    }
  };