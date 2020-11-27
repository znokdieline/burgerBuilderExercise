import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error_handler';


const withErrorHandler = (WrappedComponent, axios) => {

    return props =>  {
        
        const [ error, clearError ] = useHttpErrorHandler(axios);
        return (
            <Aux>
                <Modal 
                show={error}
                modalClosed={ clearError }
                >
                    {error ? error.message : null}  
                    {/* este error message es que envía firebase */}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        );
    };
}

export default withErrorHandler;