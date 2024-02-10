import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
// import { customSessionStorage } from '../storages/session.storage';
// import { firebaseStorage } from '../storages/firebase.storage';
// import { logger } from '../middlewares/logger.middleware';

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions, [['zustand/devtools', never]]> = (set) => ({
  firstName: '',
  lastName: '',

  // setFirstName: (value: string) => set((state) => ({ firstName: value })), asi funciona de manera correcta, sin embargo para que en redux devtools (Fijarse abajo que envolvi el middleware persist con el middleware devtools) me aparezca el nombre de la funcion que ejecuta la accion debo pasar en el tercer parametro el nombre. En este caso el 'setFirstName' por ejemplo. y el segundo argumento, en este caso 'false' (que es su valor por defecto), hay que pasarlo para poder pasar el tercero.

  setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
  setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),
});

export const userPersonStore = create<PersonState & Actions>()(

  devtools(
    persist(storeAPI, {
      name: 'person-storage',
      // storage: firebaseStorage,
    })
  )
);
