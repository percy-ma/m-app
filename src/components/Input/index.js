import './index.scss';

export default function App_Input(props) {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className='app-input'>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        type="text"
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
}
