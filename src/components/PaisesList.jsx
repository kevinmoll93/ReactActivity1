import React from 'react';

const PaisList = ({ listado, deleteCountrie, updCountrie }) => {
  return listado.length > 0 ? (
    <div className="container-fluid">
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Pais</th>
            <th>Actualizar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {listado.map(p => {
            const { name, id } = p;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success btn-lg mt-4"
                    onClick={() => updCountrie(id)}>
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-lg mt-4"
                    onClick={() => deleteCountrie(id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="sinResultados table-container">
      <p className="encabezado">No se encuentran resultados.</p>
    </div>
  );
};

export default PaisList;