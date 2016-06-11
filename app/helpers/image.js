const AVATAR_SMALL_SIZE_EXT = '-small.jpg';
const AVATAR_MEDIUM_SIZE_EXT = '-medium.jpg';

export function getImageURLWithMediumSize(avatarURL) {
  if (!avatarURL || avatarURL === '') {
    throw new Error('Avatar URL cannot be null or empty!');
  }
  let userAvatar = avatarURL;
  if (userAvatar.endsWith(AVATAR_SMALL_SIZE_EXT)) {
    userAvatar = userAvatar.replace(AVATAR_SMALL_SIZE_EXT, AVATAR_MEDIUM_SIZE_EXT);
  }
  userAvatar += `?${new Date().getTime()}`;

  return userAvatar;
}
