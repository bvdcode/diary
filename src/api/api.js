class RemoteApi {
  static getClientId() {
    const localStorageKey = "CLIENT_ID";
    let clientId = localStorage.getItem(localStorageKey);
    if (!clientId) {
      clientId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem(localStorageKey, clientId);
    }
    return clientId;
  }

  static getUrl() {
    const clientId = this.getClientId();
    return `https://api.belov.us/key-value/diary-${clientId}`;
  }

  static async fetchData() {
    const url = this.getUrl();
    const response = await fetch(url);
    const data = await response.json();
    if (data) {
      data.forEach((item) => {
        if (item.date) {
          item.date = new Date(item.date);
        } else {
          item.date = new Date(2000, 0, 1);
        }
      });
    }
    return data;
  }

  static async saveData(items) {
    const url = this.getUrl();
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
  }
}

export default RemoteApi;
