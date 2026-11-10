export interface Activity {
  name: string;
  iconName: string;
  description: string;
  category: string;
}

export interface InvitationState {
  activity: string | null;
  day: string;
  time: string;
  reason: string;
  currentPhase: 'loading' | 'envelope' | 'chat' | 'activities' | 'schedule' | 'certificate';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'them' | 'me';
  timestamp: string;
}