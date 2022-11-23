import axios from "axios";
import { useEffect, useState, useRef } from "react";
import List from "./List";
import Modal from "./Modal";
import Nav from "../Nav";

function MainP() {
  const [table, setTable] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [modalInputs, setModalInputs] = useState({
    pavadinimas: "",
    aprasas: "",
    kaina: "",
    nuotrauka: "",
  });
  const [createInputs, setCreateInputs] = useState({
    pavadinimas: "",
    aprasas: "",
    kaina: "",
    nuotrauka: "",
  });
  
  const fileInput = useRef();

  const [photoPrint, setPhotoPrint] = useState(null);

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
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
            // tylim
        })
}

//Read React
  useEffect(() => {
    axios
      .get("http://localhost:3003/patiekalai")
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => console.log(err));
  }, [lastUpdate]);
  
//Update React
  const edit = (item, id) => {
    setShowModal(false);
    axios.put('http://localhost:3003/patiekalai/' + id, item)
    .then(res => {
        setLastUpdate(Date.now());
    })
    .catch((err)=> console.log(err));
}
//create
  const handleCreate = () => {
    const data = {...createInputs,nuotrauka: photoPrint}
    console.log(data)
    axios.post('http://localhost:3003/patiekalai/', data)
    .then(res => {
        setLastUpdate(Date.now());
        setCreateInputs({
          pavadinimas: "",
          aprasas: "",
          kaina: "",
          nuotrauka: "",
        })
    })
    .catch((err)=> console.log(err));
    setPhotoPrint(null);
    fileInput.current.value = null;

}
  const modal = (item) => {
    setShowModal(true);
    setModalInputs(item);
  };

  const hide = () => {
    setShowModal(false);
  };

  const doDelete = (item) => {
    axios.delete('http://localhost:3003/patiekalai/' + item.id)
    .then(res => {
        setLastUpdate(Date.now());
    })
.catch((err)=> console.log(err));
  }

  const control = (e, what) => {
    const inputsCopy = { ...createInputs };
    inputsCopy[what] = e.target.value;
    setCreateInputs(inputsCopy);
  };

  
  return (
    <div className="container">
      <Nav/>
      <div className="container mb-3">
      <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header"> Sukurti patiekalą</div>
            <div className="card-body">
              <table className="table">
                <div className="form-group">
                  <label for="th1" className="col-form-label">
                    Pavadinimas
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="th1"
                    value={createInputs.pavadinimas}
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
                    value={createInputs.aprasas}
                    onChange={(e) => control(e, "aprasas")}
                    placeholder="Aprašykite patiekalą"
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
                    value={createInputs.kaina}
                    onChange={(e) => control(e, "kaina")}
                    placeholder="Įrašykite kainą"
                  />
                </div>
  
                <div className="form-group">
                  <label for="th4" className="col-form-label">
                    nuotrauka
                  </label>
                  <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                  {photoPrint ? <div className='img-bin'><img src={photoPrint} alt="upload" style={{width: '100px'}}></img></div> : null}
                </div>
  
                <div className="modal-footer"> 
                  
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCreate}>
                  Išsaugoti
                  </button>
                  </div>
              </table>
              </div>
            </div>
          </div>
        </div>
  </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="card">
              <div className="card-header">Patiekalų sąrašas</div>
              <div className="card-body">
                <table className="table">
                  <tr>
                    <th>Pavadinimas</th>
                    <th>Aprašymas</th>
                    <th>Kaina</th>
                    <th>Nuotrauka</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                  <Modal
                    showModal={showModal}
                    modalInputs={modalInputs}
                    hide={hide}
                    edit={edit}
                  />
                  <List table={table} modal={modal} doDelete={doDelete} />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainP;
