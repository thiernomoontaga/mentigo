import { useState, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { TeacherCard } from '@/components/cards/TeacherCard';
import { api } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Search as SearchIcon, SlidersHorizontal, MapPin, X, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import type { Teacher } from '@/services/types';

export default function Search() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [location, setLocation] = useState('');
  const [minRating, setMinRating] = useState(0);
  const { toast } = useToast();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teachersData, subjectsData] = await Promise.all([
          api.teachers.getAll(),
          api.search.getSubjects()
        ]);
        setTeachers(teachersData);
        setSubjects(subjectsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données. Veuillez réessayer.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const clearFilters = () => {
    setSelectedSubjects([]);
    setPriceRange([0, 100]);
    setLocation('');
    setMinRating(0);
    setSearchQuery('');
  };

  const filteredTeachers = useMemo(() => {
    if (!teachers.length) return [];

    return teachers.filter(teacher => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(query);
        const matchesSubject = teacher.subjects.some(s => s.toLowerCase().includes(query));
        if (!matchesName && !matchesSubject) return false;
      }

      // Subject filter
      if (selectedSubjects.length > 0) {
        const hasSubject = teacher.subjects.some(s => selectedSubjects.includes(s));
        if (!hasSubject) return false;
      }

      // Price filter
      if (teacher.hourlyRate < priceRange[0] || teacher.hourlyRate > priceRange[1]) {
        return false;
      }

      // Location filter
      if (location && !teacher.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      // Rating filter
      if (teacher.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [teachers, searchQuery, selectedSubjects, priceRange, location, minRating]);

  const hasActiveFilters = selectedSubjects.length > 0 || priceRange[0] > 0 || priceRange[1] < 100 || location || minRating > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2">Chargement des professeurs...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Trouver un professeur</h1>
            <p className="text-muted-foreground">
              {filteredTeachers.length} professeur{filteredTeachers.length > 1 ? 's' : ''} disponible{filteredTeachers.length > 1 ? 's' : ''}
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou matière..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Ville"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 w-full md:w-48"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtres
                  {hasActiveFilters && (
                    <Badge variant="default" className="ml-1 h-5 w-5 p-0 justify-center">
                      !
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Subject filter */}
                  <div className="space-y-3">
                    <Label>Matières</Label>
                    <div className="flex flex-wrap gap-2">
                      {subjects.slice(0, 12).map((subject) => (
                        <Badge
                          key={subject}
                          variant={selectedSubjects.includes(subject) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleSubject(subject)}
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Price range */}
                  <div className="space-y-3">
                    <Label>Tarif horaire</Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={100}
                      step={5}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€+</span>
                    </div>
                  </div>

                  {/* Rating filter */}
                  <div className="space-y-3">
                    <Label>Note minimum</Label>
                    <div className="flex gap-2">
                      {[0, 4, 4.5, 4.8].map((rating) => (
                        <Button
                          key={rating}
                          variant={minRating === rating ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setMinRating(rating)}
                        >
                          {rating === 0 ? 'Tous' : `${rating}+`}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Clear filters */}
                  {hasActiveFilters && (
                    <Button variant="outline" className="w-full" onClick={clearFilters}>
                      <X className="w-4 h-4 mr-2" />
                      Effacer les filtres
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active filters */}
          {(selectedSubjects.length > 0 || hasActiveFilters) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {selectedSubjects.map((subject) => (
                <Badge
                  key={subject}
                  variant="secondary"
                  className="gap-1 pr-1"
                >
                  {subject}
                  <button
                    onClick={() => toggleSubject(subject)}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Effacer tout
                </Button>
              )}
            </motion.div>
          )}

          {/* Results */}
          {filteredTeachers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher, index) => (
                <TeacherCard key={teacher.id} teacher={teacher} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aucun résultat</h3>
              <p className="text-muted-foreground mb-4">
                Essayez de modifier vos critères de recherche
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Effacer les filtres
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
