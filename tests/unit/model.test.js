const { TodoService } = require('../../js/model');

describe('TodoService Model Unit Tests', () => {
    let todoService;

    beforeEach(() => {
        todoService = new TodoService();
        todoService.todos = [];
        todoService.observers = [];
    });

    test('addTodo: should add a new todo successfully', () => {
        todoService.addTodo('Learn CI/CD');
        const todos = todoService.getTodos();

        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe('Learn CI/CD');
        expect(todos[0].completed).toBe(false);
        expect(typeof todos[0].id).toBe('number');
    });

    test('addTodo: should not add a todo if text is empty', () => {
        todoService.addTodo('');
        todoService.addTodo(null);

        const todos = todoService.getTodos();

        expect(todos.length).toBe(0);
    });

    test('toggleTodoComplete: should toggle the completed status of a todo', () => {
        todoService.addTodo('Setup Playwright');
        const todo = todoService.getTodos()[0];
        const id = todo.id;

        expect(todo.completed).toBe(false);

        todoService.toggleTodoComplete(id);
        expect(todoService.getTodos()[0].completed).toBe(true);

        todoService.toggleTodoComplete(id);
        expect(todoService.getTodos()[0].completed).toBe(false);
    });

    test('removeTodo: should remove a todo by its id', () => {
        jest.spyOn(Date, 'now')
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(2);

        todoService.addTodo('Task to remove');
        todoService.addTodo('Task to keep');

        const todos = todoService.getTodos();
        const idToRemove = todos[0].id;
        const idToKeep = todos[1].id;

        todoService.removeTodo(idToRemove);

        const remainingTodos = todoService.getTodos();
        expect(remainingTodos.length).toBe(1);
        expect(remainingTodos[0].id).toBe(idToKeep);
        expect(remainingTodos[0].text).toBe('Task to keep');

        jest.restoreAllMocks();
    });
});