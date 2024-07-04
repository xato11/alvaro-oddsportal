// @ts-check
const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto(
    "https://www.oddsportal.com/baseball/usa/mlb/cleveland-guardians-chicago-white-sox-QBD5EeYd/"
  );
  await page.getByRole("button", { name: "I Accept" }).click();
  const elems = await page
    .locator(
      ".border-black-borders.flex.h-9.border-b.border-l.border-r.text-xs"
    )
    .all();
  for (let i = 0; i < elems.length; i++) {
    const elem = elems[i];
    if ((await elem.textContent())?.includes("bet365")) {
      await elem.click();
      const odds = await elem
        .locator(
          ".border-black-borders.relative.flex.flex-col.items-center.justify-center.gap-1.border-l"
        )
        .all();
      for (let j = 0; j < odds.length; j++) {
        const odd = odds[j];
        await odd.hover();
        await odd.locator(".tooltip").hover();
        const tooltip = await odd.locator(".tooltip");
        console.log(
          `equipo ${j + 1} opening`,
          await tooltip
            .locator(".mt-2.gap-1 .flex.gap-1 .font-bold")
            .textContent()
        );
        await odd.locator(".tooltip").blur();
        await odd.blur();
      }
    }
  }
  for (let i = 0; i < elems.length; i++) {
    const elem = elems[i];
    if ((await elem.textContent())?.includes("bet365")) {
      await elem.click();
      const odds = await elem
        .locator(
          ".border-black-borders.relative.flex.flex-col.items-center.justify-center.gap-1.border-l"
        )
        .all();
      for (let j = 0; j < odds.length; j++) {
        const odd = odds[j];
        console.log(
          `equipo ${j + 1} closing`,
          await odd
            .locator(".flex.flex-row.items-center .height-content")
            .textContent()
        );
      }
    }
  }
});
