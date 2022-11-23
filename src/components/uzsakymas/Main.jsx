import axios from "axios";
import { useEffect, useState } from "react";
import List from "./List";
import Modal from "./Modal";
import Nav from "../Nav";

function MainU() {
  const [table, setTable] = useState([]);
  const [patiekalo_id, setPatiekalo_id ] = useState ([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [modalInputs, setModalInputs] = useState({
    vardas: "",
    patiekalo_id: "",
    kiekis: "",
  });
  const [createInputs, setCreateInputs] = useState({
    vardas: "",
    patiekalo_id: "",
    kiekis: "",
  });

  //Read React
  useEffect(() => {
    axios
      .get("http://localhost:3003/uzsakymas")
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => console.log(err));
  }, [lastUpdate]);

  //Read React
  useEffect(() => {
    axios
     .get("http://localhost:3003/uzsakymas")
     .then((res) => {
        setPatiekalo_id(res.data);
     })
     .catch((err) => console.log(err));
  }, [lastUpdate]);

  //Update React
  const edit = (item, id) => {
    setShowModal(false);
    axios
      .put("http://localhost:3003/uzsakymas/" + id, item)
      .then((res) => {
        setLastUpdate(Date.now());
      })
      .catch((err) => console.log(err));
  };
  //create
  const handleCreate = () => {
    console.log(createInputs);
    axios
      .post("http://localhost:3003/uzsakymas/", createInputs)
      .then((res) => {
        setLastUpdate(Date.now());
        setCreateInputs({
          vardas: "",
          patiekalo_id: "",
          kiekis: "",

        });
      })
      .catch((err) => console.log(err));
  };
  const modal = (item) => {
    setShowModal(true);
    setModalInputs(item);
  };

  const hide = () => {
    setShowModal(false);
  };

  const doDelete = (item) => {
    axios
      .delete("http://localhost:3003/uzsakymas/" + item.id)
      .then((res) => {
        setLastUpdate(Date.now());
      })
      .catch((err) => console.log(err));
  };

  const control = (e, what) => {
    const inputsCopy = { ...createInputs };
    inputsCopy[what] = e.target.value;
    setCreateInputs(inputsCopy);
  };


  return (
    <div className="container">
      <Nav />
      <div className="container mb-3">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="card">
              <div className="card-header">Užsakymas</div>
              <div className="card-body">
                <table className="table">
                  <div className="form-group">
                    <label for="th1" className="col-form-label">
                      Jūsų vardas
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="th1"
                      value={createInputs.vardas}
                      onChange={(e) => control(e, "vardas")}
                      placeholder="Įrašykite savo vardą"
                    />
                  </div>

                  <div className="form-group">
                    <label for="th2" className="col-form-label">
                      Pasirinkite patiekalą
                    </label>
                    <select className="form-select" onChange={(e) => control(e, "patiekalo_id")}>
                      <option disabled>Select</option>
                      {patiekalo_id?.map((patiekalo_id) => (
                        <option value={Number(patiekalo_id.id)}>
                          {patiekalo_id.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label for="th3" className="col-form-label">
                      Kiekis
                    </label>
                    <input
                      className="col-form-control"
                      type="text"
                      id="th3"
                      value={createInputs.kiekis}
                      onChange={(e) => control(e, "kiekis")}
                      placeholder="Įrašykite kiekį"
                    />
                  </div>

            
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCreate}
                    >
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
                    <th>Vardas</th>
                    <th>Patiekalo numeris</th>
                    <th>Kiekis</th>
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
  

export default MainU;
