import { useEffect, useState, useRef } from "react"




function Modal({ showModal, hide, modalInputs, edit }) {
    const [inputs, setInputs] = useState({
      vardas: "",
      patiekalo_id: "",
      kiekis: "",
    });


    const fileInput = useRef();
  
    const control = (e, what) => {
      const inputsCopy = { ...inputs };
      inputsCopy[what] = e.target.value;
      setInputs(inputsCopy);
    };
  
    useEffect(() => {
      setInputs({
        vardas: modalInputs.vardas,
        patiekalo_id: modalInputs.patiekalo_id,
        kiekis: modalInputs.kiekis,
      });
    }, [modalInputs]);
  
    const handleEdit = () => {
      edit(
        {
          vardas: inputs.vardas,
          patiekalo_id: inputs.patiekalo_id,
          kiekis: inputs.kiekis,
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
                    Vardas
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="th1"
                    value={inputs.vardas}
                    onChange={(e) => control(e, "vardas")}
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group">
                  <label for="th2" className="col-form-label">
                    Patiekalo pavadinimas
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="th2"
                    value={inputs.pavadinimas}
                    onChange={(e) => control(e, "pavadinimas")}
                    placeholder="Įrašykite pavadinimą"
                  />
                </div>
                <div className="form-group">
                  <label for="th3" className="col-form-label">
                    Kiekis
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="th3"
                    value={inputs.kiekis}
                    onChange={(e) => control(e, "kiekis")}
                    placeholder="Įrašykite norimą kiekį"
                  />
                </div>
  
                
  
                <div className="modal-footer">
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
                    Save changes
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