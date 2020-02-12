import React from 'react';
import './List.css';
import ListItem from '../List-item';

class List extends React.Component {
    render() {
        // Вытаскиваю из пропсов массив с элементами списка
        const {todos, removeElem, markComplete,
            markImportant} = this.props;
        
        const makeListItems = todos.map((elem, i) => {
            // Из элемента вытаскиваю айди и ставлю как ключ для тега li
            // Всё остальное отдаю компоненту ListItem
            const {id, ...rest} = elem;
            return(
                <li key={id}>
                    <ListItem 
                    {...rest}
                     removeElem = {() => removeElem(id)}
                     markComplete = {() => markComplete(id)}
                     markImportant = {() => markImportant(id)}
                    />
                </li>
            );
        });

        return (
            <div className="list">
                <ul>
                    {makeListItems}
                </ul>
            </div>
        )
    }
}

export default List;