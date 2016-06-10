export const UPDATE_MODAL_MODE = 'UPDATE_MODAL_MODE';
export const updateModalMode = (modalMode) => ({
  type: UPDATE_MODAL_MODE,
  payload: {
    modalMode: modalMode
  }
});


export const UPDATE_MODAL_SIZE = 'UPDATE_MODAL_WINDOW_SIZE';
export const updateModalSize = (modalSize) => ({
  type: UPDATE_MODAL_SIZE,
  payload: {
    modalSize: modalSize
  }
});
