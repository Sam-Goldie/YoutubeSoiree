import { EmojiButton } from '@joeattardi/emoji-button';

const picker = new EmojiButton();
const trigger = document.getElementById('emoji-trigger');

picker.on('emoji', selection => {

});

trigger.addEventListener('click', () => picker.togglePicker(trigger));