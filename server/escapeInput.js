const escapeInput = (input) => {
  input.replace(/&/g, '&amp;')
       .replace(/>/g, '&gt;')
       .replace(/</g, '&lt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&apos;');
  return input;
};

module.exports = escapeInput;