import React, { useState } from "react";

// Simple UUID generator function
function uuid() {
  return Math.random().toString(36).substr(2, 9);
}

function Header() {
  return (
    <header>
      <h2>Shopster</h2>
    </header>
  );
}

function Filter({ search, onSearchChange }) {
  return (
    <div className="Filter">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

function ItemForm({ onItemFormSubmit }) {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: uuid(),
      name: itemName,
      category: itemCategory,
    };
    onItemFormSubmit(newItem);
    setItemName("");
    setItemCategory("Produce");
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

function ShoppingList({ items }) {
  return (
    <ul className="Items">
      {items.map((item) => (
        <Item key={item.id} name={item.name} category={item.category} />
      ))}
    </ul>
  );
}

function Item({ name, category }) {
  return (
    <li className={category}>
      <span>{name}</span>
      <span className="category">{category}</span>
    </li>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([
    {
      id: uuid(),
      name: "Yogurt",
      category: "Dairy",
    },
    {
      id: uuid(),
      name: "Pomegranate",
      category: "Produce",
    },
    {
      id: uuid(),
      name: "Lettuce",
      category: "Produce",
    },
    {
      id: uuid(),
      name: "String Cheese",
      category: "Dairy",
    },
    {
      id: uuid(),
      name: "Cookies",
      category: "Dessert",
    },
  ]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleSearchChange(searchText) {
    setSearch(searchText);
  }

  function handleItemFormSubmit(newItem) {
    setItems([...items, newItem]);
  }

  const itemsToDisplay = items
    .filter((item) => {
      if (selectedCategory === "All") return true;
      return item.category === selectedCategory;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="App">
      <Header />
      <Filter search={search} onSearchChange={handleSearchChange} />
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <div className="Filter">
        <select
          name="filter"
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All">Filter by category</option>
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>
      <ShoppingList items={itemsToDisplay} />
    </div>
  );
}

export default App;
