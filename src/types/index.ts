export interface FormData {
  name: string;
  pronouns: string;
  experience: string;
  photo: string | null;
  selectedBadges: string[];
}

export type Step = 'welcome' | 'name' | 'pronouns' | 'experience' | 'photo' | 'badges' | 'result';
