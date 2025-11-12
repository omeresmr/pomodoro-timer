import { soundEnabled } from '../main.js';

export const SOUND_TYPES = {
  CLICK: 'click',
  RING: 'ring',
};

const SOUNDS = {
  click: new Audio('../Sounds/button-sound.mp3'),
  ring: new Audio('../Sounds/ring-sound.mp3'),
};

// Wrapper Function for playing Sounds
export const playSound = (soundName) => {
  // If user disabled sound, return.
  if (!soundEnabled) return;

  // If the sound doesn't exist, return.
  const sound = SOUNDS[soundName];
  if (!sound) return;

  SOUNDS[soundName]?.play();
};

// Wrapper Function for pausing Sounds
export const pauseSound = (soundName) => {
  if (!soundEnabled) return;

  const sound = SOUNDS[soundName];
  if (!sound) return;

  // Pause sound
  SOUNDS[soundName].pause();

  // Reset sound
  SOUNDS[soundName].currentTime = 0;
};
