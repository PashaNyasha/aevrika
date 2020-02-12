import React from 'react';
import './AddNewItem.css';

class AddNewItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ``
        }

        // Новая запись
        this.writeDescription = e => {
            this.setState({value: e.target.value})
        }

        const {addNew} = this.props;

        this.addNewTodo = e => {
            e.preventDefault();
            const {value} = this.state;
            if (value.length > 0) {
                addNew(value);
                this.setState({value: ``});
            }
        }
    }

    render() {
        return(
            <div className="add-new-item">

                <form action="#">
                    <input type="text" 
                    name="add-new" id="add-new" placeholder="Новая задача"
                    onChange = {this.writeDescription}
                    value = {this.state.value}
                    />
                    
                    <button 
                    className="add-button"
                    onClick = {this.addNewTodo}
                    >&#xefc2;</button>
                </form>

            </div>
        );
    }
}

export default AddNewItem;