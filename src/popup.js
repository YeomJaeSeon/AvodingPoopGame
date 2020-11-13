'use strict';

export default class Popup {
  constructor() {
    this.popup = document.querySelector('.popup');
    this.popupMessage = document.querySelector('.popup__message');
    this.popupBtn = document.querySelector('.popup__refresh');

    this.popupBtn.addEventListener('click', () => {
      this.onStop && this.onStop();
      this.hidePopUp();
    });
  }
  onStopListener(onStop) {
    this.onStop = onStop;
  }
  showPopupwithMessage(Msg) {
    this.popup.style.visibility = 'visible';
    this.popupMessage.innerText = Msg;
  }
  hidePopUp() {
    this.popup.style.visibility = 'hidden';
  }
}
