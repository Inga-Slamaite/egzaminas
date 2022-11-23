import Item from "./Item";



function List({ table, modal, doDelete }) {
    return (
      <>
        {table.map((data) => (
          <Item key={data.id} data={data} modal={modal} doDelete={doDelete}></Item>
        ))}
      </>
    );
  }

  export default List;

