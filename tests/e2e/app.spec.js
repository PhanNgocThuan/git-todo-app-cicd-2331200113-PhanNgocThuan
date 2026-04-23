const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';
    await window.locator('#todo-input').fill(taskText);
    await window.locator('#add-todo-btn').click();
    const todoItem = window.locator('.todo-item', { hasText: taskText });
    await expect(todoItem).toBeVisible();

    await todoItem.locator('input[type="checkbox"]').click();
    await expect(todoItem).toHaveClass(/completed/);

    await todoItem.locator('.delete-btn').click();
    await expect(todoItem).not.toBeVisible();

    await electronApp.close();
});