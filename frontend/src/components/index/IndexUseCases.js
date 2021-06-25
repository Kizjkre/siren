import IndexSectionTemplate from './IndexSectionTemplate';

const IndexUseCases = ({offset}) => {
  return (
    <IndexSectionTemplate title="Use Cases" color="warning">
      <div className="box">
        SIREN has a variety of use cases. Most notably, SIREN was featured in the workshop "Sound as ocean memory: ecoacoustics, audification and sonification" hosted by the Ocean Memory Project, where SIREN was used as a vehicle to explore data collected on coral genomes and temperatures. Combining DNA sequences and coral temperatures in a channel demonstrated a meaningful use case for exploring the dataset in a unique method. Apart from oceanic data, SIREN has the potential to sonify other datasets in different areas of study. Through the original concept of channels, SIREN provides another perspective into parameter mapping sonification, and offers an easy tool for rapid sonification prototyping as well as an accessible introduction into parameter mapping sonification for beginners. Due to the low-friction onboarding and intuitive concepts of tracks, SIREN also serves as a potentially useful tool in an educational setting, where newcomers can test out data sonification through SIREN before diving deeper.
      </div>
    </IndexSectionTemplate>
  );
};

export default IndexUseCases;
