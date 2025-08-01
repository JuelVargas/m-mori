export function calculateLifeExpectancy(
  birthDate: Date,
  country: string,
  habits: { smoker: boolean; exercise: boolean }
): number {
  let baseLifeExpectancy = 75;

  // Adjust based on country (simplified)
  if (country === 'Japan') baseLifeExpectancy = 84;
  else if (country === 'USA') baseLifeExpectancy = 78;

  // Adjust based on habits
  if (habits.smoker) baseLifeExpectancy -= 10;
  if (habits.exercise) baseLifeExpectancy += 5;

  const now = new Date();
  const age = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const yearsLeft = baseLifeExpectancy - age;

  return Math.max(0, Math.floor(yearsLeft * 365.25 * 24 * 60 * 60)); // return in seconds
}
