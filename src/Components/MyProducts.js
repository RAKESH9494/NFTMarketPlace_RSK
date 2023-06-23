import React, { useEffect, useState } from 'react'
import "./Styles.css"
const MyProducts = (props) => {
    const [product,setProduct] = useState({});
    useEffect(()=>{
        const getData = async(e)=>{
          try{
            const data = await props.contract.GetAllProducts();
            for (let i = 0; i <data.length; i++){
              if(data[i].owner === props.account || data[i].seller == props.account){ 
                const ProductID = data[i][0].toString()
                const imageUrl = data[i][1];
                const price =data[i][4].toString();
                const status = data[i][5];
                const nftname = data[i][6].toString();
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                  [ProductID]: [nftname,imageUrl,price,status]
                }));}
            }
          }catch(e){console.log(e)}
        }
        props.contract && getData();
    },[props.contract,product])
    const hadndler = async(e,ProductId)=>{
      e.preventDefault()
      var updatedPrice = prompt("Enter Price:");
      try{
         const transaction = await props.contract.Resale(ProductId,updatedPrice)
         await transaction.wait()
         alert("Resale Successfull..")
      }catch(e){
        console.log(e);
        alert("Faild!! try again..")
      }
    }
  return(props.trigger)?(Object.keys(product).length==0?<center><h3 class="cartstatus">Your products are empty</h3><br/><button onClick={()=>props.setTrigger(false)} class="btn btn-danger">close</button></center>:
    <div class="outer">
    <h3>YOUR NFTS</h3>
    <div className="inner">
          {Object.entries(product).map(([ProductID,[nftname,imageUrl,price,status]], index) => (
            <div className="Productitem" key={index}>
              <div className="productbody">
                <center>
                  <img src={imageUrl} width="260px" height="200px" alt="Product" /><br/><br/>
                  <p>{nftname}</p>
                  <p><b>Price: {price} Wei</b></p>
                  <p>{status == true ? <p>NFT in Sale</p>:<button class='btn btn-secondary' onClick={(e)=>hadndler(e,ProductID)}>Resale</button>}</p>
                </center>
              </div>
            </div>
          ))}
        </div>
        <br/>
        <center><button onClick={()=>props.setTrigger(false)} class="btn btn-danger">close</button></center>
    </div>
  ):""
}

export default MyProducts