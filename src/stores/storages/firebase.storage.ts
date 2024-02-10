import { createJSONStorage } from 'zustand/middleware';
import { StateStorage } from 'zustand/middleware';

const firebaseUrl = 'https://zustand-storage-8f2d4-default-rtdb.firebaseio.com/zustand';

const firebaseAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) => res.json());

    // console.log(data);

      return JSON.stringify(data);

    } catch (error) {
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    // const data =
      await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value,
    }).then((res) => res.json());

    // console.log(data);

    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    sessionStorage.removeItem(name);
  },
};

export const firebaseStorage = createJSONStorage(() => firebaseAPI);
