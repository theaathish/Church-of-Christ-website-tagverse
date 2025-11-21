import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Material } from '@/types/material';

const MATERIALS_COLLECTION = 'materials';

// Add material
export const addMaterial = async (
  title: string,
  description: string,
  driveFileId: string,
  driveUrl: string,
  thumbnailUrl: string | undefined,
  category: Material['category']
): Promise<void> => {
  try {
    // Get current max order
    const materialsSnapshot = await getDocs(collection(db, MATERIALS_COLLECTION));
    const maxOrder = materialsSnapshot.docs.reduce((max, doc) => {
      const order = doc.data().order || 0;
      return order > max ? order : max;
    }, 0);

    await addDoc(collection(db, MATERIALS_COLLECTION), {
      title,
      description,
      driveFileId,
      driveUrl,
      thumbnailUrl: thumbnailUrl || null,
      category,
      uploadedAt: new Date(),
      order: maxOrder + 1,
    });
  } catch (error) {
    console.error('Error adding material:', error);
    throw error;
  }
};

// Get all materials
export const getMaterials = async (): Promise<Material[]> => {
  try {
    const q = query(collection(db, MATERIALS_COLLECTION), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      uploadedAt: doc.data().uploadedAt?.toDate() || new Date(),
    })) as Material[];
  } catch (error) {
    console.error('Error fetching materials:', error);
    throw error;
  }
};

// Delete material
export const deleteMaterial = async (materialId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, MATERIALS_COLLECTION, materialId));
  } catch (error) {
    console.error('Error deleting material:', error);
    throw error;
  }
};

// Update material order
export const updateMaterialOrder = async (materialId: string, newOrder: number): Promise<void> => {
  try {
    await updateDoc(doc(db, MATERIALS_COLLECTION, materialId), {
      order: newOrder,
    });
  } catch (error) {
    console.error('Error updating material order:', error);
    throw error;
  }
};
