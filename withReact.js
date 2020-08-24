const Circle = (props) => {
  const centre = React.createElement('div', { className: 'centre' });
  return React.createElement(
    'div',
    { className: 'circle' },
    props.children,
    centre
  );
};

const Tick = function (props) {
  return React.createElement('div', {
    className: 'tick',
    style: {
      transform: `rotate(${6 * props.id}deg)`,
    },
  });
};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sec: 0, hour: 0, min: 0 };
  }

  updateState(state) {
    state.sec += 1;
    if (state.sec > 59) {
      state.sec = 0;
      state.min += 1;
    }

    if (state.min > 59) {
      state.min = 0;
      state.hour = (state.hour + 1) % 12;
    }
    return state;
  }

  componentDidMount() {
    setInterval(() => this.setState(this.updateState), 1000);
  }

  createNeedle(unit, id) {
    const style = { transform: `rotate(${unit * 6}deg)` };
    return React.createElement('div', { style, className: 'hand', id });
  }

  render() {
    const { sec, min, hour } = this.state;
    const seconds = this.createNeedle(sec, 'secHand');
    const minutes = this.createNeedle(min, 'minHand');
    const hours = this.createNeedle(hour, 'hourHand');
    return React.createElement('div', null, seconds, minutes, hours);
  }
}

const getTickCounts = function () {
  let list = [];
  for (let index = 1; index <= 60; index++) {
    list.push(index);
  }
  return list;
};

const main = function () {
  const mainContainer = document.getElementById('main_container');
  const ticks = getTickCounts().map((id) =>
    React.createElement(Tick, { id, key: id })
  );

  const clock = React.createElement(Clock);
  ReactDOM.render(
    React.createElement(Circle, null, ticks, clock),
    mainContainer
  );
};

main();
