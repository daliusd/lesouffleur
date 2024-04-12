import { expect, describe, it, vi } from 'vitest';
import { LeSouffleur } from './LeSouffleur';
import { ElementHandle, Page } from './types';

describe('LeSouffleur happy path', () => {
  it('screenshots object by test id', async () => {
    const screenshot = vi.fn();
    const page: Page = {
      waitForSelector: vi.fn(
        async (_selector, _options) =>
          ({ screenshot }) as unknown as ElementHandle,
      ),
      waitForXPath: vi.fn(),
    };

    const driver = new LeSouffleur(page);

    await driver.getByTestId('some-test-id').screenshot();

    expect(page.waitForSelector).toHaveBeenCalledOnce();
    expect(page.waitForSelector).toHaveBeenCalledWith(
      '[data-hook="some-test-id"]',
      {
        visible: true,
      },
    );
    expect(screenshot).toHaveBeenCalledOnce();
  });

  it('screenshots object by role', async () => {
    const screenshot = vi.fn();
    const page: Page = {
      waitForSelector: vi.fn(),

      waitForXPath: vi.fn(
        async (_xpath, _options) =>
          ({ screenshot }) as unknown as ElementHandle,
      ),
    };

    const driver = new LeSouffleur(page);

    await driver.getByRole('button', { name: 'Increment' }).screenshot();

    expect(page.waitForXPath).toHaveBeenCalledOnce();
    expect(page.waitForXPath).toHaveBeenCalledWith(
      "//button[contains(normalize-space(),'Increment')]",
      {
        visible: true,
      },
    );
    expect(screenshot).toHaveBeenCalledOnce();
  });

  it('screenshots object by text', async () => {
    const screenshot = vi.fn();
    const page: Page = {
      waitForSelector: vi.fn(),

      waitForXPath: vi.fn(
        async (_xpath, _options) =>
          ({ screenshot }) as unknown as ElementHandle,
      ),
    };

    const driver = new LeSouffleur(page);

    await driver.getByText('Approve').screenshot();

    expect(page.waitForXPath).toHaveBeenCalledOnce();
    expect(page.waitForXPath).toHaveBeenCalledWith(
      "//*[normalize-space()='Approve']",
      {
        visible: true,
      },
    );
    expect(screenshot).toHaveBeenCalledOnce();
  });
});
