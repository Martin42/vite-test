import { useState } from "react";
import itemsJSON from "../items.json";

export const Items = () => {
  const [items, setItems] = useState(itemsJSON);

  const handleItemSearch = (e) => {
    const searchValue = e.target.value;
    const searchedItems = itemsJSON.filter((element) =>
      element.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setItems(searchedItems);
    console.log(items);
  };

  const handleCategoryFilter = (e) => {
    const filter = e.target.value;
    console.log(e.target.value);

    if (filter === "") {
      setItems(itemsJSON);
    } else {
      const filteredCategoryItems = itemsJSON.filter(
        (item) => item.category === filter
      );
      setItems(filteredCategoryItems);
    }
  };

  const categoryDropdown = () => {
    const cleanArray = itemsJSON.filter(
      (items, idx, self) =>
        idx === self.findIndex((t) => t.category === items.category)
    );

    return cleanArray.map((item, idx) => (
      <option key={idx} value={item.category}>
        {item.category}
      </option>
    ));
  };

  return (
    <div>
      <input type="text" placeholder="search..." onChange={handleItemSearch} />
      <select name="items" id="items" onChange={handleCategoryFilter}>
        <option value="">Choose a category</option>
        {categoryDropdown()}
      </select>
      <table>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
        {items.map((item, idx) => (
          <tr key={idx}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
