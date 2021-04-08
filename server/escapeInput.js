const escapeInput = (input) => {
  console.log(`input before: ${input}`);
  input.replace(/&/g, '&amp;')
       .replace(/>/g, '&gt;')
       .replace(/</g, '&lt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&apos;');
  console.log(`input after: ${input}`);
  return input;
};

module.exports = escapeInput;