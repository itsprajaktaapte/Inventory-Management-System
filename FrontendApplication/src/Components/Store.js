
// rfce react functional export component
import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { Button, Modal ,Form,Table } from 'semantic-ui-react'

function Store() 
{
    const[id, setId ] = useState("");
    const[name,setName] = useState("");
    const[address,setAddress] = useState("");

    const [open, setOpen] = useState(false)
    const [editopen, editsetOpen] = useState(false)
    const [deleteopen, deletesetOpen] = useState(false)

    const [store, setStores] = useState([]);
    
    useEffect( () => {
        (async() => await Load()) ();

    },[]);

    async function Load()
    {
        const res = await axios.get("https://localhost:7133/api/Store/GetStore");
        setStores(res.data);
        console.log(res.data);
    }

    async function save(event)
    {
        event.preventDefault();
        try {
            await axios.post("https://localhost:7133/api/Store/AddStore",
            {
              name : name,
              address : address,
            });

            alert("store is saved successfully!");
            console.log("store is added");
            setId("");
            setName("");
            setAddress("");

            Load();
        } 
        catch (error) 
        {
            alert(error);
        }
    }

    async function editStore(store)
    {
      setId(store.id);
      setName(store.name);
      setAddress(store.address);
    }

    async function update(event)
    {
      event.preventDefault();
      try 
      {
        await axios.patch("https://localhost:7133/api/Store/UpdateStore/"+ store.find((u) => u.id === id) || id,
        {
            id : id,
            name : name,
            address : address,
        });
        alert("store Updated");
        console.log("store is updated");
        setId("");
        setName("");
        setAddress("");
      
        Load();
      } 
      catch (error) 
      {
        alert(error)
      }

    }


    async function DeleteStore(id)
    {
        await axios.delete("https://localhost:7133/api/Store/DeleteStore/"+id);
        alert("store deleted successfully");
        console.log("store is deleted");
        setId("");
        setName("");
        setAddress("");
        Load();

    }


    return (
       <>
       <h1>store</h1>
       
       <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='blue'>New store</Button>}
    >
      <Modal.Header>Create Store</Modal.Header>
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
                <label> Name</label><br/>
                <input
                  type="text"
                  class="ui input"
                  id="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>address</label><br/>
                <input
                  type="text"
                  class="ui input"
                  id="address"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </Form.Field>
             
                {/* <button class="btn btn-primary mt-4" >
                  Register
                </button>
                <button class="btn btn-warning mt-4" onClick=>
                  Update
                </button> */}
        
              
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
          // onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
       
    <Table striped>    
    <Table.Header>
       <Table.Row>
        <Table.HeaderCell>store Id</Table.HeaderCell>
        <Table.HeaderCell>store Name</Table.HeaderCell>
        <Table.HeaderCell>store address</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
            
            {store.map(function fn(store) {
              return (
                <Table.Body>
                 <Table.Row>
                 <Table.Cell scope="row">{store.id}  </Table.Cell>
                 <Table.Cell>{store.name}</Table.Cell>
                 <Table.Cell>{store.address}</Table.Cell>
                    
                 <Table.Cell> 

     <Modal 
      onClose={() => editsetOpen(false)}
      onOpen={() => editsetOpen(true)}
      open={editopen}
     trigger={<Button color='yellow' onClick={() => editStore(store)} >Edit </Button>} >
      <Modal.Header>Edit store</Modal.Header>
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
           <label> Name</label><br/>
           <input
             type="text"
             class="ui input"
             id="name"
             value={name}
             onChange={(event) => {
               setName(event.target.value);
             }}
           />
         </Form.Field>
         <Form.Field>
           <label>address</label><br/>
           <input
             type="text"
             class="ui input"
             id="address"
             value={address}
             onChange={(event) => {
               setAddress(event.target.value);
             }}
           />
         </Form.Field>   
       </form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={update}>Edit</Button>
        <Button color='black' onClick={() => editsetOpen(false)}>Cancel</Button>
      </Modal.Actions>
    </Modal>

                   
                </Table.Cell>

                <Table.Cell>

      <Modal 
         onClose={() => deletesetOpen(false)}
         onOpen={() => deletesetOpen(true)}
         open={deleteopen}
      trigger={<Button color='red'>Delete </Button>} >
      <Modal.Header>Delete store</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Are you sure you want to delete store?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => deletesetOpen(false)}>
          Cancel
        </Button>
        <Button color='red' onClick={() => DeleteStore(store.id)}>Delete</Button>
       
      </Modal.Actions>
    </Modal>

                    
                </Table.Cell>

                </Table.Row>
               </Table.Body>
              );
            })}
          
          </Table>   
       </>
  );
}

export default Store
 
