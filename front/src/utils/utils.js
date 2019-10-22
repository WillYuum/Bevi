/**
 * @function shuffleCompanies - shuffles the array of company data
 * @param {Array} - Array of object to get shuffled
 * @returns {Array} - shuffled array company data
 */
export const shuffleCompanies = async arra1 => {
  let ctr = arra1.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
};
