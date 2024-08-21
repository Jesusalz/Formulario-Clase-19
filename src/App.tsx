import React, { useReducer } from 'react';
import './App.css';

const initialState = {
  name: '',
  email: '',
  message: '',
  success: false,
  error: false
};

function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, [action.field]: action.value };
    case 'SUBMIT_SUCCESS':
      return { ...state, success: true, error: false };
    case 'SUBMIT_ERROR':
      return { ...state, success: false, error: true };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE',
      field: e.target.name,
      value: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = state;
    if (name && email && message) {
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } else {
      dispatch({ type: 'SUBMIT_ERROR' });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Formulario de Contacto clase 19</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={state.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
        {state.success && <p className="feedback success">¡Formulario enviado con éxito!</p>}
        {state.error && <p className="feedback error">Error al enviar el formulario. Por favor, inténtelo de nuevo.</p>}
      </form>
    </div>
  );
}

export default App;
