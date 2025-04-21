import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Client, Category, Product } from "@/types";

// --- CLIENTS ---
export const addClient = async (client: Client) => {
  await addDoc(collection(db, "clients"), client);
};

export const getClients = async () => {
  const snapshot = await getDocs(collection(db, "clients"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Client[];
};

// --- CATEGORIES ---
export const addCategory = async (category: Category) => {
  await addDoc(collection(db, "categories"), category);
};

export const getCategoriesByClient = async (clientId: string) => {
  const q = query(
    collection(db, "categories"),
    where("clientId", "==", clientId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Category[];
};

// --- PRODUCTS ---
export const addProduct = async (product: Product) => {
  await addDoc(collection(db, "products"), product);
};

export const updateProduct = async (id: string, product: Product) => {
  const productData = { ...product };
  delete productData.id;
  await updateDoc(doc(db, "products", id), productData);
}

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, "products", id));
}

export const getProductsByClient = async (clientId: string) => {
  const q = query(
    collection(db, "products"),
    where("clientId", "==", clientId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};
