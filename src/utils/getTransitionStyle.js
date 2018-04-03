const getTransitionStyles = timeout => {
  return {
    entering: {
      opacity: 0,
      transition: `opacity ${timeout}ms ease-in-out`,
      transform: `translateY(500px)`,
      transition: `all ${timeout}ms ${timeout}ms ease-in-out`
    },
    entered: {
      transition: `opacity ${timeout}ms ease-in-out`,
      opacity: 1,
      transform: `translateY(0)`,
      transition: `all ${timeout}ms ${timeout}ms ease-in-out`
    },
    exiting: {
      transition: `opacity ${timeout}ms ease-in-out`,
      opacity: 0,
      transform: `translateY(-500px)`,
      transition: `all ${timeout}ms ${timeout}ms ease-in-out`
    }
  };
};

const getTransitionStyle = ({ timeout, status }) =>
  getTransitionStyles(timeout)[status];

export default getTransitionStyle;
