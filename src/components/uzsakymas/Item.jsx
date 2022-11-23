

function Item({ data, modal, doDelete }) {
  const showEdit = () => {
    modal(data);
  };

 
  return (
    <tr>
      <td>{data.vardas}</td>
      <td>{data.patiekalo_id}</td>
      <td>{data.kiekis}</td>
      <td><button className="btn btn-primary" onClick={showEdit}>
        Edit
      </button>
      </td>
      <td><button className="btn btn-danger" onClick={()=>doDelete(data)}>Delete</button></td>
    </tr>
  );
}

export default Item;