import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  MessageSquare,
  Users,
  BookOpen,
  Star,
  Clock,
  TrendingUp,
  CreditCard,
  Settings,
  ChevronRight,
  Video,
  Mail,
  Inbox,
  CalendarDays,
  UserCheck,
  DollarSign,
  BarChart3,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isAfter, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Types pour les données mock
  interface SessionData {
    id: string;
    studentName: string;
    studentAvatar: string;
    subject: string;
    date: Date;
    duration: number;
    status: string;
  }

  // Mock data - à remplacer par des appels API réels
  const teacherStats = {
    totalStudents: 24,
    monthlySessions: 18,
    averageRating: 4.9,
    monthlyRevenue: 1240,
    pendingRequests: 5,
    unreadMessages: 3
  };

  const upcomingSessions: SessionData[] = [
    {
      id: '1',
      studentName: 'Fatou Sow',
      studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      subject: 'Mathématiques',
      date: new Date('2024-12-15T14:00:00'),
      duration: 60,
      status: 'scheduled'
    },
    {
      id: '2',
      studentName: 'Mamadou Diallo',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      subject: 'Physique',
      date: new Date('2024-12-16T16:00:00'),
      duration: 90,
      status: 'scheduled'
    }
  ];

  const students = [
    {
      id: '1',
      name: 'Fatou Sow',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      subject: 'Mathématiques',
      sessionsCount: 8,
      lastSession: new Date('2024-12-10T14:00:00'),
      rating: 5,
      status: 'active'
    },
    {
      id: '2',
      name: 'Mamadou Diallo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      subject: 'Physique',
      sessionsCount: 5,
      lastSession: new Date('2024-12-08T16:00:00'),
      rating: 4.5,
      status: 'active'
    },
    {
      id: '3',
      name: 'Aissatou Ndiaye',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      subject: 'Mathématiques',
      sessionsCount: 3,
      lastSession: new Date('2024-12-05T10:00:00'),
      rating: 5,
      status: 'active'
    }
  ];

  const pendingRequests = [
    {
      id: '1',
      studentName: 'Kofi Mensah',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      subject: 'Mathématiques',
      message: 'Bonjour, je suis intéressé par des cours de mathématiques pour préparer le bac. Auriez-vous des disponibilités ?',
      requestedDate: new Date('2024-12-12T15:00:00'),
      duration: 60
    },
    {
      id: '2',
      studentName: 'Nomsa Zulu',
      studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      subject: 'Physique',
      message: 'Je cherche un professeur de physique pour m\'aider avec la mécanique quantique.',
      requestedDate: new Date('2024-12-14T14:00:00'),
      duration: 90
    }
  ];

  const menuItems = [
    { id: 'overview', label: 'Aperçu', icon: BarChart3 },
    { id: 'courses', label: 'Mes Cours', icon: Calendar },
    { id: 'students', label: 'Mes Élèves', icon: Users },
    { id: 'requests', label: 'Demandes', icon: Inbox },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'schedule', label: 'Planifier', icon: Plus }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Élèves actifs', value: teacherStats.totalStudents, icon: Users, color: 'text-primary' },
          { label: 'Cours ce mois', value: teacherStats.monthlySessions, icon: BookOpen, color: 'text-accent' },
          { label: 'Note moyenne', value: teacherStats.averageRating, icon: Star, color: 'text-blue-500' },
          { label: 'Revenus', value: `${teacherStats.monthlyRevenue}€`, icon: CreditCard, color: 'text-blue-600' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-card border-border/50 hover:shadow-hover transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button className="h-auto p-4 flex flex-col gap-2" variant="outline">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Planifier un cours</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col gap-2" variant="outline">
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm">Voir messages</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col gap-2" variant="outline">
              <Users className="w-6 h-6" />
              <span className="text-sm">Gérer élèves</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Fonctions mock pour l'intégration Google
  const createGoogleCalendarEvent = (session: SessionData) => {
    // Simulation de création d'événement Google Calendar
    const eventTitle = `Cours ${session.subject} - ${session.studentName}`;
    const startTime = session.date.toISOString();
    const endTime = new Date(session.date.getTime() + session.duration * 60000).toISOString();

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=Cours%20particulier%20avec%20${encodeURIComponent(session.studentName)}`;

    window.open(calendarUrl, '_blank');
  };

  const generateGoogleMeetLink = (session: SessionData) => {
    // Simulation de génération de lien Google Meet
    const meetUrl = `https://meet.google.com/new?hs=122&pli=1&authuser=0`;
    // Dans un vrai environnement, on utiliserait l'API Google Meet
    navigator.clipboard.writeText(meetUrl).then(() => {
      alert('Lien Google Meet copié dans le presse-papiers !');
    });
  };

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Cours</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Cours
        </Button>
      </div>

      {/* Upcoming Sessions */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Cours à venir</CardTitle>
          <CardDescription>Vos prochaines sessions programmées</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={session.studentAvatar} />
                    <AvatarFallback>{session.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{session.studentName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {session.subject} • {format(session.date, 'dd MMM yyyy à HH:mm', { locale: fr })} • {session.duration}min
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => createGoogleCalendarEvent(session)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Calendar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => generateGoogleMeetLink(session)}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Meet
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Integration */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Intégration Google</CardTitle>
          <CardDescription>Gérez vos cours avec Google Calendar et Meet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-6 border border-border rounded-lg">
              <CalendarDays className="w-12 h-12 mx-auto text-blue-500 mb-3" />
              <h3 className="font-semibold mb-2">Google Calendar</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Synchronisez automatiquement vos cours
              </p>
              <Button variant="outline" size="sm">
                Connecter Calendar
              </Button>
            </div>
            <div className="text-center p-6 border border-border rounded-lg">
              <Video className="w-12 h-12 mx-auto text-green-500 mb-3" />
              <h3 className="font-semibold mb-2">Google Meet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Générez des liens de visioconférence
              </p>
              <Button variant="outline" size="sm">
                Connecter Meet
              </Button>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>ℹ️ Note:</strong> L'intégration Google nécessite une configuration OAuth 2.0.
              Actuellement simulée pour démonstration.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Élèves</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Rechercher
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {students.map((student) => (
          <Card key={student.id} className="shadow-card border-border/50 hover:shadow-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.subject}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {student.sessionsCount} cours
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Dernier: {format(student.lastSession, 'dd MMM', { locale: fr })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{student.rating}</span>
                  </div>
                  <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                    {student.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contacter
                </Button>
                <Button variant="outline" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Voir profil
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Programmer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Demandes de Cours</h2>
        <Badge variant="secondary">{teacherStats.pendingRequests} nouvelles</Badge>
      </div>

      <div className="grid gap-4">
        {pendingRequests.map((request) => (
          <Card key={request.id} className="shadow-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={request.studentAvatar} />
                    <AvatarFallback>{request.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{request.studentName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.subject} • {request.duration}min • {format(request.requestedDate, 'dd MMM yyyy', { locale: fr })}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">En attente</Badge>
              </div>

              <p className="text-sm mb-4">{request.message}</p>

              <div className="flex gap-2">
                <Button size="sm">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Accepter
                </Button>
                <Button variant="outline" size="sm">
                  Proposer horaire
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Répondre
                </Button>
                <Button variant="ghost" size="sm">
                  Refuser
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Badge variant="secondary">{teacherStats.unreadMessages} non lus</Badge>
      </div>

      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Messagerie Instantanée</CardTitle>
          <CardDescription>Communiquez avec vos élèves en temps réel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Messagerie en temps réel</h3>
            <p className="text-muted-foreground mb-4">
              Fonctionnalité à implémenter avec WebSocket/Socket.io
            </p>
            <Button>
              Ouvrir la messagerie
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Planifier un Cours</h2>
      </div>

      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Nouveau Cours</CardTitle>
          <CardDescription>Planifiez un cours avec Google Calendar et Meet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Planification de cours</h3>
            <p className="text-muted-foreground mb-4">
              Intégrez Google Calendar et Google Meet pour une gestion optimale
            </p>
            <div className="flex gap-3 justify-center">
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Créer avec Google Calendar
              </Button>
              <Button variant="outline">
                <Video className="w-4 h-4 mr-2" />
                Générer Meet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Bonjour, {user?.firstName} 👋
            </h1>
            <p className="text-muted-foreground">
              Gérez votre activité d'enseignement et vos cours
            </p>
          </motion.div>

          {/* Navigation Menu */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
              {menuItems.map((item) => (
                <TabsTrigger key={item.id} value={item.id} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {renderOverview()}
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              {renderCourses()}
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              {renderStudents()}
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              {renderRequests()}
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              {renderMessages()}
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              {renderSchedule()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}