
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Button, Modal ,Form,Table } from 'semantic-ui-react'

function Customer() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const [open, setOpen] = useState(false)
    const [newopen, newsetOpen] = useState(false)

    const [customers, setUsers] = useState([]);
    
      
      useEffect(() => {
        (async () => await Load())();
      }, []);
     
      async function Load() {
        
        const result = await axios.get("https://localhost:7133/api/Customer/GetCustomer");
        setUsers(result.data);
        console.log(result.data);
      }
     
      async function save(event) {
       
        event.preventDefault();
        try {
          await axios.post("https://localhost:7133/api/Customer/AddCustomer", {
            
            name: name,
            address: address,
           
          });
          alert("Customer is Registered Successfully");
              setId("");
              setName("");
              setAddress("");
           
         
          Load();
        } catch (err) {
          alert(err);
        }
      }
      async function editCustomer(customers) {
        setName(customers.name);
        setAddress(customers.address);
        setId(customers.id);
      }
     
      async function DeleteCustomer(id) {
      await axios.delete("https://localhost:7133/api/Customer/DeleteCustomer/" + id);
       alert("Customer deleted Successfully");
       setId("");
       setName("");
       setAddress("");
       Load();
      }
     
      async function update(event) {
        event.preventDefault();
        try {
      await axios.patch("https://localhost:7133/api/Customer/UpdateCustomer/"+ customers.find((u) => u.id === id).id || id,
            {
            id: id,
            name: name,
            address: address,
            }
          );
          alert("Customer Updated");
          setId("");
          setName("");
          setAddress("");
         
          Load();
        } catch (err) {
          alert(err);
        }
      }
        return (
          <div>
       
            <h1>Customer</h1>
      <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='blue'>New Customer</Button>}
    >
      <Modal.Header>Create Customer</Modal.Header>
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
                <label>Address</label><br/>
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
        <Table.HeaderCell>Customer Id</Table.HeaderCell>
        <Table.HeaderCell>Customer Name</Table.HeaderCell>
        <Table.HeaderCell>Customer Address</Table.HeaderCell>
        <Table.HeaderCell>Option</Table.HeaderCell>
        <Table.HeaderCell>Option</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
            
            {customers.map(function fn(customer) {
              return (
                <Table.Body>
                 <Table.Row>
                 <Table.Cell scope="row">{customer.id}  </Table.Cell>
                 <Table.Cell>{customer.name}</Table.Cell>
                 <Table.Cell>{customer.address}</Table.Cell>
                    
                 <Table.Cell> 

     <Modal trigger={<Button color='yellow' onClick={() => editCustomer(customer)} >Edit </Button>} >
      <Modal.Header>Edit Customer</Modal.Header>
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
           <label>Address</label><br/>
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
      <Modal.Header>Delete Customer</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Are you sure you want to delete customer?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => newsetOpen(false)}>
          Cancel
        </Button>
        <Button color='red' onClick={() => DeleteCustomer(customer.id)}>Delete</Button>
       
      </Modal.Actions>
    </Modal>

                    
                </Table.Cell>

                </Table.Row>
               </Table.Body>
              );
            })}
          
          </Table>    
          </div>
        );
      }

export default Customer

