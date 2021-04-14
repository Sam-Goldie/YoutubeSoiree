const userColors = {};
// const hexChars = '0123456789ABCDEF';

const findColor = (username) => {
  const color = userColors[username];
  if (color !== undefined) {
    return color;
  }
  const newColor = "#" + ((1<<24)*(Math.random() / 2 + 0.5) | 0).toString(16);
  for (let user in userColors) {
    const userColor = userColors[user];
    for (let i = 1; i < userColor.length; i += 2) {
      if (newColor[i] === userColor[i]) {
        return findColor(username);
      }
    }
  }
  userColors[username] = newColor;
  return userColors[username];
};

export default findColor;