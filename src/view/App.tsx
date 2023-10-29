import React, { useState } from 'react';

function App() {
  const [state, setState] = useState<String[]>([]);
  var count = 0;
  window.addEventListener('message', e => {
    const message = e.data;
    setState([...state, message.output]);
  });
  return (
    <div>
      <li>{state.map(m => {
        // return <li key={count++}>{m}</li>;
        console.log(m);
        return <li key={count++}>{m}</li>;
      })}
      </li>
    </div>
  );
}
export default App;
