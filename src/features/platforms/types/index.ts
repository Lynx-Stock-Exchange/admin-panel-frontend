export type Platform = {
  id: string;
  name: string;
  description: string | null;
  api_key: string;
  is_active: boolean;
  created_at: string;
};

export type CreatePlatformPayload = {
  name: string;
  description?: string;
};

export type CreatedPlatformResult = {
  platform: Platform;
  api_secret: string;
};
