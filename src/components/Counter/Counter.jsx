import { useState , useCallback, memo , useMemo , useEffect} from 'react';
//useMemo should really only be used if u have a complex calculation that u want to prevent in here we wanna prevent isPrime from executing 
import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}//re-executing all this code all the time even though it will produce the same result as before is then not very efficient so react give a hook useMemo  the idea behind useMemo that react will now execute this functionwhich u pass to useMemo  'useMemo(() => isPrime(initialCount), []);'and it will then store the result of this execution so the result of calling isPrime then in the end and it will only re-execute this func if one of those dependencies here changed so if we have an empty array this will never re-execute but here initalCount is a dependencies cause that is used as a input by isPrime

const Counter = memo( function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);//in th eend isPrime only gets re-executed if initial count changed But it will not get executed if this counter state changed

  // useEffect(() => {
  //   setCounterChanges([{ value: initialCount , id : Math.random() * 1000 }]);//with that basically reset this array for when i put the numbet and click set this number show in center of 2 button decrem.. & increm..
  // } , [initialCount]);//but this ay is not optimal cause we know it execute after component func execution and if you then change the state in there you of course trigger another component func execution so u have 2 component func execution instead one!!! 
  //so the better way to forcing a component func reset is to use a key on the component



  //const [counter, setCounter] = useState(initialCount);
  //const [counterChanges, setCounterChanges] = useState([initialCount]);
  const [counterChanges, setCounterChanges] = useState([{ value: initialCount , id : Math.random() * 1000 },]);


  const currentCounter = counterChanges.reduce(
    (prevCounter , counterChange) => prevCounter + counterChange.value, 0
   );


  const handleDecrement = useCallback(function handleDecrement() {
    //setCounter((prevCounter) => prevCounter -1 );

    //setCounterChanges((prevCounterChanges) => [-1, ...prevCounterChanges] );
    setCounterChanges((prevCounterChanges) => [{ value : -1, id : Math.random() * 1000 }, ...prevCounterChanges] );

  }, []);
  

  const handleIncrement = useCallback(function handleIncrement() {
    //setCounter((prevCounter) => prevCounter +1 );

   // setCounterChanges((prevCounterChanges) => [1, ...prevCounterChanges]);

    setCounterChanges((prevCounterChanges) => [{ value : 1, id : Math.random() * 1000 }, ...prevCounterChanges]);

  },[] );

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges}/>
    </section>
  );
});

export default Counter;
