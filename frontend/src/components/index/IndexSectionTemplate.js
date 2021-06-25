const IndexSectionTemplate = ({ offset, title, subtitle, color, children }) => (
  <div className="block">
    <div className="columns is-gapless">
      { offset ? <div className="column is-1-desktop" /> : null }
      <div className="column is-11-desktop is-12">
        <section className={ `hero is-${ color }` }>
          <div className="hero-body">
            <h1 className="title">{ title }</h1>
            <h2 className="subtitle">{ subtitle }</h2>
          </div>
        </section>
      </div>
    </div>
    <div className="container">
      { children }
    </div>
  </div>
);

export default IndexSectionTemplate;
