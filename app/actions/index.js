export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export const CHECK_AUTH_STATUS = 'CHECK_AUTH_STATUS';
export const checkAuthStatus = token => ({
  type: CHECK_AUTH_STATUS,
  token
});
