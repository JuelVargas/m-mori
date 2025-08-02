export function calculateLifeExpectancy(
  birthDate: Date,
  country: string,
  habits: { smoker: boolean; alcohol: boolean; exercise: boolean; diet: boolean; sleep: boolean }
): number {
  let baseLifeExpectancy = 75;

  // Adjust based on country (simplified)
  if (country === 'Japan') baseLifeExpectancy = 84;
  else if (country === 'USA') baseLifeExpectancy = 78;

  // Adjust based on habits
  if (habits.smoker) baseLifeExpectancy -= 10;
  if (habits.alcohol) baseLifeExpectancy -= 5;
  if (habits.exercise) baseLifeExpectancy += 5;
  if (habits.diet) {baseLifeExpectancy += 4} else baseLifeExpectancy -= 1;
  if (habits.sleep) {baseLifeExpectancy += 2 } else baseLifeExpectancy -= 3;

  const now = new Date();
  const age = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const yearsLeft = baseLifeExpectancy - age;

  return Math.max(0, Math.floor(yearsLeft * 365.25 * 24 * 60 * 60)); // return in seconds
}
