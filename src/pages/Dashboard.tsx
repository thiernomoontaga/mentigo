import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { mockSessions, mockConversations, mockTeachers } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Star, 
  Clock, 
  TrendingUp,
  Users,
  CreditCard,
  Settings,
  ChevronRight,
  Video
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { format, isAfter } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isTeacher = user?.role === 'teacher';

  const upcomingSessions = mockSessions.filter(
    s => s.status === 'scheduled' && isAfter(s.date, new Date())
  ).slice(0, 3);

  const stats = isTeacher
    ? [
        { label: 'Élèves actifs', value: '24', icon: Users, color: 'text-primary' },
        { label: 'Cours ce mois', value: '18', icon: BookOpen, color: 'text-accent' },
        { label: 'Note moyenne', value: '4.9', icon: Star, color: 'text-blue-500' },
        { label: 'Revenus', value: '1,240€', icon: CreditCard, color: 'text-blue-600' },
      ]
    : [
        { label: 'Cours suivis', value: '12', icon: BookOpen, color: 'text-primary' },
        { label: 'Heures totales', value: '18h', icon: Clock, color: 'text-accent' },
        { label: 'Profs favoris', value: '4', icon: Star, color: 'text-blue-500' },
        { label: 'Progression', value: '78%', icon: TrendingUp, color: 'text-blue-600' },
      ];

  const quickActions = isTeacher
    ? [
        { label: 'Gérer le profil', icon: Settings, path: '/profile' },
        { label: 'Voir les messages', icon: MessageSquare, path: '/messages' },
        { label: 'Calendrier', icon: Calendar, path: '/sessions' },
      ]
    : [
        { label: 'Trouver un prof', icon: Users, path: '/search' },
        { label: 'Voir les messages', icon: MessageSquare, path: '/messages' },
        { label: 'Mes cours', icon: Calendar, path: '/sessions' },
      ];

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
              Bonjour, {user?.firstName || 'Utilisateur'} 👋
            </h1>
            <p className="text-muted-foreground">
              {isTeacher
                ? 'Voici un aperçu de votre activité d\'enseignement'
                : 'Voici un aperçu de votre progression d\'apprentissage'}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
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

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Sessions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-card border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Prochains cours</CardTitle>
                      <CardDescription>Vos sessions à venir</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/sessions')}>
                      Voir tout
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {upcomingSessions.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingSessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
                                <div className="text-center">
                                  <div className="text-sm font-bold">
                                    {format(session.date, 'd')}
                                  </div>
                                  <div className="text-[10px] uppercase">
                                    {format(session.date, 'MMM', { locale: fr })}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium">{session.subject}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {isTeacher ? session.studentName : session.teacherName} • {format(session.date, 'HH:mm')}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Video className="w-4 h-4 mr-2" />
                              Rejoindre
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Aucun cours prévu</p>
                        {!isTeacher && (
                          <Button variant="link" onClick={() => navigate('/search')}>
                            Trouver un professeur
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Messages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="shadow-card border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Messages récents</CardTitle>
                      <CardDescription>Vos dernières conversations</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/messages')}>
                      Voir tout
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockConversations.slice(0, 3).map((conversation) => (
                        <div
                          key={conversation.id}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
                          onClick={() => navigate('/messages')}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={conversation.participantAvatar} />
                              <AvatarFallback>
                                {conversation.participantName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-sm">{conversation.participantName}</h4>
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {conversation.lastMessage}
                              </p>
                            </div>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="shadow-card border-border/50">
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickActions.map((action) => (
                      <Button
                        key={action.label}
                        variant="ghost"
                        className="w-full justify-between"
                        onClick={() => navigate(action.path)}
                      >
                        <div className="flex items-center gap-3">
                          <action.icon className="w-4 h-4" />
                          {action.label}
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Progress / Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="shadow-card border-border/50">
                  <CardHeader>
                    <CardTitle>
                      {isTeacher ? 'Performance' : 'Progression'}
                    </CardTitle>
                    <CardDescription>
                      {isTeacher ? 'Ce mois-ci' : 'Votre avancement'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Mathématiques</span>
                        <span className="text-muted-foreground">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Anglais</span>
                        <span className="text-muted-foreground">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Informatique</span>
                        <span className="text-muted-foreground">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recommended Teachers (for students) */}
              {!isTeacher && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="shadow-card border-border/50">
                    <CardHeader>
                      <CardTitle>Professeurs recommandés</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {mockTeachers.slice(0, 3).map((teacher) => (
                        <div
                          key={teacher.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                          onClick={() => navigate(`/teacher/${teacher.id}`)}
                        >
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={teacher.avatar} />
                            <AvatarFallback>
                              {teacher.firstName[0]}{teacher.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {teacher.firstName} {teacher.lastName}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {teacher.subjects[0]}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-3 h-3 fill-blue-400 text-blue-400" />
                            {teacher.rating}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
