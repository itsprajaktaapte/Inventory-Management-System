
// rfce react functional export component
import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { Button, Modal ,Form,Table } from 'semantic-ui-react'

function Product() 
{
    const[id, setId ] = useState("");
    const[name,setName] = useState("");
    const[price,setPrice] = useState("");

    const [open, setOpen] = useState(false)
    const [newopen, newsetOpen] = useState(false)

    const [product, setProducts] = useState([]);
    
    useEffect( () => {
        (async() => await Load()) ();

    },[]);

    async function Load()
    {
        const res = await axios.get("https://localhost:7133/api/Product/GetProduct");
        setProducts(res.data);
        console.log(res.data);
    }

    async function save(event)
    {
        event.preventDefault();
        try {
            await axios.post("https://localhost:7133/api/Product/AddProduct",
            {
              name : name,
              price : price,
            });

            alert("Product is saved successfully!");
            console.log("Product is added");
            setId("");
            setName("");
            setPrice("");

            Load();
        } 
        catch (error) 
        {
            alert(error);
        }
    }

    async function editProduct(product)
    {
      setId(product.id);
      setName(product.name);
      setPrice(product.price);
    }

    async function update(event)
    {
      event.preventDefault();
      try 
      {
        await axios.patch("https://localhost:7133/api/Product/UpdateProduct/"+ product.find((u) => u.id === id) || id,
        {
            id : id,
            name : name,
            price : price,
        });
        alert("Product Updated");
        console.log("Product is updated");
        setId("");
        setName("");
        setPrice("");
      
        Load();
      } 
      catch (error) 
      {
        alert(error)
      }

    }


    async function DeleteProduct(id)
    {
        await axios.delete("https://localhost:7133/api/Product/DeleteProduct/"+id);
        alert("product deleted successfully");
        console.log("Product is deleted");
        setId("");
        setName("");
        setPrice("");
        Load();

    }


    return (
       <>
       <h1>Product</h1>
       
       <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='blue'>New Product</Button>}
    >
      <Modal.Header>Create Product</Modal.Header>
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
                <label>Price</label><br/>
                <input
                  type="text"
                  class="ui input"
                  id="Price"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
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
        <Table.HeaderCell>Product Id</Table.HeaderCell>
        <Table.HeaderCell>Product Name</Table.HeaderCell>
        <Table.HeaderCell>Product Price</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
            
            {product.map(function fn(product) {
              return (
                <Table.Body>
                 <Table.Row>
                 <Table.Cell scope="row">{product.id}  </Table.Cell>
                 <Table.Cell>{product.name}</Table.Cell>
                 <Table.Cell>{product.price}</Table.Cell>
                    
                 <Table.Cell> 

     <Modal trigger={<Button color='yellow' onClick={() => editProduct(product)} >Edit </Button>} >
      <Modal.Header>Edit Product</Modal.Header>
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
           <label>Price</label><br/>
           <input
             type="text"
             class="ui input"
             id="Price"
             value={price}
             onChange={(event) => {
               setPrice(event.target.value);
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
      <Modal.Header>Delete Product</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Are you sure you want to delete product?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => newsetOpen(false)}>
          Cancel
        </Button>
        <Button color='red' onClick={() => DeleteProduct(product.id)}>Delete</Button>
       
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

export default Product
 
