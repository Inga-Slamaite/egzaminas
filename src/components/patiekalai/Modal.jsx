import { useEffect, useState, useRef } from "react"




function Modal({ showModal, hide, modalInputs, edit }) {
    const [inputs, setInputs] = useState({
      pavadinimas: "",
      aprasas: "",
      kaina: "",
      nuotrauka: "",
    });


    const fileInput = useRef();
  
    const control = (e, what) => {
      const inputsCopy = { ...inputs };
      inputsCopy[what] = e.target.value;
      setInputs(inputsCopy);
    };
  
    useEffect(() => {
      setInputs({
        pavadinimas: modalInputs.pavadinimas,
        aprasas: modalInputs.aprasas,
        kaina: modalInputs.kaina,
        nuotrauka: modalInputs.nuotrauka,
      });
    }, [modalInputs]);
  
    const handleEdit = () => {
      edit(
        {
          pavadinimas: inputs.pavadinimas,
          aprasas: inputs.aprasas,
          kaina: inputs.kaina,
          nuotrauka: inputs.nuotrauka,
        },
        modalInputs.id
      );
    };
    function getBase64(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });
  }
  
  
    const doPhoto = () => {
      getBase64(fileInput.current.files[0])
          .then(photo => setInputs({...inputs, nuotrauka:photo}))
          .catch(_ => {
              // tylim
          })
  }
  
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{
          display: showModal ? "block" : "none",
          opacity: showModal ? "1" : "0",
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Redaguoti 
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={hide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="th1" className="col-form-label">
                    Pavadinimas
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="th1"
                    value={inputs.pavadinimas}
                    onChange={(e) => control(e, "pavadinimas")}
                    placeholder="Įrašykite pavadinimą"
                  />
                </div>
                <div className="form-group">
                  <label for="th2" className="col-form-label">
                    Aprašymas
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="th2"
                    value={inputs.aprasas}
                    onChange={(e) => control(e, "aprasas")}
                    placeholder="Aprašykite..."
                  />
                </div>
                <div className="form-group">
                  <label for="th3" className="col-form-label">
                    Kaina
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="th3"
                    value={inputs.kaina}
                    onChange={(e) => control(e, "kaina")}
                    placeholder="Įrašykite kaina"
                  />
                </div>
  
                <div className="form-group">
                  <label for="th4" className="col-form-label">
                    Nuotrauka
                  </label>
                 
            <img src={inputs.nuotrauka} alt="upload" style={{width: '185px'}}></img> 
            <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
            
                </div>
  
                <div class="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={hide}
                  >
                    Uždaryti
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEdit}
                  >
                    Išsaugoti
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default Modal;