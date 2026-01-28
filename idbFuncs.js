export const idbFuncs = (() => {
  let instance;

  function openDB(dbName = "hcOS", version = 1, stores = []) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);

      request.onupgradeneeded = (e) => {
        instance = e.target.result;
        stores.forEach(storeInfo => {
          if (!instance.objectStoreNames.contains(storeInfo.name)) {
            instance.createObjectStore(storeInfo.name, { keyPath: storeInfo.keyPath });
          }
        });
      };

      request.onsuccess = () => {
        instance = request.result;
        resolve(instance);
      };

      request.onerror = () => reject(request.error);
    });
  }

  function set(storeName, obj) {
    return new Promise((resolve, reject) => {
      const tx = instance.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.put(obj);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  function get(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = instance.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  return { openDB, set, get };
})();
