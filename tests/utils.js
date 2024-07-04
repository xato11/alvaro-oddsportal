export const extractPartidoData = async (page, url = "", accept = false) => {
  if (url) {
    await page.goto(url);
  }
  if (accept) {
    await page.getByRole("button", { name: "I Accept" }).click();
  }

  const equipo1 = await page.locator(
    'xpath=//*[@id="app"]/div[1]/div[1]/div/main/div[3]/div[2]/div[1]/div[1]/div[1]/div/div[1]/span'
  );
  const equipo2 = await page.locator(
    "xpath=/html/body/div[1]/div[1]/div[1]/div/main/div[3]/div[2]/div[1]/div[1]/div[3]/div[1]/span"
  );
  const fecha = await page.locator(
    'xpath=//*[@id="app"]/div[1]/div[1]/div/main/div[3]/div[2]/div[1]/div[2]/div[1]/p[2]'
  );
  const hora = await page.locator(
    "xpath=/html/body/div[1]/div[1]/div[1]/div/main/div[3]/div[2]/div[1]/div[2]/div[1]/p[3]"
  );

  let result = {
    url,
    equipo1: await equipo1.textContent(),
    equipo2: await equipo2.textContent(),
    fecha: await fecha.textContent(),
    hora: await hora.textContent(),
  };

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
        await odd.click();
        const tooltip = await page.locator(
          ".min-md\\:\\!hidden.height-content"
        );
        const opening = await tooltip
          .locator(
            ".bg-gray-light.mt-3.flex.flex-col.gap-1.py-2.pl-3 .flex.gap-1 .font-bold"
          )
          .textContent();
        const closing = await odd
          .locator(".flex.flex-row.items-center .height-content")
          .textContent();
        result = {
          ...result,
          [`equipo${j + 1}Opening`]: opening,
          [`equipo${j + 1}Closing`]: closing,
        };
        // await odd
        //   .locator(
        //     ".closebtn-notif.bg-close-X-black.ml-auto.h-6.w-6.cursor-pointer"
        //   )
        //   .click();
      }
    }
  }
  return result;
};
