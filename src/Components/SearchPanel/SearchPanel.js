import React from 'react';
import './SearchPanel.css';

class SearchPanel extends React.Component {
    constructor() {
        super();
        
        this.state = {
            value: ``,
            buttons: [
                {active : null},
                {active : `active-button`},
                {active : null}
            ]
        }
    }

    render() {
        const {searchTodo, showActive, showAll, showDone} = this.props;

        const setValue = e => {
            this.setState({value: e.target.value})
            const {value} = this.state;
            searchTodo(e.target.value);
        }

        const activateButton = (e, n) => {
            e.preventDefault();
            n === 0 ? showActive() : n === 1 ? showAll() : showDone();

            const {buttons} = this.state;
            const activated = buttons.map((elem,i,arr) => {
                elem.active = null;
                arr[n].active = `active-button`;
                return elem;
            })
            this.setState({buttons: activated});
        }

        const [act, all, done] = this.state.buttons;

        return(
            <div className="search-panel">
                <form action="#">

                    <input type="text" name="search" id="search" 
                    placeholder="Найти"
                    onInput = {setValue}
                    />
                    
                    <div className="buttons">

                        <button 
                        className = {act.active}
                        onClick = {e => {activateButton(e, 0)}}
                        >Активные</button>

                        <button 
                        className = {all.active}
                        onClick = {e => {activateButton(e, 1)}}
                        >Все</button>
                        
                        <button 
                        className = {done.active}
                        onClick = {e => {activateButton(e, 2)}}
                        >Завершенные</button>

                    </div>
                </form>
            </div>
        );
    }
}

export default SearchPanel;