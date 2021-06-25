import IndexSectionTemplate from './IndexSectionTemplate';

const IndexFeatures = ({ offset }) => (
  <IndexSectionTemplate
    offset={ offset }
    title="Features"
    subtitle="SIREN's design is focused around the concepts of tracks and channels, which provide nuanced sonification features."
    color="info"
  >
    <div className="columns">
      <div className="column is-6">
        <div className="box h-100">
          <h1 className="title">Tracks</h1>
          <p className="content">
            The basic unit of sonification in SIREN is called a "track," and represents one dimension of the data. Multiple tracks can be layered to create a sonify multidimensional data polyphonicallym allowing users to explore the interaction of various aspects of the data. Like DAWs, each track can have different effects applied to it, such as volume, pan, and reverberation, and these can be adjusted specifically for every track. Similarly, track data can be altered to focus on parts of a dataset or to change the sonification mapping scheme from datum to pitches manually or automatically through pruning outliers. Furthermore, mappings between datum to frequencies can be adjusted to be either discrete pitch or a continuous pitch. By itself, the track serves as a starting point for interacting with data, where it can be combined in "channels" to create more complex sonifications.
          </p>
        </div>
      </div>
      <div className="column is-6">
        <div className="box h-100">
          <h1 className="title">Channels</h1>
          <p className="content">
            Channels provide another layer of abstraction on top of tracks, and their primary function is to group tracks together for more advanced sonification techniques. Similar to how automation works in DAWs, channels help automate different sound features using tracks as the automation curve. The motivation behind channels is for multiple tracks to be grouped essentially as one track, providing more possibilities and more unique ways to synthesize sound with the data sequence. These modulation mapping features currently include pitch, volume, pan, and reverb, and these features will alter the final sonification depending on the tracks chosen.
          </p>
        </div>
      </div>
    </div>
  </IndexSectionTemplate>
);

export default IndexFeatures;
