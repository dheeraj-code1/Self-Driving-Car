class Controls {
  constructor(ctrType) {
    this.forward = false;
    this.backward = false;
    this.left = false;
    this.right = false;
    if(ctrType == "KEYS"){

      this.#addKeyboardListeners();
    }else{
      this.forward = true
    }
  }
  #addKeyboardListeners() {
    document.onkeydown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.backward = true;
          break;
      }
      // console.table(this)
    };
    document.onkeyup = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.backward = false;
          break;
      }
      // console.table(this)
      
    };
  }
}
