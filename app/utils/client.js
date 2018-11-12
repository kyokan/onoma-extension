class Client {
  constructor() {
    this.port = chrome.extension.connect({ name: global.location.href });
    this.id = 0;
    this.defers = {};
    this.port.onMessage.addListener(msg => {
      const { id, payload } = JSON.parse(msg);
      const { resolve } = this.defers[id] || {};
      if (resolve) {
        resolve(payload);
        this.defers[id] = null;
      }
    });
  }

  dispatch(action) {
    const data = {
      ...action,
      id: this.id,
    };

    const promise = new Promise((resolve, reject) => {
      this.defers[this.id] = { resolve, reject };
    });

    this.port.postMessage(JSON.stringify(data));
    this.id++;
    return promise;
  }
}

export default new Client();
