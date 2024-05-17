import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = () => {
    setIsLoading(true);

    try {
      const docRef = collection(db, collectionName);
      // const q = query(docRef, orderBy("createdAt", "desc"));

      const filter =
        collectionName === "products"
          ? query(docRef, orderBy("createdAt", "desc"))
          : docRef;

      onSnapshot(filter, (querySnapshot) => {
        const allData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(allData, "alldda");
        setData(allData);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);
  return { data, isLoading };
};

export default useFetchCollection;
