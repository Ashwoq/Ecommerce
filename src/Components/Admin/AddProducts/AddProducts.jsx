import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Loader from "../../Loader";
import "../../../Global.css";
import { ImageUp } from "lucide-react";
// import productsData from "../../../assets/Data/ProductsFirebase.json";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

const categories = [
  { id: 1, name: "Mobile" },
  { id: 2, name: "Watches" },
  { id: 3, name: "Tablets" },
  { id: 4, name: "Shoes" },
  { id: 5, name: "Refrigerator" },
  { id: 6, name: "Air Conditioner" },
  { id: 7, name: "Washing Machine" },
  { id: 8, name: "Microwave" },
  { id: 9, name: "Chimney " },
];

const initialState = {
  name: "",
  desc: "",
  sellerName: "",
  brand: "",
  mrp: 1,
  price: 1,
  category: "",
  imageURL: "",
};

const AddProducts = () => {
  const location = useNavigate();
  const storage = getStorage();
  const { id } = useParams();

  const products = useSelector(selectProducts);

  const productEdit = products.find((item) => item.id === id);

  const [product, setProducts] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducts({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `ecommerce/${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setUploadProgress(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProducts({ ...product, imageURL: downloadURL });
        });
        toast.success("Image uploaded successfully");
      }
    );
  };

  //
  // const storeData = () => {
  //   productsData.map((x, i) => {
  //     addDoc(collection(db, "products"), {
  //       name: x.name,
  //       desc: x.desc,
  //       sellerName: x.sellerName,
  //       brand: x.brand,
  //       mrp: Number(x.mrp),
  //       price: Number(x.price),
  //       category: x.category,
  //       imageURL: x.imageURL,
  //       createdAt: Timestamp.now().toDate(),
  //     });
  //   });
  // };
  // storeData();
  //

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    if (product.mrp >= product.price) {
      try {
        const docRef = addDoc(collection(db, "products"), {
          name: product.name,
          desc: product.desc,
          sellerName: product.sellerName,
          brand: product.brand,
          mrp: Number(product.mrp),
          price: Number(product.price),
          category: product.category,
          imageURL: product.imageURL,
          createdAt: Timestamp.now().toDate(),
        });
        setIsLoading(false);
        setUploadProgress(0);
        setProducts({ ...initialState });
        // console.log(product);
        //   console.log("Document written with ID: ", docRef.id);
        toast.success("Product Uploaded successfully");
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    } else {
      setIsLoading(false);
      toast.error("MRP should be higher than the selling price");
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        desc: product.desc,
        sellerName: product.sellerName,
        brand: product.brand,
        mrp: Number(product.mrp),
        price: Number(product.price),
        category: product.category,
        imageURL: product.imageURL,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Successfully Updated");
      location("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="cursor-default" style={{ backgroundColor: "" }}>
        {/* bg-[#30dd8a] */}
        <div className="p-2 px-4 mb-5 text-2xl font-bold text-gray-100 bg-green-300/50 w-max rounded-xl ">
          {detectForm(id, "Add New Product", "Edit Product")}
        </div>
        <div className=" lg:text-base xs:text-xs">
          <form
            onSubmit={detectForm(id, addProduct, editProduct)}
            className="grid items-start justify-center gap-3 xs:grid-cols-1 lg:grid-cols-3"
          >
            <div className="flex flex-col col-span-2 gap-3 p-4 bg-gray-200 rounded-xl ">
              <div className="">
                <div className="mb-3 text-xl font-bold">
                  General Information
                </div>

                <div className="text-sm font-bold ">Product Name</div>
                <input
                  className="w-full p-3 bg-gray-300 rounded-lg"
                  type="text"
                  placeholder="Product Name"
                  name="name"
                  required
                  value={product.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="">
                <div className="text-sm font-bold">Seller Name</div>
                <input
                  className="w-full p-3 bg-gray-300 rounded-lg"
                  type="text"
                  placeholder="Seller Name"
                  name="sellerName"
                  required
                  value={product.sellerName}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="">
                <div className="text-sm font-bold">Product Description</div>
                <textarea
                  className="w-full p-3 bg-gray-300 rounded-lg outline-none"
                  name="desc"
                  required
                  value={product.desc}
                  rows={5}
                  placeholder="Product Description of the product"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="">
                <div className="text-sm font-bold">Product Brand</div>
                <input
                  className="w-full p-3 bg-gray-300 rounded-lg"
                  type="text"
                  placeholder="Product Brand"
                  name="brand"
                  required
                  value={product.brand}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="gap-3 lg:flex xs:block justify-evenly">
                <div className="">
                  <div className="text-sm font-bold">Product Category</div>
                  <select
                    className="p-3 bg-gray-300 rounded-lg outline-none"
                    required
                    name="category"
                    value={product.category}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="" disabled>
                      -- choose product category
                    </option>
                    {categories.map((cat, index) => {
                      return (
                        <option key={index} value={cat.name}>
                          {cat.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="">
                  <div className="text-sm font-bold">Product MRP</div>
                  <input
                    className="p-3 bg-gray-300 rounded-lg "
                    type="number"
                    placeholder="Product MRP"
                    name="mrp"
                    required
                    value={product.mrp}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="">
                  <div className="text-sm font-bold">Product Price</div>
                  <input
                    className="p-3 bg-gray-300 rounded-lg"
                    type="number"
                    placeholder="Product Price"
                    name="price"
                    required
                    value={product.price}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between w-full gap-3 p-4 bg-gray-200 rounded-xl">
              <div className="text-lg font-bold ">Upload Image</div>
              {uploadProgress === 0 ? null : (
                <div className="p-1 px-2 text-sm bg-gray-300 rounded-md w-max">
                  {/* Uploading : {uploadProgress}%  */}
                  Uploading Status :
                  {uploadProgress < 100 ? ` ${uploadProgress}%` : " Uploaded"}
                </div>
              )}
              {product.imageURL === "" ? (
                <div className="flex items-center justify-center p-3 rounded-lg bg-gray-50">
                  <ImageUp className="stroke-[0.8px] size-64 stroke-gray-500" />
                </div>
              ) : (
                <div className="w-full ">
                  {/* <input
                    type="text"
                    required
                    name="imageURL"
                    value={product.imageURL}
                    disabled
                  /> */}
                  <div className="flex items-center justify-center mb-1">
                    <img
                      className="px-1 max-h-[21rem] max-w-[22rem] max-auto bg-contain rounded-xl"
                      src={product.imageURL}
                      alt="product.imageURL"
                    />
                  </div>
                  <div className="p-1 px-2 text-sm bg-gray-400 rounded-lg w-max ">
                    Link : &nbsp;
                    <a href={product.imageURL}>Click here to see the Image</a>
                  </div>
                </div>
              )}
              <input
                className="p-2 bg-gray-300 rounded-lg"
                type="file"
                accept="image/*"
                placeholder="Product Image"
                required
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              <button className="flex items-center justify-center p-6 py-2 mx-auto my-1 mt-5 font-bold text-center text-white transition-all rounded hover:rounded-lg hover:scale-105 button-animation1 ">
                {detectForm(id, "Upload", "Update")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
