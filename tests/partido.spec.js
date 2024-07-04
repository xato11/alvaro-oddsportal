// @ts-check
const { test } = require("@playwright/test");
const { extractPartidoData } = require("./utils");

test.use({
  viewport: {
    height: 800,
    width: 1100,
  },
});

// const urlOddsPortalPartido =
//   "https://www.oddsportal.com/baseball/usa/mlb/cleveland-guardians-chicago-white-sox-QBD5EeYd/";
const urlOddsPortalPartido =
  "https://www.oddsportal.com/baseball/usa/mlb/miami-marlins-boston-red-sox-lfUMkCed/";

test("Data partido", async ({ page }) => {
  const result = await extractPartidoData(page, urlOddsPortalPartido, true);
  console.log(JSON.stringify(result, null, 2));
});
