import { useEffect, useState } from "react";

function Pagination() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const fetchApi = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const result = await res.json();
    setProducts(result);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  console.log(products);

  return (
    <div className="bg-red-800">
      <h1 className="my-4 text-2xl font-bold text-center text-red-500">Pagination</h1>
      <div className="flex flex-row flex-wrap justify-center gap-4 bg-red-800">
        {products.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => (
          <div key={index} className="flex flex-col bg-white shadow-lg rounded-lg p-4 w-[10vw]">
            <img src={item.image} alt="img" className="w-full h-[15vh] object-cover rounded-t-lg" />
            <div className="mt-4">
              <span className="block text-lg font-semibold text-gray-800">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded ${page === index + 1 ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
