import Window from '../../Window';

const ChannelWindow = () => {
  return (
    <Window
      id="window-channel"
      title="Channels"
      buttons={ [] }
    >
      <button className="button is-primary is-fullwidth">
        <span className="icon">
          <i className="fa fa-plus" />
        </span>
        <span>Create Channel</span>
      </button>
      <hr />
      <section className="section">

      </section>
    </Window>
  );
};

export default ChannelWindow;
