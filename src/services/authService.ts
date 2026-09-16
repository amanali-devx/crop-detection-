import { UserProfile } from '../types';

export interface StoredUser extends UserProfile {
  passwordHash: string; // Plain/hashed comparison for browser mock persistence
}

const STORAGE_KEY = 'farmerdetect_registered_users';

// Pre-seeded accounts representing existing/old users
export const PRESEEDED_USERS: StoredUser[] = [
  {
    id: 'usr-aman',
    name: 'Aman Ali',
    email: 'aliaman12074@gmail.com',
    passwordHash: 'aman123',
    role: 'SIH Evaluator / Student',
    farmLocation: 'New Delhi, India',
    primaryCrops: ['Tomato', 'Potato'],
    memberSince: 'January 2026',
    savedScansCount: 8,
  },
  {
    id: 'usr-kisan',
    name: 'Ramesh Kumar Patel',
    email: 'farmer@krishi.gov.in',
    passwordHash: 'kisan123',
    role: 'Farmer / Grower',
    farmLocation: 'Nashik Agro-Cluster, Maharashtra',
    primaryCrops: ['Tomato', 'Corn', 'Chilli'],
    memberSince: 'February 2026',
    savedScansCount: 15,
  },
  {
    id: 'usr-jury',
    name: 'Dr. SIH Jury Member',
    email: 'evaluator@sih2026.gov.in',
    passwordHash: 'sih2026',
    role: 'SIH Evaluator / Student',
    farmLocation: 'National Hackathon Council, Delhi',
    primaryCrops: ['All Crops'],
    memberSince: 'March 2026',
    savedScansCount: 22,
  },
  {
    id: 'usr-scientist',
    name: 'Dr. Vandana Sharma',
    email: 'scientist@icar.res.in',
    passwordHash: 'crop2026',
    role: 'Agronomist / Scientist',
    farmLocation: 'ICAR Agricultural Research Station, Punjab',
    primaryCrops: ['Wheat', 'Potato', 'Apple'],
    memberSince: 'January 2026',
    savedScansCount: 31,
  },
];

export const getRegisteredUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PRESEEDED_USERS));
      return PRESEEDED_USERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PRESEEDED_USERS));
      return PRESEEDED_USERS;
    }
    return parsed;
  } catch {
    return PRESEEDED_USERS;
  }
};

export const saveRegisteredUsers = (users: StoredUser[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to store users in localStorage', err);
  }
};

export interface AuthResult {
  success: boolean;
  user?: UserProfile;
  errorType?: 'NO_ACCOUNT' | 'WRONG_PASSWORD' | 'EMAIL_EXISTS' | 'INVALID_INPUT';
  message: string;
}

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

/**
 * LOGIN VALIDATION:
 * 1. Checks if email exists in registered users (old user)
 * 2. If not found, blocks login and prompts them to Sign Up
 * 3. If found, checks password
 */
export const loginUser = (emailInput: string, passwordInput: string): AuthResult => {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput.trim();

  if (!email || !validateEmail(email)) {
    return {
      success: false,
      errorType: 'INVALID_INPUT',
      message: 'Please enter a valid email address.',
    };
  }

  if (!password) {
    return {
      success: false,
      errorType: 'INVALID_INPUT',
      message: 'Please enter your account password.',
    };
  }

  const users = getRegisteredUsers();
  const matchedUser = users.find((u) => u.email.toLowerCase() === email);

  // User does NOT exist: Block login!
  if (!matchedUser) {
    return {
      success: false,
      errorType: 'NO_ACCOUNT',
      message: `Account not found for ${email}. Naya user hai toh pehle "Sign Up" karein!`,
    };
  }

  // User exists, verify password
  if (matchedUser.passwordHash !== password) {
    return {
      success: false,
      errorType: 'WRONG_PASSWORD',
      message: 'Galat password! Password galat hai, kripya sahi password dalein.',
    };
  }

  // Success
  const { passwordHash, ...userProfile } = matchedUser;
  return {
    success: true,
    user: userProfile,
    message: `Welcome back, ${matchedUser.name}! Login successful.`,
  };
};

/**
 * SIGN UP VALIDATION:
 * 1. Checks if email is already registered (if so, prompts them to Login)
 * 2. Validates name, email format, password length (>= 6)
 * 3. Saves new user to registered database
 */
export const registerUser = (params: {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: 'Farmer / Grower' | 'Agronomist / Scientist' | 'SIH Evaluator / Student';
  primaryCrop?: string;
  farmLocation?: string;
}): AuthResult => {
  const name = params.name.trim();
  const email = params.email.trim().toLowerCase();
  const password = params.password.trim();
  const confirmPassword = params.confirmPassword?.trim();

  if (!name || name.length < 2) {
    return {
      success: false,
      errorType: 'INVALID_INPUT',
      message: 'Please enter your full name (minimum 2 characters).',
    };
  }

  if (!email || !validateEmail(email)) {
    return {
      success: false,
      errorType: 'INVALID_INPUT',
      message: 'Please enter a valid email address.',
    };
  }

  if (!password || password.length < 6) {
    return {
      success: false,
      errorType: 'INVALID_INPUT',
      message: 'Password must be at least 6 characters long.',
    };
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    return {
      success: false,
      errorType: 'INVALID_INPUT',
      message: 'Passwords do not match! Both passwords must be identical.',
    };
  }

  const users = getRegisteredUsers();
  const existingUser = users.find((u) => u.email.toLowerCase() === email);

  // Email already exists: Block registration and tell them to login!
  if (existingUser) {
    return {
      success: false,
      errorType: 'EMAIL_EXISTS',
      message: `Account already exists for ${email}! Yeh email pehle se registered hai. Kripya "Sign In / Login" karein.`,
    };
  }

  // Create new user record
  const newUser: StoredUser = {
    id: 'usr-' + Date.now(),
    name: name,
    email: email,
    passwordHash: password,
    role: params.role,
    primaryCrops: [params.primaryCrop || 'Tomato', 'Potato'],
    farmLocation: params.farmLocation || 'India Agro-Zone',
    memberSince: 'March 2026',
    savedScansCount: 0,
  };

  const updatedUsers = [newUser, ...users];
  saveRegisteredUsers(updatedUsers);

  const { passwordHash, ...userProfile } = newUser;
  return {
    success: true,
    user: userProfile,
    message: `Account created successfully! Welcome ${newUser.name}.`,
  };
};
