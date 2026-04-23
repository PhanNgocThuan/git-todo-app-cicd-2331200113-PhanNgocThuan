const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = [];
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        const testText = 'Learn CI/CD with Playwright';
        controller.handleAddTodo(testText);

        const todos = service.getTodos();

        expect(todos.length).toBe(1);

        expect(todos[0].text).toBe(testText);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        service.addTodo('Task ready to be deleted');

        const todos = service.getTodos();
        const idToRemove = todos[0].id;

        controller.handleRemoveTodo(idToRemove);

        expect(service.getTodos().length).toBe(0);
    });
});