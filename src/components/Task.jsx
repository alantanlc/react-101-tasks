import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ListGroupItem, Button } from "reactstrap";
import { isEmpty } from 'lodash';

class Task extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    deleting: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    deleting: [],
  }

  onDeleteClick = e => {
    e.preventDefault();
    this.props.onDelete(this.props.id);
  };

  isDeleting = () => {
    const { id, deleting } = this.props;
    return !isEmpty(deleting.filter(o => o === id)[0]);
  }

  render() {
    const { task } = this.props;
    const isDeleting = this.isDeleting();

    // console.log('isDeleting', isDeleting);

    return (
      <ListGroupItem>
        <Button
          type="button"
          onClick={this.onDeleteClick}
          disabled={isDeleting}
          color="danger"
          >
          { isDeleting ? 'Deleting...' : 'Delete' }
        </Button>
        {task}
      </ListGroupItem>
    );
  }
}

export default Task;
