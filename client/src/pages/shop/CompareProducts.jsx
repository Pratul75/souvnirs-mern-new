import React, { useState } from "react";

const ProductComparison = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const productData = [
    {
      id: 1,
      name: "Product A",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 199.99,
      attributes: {
        attribute1: "Value 1A",
        attribute2: "Value 2A",
        attribute3: "Value 3A",
      },
    },
    {
      id: 2,
      name: "Product B",
      description: "Pellentesque tincidunt felis ut luctus placerat.",
      price: 149.99,
      attributes: {
        attribute1: "Value 1B",
        attribute2: "Value 2B",
        attribute3: "Value 3B",
      },
    },
    {
      id: 3,
      name: "Product C",
      description: "Maecenas ut purus at urna hendrerit consequat.",
      price: 249.99,
      attributes: {
        attribute1: "Value 1C",
        attribute2: "Value 2C",
        attribute3: "Value 3C",
      },
    },
    {
      id: 4,
      name: "Product D",
      description:
        "Suspendisse potenti. Suspendisse gravida justo a ante ultrices.",
      price: 179.99,
      attributes: {
        attribute1: "Value 1D",
        attribute2: "Value 2D",
        attribute3: "Value 3D",
      },
    },
  ];

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const renderAttributeValueCell = (attribute, productId) => {
    const product = productData.find((p) => p.id === productId);
    const value = product.attributes[attribute];
    const isLowest = selectedProducts.every((id) => {
      return (
        productData.find((p) => p.id === id).attributes[attribute] >= value
      );
    });

    return (
      <td
        key={`${productId}-${attribute}`}
        className={`p-3 ${isLowest ? "bg-green-200" : "bg-white"}`}
      >
        {value}
      </td>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Compare Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {productData.map((product) => (
          <div
            key={product.id}
            className={`border p-4 ${
              selectedProducts.includes(product.id)
                ? "border-blue-500 rounded-xl"
                : "rounded-xl shadow-xl"
            }`}
          >
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2 checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => toggleProductSelection(product.id)}
              />
              {product.name}
            </label>
            <p>{product.description}</p>
            <p className="mt-2">${product.price}</p>
          </div>
        ))}
      </div>
      {selectedProducts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Comparison Table</h3>
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3">#</th>
                  {selectedProducts.map((productId) => (
                    <th key={productId} className="p-3">
                      {productData.find((p) => p.id === productId).name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Price</td>
                  {selectedProducts.map((productId) => (
                    <td key={productId}>
                      ${productData.find((p) => p.id === productId).price}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Description</td>
                  {selectedProducts.map((productId) => (
                    <td key={productId}>
                      {productData.find((p) => p.id === productId).description}
                    </td>
                  ))}
                </tr>
                {Object.keys(productData[0].attributes).map((attribute) => (
                  <tr key={attribute}>
                    <td className="p-3 font-semibold">{attribute}</td>
                    {selectedProducts.map((productId) =>
                      renderAttributeValueCell(attribute, productId)
                    )}
                  </tr>
                ))}
                <tr>
                  <td className="p-3 font-semibold">Add to Cart</td>
                  {selectedProducts.map((productId) => (
                    <td key={productId} className="p-3 text-center">
                      <input
                        type="checkbox"
                        className="form-checkbox checkbox h-5 w-5 text-blue-600"
                        checked={selectedProducts.includes(productId)}
                        onChange={() => toggleProductSelection(productId)}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Add to Cart</td>
                  {selectedProducts.map((productId) => (
                    <td key={productId} className="p-3 text-center">
                      <button className="btn btn-accent">Add to Cart</button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComparison;
