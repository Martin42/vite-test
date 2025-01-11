import { useMemo, useState } from "react";
import itemsJSON from "../items.json";

export const Items = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sort, setSort] = useState("⌄");

  const filteredItems = useMemo(() => {
    let result = itemsJSON;

    if (categoryFilter) {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "⌃") {
      result = result.sort((a, b) => a.price - b.price);
    } else {
      result = result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, categoryFilter, sort]);

  const handleItemSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleSort = () => {
    setSort((prevSort) => (prevSort === "⌃" ? "⌄" : "⌃"));
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
      <button type="button" onClick={handleSort}>
        Sort Price {sort}
      </button>
      <table>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
        {filteredItems.map((item, idx) => (
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
