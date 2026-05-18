const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Collage App Slot Management', () => {
    test('Can swap two images and delete an image via drag and drop', async ({ page }) => {
        await page.goto('http://localhost:1313/collage/');
        
        // Upload two different images to verify swap
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.locator('#drop-zone').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles([
            path.join(__dirname, 'test-images/landscape.jpg'),
            path.join(__dirname, 'test-images/portrait.jpg')
        ]);
        
        await page.waitForTimeout(500);

        let slots = page.locator('.slot');
        await expect(slots).toHaveCount(2);

        const bg1 = await slots.nth(0).locator('.slot-bg').evaluate(el => el.style.backgroundImage);
        const bg2 = await slots.nth(1).locator('.slot-bg').evaluate(el => el.style.backgroundImage);
        expect(bg1).not.toBe(bg2); 

        // --- SWAP TEST ---
        const slot1Box = await slots.nth(0).boundingBox();
        const slot2Box = await slots.nth(1).boundingBox();
        
        // 1. Mouse down on slot 1
        await page.mouse.move(slot1Box.x + slot1Box.width / 2, slot1Box.y + slot1Box.height / 2);
        await page.mouse.down();
        // 2. Drag OUTSIDE slot 1 to trigger swap mode ghost (threshold is 15px, so we go far out)
        await page.mouse.move(slot1Box.x - 50, slot1Box.y - 50, { steps: 5 });
        // 3. Drag over slot 2
        await page.mouse.move(slot2Box.x + slot2Box.width / 2, slot2Box.y + slot2Box.height / 2, { steps: 5 });
        // 4. Drop
        await page.mouse.up();
        
        await page.waitForTimeout(300); // Wait for calculation
        
        const newBg1 = await slots.nth(0).locator('.slot-bg').evaluate(el => el.style.backgroundImage);
        const newBg2 = await slots.nth(1).locator('.slot-bg').evaluate(el => el.style.backgroundImage);
        
        expect(newBg1).toBe(bg2);
        expect(newBg2).toBe(bg1);

        // --- DELETE TEST ---
        const boardBox = await page.locator('#collage-board').boundingBox();
        const slotBox = await slots.nth(0).boundingBox();
        
        // 1. Mouse down on slot 1
        await page.mouse.move(slotBox.x + slotBox.width / 2, slotBox.y + slotBox.height / 2);
        await page.mouse.down();
        // 2. Drag far outside the board
        await page.mouse.move(boardBox.x - 100, boardBox.y - 100, { steps: 10 });
        // 3. Drop to delete
        await page.mouse.up();
        
        await page.waitForTimeout(300);
        
        // Verify only 1 slot remains
        await expect(slots).toHaveCount(1);
        
        console.log('Swap and Delete pan-gesture tests passed successfully!');
    });
});
