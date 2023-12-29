import IndexSectionTemplate from './IndexSectionTemplate';

const IndexNotice = ({ offset }) => (
  <IndexSectionTemplate
    offset={ offset }
    title="SIREN's Future"
    subtitle="Ongoing development of SIREN"
    color="danger"
  >
    <div className="box">
      <p className="content">
        SIREN has continually developed and improved. Over the past few years of SIREN development, the vision of a web-based sonification DAW has more and more come into fruition. The code can be found on <a target="_sirenGithub" href="https://github.com/Kizjkre/siren">GitHub</a> and the latest updates <a target="_siren" href="https://ccrma.stanford.edu/~pengt/siren">here</a>.
      </p>
    </div>
  </IndexSectionTemplate>
);

export default IndexNotice;
