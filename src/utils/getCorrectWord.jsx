function getCorrectWord(count) {
    const tens = count % 100;
    const ones = count % 10;
  
    if (tens > 10 && tens < 20) { 
      return 'дней';
    } else if (ones === 1) { 
      return 'день';
    } else if (ones >= 2 && ones <= 4) { 
      return 'дня';
    } else {
      return 'дней';
    }
  }

  
  export default getCorrectWord;