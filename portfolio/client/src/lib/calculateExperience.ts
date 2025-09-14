
export function calculateExperience(): string {
  const startDate = new Date(2025, 3, 1); // April 2025 (month is 0-indexed)
  const currentDate = new Date();
  
  // Calculate the difference in months
  let monthsDifference = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
                          (currentDate.getMonth() - startDate.getMonth());
  
  // If current date is before start date, return 0 months
  if (monthsDifference < 0) {
    monthsDifference = 0;
  }
  
  if (monthsDifference < 12) {
    return `${monthsDifference}+ months`;
  } else {
    const years = Math.floor(monthsDifference / 12);
    return `${years}+ year${years > 1 ? 's' : ''}`;
  }
}

export function calculateAge(): string {
  const birthDate = new Date(2008, 11, 5); // December 5, 2008 (month is 0-indexed)
  const currentDate = new Date();
  
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Adjust if the current day is before the birth day
  if (currentDate.getDate() < birthDate.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  return `${years} years and ${months} month${months !== 1 ? 's' : ''}`;
}
