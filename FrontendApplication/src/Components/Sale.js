import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Modal ,Form,Table } from 'semantic-ui-react';

function Sale(){

   const[id, setId] = useState("");
   const[custname, setCustName] = useState("");
   const[prodname, setProdName] = useState("");
   const[storename, setStoreName] = useState("");
   const[solddate, setSoldDate] = useState("");

   const [open, setOpen] = useState(false);
   const [newopen, newsetOpen] = useState(false);

   const[sale, setSales] = useState([]);

   useEffect( () => {
    (async() => await Load()) ();

  },[]);

   async function Load()
   {
     const result = await axios.get("https://localhost:7133/api/Sale/GetSale");
     setSales(result.data);
     console.log(result.data);
   }

   async function save(event)
   {
    event.preventDefault();
     try {

        await axios.post("https://localhost:7133/api/Sale/AddSale",
        {
            custname: custname,
            prodname: prodname,
            storename: storename,  
            solddate: solddate,
        });
        alert("sale is marked successfully");
        setId("");
        setCustName("");
        setProdName("");
        setStoreName("");
        setSoldDate("");

        Load();

     } 
     catch (error) 
     {
        alert(error);
     }

   }

     async function editSale(sale)
     {
        setId(sale.id);
        setCustName(sale.custname);
        setProdName(sale.prodname);
        setStoreName(sale.storename);
        setSoldDate(sale.solddate);
     }


   async function Update(event)
     {
        event.preventDefault();
        try 
        {    
           await axios.patch("https://localhost:7133/api/Sale/UpdateSale/" + sale.find((u) => u.id === id).id || id,
            {
                 id :id,
                 custname:custname,
                 prodname:prodname,
                 storename:storename,
                 solddate:solddate,
            }); 

            alert("sales are updated");
            setId("");
            setCustName("");
            setProdName("");
            setStoreName("");
            setSoldDate("");

            Load();
        }
        catch (error) 
        {
          alert(error);    
        }
     }


     async function DeleteSale(id)
     {
        await axios.delete("https://localhost:7133/api/Sale/DeleteSale/" +id);
        alert("Sale is deleted successfully");
        setId("");
        setCustName("");
        setProdName("");
        setStoreName("");
        setSoldDate("");
        Load();
     }
  return (
    <>
      <h1>Sale</h1>
       
       <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='blue'>New Sale</Button>}
    >
      <Modal.Header>Create Sales</Modal.Header>

      <Modal.Content >

          <Modal.Description>
          <form>
          
               <Form.Field>
                <input
                  type="text"
                
                  id="id"
                  hidden
                  value={id}
                  onChange={(event) => {
                    setId(event.target.value);
                  }}
                />
                <label>Customer</label><br/>
                <input
                  type="text"
                  class="ui input"
                  id="name"
                  value={custname}
                  onChange={(event) => {
                    setCustName(event.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Product</label><br/>
                <input
                  type="text"
                  class="ui input"
                  id="prod"
                  value={prodname}
                  onChange={(event) => {
                    setProdName(event.target.value);
                  }}
                />
              </Form.Field>
             
              <Form.Field>
                <label>Store</label><br/>
                <input
                  type="text"
                  class="ui input"
                  id="store"
                  value={storename}
                  onChange={(event) => {
                    setStoreName(event.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Date</label><br/>
                <input
                  type="text"
                  class="ui input"
                  id="solddate"
                  value={solddate}
                  onChange={(event) => {
                    setSoldDate(event.target.value);
                  }}
                />
              </Form.Field>
              
            </form>

        </Modal.Description>

      </Modal.Content>

      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Button
          content="Create" onClick={save}
          labelPosition='right'
          icon='checkmark'
          positive
        />

      </Modal.Actions>

    </Modal>
       
    <Table striped>    
    <Table.Header>
       <Table.Row>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Customer</Table.HeaderCell>
        <Table.HeaderCell>Product</Table.HeaderCell>
        <Table.HeaderCell>Store</Table.HeaderCell>
        <Table.HeaderCell>Date Sold</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
            
            {sale.map (function fn(sale) {
              return (
                <Table.Body>
                 <Table.Row>
              
                 <Table.Cell scope="row">{sale.id}</Table.Cell>
                 <Table.Cell>{sale.custname}</Table.Cell>
                 <Table.Cell>{sale.prodname}</Table.Cell>
                 <Table.Cell>{sale.storename}</Table.Cell>   
                 <Table.Cell>{sale.solddate}</Table.Cell>   
                 <Table.Cell> 

     <Modal trigger={<Button color='yellow' onClick={() => editSale(sale)} >Edit </Button>} >
      <Modal.Header>Edit Sale</Modal.Header>
      <Modal.Content>
        <Modal.Description>
        <form>
          
          <Form.Field>
           <input
             type="text"
           
             id="id"
             hidden
             value={id}
             onChange={(event) => {
               setId(event.target.value);
             }}
           />
           <label> Customer</label><br/>
           <input
             type="text"
             class="ui input"
             id="name"
             value={custname}
             onChange={(event) => {
               setCustName(event.target.value);
             }}
           />
         </Form.Field>
         <Form.Field>
           <label>Product</label><br/>
           <input
             type="text"
             class="ui input"
             id="Price"
             value={prodname}
             onChange={(event) => {
               setProdName(event.target.value);
             }}
           />
         </Form.Field>   
         <Form.Field>
           <label>Store</label><br/>
           <input
             type="text"
             class="ui input"
             id="Price"
             value={storename}
             onChange={(event) => {
               setStoreName(event.target.value);
             }}
           />
         </Form.Field>  
         <Form.Field>
           <label>Sold Date</label><br/>
           <input
             type="text"
             class="ui input"
             id="Price"
             value={solddate}
             onChange={(event) => {
               setSoldDate(event.target.value);
             }}
           />
         </Form.Field>  
       </form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={Update}>Edit</Button>
        <Button color='black'>Cancel</Button>
      </Modal.Actions>
    </Modal>
    </Table.Cell>


    <Table.Cell>
      <Modal 
       onnewClose={() => newsetOpen(false)}
       onnewOpen={() => newsetOpen(true)}
       newopen={newopen}
      trigger={<Button color='red'>Delete </Button>} >
      <Modal.Header>Delete Sale</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Are you sure you want to delete Sale?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => newsetOpen(false)}>
          Cancel
        </Button>
        <Button color='red' onClick={() => DeleteSale(sale.id)}>Delete</Button>
       
      </Modal.Actions>
    </Modal>
    </Table.Cell>

  </Table.Row>
    </Table.Body>
              );
            })}
          
          </Table>   
    
    </>
  )
}

export default Sale
