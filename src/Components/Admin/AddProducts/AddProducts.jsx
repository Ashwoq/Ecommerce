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

  const [validated, setValidated] = useState(true);
  const [validationField, setValidationField] = useState(null);

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

    if (
      product.name.length > 2 &&
      product.sellerName.length > 2 &&
      product.desc.length > 2 &&
      product.brand.length > 2 &&
      product.category.length > 2 &&
      product.mrp !== 0 &&
      product.price !== 0 &&
      product.imageURL !== ""
    ) {
      if (product.mrp >= product.price) {
        setIsLoading(true);
        setValidated(true);
        setValidationField(null);
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
    } else {
      setValidated(false);
      if (product.name.length <= 2) {
        setValidationField("aname");
      } else if (product.desc.length <= 2) {
        setValidationField("aproduct");
      } else if (product.sellerName.length <= 2) {
        setValidationField("asellername");
      } else if (product.brand.length <= 2) {
        setValidationField("abrand");
      } else if (product.category.length <= 2) {
        setValidationField("acategory");
      } else if (product.mrp === 0) {
        setValidationField("amrp");
      } else if (product.price === 0) {
        setValidationField("aprice");
      } else if (product.imageURL === "") {
        setValidationField("aimage");
      }
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
        <div className="p-2 px-4 mb-5 text-2xl font-bold text-gray-100 bg-green-500 w-max rounded-xl ">
          {detectForm(id, "Add New Product", "Edit Product")}
        </div>
        <div className=" lg:text-base xs:text-xs">
          <form
            onSubmit={detectForm(id, addProduct, editProduct)}
            className="grid items-start justify-center gap-3 shadow-xl xs:grid-cols-1 lg:grid-cols-3"
          >
            <div className="flex flex-col col-span-2 gap-3 p-4 bg-gray-200 rounded-xl ">
              <div className="">
                <div className="mb-3 text-xl font-bold">
                  General Information
                </div>

                <div className="text-sm font-bold ">Product Name</div>
                <input
                  className={`w-full p-3 bg-gray-50 rounded-lg ${
                    validationField === "aname"
                      ? "outline-red-500 outline outline-2 animate-shake-delay"
                      : "outline-0"
                  }`}
                  type="text"
                  placeholder="Product Name"
                  name="name"
                  // required
                  value={product.name}
                  onChange={(e) => handleInputChange(e)}
                />
                <div
                  className={`${
                    validationField === "aname" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[40%]">
                  <div className="text-sm font-bold">Seller Name</div>
                  <input
                    className={`w-full p-3 bg-gray-50 rounded-lg ${
                      validationField === "asellername"
                        ? "outline-red-500 outline outline-2 animate-shake-delay"
                        : "outline-0"
                    }`}
                    type="text"
                    placeholder="Seller Name"
                    name="sellerName"
                    // required
                    value={product.sellerName}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <div
                    className={`${
                      validationField === "asellername"
                        ? "opacity-100"
                        : "opacity-0"
                    } text-[11px] p-1 text-red-500 animate-shake-delay`}
                  >
                    Invalid Data
                  </div>
                </div>
                <div className="w-[45%]">
                  <div className="text-sm font-bold">Product Category</div>
                  <select
                    className={`p-3 w-full bg-gray-50 rounded-lg outline-none ${
                      validationField === "acategory"
                        ? "outline-red-500 outline outline-2 animate-shake-delay"
                        : "outline-0"
                    }`}
                    // required
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
                  <div
                    className={`${
                      validationField === "acategory"
                        ? "opacity-100"
                        : "opacity-0"
                    } text-[11px] p-1 text-red-500 animate-shake-delay`}
                  >
                    Invalid Data
                  </div>
                </div>
              </div>
              <div className="">
                <div className="text-sm font-bold">Product Description</div>
                <textarea
                  className={`w-full p-3 bg-gray-50 rounded-lg
                   outline-none ${
                     validationField === "aproduct"
                       ? "outline-red-500 outline outline-2 animate-shake-delay"
                       : "outline-0"
                   }`}
                  name="desc"
                  // required
                  value={product.desc}
                  rows={5}
                  placeholder="Product Description of the product"
                  onChange={(e) => handleInputChange(e)}
                />
                <div
                  className={`${
                    validationField === "aproduct" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
              <div className="">
                <div className="text-sm font-bold">Product Brand</div>
                <input
                  className={`w-full p-3 bg-gray-50 rounded-lg ${
                    validationField === "abrand"
                      ? "outline-red-500 outline outline-2 animate-shake-delay"
                      : "outline-0"
                  }`}
                  type="text"
                  placeholder="Product Brand"
                  name="brand"
                  // required
                  value={product.brand}
                  onChange={(e) => handleInputChange(e)}
                />
                <div
                  className={`${
                    validationField === "abrand" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
              <div className="justify-between gap-2 lg:flex xs:block">
                {/* <div className="">
                  <div className="text-sm font-bold">Product Category</div>
                  <select
                    className={`p-3 bg-gray-50 rounded-lg outline-none ${
                      validationField === "acategory"
                        ? "outline-red-500 outline outline-2 animate-shake-delay"
                        : "outline-0"
                    }`}
                    // required
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
                  <div
                    className={`${
                      validationField === "acategory"
                        ? "opacity-100"
                        : "opacity-0"
                    } text-[11px] p-1 text-red-500 animate-shake-delay`}
                  >
                    Invalid Data
                  </div>
                </div> */}
                <div className="">
                  <div className="text-sm font-bold">Product MRP</div>
                  <input
                    className={`p-3 bg-gray-50 rounded-lg ${
                      validationField === "amrp"
                        ? "outline-red-500 outline outline-2 animate-shake-delay"
                        : "outline-0"
                    }`}
                    type="number"
                    defaultValue={10}
                    placeholder="Product MRP"
                    name="mrp"
                    // required
                    value={product.mrp}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <div
                    className={`${
                      validationField === "amrp" ? "opacity-100" : "opacity-0"
                    } text-[11px] p-1 text-red-500 animate-shake-delay`}
                  >
                    Invalid Data
                  </div>
                </div>
                <div className="">
                  <div className="text-sm font-bold">Product Price</div>
                  <input
                    className={`p-3 bg-gray-50 rounded-lg ${
                      validationField === "aprice"
                        ? "outline-red-500 outline outline-2 animate-shake-delay"
                        : "outline-0"
                    }`}
                    defaultValue={5}
                    type="number"
                    placeholder="Product Price"
                    name="price"
                    // required
                    value={product.price}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <div
                    className={`${
                      validationField === "aprice" ? "opacity-100" : "opacity-0"
                    } text-[11px] p-1 text-red-500 animate-shake-delay`}
                  >
                    Invalid Data
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col justify-between w-full gap-3 p-4 bg-gray-200 rounded-xl ${
                validationField === "aimage"
                  ? "outline-red-500 outline outline-2 animate-shake-delay"
                  : "outline-0"
              }`}
            >
              <div className="text-lg font-bold ">Upload Image</div>
              {uploadProgress === 0 ? null : (
                <div className="p-1 px-2 text-sm rounded-md bg-gray-50 w-max">
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
                className="p-2 rounded-lg bg-gray-50"
                type="file"
                accept="image/*"
                placeholder="Product Image"
                // required
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              <button className="flex items-center justify-center p-6 py-2 mx-auto my-1 mt-5 font-bold text-center text-white transition-all rounded hover:rounded-lg hover:scale-105 button-animation1 ">
                {detectForm(id, "Upload", "Update")}
              </button>
              {product.imageURL === "" && (
                <div
                  className={`${
                    validationField === "aimage" ? "opacity-100" : "opacity-0"
                  } text-lg p-2 text-center bg-red-500 text-white animate-shake-delay rounded-xl`}
                >
                  Invalid Data
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
