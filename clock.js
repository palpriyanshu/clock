const Clock = (props) => {
  const centre = React.createElement('div', { className: 'centre' });
  return React.createElement(
    'div',
    { className: 'circle' },
    props.children,
    centre
  );
};

const rotate = (angle) => `rotate(${angle}deg)`;

const Tick = function (props) {
  return React.createElement('div', {
    className: 'tick',
    style: { transform: rotate(6 * props.id) },
  });
};

const Needle = function (props) {
  const style = { transform: rotate(props.angle) };
  return React.createElement('div', {
    style,
    className: `hand ${props.className}`,
  });
};

class Needles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTime: undefined };
  }

  setCurrentTime(state) {
    const date = new Date();
    const currentTime = {
      sec: date.getSeconds(),
      min: date.getMinutes(),
      hour: date.getHours() % 12,
    };
    return { currentTime };
  }

  componentDidMount() {
    this.setState(this.setCurrentTime);
    setInterval(() => this.setState(this.setCurrentTime), 1000);
  }

  getNeedle(angle, className) {
    return React.createElement(Needle, { className, angle });
  }

  render() {
    if (!this.state.currentTime) {
      return React.createElement('p', null, 'loading...');
    }
    const { sec, min, hour } = this.state.currentTime;
    const secAngle = sec * 6;
    const minAngle = min * 6 + sec / 10;
    const hourAngle = hour * 30 + min / 2 + sec / 120;
    const seconds = this.getNeedle(secAngle, 'secHand');
    const minutes = this.getNeedle(minAngle, 'minHand');
    const hours = this.getNeedle(hourAngle, 'hourHand');
    return React.createElement('div', null, seconds, minutes, hours);
  }
}

const getTickCounts = (count) => Array.from(Array(count).keys()); //[...Array(count).keys()]

const main = function () {
  const mainContainer = document.getElementById('main_container');
  const ticks = getTickCounts(60).map((id) =>
    React.createElement(Tick, { id: id + 1, key: id })
  );

  const needles = React.createElement(Needles);
  ReactDOM.render(
    React.createElement(Clock, null, ticks, needles),
    mainContainer
  );
};

main();
