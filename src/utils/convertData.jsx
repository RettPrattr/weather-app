function convertData(hourlyData) {
    const { temperature_2m, rain, time } = hourlyData;
    const monthlyData = {};
  

    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
  
    time.forEach((timestamp, index) => {
      const date = new Date(timestamp);
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthYearKey = `${year}-${month}`;



  
    if (!monthlyData[monthYearKey]) {
      monthlyData[monthYearKey] = {
        name: `${monthNames[month]} ${year}`,
        year,
        month,
        temperature_min: temperature_2m[index],
        temperature_max: temperature_2m[index],
        temperature_sum: temperature_2m[index], 
        days_count: 1, 
        rainy_days_count: 0,
        days: new Set(),
      };
    } else {
      monthlyData[monthYearKey].temperature_sum += temperature_2m[index];
      monthlyData[monthYearKey].days_count++;
    }
  
      const monthData = monthlyData[monthYearKey];
      monthData.temperature_min = Math.min(monthData.temperature_min, temperature_2m[index]);
      monthData.temperature_max = Math.max(monthData.temperature_max, temperature_2m[index]);
  
      const day = date.getDate();
      if (rain[index] > 0.1 && !monthData.days.has(day)) {
        monthData.days.add(day);
        monthData.rainy_days_count += 1;
      }
      Object.values(monthlyData).forEach(monthData => {
        monthData.temperature_avg = monthData.temperature_sum / monthData.days_count;
      });

    });


  
    const sortedMonthlyData = Object.values(monthlyData).sort((a, b) => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const diffA = 12 * (currentYear - a.year) + currentMonth - a.month;
      const diffB = 12 * (currentYear - b.year) + currentMonth - b.month;
      return diffA - diffB;
    });
  
    return sortedMonthlyData.map(({ name, temperature_min, temperature_max, temperature_avg, rainy_days_count }) => ({
      name,
      temperature_min,
      temperature_max,
      temperature_avg, 
      rainy_days: rainy_days_count,
    }));
  }


export default convertData;