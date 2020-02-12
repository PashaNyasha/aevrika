import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import Header from './Components/Header';
import SearchPanel from './Components/SearchPanel';
import List from './Components/List';
import AddNewItem from './Components/Add-new-item'

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            todos: [
                {desc: 'Хочу', important: false, done: false, id: 0},
                {desc: 'К', important: false, done: false, id: 1},
                {desc: 'Вам', important: false, done: false, id: 2},
                {desc: 'На', important: false, done: false, id: 3},
                {desc: 'Работу', important: false, done: false, id: 4}
            ],
            cloneTodo: [
                {desc: 'Хочу', important: false, done: false, id: 0},
                {desc: 'К', important: false, done: false, id: 1},
                {desc: 'Вам', important: false, done: false, id: 2},
                {desc: 'На', important: false, done: false, id: 3},
                {desc: 'Работу', important: false, done: false, id: 4}
            ]
        }

        // Удалить элемент из списка
        this.removeElem = id => {
            this.setState(({todos}) => {
                // Найти индекс удаляемого элемента
                const index = todos.findIndex(elem => elem.id === id);
                // Срезать массив от начала до нужного элемента
                // И не включая его самого, срезать до конца
                const newArr = [
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                ]
                
                return {
                    todos: newArr,
                    cloneTodo: newArr
                }
            })
        }

        // Добавить новый элемент
        this.addNewElem = val => {
            this.setState(({todos}) => {
                const cloneArr = todos.slice();
                // Новая запись появится сверху
                cloneArr.unshift({
                    desc: val,
                    important: false,
                    done: false,
                    id: todos.length
                });

                console.log(cloneArr)

                return {
                    todos: cloneArr,
                    cloneTodo: todos.slice()
                }
            })
        }

        const findElem = (id, arr, prop) => {
            const cloneArr = arr.slice();
            const element = arr.find(elem => elem.id === id);
            element[prop] = !element[prop];
            return cloneArr;
        }

        // Зачеркнуть выполненное
        this.markComplete = id => {
            this.setState(({todos}) => {
                const clone = findElem(id, todos, `done`);
                return {
                    todos: clone,
                    cloneTodo: todos.slice()
                }
            })
        }

        // Пометить как важное
        this.markImportant = id => {
            this.setState(({todos}) => {
                const clone = findElem(id, todos, `important`);
                return {
                    todos: clone,
                    cloneTodo: todos.slice()
                }
            })
        }

        // Изменяться будет только массив todos
        // cloneTodo служит как копия полного массива todos
        const showElems = (arr, prop) => {
            return arr.filter(elem => {
                if (elem[prop]) return elem;
            })
        }

        // Показать важные
        this.showActive = () => {
            this.setState(({todos, cloneTodo}) => {
                return {
                    todos: showElems(cloneTodo, `important`)
                }
            })
        }

        // Показать завершенные
        this.showDone = () => {
            this.setState(({todos, cloneTodo}) => {
                return {
                    todos: showElems(cloneTodo, `done`)
                }
            })
        }

        // Показать всё
        this.showAll = () => {
            this.setState(({todos, cloneTodo}) => {
                return {
                    todos: cloneTodo.slice()
                }
            })
        }


        // Найти элемент
        this.searchTodo = val => {
            console.log(this.state.disableAddButton)
            const founded = this.state.cloneTodo.filter(elem => {
                const {desc} = elem;
                // Ищу с начала строки
                const matches = desc.toLowerCase().match(`^${val.toLowerCase()}`);
                // Если элемент найден, вернуть его в массиве
                if (matches) return elem;
            })

            // Если нажаты кнопки справа то поиск сбросится
            // Или если строка пуста, появятся все элементы
            this.setState(({todos}) => {
                return {
                    todos: founded
                }
            })
        }
    }

    render() {
        return(
            <div className="container">
                <Header
                todos = {this.state.cloneTodo} 
                />

                <SearchPanel 
                showActive = {() => this.showActive()}
                showDone = {() => this.showDone()}
                showAll = {() => this.showAll()}
                searchTodo = {val => this.searchTodo(val)}
                />

                <List 
                todos = {this.state.todos}
                removeElem = {id => this.removeElem(id)}
                markComplete = {id => this.markComplete(id)}
                markImportant = {id => this.markImportant(id)}
                />

                <AddNewItem 
                addNew = {val => this.addNewElem(val)}
                />
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById(`root`));