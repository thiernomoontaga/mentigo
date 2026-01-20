import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { mockSessions } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Video, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isAfter, isBefore } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Sessions() {
  const upcomingSessions = mockSessions.filter(s => s.status === 'scheduled' && isAfter(s.date, new Date()));
  const pastSessions = mockSessions.filter(s => s.status === 'completed' || isBefore(s.date, new Date()));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="default">Prévu</Badge>;
      case 'completed':
        return <Badge variant="secondary">Terminé</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Mes cours</h1>
            <p className="text-muted-foreground">
              Gérez vos sessions de cours et visioconférences
            </p>
          </motion.div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar className="w-4 h-4" />
                À venir ({upcomingSessions.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="gap-2">
                <Clock className="w-4 h-4" />
                Historique ({pastSessions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="shadow-card border-border/50 hover:shadow-hover transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
                              <div className="text-center">
                                <div className="text-lg font-bold">
                                  {format(session.date, 'd')}
                                </div>
                                <div className="text-xs uppercase">
                                  {format(session.date, 'MMM', { locale: fr })}
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{session.subject}</h3>
                              <p className="text-muted-foreground">
                                avec {session.teacherName}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {format(session.date, 'HH:mm')} • {session.duration} min
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {getStatusBadge(session.status)}
                            <Button variant="gradient">
                              <Video className="w-4 h-4 mr-2" />
                              Rejoindre
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card className="shadow-card border-border/50">
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucun cours prévu</h3>
                    <p className="text-muted-foreground mb-4">
                      Vous n'avez pas de cours programmé pour le moment
                    </p>
                    <Button variant="gradient">
                      Trouver un professeur
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastSessions.length > 0 ? (
                pastSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="shadow-card border-border/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
                              <div className="text-center">
                                <div className="text-lg font-bold">
                                  {format(session.date, 'd')}
                                </div>
                                <div className="text-xs uppercase">
                                  {format(session.date, 'MMM', { locale: fr })}
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{session.subject}</h3>
                              <p className="text-muted-foreground">
                                avec {session.teacherName}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span>{session.duration} min</span>
                                <span>{session.price}€</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {getStatusBadge(session.status)}
                            <Button variant="outline" size="sm">
                              <Star className="w-4 h-4 mr-2" />
                              Noter
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card className="shadow-card border-border/50">
                  <CardContent className="p-12 text-center">
                    <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucun historique</h3>
                    <p className="text-muted-foreground">
                      Vous n'avez pas encore suivi de cours
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
