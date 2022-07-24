import { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <article className="message">
      <div className="message-header accordion" onClick={ () => setOpen(!open) }>
        <p>{ title }</p>
        <button className="button">
          <span>Click to { open ? 'close' : 'expand' }</span>
          <span className="icon is-small">
            <i className={ `fa fa-chevron-${ open ? 'up' : 'down' }` } />
          </span>
        </button>
      </div>
      <div className={ `message-body ${ open ? '' : 'is-hidden' }` }>{ children }</div>
    </article>
  );
};

export default Accordion;
