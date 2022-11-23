function Item({ data, modal, doDelete }) {

    const showEdit = () => {
      modal(data);
    };
  
    return (
      <tr>
        <td>{data.pavadinimas}</td>
        <td>{data.aprasas}</td>
        <td>{data.kaina}</td>
        <td>{data.nuotrauka ? <div className='img-bin'>
                              <img src={data.nuotrauka} alt={data.type} style={{width: '100px'}}>
                              </img>
                          </div> : null}</td>
              
        <td><button className="btn btn-primary" onClick={showEdit}>
          Edit
        </button>
        </td>
        <td><button className="btn btn-danger" onClick={()=>doDelete(data)}>Delete</button></td>
      </tr>
    );
  }
  export default Item;