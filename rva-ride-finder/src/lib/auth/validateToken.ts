import { adminAuth } from "../firebase/admin";
import { getAuthenticatedAppForUser } from "../firebase/serverApp";

const validateToken = async (req: Request): Promise<boolean> => {
  const idToken = req.headers.get('Authorization')?.split('Bearer')[1].trim();

  if (!idToken) {
    return false;
  }

  const { currentUser } = await getAuthenticatedAppForUser();

  const decodedToken = await adminAuth.verifyIdToken(idToken);

  if (currentUser?.uid !== decodedToken.uid) {
    return false;
  }

  return true;
}

export default validateToken;