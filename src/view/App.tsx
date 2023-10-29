import React, { useState } from 'react';
import './input.css';

function App() {
  const [state, setState] = useState<String[]>([]);
  var count = 0;
  window.addEventListener('message', e => {
    const message = e.data;
    setState([...state, message.output]);
  });
  return (
    <div>
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button>
      <li>{state.map(m =>
        <li key={count++}>{m}</li>
      )}
      </li>
    </div>
  );
}
export default App;
