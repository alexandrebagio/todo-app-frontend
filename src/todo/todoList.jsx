import React from 'react'
import { connect } from 'react-redux'

import IconButton from '../template/iconButton'
import { markAsDone, markAsPending, remove } from './todoActions'
import { bindActionCreators } from 'redux';


const TodoList = props => {

    const list = props.list || []
    
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map(todo => (
                        <tr key={todo._id}>
                            <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                            <td>
                                <IconButton style='success' 
                                    hide={todo.done}
                                    icon='check'
                                    onClick={() => props.markAsDone(todo)}></IconButton>
                                <IconButton style='warning' 
                                    icon='undo'
                                    hide={!todo.done}
                                    onClick={() => props.markAsPending(todo)}></IconButton>
                                <IconButton style='danger' 
                                    icon='trash-o'
                                    hide={!todo.done}
                                    onClick={() => props.remove(todo)}></IconButton>  
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = (dispatch) => bindActionCreators({ markAsDone, markAsPending, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)