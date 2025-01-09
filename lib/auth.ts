import { auth } from '@/firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  validatePassword,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
} from 'firebase/auth';
import { destroyCookie, setCookie } from 'nookies';

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function createUser(email: string, password: string) {
  const status = await validatePassword(auth, password);
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

    throw new Error(unmetRequirements.join('\n'));
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const token = await userCredential.user.getIdToken();

  setCookie(null, 'token', token, {
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  return userCredential.user;
}

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredential.user.getIdToken();

  setCookie(null, 'token', token, {
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  return userCredential.user;
}

export async function logout() {
  await auth.signOut();
  destroyCookie(null, 'token');
}
