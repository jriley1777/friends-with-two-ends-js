export const ROUTES = {
    LOGIN: '/login',
    LOGOUT: '/logout',
    PLAY: '/play',
    CONFIG: '/config',
    INTRODUCTION: '/introduction',
    INDEX: '/',
    MISSING_PAGE: '/',
    DANCE_ZONE: '/dance_zone'
}

const base_storage =
  "https://firebasestorage.googleapis.com/v0/b/friends-with-two-ends.appspot.com/o/";
export const music = {
  start: `${base_storage}red-rose-rag-44.mp3?alt=media&token=0d679f0e-6fb6-4c9a-be29-098dee8b2b7c`,
  config: `${base_storage}moonbeams-44.mp3?alt=media&token=cb922c08-4c0c-43c0-a9a4-a8645bdf0a32`,
  game: `${base_storage}dill-pickles-44.mp3?alt=media&token=7c098771-146c-4542-aad0-dfd67bc6b506`,
  danceZone: `${base_storage}energy-fix-44.mp3?alt=media&token=9a92e4a5-d3ce-4284-b310-80b421f047af`,
  intro: `${base_storage}upbeat-party-44.mp3?alt=media&token=45c98d2d-b36c-440e-a0b7-d64e63982d6b`
};

export const images = {
  curtain: `${base_storage}images%2Ftheater_curtain_1980.jpg?alt=media&token=c34a0ab1-f008-4b8e-8744-44ce1de8b893`
};
