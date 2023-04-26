export interface Auth0User {
  user_id: string;
  name?: string;
  family_name?: string;
  given_name?: string;
  email?: string;
  email_verified?: boolean;
  nickname?: string;
  phone_number?: string;
  picture?: string;
  updated_at?: string;
  created_at?: string;
  user_metadata?: string;
}
