const { test } = require("@playwright/test");
const { extractPartidoData, exportToCsv } = require("./utils");

test.use({
  viewport: {
    height: 800,
    width: 1100,
  },
});

const urlOddsPortalMlbHome = "https://www.oddsportal.com/baseball/usa/mlb";

test("Data MLB Home", async ({ page }) => {
  test.setTimeout(60000)
  await page.goto(urlOddsPortalMlbHome);
  await page.getByRole("button", { name: "I Accept" }).click();
  const elems = await page
    .locator(
      "xpath=/html/body/div[1]/div[1]/div[1]/div/main/div[3]/div[4]/div[1]/div[1]/div/div/div/a"
    )
    .all();

  const urls = [];
  for (let i = 0; i < elems.length; i++) {
    const elem = elems[i];
    const href = await elem.getAttribute("href");
    urls.push(`https://www.oddsportal.com${href}`);
  }

  const result = [];
  for (let i = 0; i < urls.length; i++) {
    if (i > 2) {
      break;
    }
    const partidoDAta = await extractPartidoData(page, urls[i]);
    result.push(partidoDAta);
  }

  exportToCsv('oddsportal', result);
});
