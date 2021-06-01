import React from 'react';

const EmpresasList = ({ list, deletOrg, places, countries, objOrg }) => {
  return list.length > 0 ? (
    <div className="container-fluid">
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Ciudad</th>
            <th>Pais</th>
            <th>Actualizar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {list.map(e => {
            const { name, placeId, id } = e;
            let placeName = places.find(c => c.id === Number(placeId)) || [];
            const { countrieId } = placeName;
            let countrieName = countries.find(p => p.id === countrieId) || [];
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{placeName.name}</td>
                <td>{countrieName.name}</td>
                <td>
                
                  <button
                    type="button" class="btn btn-success btn-lg mt-4"
                    onClick={() => objOrg(id)}>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button" class="btn btn-danger btn-lg mt-4"
                    onClick={() => deletOrg(id)}>
                    <i class="fa fa-trash" aria-hidden="true"></i>
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
      <p className="encabezado">No se encontraron resultados.</p>
    </div>
  );
};

export default EmpresasList;
