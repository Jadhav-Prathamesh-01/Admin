import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Standard");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendURL}/api/product/add`,
        formData,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Standard");
        setSubCategory("Topwear");
        setSizes([]);
        setBestseller(false);

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start w-full gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>
      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
            name=""
            id=""
          >
            <option value="Standard">Standard</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
            name=""
            id=""
          >
            <option value="Ring">Ring</option>
            <option value="Pendant">Pendant</option>
            <option value="Earrings">Earrings</option>
            <option value="Bangles">Bangles</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            name=""
            id=""
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("Standard")
                  ? "bg-pink-100 border border-pink-700"
                  : "bg-slate-200 border border-slate-200"
              }`}
            >
              Standard
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Small")
                  ? prev.filter((item) => item !== "Small")
                  : [...prev, "Small"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("Small")
                  ? "bg-pink-100 border border-pink-700"
                  : "bg-slate-200 border border-slate-200"
              }`}
            >
              Small
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Medium")
                  ? prev.filter((item) => item !== "Medium")
                  : [...prev, "Medium"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("Medium")
                  ? "bg-pink-100 border border-pink-700"
                  : "bg-slate-200 border border-slate-200"
              }`}
            >
              Medium
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Large")
                  ? prev.filter((item) => item !== "Large")
                  : [...prev, "Large"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("Large")
                  ? "bg-pink-100 border border-pink-700"
                  : "bg-slate-200 border border-slate-200"
              }`}
            >
              Large
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Default")
                  ? prev.filter((item) => item !== "Default")
                  : [...prev, "Default"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("XXL")
                  ? "bg-pink-100 border border-pink-700"
                  : "bg-slate-200 border border-slate-200"
              }`}
            >
              Default
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          className="accent-black"
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>
      <button type="submit" className="py-3 mt-4 text-white bg-black w-28">
        ADD
      </button>
    </form>
  );
}

export default Add;
