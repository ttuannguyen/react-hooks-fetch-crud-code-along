import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //Add useEffect hook
  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then(res => res.json())
    .then(items => setItems(items))
  }, []); //NOTE: don't place any ; after the .then()s until the end of the function scope

  //new function to handle add item to page
  function handleAddItem(newItem) {
    //last step for adding a new item (related to post): call setState w/ new arr that has new item
    //use spread operator so we don't mutate the arr
    setItems([...items, newItem])
  }

  //new function to handle cart add/remove update
  function handleUpdateItem(updatedItem) {
    //last step for this fn (related to patch) = set state by creating a new array which contains the updated item in place of the old item
    const updatedItems = items.map(item => {
      if(item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  //new function to handle delete
  function handleDeleteItem(deletedItem) {
    //last step for this fn (related to delete) = set state by creating a new arr in which the deleted item has been filtered out
    const updatedItems = items.filter(item => item.id !== deletedItem.id)
    setItems(updatedItems)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
            key={item.id} 
            item={item} 
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
