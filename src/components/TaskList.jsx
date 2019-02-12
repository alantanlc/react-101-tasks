import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListGroup } from "reactstrap";
import TaskItem from "./Task";

class TaskList extends Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        task: PropTypes.string.isRequired
      })
    ),
    isLoading: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    deleting: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    tasks: [],
    deleting: [],
  };

  render() {
    const { 
      tasks,
      isLoading,
      onDelete,
      deleting,
    } = this.props;

    return (
      <div>
        {isLoading ? (
          <h3 className="text-center">Loading...</h3>
        ) : (
          <ListGroup>
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                id={task.id}
                task={task.task}
                onDelete={onDelete}
                deleting={deleting} />
            ))}
          </ListGroup>
        )}
      </div>
    );
  }
}

export default TaskList;
