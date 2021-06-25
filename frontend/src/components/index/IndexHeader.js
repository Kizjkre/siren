import IndexSectionTemplate from './IndexSectionTemplate';

const IndexHeader = ({ offset }) => (
  <IndexSectionTemplate
    offset={ offset }
    title="SIREN: Sonification Interface for REmapping Nature"
    subtitle="A Web Audio based sonification mapping system designed as an example of the possibilities of Web Audio as a flexible, modular, extensible and shareable framework for sonification."
    color="primary"
  >
    <div className="box">
      <p className="content">
        SIREN is an open-source, web-based sonification workstation that provides an accessible entry point to data mapping sonification and aims to demonstrate a use case for the Web Audio API. With plug-and-play functionality, and numerous methods to customize and create meaningful auditory display, SIREN provides useful features for pedagogy, methods for exploratory data sonification, and an extensible, open-ended development platform. Inspired by common digital audio workstation (DAW) workflows, SIREN provides a familiar and intuitive layout based upon data matrices as tracks that can be chained together as channels, thus allowing values in one data sequence to control a parameter of another data array.
      </p>
    </div>
  </IndexSectionTemplate>
);

export default IndexHeader;
