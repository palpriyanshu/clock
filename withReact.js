const Circle = (props) => {
  const style = {
    width: props.radius,
    height: props.radius,
  };
  const centre = React.createElement('div', { className: 'centre' });
  return React.createElement(
    'div',
    { style, className: 'circle' },
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

const getTickCounts = function () {
  let list = [];
  for (let index = 1; index <= 60; index++) {
    list.push(index);
  }
  return list;
};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sec: 0, hr: 0, min: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((state) => {
        state.sec += 1;
        if (state.sec > 59) {
          state.sec = 0;
          state.min += 1;
        }

        if (state.min > 59) {
          state.min = 0;
          state.hr = (state.hr + 1) % 12;
        }
        return state;
      });
    }, 1000);
  }

  render() {
    const { sec, min, hr } = this.state;
    const getStyle = (angle) => ({ transform: `rotate(${angle * 6}deg)` });
    const seconds = React.createElement('div', {
      style: getStyle(sec),
      className: 'hand',
      id: 'secHand',
    });
    const minutes = React.createElement('div', {
      style: getStyle(min),
      className: 'hand',
      id: 'minHand',
    });
    const hours = React.createElement('div', {
      style: getStyle(hr),
      className: 'hand',
      id: 'hourHand',
    });
    return React.createElement('div', null, seconds, minutes, hours);
  }
}

const main = function () {
  const mainContainer = document.getElementById('main_container');
  const Ticks = getTickCounts().map((id) =>
    React.createElement(Tick, { id, key: id })
  );

  const clock = React.createElement(Clock);

  ReactDOM.render(
    React.createElement(Circle, { radius: '300px' }, Ticks, clock),
    mainContainer
  );
};

main();
