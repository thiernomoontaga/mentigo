import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { mockTeachers } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, 
  MapPin, 
  CheckCircle, 
  Calendar, 
  MessageSquare, 
  Clock, 
  Award,
  Languages,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeacherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const teacher = mockTeachers.find(t => t.id === id);

  if (!teacher) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <h1 className="text-2xl font-bold">Professeur non trouvé</h1>
          <Button variant="link" onClick={() => navigate('/search')}>
            Retour à la recherche
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="shadow-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="relative">
                        <Avatar className="w-32 h-32 ring-4 ring-primary/10">
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback className="text-2xl">
                            {teacher.firstName[0]}{teacher.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        {teacher.verified && (
                          <div className="absolute -bottom-2 -right-2 bg-accent rounded-full p-1">
                            <CheckCircle className="w-6 h-6 text-accent-foreground" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h1 className="text-2xl font-bold">
                              {teacher.firstName} {teacher.lastName}
                            </h1>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                              <MapPin className="w-4 h-4" />
                              <span>{teacher.location}</span>
                            </div>
                          </div>
                          {teacher.verified && (
                            <Badge variant="secondary" className="gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Vérifié
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
                            <span className="font-semibold">{teacher.rating}</span>
                            <span className="text-muted-foreground">
                              ({teacher.reviewCount} avis)
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Briefcase className="w-4 h-4" />
                            <span>{teacher.experience} ans d'expérience</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {teacher.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="shadow-card border-border/50">
                  <CardHeader>
                    <CardTitle>À propos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {teacher.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Formation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teacher.education.map((edu, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                            <Award className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{edu.degree}</h4>
                            <p className="text-sm text-muted-foreground">
                              {edu.institution} • {edu.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="shadow-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="w-5 h-5" />
                      Langues parlées
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {teacher.languages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="sticky top-24"
              >
                <Card className="shadow-card border-border/50">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-primary">{teacher.hourlyRate}€</div>
                      <div className="text-muted-foreground">par heure</div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <Button 
                        variant="gradient" 
                        className="w-full" 
                        size="lg"
                        onClick={() => navigate(`/booking/${teacher.id}`)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Réserver un cours
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        size="lg"
                        onClick={() => navigate(`/messages?teacher=${teacher.id}`)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Envoyer un message
                      </Button>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">Disponibilités</div>
                          <div className="text-sm text-muted-foreground">
                            {teacher.availability.join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">Premier cours gratuit</div>
                          <div className="text-sm text-muted-foreground">
                            30 minutes offertes
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
