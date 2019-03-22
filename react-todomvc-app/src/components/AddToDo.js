import React, { Component } from "react"

const AddToDo = (props) => {
  return (
    <div className="new-todo edit">
      <input onChange={props.onChange} id="todo" type="text" placeholder="what needs to be done?" />
      <button onClick={props.submit}>Add</button>
    </div>
  )
}

export default AddToDo
