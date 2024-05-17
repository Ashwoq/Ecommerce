import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetchDocument = (collectionName, documentID) => {
  const [document, setDocument] = useState(null);
  // console.log(collectionName);

  const getDocument = async () => {
    // console.log(collectionName, "getfunc");
    const docRef = doc(db, collectionName, documentID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const obj = {
        id: documentID,
        ...docSnap.data(),
      };
      // console.log(collectionName);
      setDocument(obj);
      setDocument(obj);
      // console.log(document, "od-oc");
    } else {
      toast.error("Document not found contact Admin");
    }
  };

  useEffect(() => {
    getDocument();
  }, []);

  return { document };
};

export default useFetchDocument;
