import React from "react"
import AddToDo from "../components/AddToDo"
import ToDoList from "../components/ToDoList"
import ToDoFooter from "../components/ToDoFooter"
import Axios from "axios"

class ToDoPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listItems: [
        {
          name: "Homework",
          status: "Completed"
        },
        {
          name: "Dinner",
          status: "Active"
        },
        {
          name: "Coding in React",
          status: ""
        }
      ],
      itemsLeft: 2,
      todo: "",
      DisplayList: [
        {
          name: "Homework"
        },
        {
          name: "Dinner"
        },
        {
          name: "Coding in React"
        }
      ]
    }
  }

  componentDidMount() {
    Axios.get("http://localhost:1337/notes").then((response) => {
      this.setState({ listItems: response.data.payload, DisplayList: response.data.payload })
    })
  }

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  submit = () => {
    let jsonObject = {
      title: this.state.todo
    }
    Axios.post("http://localhost:1337/notes", jsonObject).then((response) => {
      this.setState({ listItems: response.data.notes, DisplayList: response.data.notes })
    })
  }

  filter = (statusType) => {
    let filteredList

    if (statusType !== "All") {
      filteredList = this.state.listItems.filter((item) => item.status === statusType)
    } else filteredList = this.state.listItems
    this.setState({ DisplayList: filteredList })
  }

  render() {
    return (
      <div>
        <h1>todos</h1>
        <AddToDo onChange={this.onChange} submit={this.submit} />
        <ToDoList listItems={this.state.DisplayList} />
        <ToDoFooter itemsLeft={this.state.itemsLeft} filterFunction={this.filter} />
      </div>
    )
  }
}

export default ToDoPage
