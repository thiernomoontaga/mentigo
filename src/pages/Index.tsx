import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Search,
  Star,
  ArrowRight,
  Play,
  BookOpen,
  Users,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const Index = () => {
  const navigate = useNavigate();

  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
      alt: "Professeur enseignant en classe",
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      alt: "Étudiants travaillant ensemble",
    },
    {
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
      alt: "Salle de bibliothèque universitaire",
    },
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
      alt: "Cours en ligne avec tableau interactif",
    },
    {
      src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
      alt: "Étudiant souriant avec ses livres",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Simplifié et plus impactant */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-secondary/20">
        {/* Background subtle pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge variant="secondary" className="px-6 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  +10 000 professeurs vérifiés
                </Badge>
              </motion.div>

              {/* Main headline - Plus simple et direct */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-6"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Apprendre <span className="text-primary">n'a jamais</span><br />
                  été aussi simple
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Trouvez le professeur parfait pour vos besoins.
                  Cours particuliers en ligne, partout au Sénégal et en Afrique.
                </p>
              </motion.div>

              {/* CTA Buttons - Plus prominents et clairs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-8"
              >
                <Button
                  size="xl"
                  className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-300"
                  onClick={() => navigate('/onboarding/student')}
                >
                  <Search className="w-6 h-6 mr-3" />
                  Trouver mon professeur
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>

                <Button
                  size="xl"
                  variant="outline"
                  className="text-lg px-8 py-6 h-auto border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  onClick={() => navigate('/onboarding/teacher')}
                >
                  <Users className="w-6 h-6 mr-3" />
                  Devenir professeur
                </Button>
              </motion.div>

              {/* Trust indicators - Simplifiés */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap items-center justify-center gap-8 pt-12 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
                  <span className="font-semibold">4.8/5</span>
                  <span>sur +50 000 avis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>50 000+ élèves actifs</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>200 000+ cours donnés</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                className="w-full max-w-lg mx-auto"
              >
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works - Section améliorée avec contexte africain */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Votre parcours d'apprentissage simplifié
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment des milliers d'étudiants africains trouvent leur voie vers la réussite
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Explorez nos matières",
                description: "Du français au swahili, des mathématiques à la cuisine africaine, trouvez la matière parfaite pour votre développement personnel et professionnel.",
                icon: Search,
                highlight: "200+ matières disponibles"
              },
              {
                step: "02",
                title: "Rencontrez vos mentors",
                description: "Connectez-vous avec des professeurs passionnés issus des meilleures universités africaines, vérifiés et expérimentés dans leur domaine.",
                icon: Users,
                highlight: "Professeurs certifiés"
              },
              {
                step: "03",
                title: "Apprenez à votre rythme",
                description: "Cours adaptés à votre emploi du temps, en ligne ou en présentiel, avec un suivi personnalisé pour maximiser vos progrès.",
                icon: Play,
                highlight: "Flexible & personnalisé"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group relative"
              >
                {/* Background decoration */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-border/50 group-hover:shadow-xl transition-all duration-300">
                  {/* Step badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary text-2xl font-bold text-primary-foreground mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>

                  {/* Highlight badge */}
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                    {item.highlight}
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-base">
                    {item.description}
                  </p>

                  {/* Icon at bottom */}
                  <div className="mt-6 flex justify-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-8 px-8 py-4 bg-white rounded-2xl shadow-lg border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="font-medium text-sm">Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                  </div>
                  <span className="font-medium text-sm">Support 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="font-medium text-sm">Satisfaction garantie</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Final CTA - Plus engageant */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-primary-foreground"
          >
            <GraduationCap className="w-20 h-20 mx-auto mb-8 opacity-90" />

            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Prêt à transformer votre apprentissage ?
            </h2>

            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              Rejoignez des milliers d'étudiants qui ont trouvé leur professeur idéal sur Mentigo
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="xl"
                variant="secondary"
                className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-white/90 shadow-xl"
                onClick={() => navigate('/signup')}
              >
                Commencer gratuitement
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-lg opacity-75">
              <span>✓ Premier cours offert</span>
              <span>✓ Sans engagement</span>
              <span>✓ Paiement sécurisé</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer simplifié */}
      <footer className="py-12 bg-secondary/50 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">Mentigo</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Mentigo</span>
              <span>•</span>
              <span>Tous droits réservés</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
