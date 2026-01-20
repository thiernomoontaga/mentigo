import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from '@/components/ui/carousel';
import { useAuth } from '@/contexts/AuthContext';
import { subjects } from '@/lib/mockData';
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  User,
  MapPin,
  BookOpen,
  Award,
  FileText,
  Calendar,
  CreditCard,
  CheckCircle,
  Upload,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, title: 'Informations', icon: User },
  { id: 2, title: 'Localisation', icon: MapPin },
  { id: 3, title: 'Matières', icon: BookOpen },
  { id: 4, title: 'Parcours', icon: Award },
  { id: 5, title: 'Bio', icon: FileText },
  { id: 6, title: 'Disponibilités', icon: Calendar },
  { id: 7, title: 'Tarification', icon: CreditCard },
  { id: 8, title: 'Confirmation', icon: CheckCircle },
];

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export default function TeacherOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [api, setApi] = useState<CarouselApi>();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    country: 'France',
    address: '',
    selectedSubjects: [] as string[],
    education: '',
    experience: '',
    bio: '',
    availability: [] as string[],
    hourlyRate: '',
    paymentMethod: '',
  });
  const navigate = useNavigate();
  const { signup, updateUser } = useAuth();
  const { toast } = useToast();

  const progress = (currentStep / steps.length) * 100;

  // Sync carousel with current step
  const scrollToStep = (step: number) => {
    if (api) {
      api.scrollTo(step - 1);
    }
  };

  // Handle carousel changes
  const handleCarouselSelect = () => {
    if (api) {
      const newStep = api.selectedScrollSnap() + 1;
      setCurrentStep(newStep);
    }
  };

  // Initialize carousel API
  const setCarouselApi = (carouselApi: CarouselApi) => {
    setApi(carouselApi);
    carouselApi.on('select', handleCarouselSelect);
  };

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(subject)
        ? prev.selectedSubjects.filter(s => s !== subject)
        : [...prev.selectedSubjects, subject]
    }));
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollToStep(nextStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollToStep(prevStep);
    }
  };

  const handleSubmit = async () => {
    try {
      await signup(formData.email, formData.password, 'teacher');
      updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      toast({
        title: "Profil créé !",
        description: "Bienvenue sur Mentigo, votre profil est maintenant actif.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du profil.",
        variant: "destructive",
      });
    }
  };

  const renderStepForCarousel = (stepId: number) => {
    switch (stepId) {
      case 1:
        return (
          <div className="space-y-6 flex-1">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold">Informations personnelles</h3>
              <p className="text-muted-foreground">Commençons par vos coordonnées</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Votre prénom"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Votre nom"
                  className="h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="votre@email.com"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="+221 77 123 45 67"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                placeholder="••••••••"
                className="h-12"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => updateFormData('country', e.target.value)}
                placeholder="France"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                placeholder="Paris"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse (optionnel)</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="123 rue de la Paix"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sélectionnez les matières que vous souhaitez enseigner
            </p>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Badge
                  key={subject}
                  variant={formData.selectedSubjects.includes(subject) ? 'default' : 'outline'}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => toggleSubject(subject)}
                >
                  {subject}
                </Badge>
              ))}
            </div>
            {formData.selectedSubjects.length > 0 && (
              <p className="text-sm text-primary">
                {formData.selectedSubjects.length} matière(s) sélectionnée(s)
              </p>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="education">Formation / Diplômes</Label>
              <Textarea
                id="education"
                value={formData.education}
                onChange={(e) => updateFormData('education', e.target.value)}
                placeholder="Ex: Master en Mathématiques, Sorbonne (2020)&#10;Licence en Physique, Paris-Saclay (2018)"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Justificatifs (optionnel)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Glissez vos diplômes ici ou cliquez pour parcourir
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Expériences</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => updateFormData('experience', e.target.value)}
                placeholder="Ex: 5 ans d'expérience en tant que professeur particulier&#10;2 ans en lycée privé"
                rows={4}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Biographie</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                placeholder="Présentez-vous aux élèves. Parlez de votre méthode d'enseignement, de votre passion pour la matière, et de ce qui vous rend unique..."
                rows={8}
              />
              <p className="text-xs text-muted-foreground">
                {formData.bio.length}/500 caractères
              </p>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sélectionnez vos jours de disponibilité
            </p>
            <div className="grid grid-cols-2 gap-3">
              {days.map((day) => (
                <div
                  key={day}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.availability.includes(day)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => toggleDay(day)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={formData.availability.includes(day)} />
                    <span className="font-medium">{day}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Tarif horaire (€)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => updateFormData('hourlyRate', e.target.value)}
                placeholder="35"
              />
              <p className="text-xs text-muted-foreground">
                Tarif moyen sur la plateforme : 25-45€/heure
              </p>
            </div>
            <div className="space-y-2">
              <Label>Mode de paiement préféré</Label>
              <div className="grid grid-cols-2 gap-3">
                {['Virement', 'PayPal', 'Stripe', 'Espèces'].map((method) => (
                  <div
                    key={method}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      formData.paymentMethod === method
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => updateFormData('paymentMethod', method)}
                  >
                    <span className="font-medium">{method}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6 flex-1 flex flex-col">
            <div className="text-center flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Votre profil est prêt !</h3>
              <p className="text-muted-foreground mb-6">Vérifiez vos informations avant de continuer</p>
            </div>

            <div className="space-y-4 bg-secondary/50 rounded-xl p-6 flex-1">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Nom complet</span>
                <span className="font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Localisation</span>
                <span className="font-medium">{formData.city}, {formData.country}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Matières</span>
                <span className="font-medium">{formData.selectedSubjects.length} matière(s)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tarif horaire</span>
                <span className="font-medium">{formData.hourlyRate}€/heure</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Disponibilités</span>
                <span className="font-medium">{formData.availability.length} jour(s)</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">Mentigo</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Étape {currentStep} sur {steps.length}
              </span>
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                Quitter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left side - Progress and Steps */}
        <div className="hidden lg:flex lg:w-1/3 relative bg-secondary/20">
          <div className="flex flex-col justify-center items-center p-12 w-full">
            {/* Progress Section */}
            <div className="w-full max-w-sm space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Votre progression</h3>
                <div className="w-full bg-secondary rounded-full h-3 mb-2">
                  <motion.div
                    className="bg-primary h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{Math.round(progress)}% terminé</p>
              </div>

              {/* Steps indicator */}
              <div className="space-y-3">
                {steps.map((step) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: step.id * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      step.id <= currentStep ? 'bg-primary/10 border-l-4 border-primary' : 'bg-secondary/50'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.id < currentStep
                          ? 'bg-primary text-primary-foreground'
                          : step.id === currentStep
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                      {step.id === currentStep && (
                        <p className="text-xs text-primary">En cours</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Encouragement */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20"
              >
                <p className="text-sm font-medium text-primary">
                  "Partagez votre savoir, transformez des vies"
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right side - Carousel Form */}
        <div className="flex-1 flex flex-col p-6 lg:p-12">
          {/* Mobile Progress */}
          <div className="lg:hidden mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Étape {currentStep} sur {steps.length}</span>
              <span className="text-sm text-muted-foreground">{steps[currentStep - 1].title}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Carousel Container */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <Carousel
                setApi={setCarouselApi}
                className="w-full"
                opts={{
                  align: "start",
                  loop: false,
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {steps.map((step) => (
                    <CarouselItem key={step.id} className="pl-2 md:pl-4">
                      <Card className="shadow-xl border-border/50 min-h-[500px]">
                        <CardContent className="p-8 h-full flex flex-col">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={step.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="flex-1 flex flex-col space-y-6"
                            >
                              {renderStepForCarousel(step.id)}
                            </motion.div>
                          </AnimatePresence>

                          {/* Navigation Buttons */}
                          <div className="flex gap-3 mt-8">
                            {step.id > 1 && (
                              <Button
                                variant="outline"
                                onClick={handleBack}
                                className="flex-1 h-12"
                              >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Retour
                              </Button>
                            )}
                            {step.id < steps.length ? (
                              <Button
                                onClick={handleNext}
                                className="flex-1 h-12 bg-primary hover:bg-primary/90"
                              >
                                Continuer
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            ) : (
                              <Button
                                onClick={handleSubmit}
                                className="flex-1 h-12 bg-primary hover:bg-primary/90"
                              >
                                Créer mon profil
                                <CheckCircle className="w-4 h-4 ml-2" />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom Navigation */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <CarouselPrevious className="relative static translate-y-0 bg-secondary hover:bg-secondary/80 border-border">
                    <ChevronLeft className="w-4 h-4" />
                  </CarouselPrevious>

                  {/* Step Dots */}
                  <div className="flex gap-2">
                    {steps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentStep(index + 1);
                          scrollToStep(index + 1);
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index + 1 === currentStep
                            ? 'bg-primary scale-125'
                            : index + 1 < currentStep
                            ? 'bg-primary/60'
                            : 'bg-secondary'
                        }`}
                      />
                    ))}
                  </div>

                  <CarouselNext className="relative static translate-y-0 bg-secondary hover:bg-secondary/80 border-border">
                    <ChevronRight className="w-4 h-4" />
                  </CarouselNext>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
