const Form = ({
    handleSubmit,
    updateState,
    puesto,
    empresa,
    ciudad,
    pais,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="puesto" className="form-control" placeholder="Nombre del Puesto" onChange={updateState} value={puesto} />
        <br />
        <input type="text" name="empresa" className="form-control" placeholder="Nombre de la Empresa" onChange={updateState} value={empresa} />
        <br />
        <input type="text" name="ciudad" className="form-control" placeholder="Ingresar Ciudad" onChange={updateState} value={ciudad} />
        <br />
        <input type="text" name="pais" className="form-control" placeholder="Ingresar Pais" onChange={updateState} value={pais} />
        <br />
        <button type="submit" className="btn btn-primary btn-success">Agregar</button>
      </form>
    );
  };
  
  export default Form;