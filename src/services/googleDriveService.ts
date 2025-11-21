// Google Drive API configuration
// These values are loaded from environment variables (.env.local)
// See GOOGLE_DRIVE_SETUP.md for setup instructions
const CLIENT_ID = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let tokenClient: any;
let accessToken: string | null = null;

// Initialize Google Drive API
export const initGoogleDrive = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject('Window is undefined');
      return;
    }

    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response: any) => {
          if (response.access_token) {
            accessToken = response.access_token;
            resolve(response.access_token);
          } else {
            reject('Failed to get access token');
          }
        },
      });
      resolve(tokenClient);
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

// Request access token
export const requestAccessToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject('Token client not initialized');
      return;
    }

    tokenClient.callback = (response: any) => {
      if (response.access_token) {
        accessToken = response.access_token;
        resolve(response.access_token);
      } else {
        reject('Failed to get access token');
      }
    };

    tokenClient.requestAccessToken();
  });
};

// Upload file to Google Drive
export const uploadToGoogleDrive = async (
  file: File,
  fileName: string
): Promise<{ fileId: string; webViewLink: string; thumbnailLink?: string }> => {
  if (!accessToken) {
    throw new Error('Not authenticated. Please sign in first.');
  }

  const metadata = {
    name: fileName,
    mimeType: file.type,
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink,thumbnailLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload file to Google Drive');
  }

  const data = await response.json();
  
  // Make file publicly accessible
  await makeFilePublic(data.id);

  return {
    fileId: data.id,
    webViewLink: data.webViewLink,
    thumbnailLink: data.thumbnailLink,
  };
};

// Make file publicly accessible
const makeFilePublic = async (fileId: string) => {
  if (!accessToken) return;

  await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role: 'reader',
      type: 'anyone',
    }),
  });
};

// Delete file from Google Drive
export const deleteFromGoogleDrive = async (fileId: string): Promise<void> => {
  if (!accessToken) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete file from Google Drive');
  }
};

// Get file info
export const getFileInfo = async (fileId: string) => {
  if (!accessToken) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,webViewLink,thumbnailLink,mimeType`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get file info');
  }

  return response.json();
};

// Check if authenticated
export const isAuthenticated = () => {
  return !!accessToken;
};

// Sign out
export const signOut = () => {
  accessToken = null;
};
