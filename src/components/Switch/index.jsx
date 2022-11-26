import './index.scss'

function Switch() {
  return (
    <>
      <label className="app-switch">
        <input type="checkbox" />
        <span className="app-switch-box">
          <span className="app-switch-handle"></span>
        </span>
      </label>
    </>
  );
}

export default Switch