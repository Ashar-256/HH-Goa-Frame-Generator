/**
 * X (Twitter) Sharing Helpers & Unique Post Copy Pool
 * HH Goa 2026 — Less Noise. More Signal.
 */

const SINGLE_FACE_POSTS = [
  "New frame. Same builder energy. 🌴\nSee you at HH Goa 2026. #FrameInGoa #HHGoa",
  "Less noise. More signal.\nSee you in Goa. 🌴 #FrameInGoa #HHGoa",
  "Consider this my digital boarding pass to Goa. ✈️🌴\n#FrameInGoa #HHGoa",
  "Frame locked.\nGoa unlocked. 🌴 #FrameInGoa #HHGoa",
  "Putting a face to the builder.\nHH Goa 2026. 🌴 #FrameInGoa #HackerHouseGoa",
  "Profile picture: upgraded.\nDestination: Goa. 🌴 #FrameInGoa #HHGoa",
  "A little bit of code. A little bit of chaos.\nSee you at HH Goa 2026. 🌴 #FrameInGoa",
  "This is what I'm bringing to Goa.\nBuilder mode: ON. 🛠️🌴 #FrameInGoa #HHGoa",
  "Made the frame.\nNow I just need to make it to Goa. 🌴 #FrameInGoa #HHGoa",
  "Somewhere between building things and breaking things.\nHH Goa 2026. 🌴 #FrameInGoa",
  "Goa called.\nI changed my profile picture first. 🌴 #FrameInGoa #HHGoa",
  "See you where builders, ideas and Goa collide. 🌴\n#FrameInGoa #HHGoa",
  "One face. One frame.\nSee you at HH Goa 2026. 🌴 #FrameInGoa #HackerHouseGoa"
];

const MULTI_FACE_POSTS = [
  "Found my face in the crowd.\nNow find me in Goa. 🌴 #FrameInGoa #HHGoa",
  "Spotted in the builder squad.\nSee you at HH Goa 2026. 🌴 #FrameInGoa #HHGoa",
  "Framed and ready.\nSee you with the squad at HH Goa 2026. 🌴 #FrameInGoa #HHGoa",
  ...SINGLE_FACE_POSTS
];

let lastSelectedIndex = -1;

/**
 * Returns a unique, clever X post copy from the pool without consecutive repetition.
 * @param {boolean} isMultiFace - True if image was selected from a multi-person photo
 * @returns {string} Selected post text
 */
export const getRandomShareText = (isMultiFace = false) => {
  const pool = isMultiFace ? MULTI_FACE_POSTS : SINGLE_FACE_POSTS;
  let nextIndex;
  
  // Prevent immediate repetition of the previous index
  do {
    nextIndex = Math.floor(Math.random() * pool.length);
  } while (nextIndex === lastSelectedIndex && pool.length > 1);

  lastSelectedIndex = nextIndex;
  return pool[nextIndex];
};
