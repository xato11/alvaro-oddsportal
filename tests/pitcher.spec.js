// @ts-check
const { test } = require("@playwright/test");
const { exportToCsv } = require("./utils");

const url = "https://www.baseball-reference.com/players/s/skubata01.shtml";

test("Data partido", async ({ page }) => {
  test.setTimeout(120000)
  await page.goto(url)

  const nombre = await page.locator(
    'xpath=/html/body/div[3]/div[2]/div[1]/div[2]/h1/span'
  );
  
  const pitchingStandard = await page.locator("#pitching_standard\\.2024") // michi # es para ids
  const elems = await pitchingStandard.locator('td').all() // sin nada es el nombre de la etiqueta
  const result = {
    nombre: await nombre.textContent(),
  }
  for (let i = 0; i < elems.length; i++) {
    const elem = elems[i];
    const stat = await elem.getAttribute('data-stat');
    const value = await elem.textContent();
    result[stat] = value;
  }
  exportToCsv('baseballreference', result);
});
