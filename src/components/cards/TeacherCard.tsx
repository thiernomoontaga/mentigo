import { Teacher } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, CheckCircle, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface TeacherCardProps {
  teacher: Teacher;
  index?: number;
}

export function TeacherCard({ teacher, index = 0 }: TeacherCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden hover:shadow-hover transition-all duration-300 border-border/50">
        <CardContent className="p-6">
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-20 h-20 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                <AvatarImage src={teacher.avatar} alt={`${teacher.firstName} ${teacher.lastName}`} />
                <AvatarFallback>{teacher.firstName[0]}{teacher.lastName[0]}</AvatarFallback>
              </Avatar>
              {teacher.verified && (
                <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-0.5">
                  <CheckCircle className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-lg truncate">
                    {teacher.firstName} {teacher.lastName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{teacher.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{teacher.hourlyRate}€</div>
                  <div className="text-xs text-muted-foreground">/heure</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{teacher.rating}</span>
                <span className="text-muted-foreground text-sm">({teacher.reviewCount} avis)</span>
              </div>

              {/* Subjects */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {teacher.subjects.slice(0, 3).map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
                {teacher.subjects.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{teacher.subjects.length - 3}
                  </Badge>
                )}
              </div>

              {/* Bio excerpt */}
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {teacher.bio}
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/teacher/${teacher.id}`)}
                >
                  Voir le profil
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/messages?teacher=${teacher.id}`)}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Contacter
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
