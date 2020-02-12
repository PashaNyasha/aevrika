import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        const {todos} = this.props;

        const doneCount = () => {
            let count = 0;

            const findDone = todos.map(elem => {
                if (elem.done) count++;
            })
            return count;
        }

        return(
            <div className="header">

                <div className="logo">
                    <h1>Список задач</h1>
                </div>

                <div className="performed">
                    <p>Выполнено 
                        <span className="done-todos"> {doneCount()} </span>
                        из
                        <span className="all-todos"> {todos.length} </span>
                        </p>
                </div>
            </div>
        );
    }
}

export default Header;