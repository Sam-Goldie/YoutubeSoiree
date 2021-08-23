const userColors = {};

const findColor = (username) => {
  console.log('finding user color');
  const color = userColors[username];
  if (color !== undefined) {
    console.log('user color already exists');
    return color;
  }
  console.log('user color did not exist. creating now');
  const newColor = "#" + ((1<<24)*(Math.random() / 2 + 0.5) | 0).toString(16);
  for (let user in userColors) {
    const userColor = userColors[user];
    for (let i = 1; i < userColor.length; i += 2) {
      if (newColor[i] === userColor[i]) {
        return findColor(username);
      }
    }
  }
  console.log('what is user color after creation? ' + newColor);
  userColors[username] = newColor;
  return userColors[username];
};

export default findColor;