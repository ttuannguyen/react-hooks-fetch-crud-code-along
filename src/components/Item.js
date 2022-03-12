import React from "react";

//Deconstruct the onUpdateItem prop
function Item({ item, onUpdateItem, onDeleteItem }) {

  function handleAddToCartClick() {
    // add fetch request
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      //purpose: toggle property of the item since our goal is to let users add / remove items
      //we send the object with the key being updated along w/ the new value
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  function handleDeleteClick() {
    console.log(item)
    //add fetch request
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => onDeleteItem(item));
  }    

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
        onClick={handleAddToCartClick} 
        className={item.isInCart ? "remove" : "add"}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button 
        onClick={handleDeleteClick}
        className="remove"
      >
        Delete
      </button>
    </li>
  );
}

export default Item;
