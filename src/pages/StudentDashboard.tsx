import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  MessageSquare,
  Users,
  BookOpen,
  Star,
  Clock,
  TrendingUp,
  Award,
  Search,
  User,
  Target,
  BarChart3,
  Plus,
  Video,
  CheckCircle,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isAfter } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - à remplacer par des appels API réels
  const studentStats = {
    totalSessions: 12,
    hoursLearned: 18,
    favoriteTeachers: 4,
    progressScore: 78,
    completedCourses: 8,
    upcomingSessions: 3
  };

  const upcomingSessions = [
    {
      id: '1',
      teacherName: 'Aminata Diop',
      teacherAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      subject: 'Mathématiques',
      date: new Date('2024-12-15T14:00:00'),
      duration: 60,
      status: 'scheduled'
    },
    {
      id: '2',
      teacherName: 'Mamadou Ba',
      teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      subject: 'Informatique',
      date: new Date('2024-12-16T16:00:00'),
      duration: 90,
      status: 'scheduled'
    }
  ];

  const myTeachers = [
    {
      id: '1',
      name: 'Aminata Diop',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      subject: 'Mathématiques',
      rating: 4.9,
      sessionsCount: 8,
      lastSession: new Date('2024-12-10T14:00:00'),
      nextSession: new Date('2024-12-15T14:00:00'),
      status: 'active'
    },
    {
      id: '2',
      name: 'Mamadou Ba',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      subject: 'Informatique',
      rating: 4.8,
      sessionsCount: 5,
      lastSession: new Date('2024-12-08T16:00:00'),
      nextSession: new Date('2024-12-16T16:00:00'),
      status: 'active'
    },
    {
      id: '3',
      name: 'Fatou Ndiaye',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      subject: 'Anglais',
      rating: 4.7,
      sessionsCount: 3,
      lastSession: new Date('2024-12-05T10:00:00'),
      nextSession: null,
      status: 'active'
    }
  ];

  const progressData = [
    {
      subject: 'Mathématiques',
      progress: 78,
      completedLessons: 12,
      totalLessons: 15,
      nextGoal: 'Équations différentielles'
    },
    {
      subject: 'Informatique',
      progress: 65,
      completedLessons: 8,
      totalLessons: 12,
      nextGoal: 'Programmation orientée objet'
    },
    {
      subject: 'Anglais',
      progress: 45,
      completedLessons: 6,
      totalLessons: 10,
      nextGoal: 'Grammaire avancée'
    }
  ];

  const menuItems = [
    { id: 'overview', label: 'Aperçu', icon: BarChart3 },
    { id: 'courses', label: 'Mes Cours', icon: Calendar },
    { id: 'teachers', label: 'Mes Profs', icon: Users },
    { id: 'search', label: 'Trouver Prof', icon: Search },
    { id: 'progress', label: 'Progression', icon: Target },
    { id: 'messages', label: 'Messages', icon: MessageSquare }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Cours suivis', value: studentStats.totalSessions, icon: BookOpen, color: 'text-primary' },
          { label: 'Heures apprises', value: `${studentStats.hoursLearned}h`, icon: Clock, color: 'text-accent' },
          { label: 'Profs favoris', value: studentStats.favoriteTeachers, icon: Star, color: 'text-blue-500' },
          { label: 'Progression', value: `${studentStats.progressScore}%`, icon: TrendingUp, color: 'text-blue-600' },
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
            <Button className="h-auto p-4 flex flex-col gap-2" variant="outline" onClick={() => setActiveTab('search')}>
              <Search className="w-6 h-6" />
              <span className="text-sm">Trouver un prof</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col gap-2" variant="outline" onClick={() => setActiveTab('courses')}>
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Voir mes cours</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col gap-2" variant="outline" onClick={() => setActiveTab('progress')}>
              <Target className="w-6 h-6" />
              <span className="text-sm">Ma progression</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Récentes Réalisations</CardTitle>
          <CardDescription>Vos derniers succès d'apprentissage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-sm">Chapitre "Équations" terminé</p>
                <p className="text-xs text-muted-foreground">Mathématiques • Il y a 2 jours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <Award className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-sm">5 cours d'affilée avec Aminata</p>
                <p className="text-xs text-muted-foreground">Série maintenue • Félicitations !</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Cours</h2>
        <Button onClick={() => setActiveTab('search')}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Cours
        </Button>
      </div>

      {/* Upcoming Sessions */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Cours à venir</CardTitle>
          <CardDescription>Vos prochaines sessions de cours</CardDescription>
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
                    <AvatarImage src={session.teacherAvatar} />
                    <AvatarFallback>{session.teacherName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{session.teacherName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {session.subject} • {format(session.date, 'dd MMM yyyy à HH:mm', { locale: fr })} • {session.duration}min
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Rejoindre
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contacter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Sessions */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Cours passés</CardTitle>
          <CardDescription>Historique de vos sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Mathématiques - Aminata Diop</p>
                  <p className="text-xs text-muted-foreground">10 déc. 2024 • 60 min • Note: 5/5</p>
                </div>
              </div>
              <Badge variant="secondary">Terminé</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" />
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Informatique - Mamadou Ba</p>
                  <p className="text-xs text-muted-foreground">8 déc. 2024 • 90 min • Note: 4.5/5</p>
                </div>
              </div>
              <Badge variant="secondary">Terminé</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTeachers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Professeurs</h2>
        <Button onClick={() => setActiveTab('search')}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Prof
        </Button>
      </div>

      <div className="grid gap-4">
        {myTeachers.map((teacher) => (
          <Card key={teacher.id} className="shadow-card border-border/50 hover:shadow-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={teacher.avatar} />
                    <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {teacher.sessionsCount} cours
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Prochain: {teacher.nextSession ? format(teacher.nextSession, 'dd MMM', { locale: fr }) : 'À programmer'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{teacher.rating}</span>
                  </div>
                  <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                    {teacher.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contacter
                </Button>
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
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

  const renderSearch = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Trouver un Professeur</h2>
        <p className="text-muted-foreground mb-6">
          Découvrez de nouveaux professeurs adaptés à vos besoins d'apprentissage
        </p>
        <Button size="lg" onClick={() => navigate('/search')}>
          <Search className="w-5 h-5 mr-2" />
          Explorer les Professeurs
        </Button>
      </div>

      {/* Quick Search Categories */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Recherche Rapide</CardTitle>
          <CardDescription>Par matière ou niveau</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Mathématiques', 'Informatique', 'Anglais', 'Physique'].map((subject) => (
              <Button key={subject} variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <BookOpen className="w-6 h-6" />
                <span className="text-sm">{subject}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ma Progression</h2>
        <Button variant="outline">
          <BarChart3 className="w-4 h-4 mr-2" />
          Rapport détaillé
        </Button>
      </div>

      {/* Overall Progress */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Progression Globale</CardTitle>
          <CardDescription>Votre avancement général dans l'apprentissage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-6xl font-bold text-primary mb-2">{studentStats.progressScore}%</div>
            <Progress value={studentStats.progressScore} className="h-3 mb-4" />
            <p className="text-muted-foreground">
              {studentStats.completedCourses} cours terminés sur {studentStats.totalSessions} sessions
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Subject Progress */}
      <div className="grid gap-4">
        {progressData.map((subject) => (
          <Card key={subject.subject} className="shadow-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{subject.subject}</h3>
                <span className="text-2xl font-bold text-primary">{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="h-2 mb-3" />
              <div className="flex justify-between text-sm text-muted-foreground mb-3">
                <span>{subject.completedLessons}/{subject.totalLessons} leçons</span>
                <span>Prochaine étape: {subject.nextGoal}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Continuer l'apprentissage
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Goals */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Objectifs d'Apprentissage</CardTitle>
          <CardDescription>Vos prochains challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <Target className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-sm">Maîtriser les équations différentielles</p>
                <p className="text-xs text-muted-foreground">Mathématiques • 2 semaines restantes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <Target className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-sm">Créer une application web complète</p>
                <p className="text-xs text-muted-foreground">Informatique • 1 mois restant</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Badge variant="secondary">2 non lus</Badge>
      </div>

      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Messagerie avec vos Professeurs</CardTitle>
          <CardDescription>Communiquez directement avec vos enseignants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Messagerie Instantanée</h3>
            <p className="text-muted-foreground mb-4">
              Échangez avec vos professeurs en temps réel
            </p>
            <Button>
              Ouvrir la messagerie
            </Button>
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
              Continuez votre parcours d'apprentissage avec nos meilleurs professeurs
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

            <TabsContent value="teachers" className="space-y-6">
              {renderTeachers()}
            </TabsContent>

            <TabsContent value="search" className="space-y-6">
              {renderSearch()}
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              {renderProgress()}
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              {renderMessages()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}