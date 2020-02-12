import React from 'react';
import './ListItem.css';

class ListItem extends React.Component {
    render() {
        const {desc, important, done, removeElem,
        markComplete, markImportant} = this.props;

        const elemClass = done ? `done` : ``;

        const listItemClass = `list-item 
        ${important ? `important` : ``}`;

        const importantButtonClass = important ? `important-active` : ``;

        return(
            <div className={listItemClass}>
                <div className="list-item-text">
                    <span
                     className = {elemClass}
                     onClick = {markComplete}
                    >{desc}</span>
                </div>

                <div className="list-item-buttons">
                    <button 
                    className= {importantButtonClass}
                    onClick = {markImportant}
                    >&#xef1c;</button>

                    <button 
                    className="del-item"
                    onClick = {removeElem}
                    >&#xee09;</button>
                </div>
            </div>
        )
    }
}

export default ListItem;