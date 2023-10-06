import React from "react";

const MyFooter = () => (
    <footer style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} className='text-center text-lg-start text-muted'>
      <section className='border-bottom'>
        <div className='container text-center text-md-start mt-5'>
        &nbsp;
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <i className='fas fa-gem me-3'></i>Dapp DEFI
              </h6>
              <p>
                Dapp para el stake de tokens desplegada en Polygon Mumbai Testnet
              </p>
            </div>

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contacto</h6>
              <p>
                <i className='fas fa-envelope me-3'></i>
                darielfriasweb@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='text-center p-4 bg-dark text-white' >
        © 2022 Copyright: 
        <a className='text-reset fw-bold text-white' href='https://blockstellart.com/'>
          BlockStellart.com
        </a>
      </div>
    </footer>
);

export default MyFooter;