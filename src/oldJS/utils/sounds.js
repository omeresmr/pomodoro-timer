import { settings } from '../main.js';

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
  if (!settings.soundEnabled) return;

  // If the sound doesn't exist, return.
  const sound = SOUNDS[soundName];
  if (!sound) return;

  sound?.play();
};

// Wrapper Function for pausing Sounds
export const pauseSound = (soundName) => {
  if (!settings.soundEnabled) return;

  const sound = SOUNDS[soundName];
  if (!sound) return;

  // Pause sound
  sound.pause();

  // Reset sound
  sound.currentTime = 0;
};
