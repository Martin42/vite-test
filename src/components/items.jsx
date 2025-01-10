import { useEffect, useState } from "react";
import itemsJSON from "../items.json";

export const Items = () => {
  const [items, setItems] = useState(itemsJSON);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sort, setSort] = useState("⌄");

  // TODO: Merge both sort and search in the same function.
  // The onChanges and onClick should be just to change the states

  const handleItemSearch = (e) => {
    const searchValue = e.target.value;

    if (categoryFilter !== "") {
      const searchedItems = itemsJSON.filter(
        (element) =>
          element.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          element.category === categoryFilter
      );
      setItems(searchedItems);
    } else {
      const searchedItems = itemsJSON.filter((element) =>
        element.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setItems(searchedItems);
    }
    console.log(items);
  };

  const handleCategoryFilter = (e) => {
    const filter = e.target.value;
    setCategoryFilter(filter);
    console.log(e.target.value);

    if (filter === "") {
      setItems(itemsJSON);
    } else {
      const filteredCategoryItems = items.filter(
        (item) => item.category === filter
      );
      setItems(filteredCategoryItems);
    }
  };

  const handleSort = () => {
    if (sort === "⌃") {
      setSort("⌄");
      const sortedItems = items.sort((a, b) => b.price - a.price);
      setItems(sortedItems);
    } else {
      setSort("⌃");
      const sortedItems = items.sort((a, b) => a.price - b.price);
      setItems(sortedItems);
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

  useEffect(() => {
    const sortedItems = itemsJSON.sort((a, b) => b.price - a.price);
    setItems(sortedItems);
  }, []);

  return (
    <div>
      <input type="text" placeholder="search..." onChange={handleItemSearch} />
      <select name="items" id="items" onChange={handleCategoryFilter}>
        <option value="">Choose a category</option>
        {categoryDropdown()}
      </select>
      <button type="button" onClick={handleSort}>
        Sort Price {sort}
      </button>
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
