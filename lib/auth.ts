import app from '@/firebase-config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  validatePassword,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
} from 'firebase/auth';

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  const auth = getAuth(app);
  return _onAuthStateChanged(auth, cb);
}

export async function createUser(email: string, password: string) {
  const auth = getAuth(app);

  validatePassword(auth, password)
    .then((status) => {
      if (!status.isValid) {
        const unmetRequirements = [];

        if (status.containsLowercaseLetter !== true) {
          unmetRequirements.push(
            'Password must contain at least one lowercase letter.'
          );
        }
        if (status.containsUppercaseLetter !== true) {
          unmetRequirements.push(
            'Password must contain at least one uppercase letter.'
          );
        }
        if (status.containsNumericCharacter !== true) {
          unmetRequirements.push('Password must contain at least one number.');
        }
        if (status.containsNonAlphanumericCharacter !== true) {
          unmetRequirements.push(
            'Password must contain at least one special character.'
          );
        }
        if (status.meetsMinPasswordLength !== true) {
          unmetRequirements.push(
            `Password must be at least ${status.passwordPolicy.customStrengthOptions.minPasswordLength} characters long.`
          );
        }
        if (status.meetsMaxPasswordLength !== true) {
          unmetRequirements.push(
            `Password must not exceed ${status.passwordPolicy.customStrengthOptions.maxPasswordLength} characters.`
          );
        }

        throw { unmetRequirements };
      }

      return createUserWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      if (error.unmetRequirements) {
        throw error.unmetRequirements;
      } else {
        throw error;
      }
    });
}

export async function signIn(email: string, password: string) {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      throw error;
    });
}

export async function signOut() {
  const auth = getAuth(app);
  try {
    return auth.signOut();
  } catch (error) {
    throw error;
  }
}
