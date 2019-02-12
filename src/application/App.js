import React, { Component } from "react";
import axios from "axios";
import { isEmpty, isArray } from "lodash";
import TaskList from "../components/TaskList";
import { Form, Button, Input, FormGroup } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

const BASE_API =
  "https://us-central1-react-training-101.cloudfunctions.net/api/tanalan0";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      tasks: [],
      fetching: false,
      submitting: false,
      deleting: [],
    };
  }

  componentWillMount() {
    this.setState({ fetching: true });
    axios
      .get(`${BASE_API}/items`)
      .then(resp => {
        if (isArray(resp.data)) {
          this.setState({
            fetching: false,
            tasks: resp.data
          });
        } else {
          this.setState({ fetching: false });
        }
        console.log(resp.data);
      })
      .catch(err => {
        console.error(err);
        this.setState({ fetching: false });
        toast.error('Something went wrong, please try again!');
      });
  }

  onCreateTask = (data = {}) => {
    // Validate
    const { task } = data;
    if (isEmpty(task)) {
      console.log("Task is required!");
      return;
    }

    this.setState({ submitting: true });

    axios
      .post(`${BASE_API}/item`, {
        task: task
      })
      .then(resp => {
        this.setState({
          task: "",
          tasks: [...this.state.tasks, resp.data],
          submitting: false
        });
        toast.success('Task successfully added!');
      })
      .catch(err => {
        console.error(err);
        this.setState({ submitting: false });
        toast.error('Something went wrong, please try again!');
      });
  };

  onDelete = taskId => {
    // Validate
    if (isEmpty(taskId)) {
      console.log("TaskId is required!");
      return;
    }

    this.setState({ deleting: [...this.state.deleting, taskId] });

    axios
      .delete(`${BASE_API}/item/${taskId}`)
      .then(() => {
        this.setState({
          tasks: this.state.tasks.filter(o => o.id !== taskId),
          deleting: this.state.deleting.filter(id => id !== taskId)
        });
        toast.success('Task successfully deleted!');
      })
      .catch(err => {
        console.error(err);
        this.setState({
          deleting: this.state.deleting.filter(id => id !== taskId)
        });
        toast.error('Something went wrong, please try again!');
      });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <TaskList
          tasks={this.state.tasks}
          isLoading={this.state.fetching}
          onDelete={this.onDelete}
          deleting={this.state.deleting}
        />
        <hr />

        <Form
          onSubmit={e => {
            e.preventDefault();
            this.onCreateTask(this.state);
          }}
        >
          <FormGroup>
            <Input
              name="task"
              value={this.state.task}
              onChange={this.onChange}
              type="text"
              placeholder="Buy milk"
              disabled={this.state.submitting}
            />
          </FormGroup>
          <Button
            type="submit"
            color="success"
            disabled={this.state.submitting}
          >
            {this.state.submitting ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </div>
    );
  }
}

export default App;
