import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Modal ,Form,Table } from 'semantic-ui-react';

function Sale(){

   const[id, setId] = useState("");
   const[customerName, setcustomerName] = useState("");
   const[productName, setproductName] = useState("");
   const[storeName, setstoreName] = useState("");
   const[datesold, setdatesold] = useState("");

   const [open, setOpen] = useState(false);
   const [editopen, editsetOpen] = useState(false)
   const [deleteopen, deletesetOpen] = useState(false)

   const[sale, setSales] = useState([]);

   useEffect( () => {
    (async() => await Load()) ();

  },[]);

   async function Load()
   {
    try
    {
      const result = await axios.get("https://localhost:7133/api/Sale/GetSale");
      setSales(result.data);
      console.log(result.data);  
     
     }
   catch(error) 
     {
      console.log(error.toJSON());
     }
  }

   async function save(event)
   {
    event.preventDefault();
     try {

        await axios.post("https://localhost:7133/api/Sale/AddSale",
        {
            customerName: customerName,
            productName: productName,
            storeName: storeName,  
            datesold: datesold,
        });
        alert("sale is marked successfully");
        setId("");
        setcustomerName("");
        setproductName("");
        setstoreName("");
        setdatesold("");

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
        setcustomerName(sale.customerName);
        setproductName(sale.productName);
        setstoreName(sale.storeName);
        setdatesold(sale.datesold);
     }


   async function Update(event)
     {
        event.preventDefault();
        try 
        {    
           await axios.put("https://localhost:7133/api/Sale/UpdateSale/" + sale.find((u) => u.id === id).id || id,
            {
                 id :id,
                 customerName:customerName,
                 productName:productName,
                 storeName:storeName,
                 datesold:datesold,
            }); 

            alert("sales are updated");
            setId("");
            setcustomerName("");
            setproductName("");
            setstoreName("");
            setdatesold("");

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
        setcustomerName("");
        setproductName("");
        setstoreName("");
        setdatesold("");
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
                  value={customerName}
                  onChange={(event) => {
                    setcustomerName(event.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Product</label><br/>
                <input
                  type="text"
                  class="ui input"
                  id="prod"
                  value={productName}
                  onChange={(event) => {
                    setproductName(event.target.value);
                  }}
                />
              </Form.Field>
             
              <Form.Field>
                <label>Store</label><br/>
                <input
                  type="text"
                  class="ui input"
                  id="store"
                  value={storeName}
                  onChange={(event) => {
                    setstoreName(event.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Date</label><br/>
                <input
                  type="text"
                  class="ui input"
                  id="datesold"
                  value={datesold}
                  onChange={(event) => {
                    setdatesold(event.target.value);
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
              
                 <Table.Cell key={sale.id} scope="row">{sale.id}</Table.Cell>
                 <Table.Cell>{sale.customerName}</Table.Cell>
                 <Table.Cell>{sale.productName}</Table.Cell>
                 <Table.Cell>{sale.storeName}</Table.Cell>   
                 <Table.Cell>{sale.datesold}</Table.Cell>   
                 <Table.Cell> 

     <Modal 
     onClose={() => editsetOpen(false)}
     onOpen={() => editsetOpen(true)}
     open={editopen}
     trigger={<Button color='yellow' onClick={() => editSale(sale)} >Edit </Button>} >
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
             value={customerName}
             onChange={(event) => {
               setcustomerName(event.target.value);
             }}
           />
         </Form.Field>
         <Form.Field>
           <label>Product</label><br/>
           <input
             type="text"
             class="ui input"
             id="Price"
             value={productName}
             onChange={(event) => {
               setproductName(event.target.value);
             }}
           />
         </Form.Field>   
         <Form.Field>
           <label>Store</label><br/>
           <input
             type="text"
             class="ui input"
             id="Price"
             value={storeName}
             onChange={(event) => {
               setstoreName(event.target.value);
             }}
           />
         </Form.Field>  
         <Form.Field>
           <label>Sold Date</label><br/>
           <input
             type="text"
             class="ui input"
             id="Price"
             value={datesold}
             onChange={(event) => {
               setdatesold(event.target.value);
             }}
           />
         </Form.Field>  
       </form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={Update}>Edit</Button>
        <Button color='black'onClick={() => editsetOpen(false)}>Cancel</Button>
      </Modal.Actions>
    </Modal>
    </Table.Cell>


    <Table.Cell>
      <Modal 
       onClose={() => deletesetOpen(false)}
       onOpen={() => deletesetOpen(true)}
       open={deleteopen}
      trigger={<Button color='red'>Delete </Button>} >
      <Modal.Header>Delete Sale</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Are you sure you want to delete Sale?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => deletesetOpen(false)}>
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
