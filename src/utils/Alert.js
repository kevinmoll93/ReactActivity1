import { Fragment, useState } from "react";

const Mensaje = ({tipo,mensaje,time}) => {
    const [visible,actualizarState] = useState(true);

    const ocultar = () => {
        if(time >0){
            setTimeout(() => {
                actualizarState(false)
            }, 3000);
        }
    }
    
    ocultar();

    return( 
        <Fragment>
            {(visible)
                ?   <div className={`alert alert-${tipo} mt-4`} role="alert">
                        {mensaje}        
                    </div>
                : null
            }
        </Fragment>
    )
}
 
export default Mensaje;