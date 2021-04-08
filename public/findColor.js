const userColors = {};

const findColor = (username) => {
  const color = userColors[username];
  if (color !== undefined) {
    return color;
  }
  userColors[username] = "#" + ((1<<24)*Math.random() | 0).toString(16);
  return userColors[username];
};

export default findColor;