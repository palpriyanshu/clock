const Circle = (props) => {
  const centre = React.createElement('div', { className: 'centre' });
  return React.createElement(
    'div',
    { className: 'circle' },
    props.children,
    centre
  );
};

const rotate = (unit) => `rotate(${6 * unit}deg)`;

const Tick = function (props) {
  return React.createElement('div', {
    className: 'tick',
    style: { transform: rotate(props.id) },
  });
};

const Needle = function (props) {
  const style = { transform: rotate(props.unit) };
  return React.createElement('div', {
    style,
    className: `hand ${props.className}`,
  });
};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.sec = new Date().getSeconds();
    this.state.min = new Date().getMinutes();
    this.state.hour = new Date().getHours() % 12;
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

  getNeedle(unit, className) {
    return React.createElement(Needle, { unit, className });
  }

  render() {
    const { sec, min, hour } = this.state;
    const seconds = this.getNeedle(sec, 'secHand');
    const minutes = this.getNeedle(min, 'minHand');
    const hours = this.getNeedle(hour, 'hourHand');
    return React.createElement('div', null, seconds, minutes, hours);
  }
}

const getTickCounts = (count) => Array.from(Array(count).keys());

const main = function () {
  const mainContainer = document.getElementById('main_container');
  const ticks = getTickCounts(60).map((id) =>
    React.createElement(Tick, { id: id + 1, key: id })
  );

  const clock = React.createElement(Clock);
  ReactDOM.render(
    React.createElement(Circle, null, ticks, clock),
    mainContainer
  );
};

main();
