export const SOUND_TYPES = {
  CLICK: 'click',
  RING: 'ring',
};

const SOUNDS = {
  click: new Audio('../Sounds/button-sound.mp3'),
  ring: new Audio('../Sounds/ring-sound.mp3'),
};

// Wrapper Function for playing Sounds
export const playSound = (soundName) => SOUNDS[soundName]?.play();
