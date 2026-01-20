export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  bio: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  languages: string[];
  experience: number;
  availability: string[];
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  verified: boolean;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  level: string;
  interests: string[];
  location: string;
  budget: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface Session {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  subject: string;
  date: Date;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  price: number;
}

export const subjects = [
  "Mathématiques",
  "Physique",
  "Chimie",
  "Informatique",
  "Français",
  "Anglais",
  "Espagnol",
  "Allemand",
  "Histoire",
  "Géographie",
  "Philosophie",
  "SVT",
  "Économie",
  "Droit",
  "Art",
  "Musique",
  "Danse",
  "Cuisine",
  "Yoga",
  "Photographie",
];

export const levels = [
  "Primaire",
  "Collège",
  "Lycée",
  "Université",
  "Prépa",
  "Professionnel",
  "Adulte débutant",
];

export const mockTeachers: Teacher[] = [
  {
    id: "1",
    firstName: "Marie",
    lastName: "Dupont",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bio: "Professeure agrégée de mathématiques avec 15 ans d'expérience. Passionnée par la transmission du savoir, j'aide mes élèves à développer leur logique et leur confiance.",
    subjects: ["Mathématiques", "Physique"],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 35,
    location: "Paris",
    languages: ["Français", "Anglais"],
    experience: 15,
    availability: ["Lundi", "Mercredi", "Vendredi"],
    education: [
      { degree: "Agrégation de Mathématiques", institution: "ENS Paris", year: 2008 },
      { degree: "Master Mathématiques", institution: "Sorbonne", year: 2006 },
    ],
    verified: true,
  },
  {
    id: "2",
    firstName: "Thomas",
    lastName: "Martin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    bio: "Développeur senior et formateur en programmation. Je rends l'informatique accessible à tous, du débutant au confirmé.",
    subjects: ["Informatique", "Mathématiques"],
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 45,
    location: "Lyon",
    languages: ["Français", "Anglais", "Espagnol"],
    experience: 10,
    availability: ["Mardi", "Jeudi", "Samedi"],
    education: [
      { degree: "Master Informatique", institution: "INSA Lyon", year: 2013 },
    ],
    verified: true,
  },
  {
    id: "3",
    firstName: "Sophie",
    lastName: "Bernard",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    bio: "Professeure d'anglais certifiée Cambridge. Méthode interactive et personnalisée pour tous les niveaux.",
    subjects: ["Anglais", "Espagnol"],
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 30,
    location: "Bordeaux",
    languages: ["Français", "Anglais", "Espagnol"],
    experience: 8,
    availability: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    education: [
      { degree: "CELTA", institution: "Cambridge", year: 2015 },
      { degree: "Licence LLCE Anglais", institution: "Bordeaux III", year: 2014 },
    ],
    verified: true,
  },
  {
    id: "4",
    firstName: "Alexandre",
    lastName: "Petit",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bio: "Artiste peintre diplômé des Beaux-Arts. J'enseigne le dessin et la peinture avec passion depuis 12 ans.",
    subjects: ["Art", "Photographie"],
    rating: 4.9,
    reviewCount: 73,
    hourlyRate: 40,
    location: "Marseille",
    languages: ["Français", "Italien"],
    experience: 12,
    availability: ["Mercredi", "Samedi", "Dimanche"],
    education: [
      { degree: "DNSEP", institution: "Beaux-Arts Marseille", year: 2011 },
    ],
    verified: false,
  },
  {
    id: "5",
    firstName: "Camille",
    lastName: "Leroy",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    bio: "Danseuse professionnelle et chorégraphe. J'enseigne la danse contemporaine et classique à tous les âges.",
    subjects: ["Danse", "Yoga"],
    rating: 5.0,
    reviewCount: 64,
    hourlyRate: 50,
    location: "Paris",
    languages: ["Français", "Anglais"],
    experience: 9,
    availability: ["Mardi", "Jeudi", "Samedi"],
    education: [
      { degree: "Diplôme d'État Danse", institution: "Conservatoire Paris", year: 2014 },
    ],
    verified: true,
  },
  {
    id: "6",
    firstName: "Pierre",
    lastName: "Moreau",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    bio: "Chef cuisinier étoilé, je partage ma passion de la gastronomie française et internationale.",
    subjects: ["Cuisine"],
    rating: 4.8,
    reviewCount: 42,
    hourlyRate: 60,
    location: "Nice",
    languages: ["Français", "Anglais", "Italien"],
    experience: 20,
    availability: ["Samedi", "Dimanche"],
    education: [
      { degree: "CAP Cuisine", institution: "Institut Paul Bocuse", year: 2003 },
    ],
    verified: true,
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "1",
    participantId: "1",
    participantName: "Marie Dupont",
    participantAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    lastMessage: "Parfait, on se retrouve mardi à 14h alors !",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 2,
  },
  {
    id: "2",
    participantId: "2",
    participantName: "Thomas Martin",
    participantAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    lastMessage: "N'hésitez pas si vous avez des questions sur Python",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
  },
  {
    id: "3",
    participantId: "3",
    participantName: "Sophie Bernard",
    participantAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    lastMessage: "Your pronunciation is getting much better!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
  },
];

export const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    receiverId: "current",
    content: "Bonjour ! J'ai bien reçu votre demande de cours. Quand seriez-vous disponible pour un premier échange ?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
  },
  {
    id: "2",
    senderId: "current",
    receiverId: "1",
    content: "Bonjour Marie ! Je suis disponible mardi après-midi ou jeudi matin. Qu'est-ce qui vous convient le mieux ?",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    read: true,
  },
  {
    id: "3",
    senderId: "1",
    receiverId: "current",
    content: "Mardi après-midi serait parfait. 14h vous conviendrait ?",
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
    read: true,
  },
  {
    id: "4",
    senderId: "current",
    receiverId: "1",
    content: "Oui, c'est parfait pour moi !",
    timestamp: new Date(Date.now() - 1000 * 60 * 32),
    read: true,
  },
  {
    id: "5",
    senderId: "1",
    receiverId: "current",
    content: "Parfait, on se retrouve mardi à 14h alors !",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
];

export const mockSessions: Session[] = [
  {
    id: "1",
    teacherId: "1",
    teacherName: "Marie Dupont",
    studentId: "current",
    studentName: "Jean Étudiant",
    subject: "Mathématiques",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    duration: 60,
    status: "scheduled",
    price: 35,
  },
  {
    id: "2",
    teacherId: "2",
    teacherName: "Thomas Martin",
    studentId: "current",
    studentName: "Jean Étudiant",
    subject: "Informatique",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    duration: 90,
    status: "scheduled",
    price: 67.5,
  },
  {
    id: "3",
    teacherId: "3",
    teacherName: "Sophie Bernard",
    studentId: "current",
    studentName: "Jean Étudiant",
    subject: "Anglais",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    duration: 60,
    status: "completed",
    price: 30,
  },
];
