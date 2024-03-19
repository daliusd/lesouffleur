import { Page, Selector, Options, ElementHandle } from './types';

export function Component(page: Page, selectors: Selector[]) {
  async function wait(options?: Options): Promise<ElementHandle | null> {
    let current: Page | ElementHandle = page;
    if (selectors.length === 0) {
      return null;
    }
    for (const s of selectors) {
      let result: Page | ElementHandle | null = null;
      if (s.waitFor === 'data-hook') {
        result = await current.waitForSelector(
          `[data-hook="${s.value}"]`,
          options,
        );
      } else if (s.waitFor === 'text') {
        const xpath = `//*[normalize-space()='${s.value}']`;
        result = await current.waitForXPath(xpath, options);
      } else if (s.waitFor === 'role') {
        let xpath = `//${s.value.role}`;
        if (s.value.attributes) {
          for (const attrName of Object.keys(s.value.attributes)) {
            const attrValue = s.value.attributes[attrName];
            if (attrName === 'name') {
              if (s.value.role === 'img') {
                xpath += `[contains(@alt, '${attrValue}')]`;
              } else if (s.value.role === 'button') {
                xpath += `[contains(normalize-space(),'${attrValue}')]`;
              } else {
                throw Error('Not implemented.');
              }
            }
          }
        }
        result = await current.waitForXPath(xpath, options);
      }
      if (result === null) {
        return null;
      }
      current = result;
    }
    return current as ElementHandle;
  }

  async function click() {
    (await wait({ visible: true }))?.click();
  }

  async function isVisible() {
    return (await wait({ visible: true })) !== null;
  }

  async function fill(input: string) {
    return (await wait({ visible: true }))?.type(input);
  }

  async function containsText(text: string): Promise<boolean> {
    const element = await wait();
    if (element) {
      const value = await element.evaluate((el) => el.textContent);
      return value?.includes(text) || false;
    }
    return false;
  }

  function getByTestId(dataHook: string) {
    return Component(page, [
      ...selectors,
      { waitFor: 'data-hook', value: dataHook },
    ]);
  }

  function getByRole(role: string, attributes?: Record<string, string>) {
    return Component(page, [
      ...selectors,
      { waitFor: 'role', value: { role, attributes } },
    ]);
  }

  async function screenshot() {
    return (await wait({ visible: true }))?.screenshot();
  }

  return {
    click,
    fill,
    isVisible,
    containsText,
    getByTestId,
    getByRole,
    screenshot,
  };
}
