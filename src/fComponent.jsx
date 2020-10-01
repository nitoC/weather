import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
var input = [];
var end = [];
var year = () => new Date().getFullYear();
var day = () => new Date().getDay();
var hour = () => new Date().getHours();
var month = () => new Date().getMonth();
var second = () => new Date().getSeconds();
var minutes = () => new Date().getMinutes();
var timeA = [];
var timeF = [];
const Running = (props) => {
  return (
    <div className="well">
      <h2>Running Tasks</h2>
      <div>
        {props.task.map((a, b) => (
          <h5 className="alert alert-warning" key={b}>
            <button
              onClick={(b) => props.taskConfirm(b)}
              style={{
                float: 'left',
                border: 'none',
                borderRadius: 6,
                paddingLeft: 0,
                color: 'red',
              }}
            >
              <i className="fas fa-check" />
            </button>

            {a}
            <br />
            <small className="text-small">date created:{props.timeAdd[b]}</small>
            <button
              className="close"
              onClick={(b) => props.complete(b, input)}
              data-dismiss="alert"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </h5>
        ))}
      </div>
    </div>
  );
};
const Completed = (props) => {
  return (
    <div className="well">
      <h2>Completed Tasks</h2>
      <div>
        {props.value.map((a, b) => (
          <h5 className="alert alert-success" key={b}>
            {a}
            <br />
            <small className="text-small">date completed:{props.timeFinish[b]}</small>
            <button className="close" onClick={(b) => props.complete(b, end)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </h5>
        ))}
      </div>
    </div>
  );
};

class Car extends Component {
  constructor(props) {
    super(props);
    this.myFRef = React.createRef();
    this.state = {
      Tasks: '',
      ended: [],
      Todo: [],
      timeAdd:timeA,
      timeFinish:timeF
    };

    this.completed = this.completed.bind(this);
    this.add = this.add.bind(this);
    this.changeInp = this.changeInp.bind(this);
    this.subtract = this.subtract.bind(this);
  }
  completed(a) {
    timeA.splice(a,1);
    timeF.push(
      day() +
        '/' +
        month() +
        '/' +
        year() +
        ' ' +
        hour() +
        ':' +
        minutes() +
        '::' +
        second()
    );
    end.push(input.splice(a, 1));
    this.setState({
      timeAdd:timeA,
      timeFinish:timeF,
      Todo: input,
      ended: end    });
  }
  add() {
    if (this.state.Tasks == '' || input.find((a) => a === this.state.Tasks)) {
      return alert('no task inputed');
    }
    timeA.push(
      day() +
        '/' +
        month() +
        '/' +
        year() +
        '  ' +
        hour() +
        ':' +
        minutes() +
        '::' +
        second()
    );
    input.push(this.state.Tasks);
    this.setState({
      Todo: input,
      timeAdd:timeA,
      timeFinish:timeF
    });
  }
  changeInp(event) {
    this.setState({
      Tasks: event.target.value,
    });
  }
  subtract(a, array) {
    array.splice(a, 1);
    this.setState({
      Todo: input,
      ended: end,
    });
  }
  render() {
    return (
      <div>
        <div
          id="firstSection"
          style={{
            margin: 'auto',
            borderColor: 'red',
            width: '50%',
            'margin-bottom': '5%',
          }}
        >
          <div style={{width: '90%', margin: 'auto'}}>
            <button
              onClick={this.add}
              className="bg-primary"
              style={{
                width: '30%',
                height: 40,
                color: 'white',
                border: 'none',
                borderRadius: 6,
              }}
            >
              add <i className="fas fa-paper-plane" />
            </button>
            <input
              type="text"
              onChange={this.changeInp}
              style={{
                display: 'inlineBlock',
                width: '68%',
                borderRadius: 6,
                height: 40,
                marginTop: 10,
                marginLeft: 4,
                paddingLeft: 8,
              }}
              required
            />
          </div>
        </div>

        <Running
          task={this.state.Todo}
          complete={this.subtract}
          taskConfirm={this.completed}
          timeAdd={this.state.timeAdd}
        />
        <br />
        <Completed complete={this.subtract} value={this.state.ended} timeFinish={this.state.timeFinish}/>
      </div>
    );
  }
}

export default Car;
