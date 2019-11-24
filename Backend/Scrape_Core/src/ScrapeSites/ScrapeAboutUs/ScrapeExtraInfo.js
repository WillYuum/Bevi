/**
 * @function scrapeExtraInfo - Scrape the part that has same class selector in about company
 * @param {class} page - page will provide you with browser and page functions
 * @returns {object} - returns {Founded, Specialties}
 */
export const scrapeExtraInfo = async page => {
    return await page.evaluate(aboutSelector => {
        const returnedStructure = {
            Founded: "",
            Specialties: ""
        };

        const terms = document.querySelectorAll(`${aboutSelector.ExtraInfo.term}`);
        const values = document.querySelectorAll(`${aboutSelector.ExtraInfo.value}`);

        //locate terms with values needed in the about section
        for (let i = 0; i < terms.length; i++) {
            if (terms[i].innerText === "Founded") {
                returnedStructure.Founded = values[i - 1].innerText;
            } else if (terms[i].innerText === "Specialties") {
                returnedStructure.Specialties = values[i - 1].innerText;
            }
        }
        return returnedStructure;
    }, aboutSelector);
};