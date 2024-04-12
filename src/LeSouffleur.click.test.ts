import { expect, describe, it, vi } from 'vitest';
import { LeSouffleur } from './LeSouffleur';
import { ElementHandle, Page } from './types';

describe('LeSouffleur happy path', () => {
  it('clicks object by test id', async () => {
    const click = vi.fn();
    const page: Page = {
      waitForSelector: vi.fn(
        async (_selector, _options) => ({ click }) as unknown as ElementHandle,
      ),
      waitForXPath: vi.fn(),
    };

    const driver = new LeSouffleur(page);

    await driver.getByTestId('some-test-id').click();

    expect(page.waitForSelector).toHaveBeenCalledOnce();
    expect(page.waitForSelector).toHaveBeenCalledWith(
      '[data-hook="some-test-id"]:not([disabled])',
      {
        visible: true,
      },
    );
    expect(click).toHaveBeenCalledOnce();
  });

  it('clicks object by role', async () => {
    const click = vi.fn();
    const page: Page = {
      waitForSelector: vi.fn(),

      waitForXPath: vi.fn(
        async (_xpath, _options) => ({ click }) as unknown as ElementHandle,
      ),
    };

    const driver = new LeSouffleur(page);

    await driver.getByRole('button', { name: 'Increment' }).click();

    expect(page.waitForXPath).toHaveBeenCalledOnce();
    expect(page.waitForXPath).toHaveBeenCalledWith(
      "//button[contains(normalize-space(),'Increment')][not(@disabled)]",
      {
        visible: true,
      },
    );
    expect(click).toHaveBeenCalledOnce();
  });

  it('clicks object by text', async () => {
    const click = vi.fn();
    const page: Page = {
      waitForSelector: vi.fn(),

      waitForXPath: vi.fn(
        async (_xpath, _options) => ({ click }) as unknown as ElementHandle,
      ),
    };

    const driver = new LeSouffleur(page);

    await driver.getByText('Approve').click();

    expect(page.waitForXPath).toHaveBeenCalledOnce();
    expect(page.waitForXPath).toHaveBeenCalledWith(
      "//*[normalize-space()='Approve'][not(@disabled)]",
      {
        visible: true,
      },
    );
    expect(click).toHaveBeenCalledOnce();
  });
});
