import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {


  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">


        <BlackBears />

        <PolarBears />

        <PandaBears />

        <BearsDisplay />

      </div>

    </>
  );
};


export const BlackBears = () => {

  const blackBears = useBearStore(state => state.blackBears);
  const increaseBlackBears = useBearStore(state => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}>-1</button>
      </div>

    </WhiteCard>
  )
}

export const PolarBears = () => {

  const polarbears = useBearStore(state => state.polarBears)
  const increasePolarbears = useBearStore(state => state.increasePolarBears)

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">

        <button onClick={() => increasePolarbears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarbears} </span>
        <button onClick={() => increasePolarbears(-1)}>-1</button>

      </div>

    </WhiteCard>
  )
}

export const PandaBears = () => {

  const pandaBears = useBearStore(state => state.pandaBears);
  const IncreasePandaBears = useBearStore(state => state.increasePandaBears);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => IncreasePandaBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={() => IncreasePandaBears(-1)}>-1</button>
      </div>

    </WhiteCard>
  )
}

export const BearsDisplay = () => {

  //Note: EL useShallow se encarga de analizar si las propiedades del estado realmente cambiaron para no renderizar si es que existe la posibilidad de que traiga en mismo estado, con los mismos valores.

  const bears = useBearStore(useShallow(state => state.bears));
  const doNothing = useBearStore(state => state.doNothing);
  const addBear = useBearStore(state => state.addBear);
  const clearBears = useBearStore(state => state.clearBears);


  return (
    <WhiteCard>
      <h1>Osos</h1>

      <button onClick={doNothing}>
        Hacer nada
      </button>
      <button className='mt-2' onClick={addBear}>
        Agregar oso
      </button>
      <button className='mt-2' onClick={clearBears}>
        Borrar osos
      </button>

      <pre>
        {JSON.stringify(bears, null, 2)}
      </pre>

    </WhiteCard>
  )
}

