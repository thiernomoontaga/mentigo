import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Mail, Lock, Loader2, Sparkles, ArrowRight, Eye, EyeOff, Globe, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Connexion réussie ! 🎉",
        description: "Bienvenue dans la communauté Mentigo !",
      });
      navigate('/home'); // Redirection automatique vers le bon dashboard
    } catch (error) {
      toast({
        title: "Oops !",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"
        />
      </div>

      <div className="min-h-screen flex">
        {/* Left side - Branding & Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12"
        >
          <div className="max-w-md text-center space-y-8">
            {/* Logo with animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-2xl"
              >
                <GraduationCap className="w-9 h-9 text-primary-foreground" />
              </motion.div>
              <span className="text-4xl font-bold text-primary">Mentigo</span>
            </motion.div>

            {/* Hero content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Bon retour parmi nous ! <span className="text-primary">👋</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Continuez votre parcours d'excellence avec les meilleurs professeurs d'Afrique
              </p>
            </motion.div>

            {/* Features highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-4 pt-8"
            >
              {[
                { icon: Globe, text: "Universités africaines", subtitle: "Excellence locale" },
                { icon: Users, text: "Professeurs certifiés", subtitle: "Experts qualifiés" },
                { icon: Shield, text: "Paiement sécurisé", subtitle: "Mobile Money inclus" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <item.icon className="w-8 h-8 text-primary" />
                  <span className="text-sm font-semibold text-center">{item.text}</span>
                  <span className="text-xs text-muted-foreground text-center">{item.subtitle}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8 border-t border-border/50"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Professeurs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Étudiants</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">200K+</div>
                  <div className="text-sm text-muted-foreground">Cours donnés</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex items-center justify-center p-6 lg:p-12"
        >
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:hidden flex items-center justify-center gap-3 mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg"
              >
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="text-2xl font-bold text-primary">Mentigo</span>
            </motion.div>

            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card rounded-2xl border border-border shadow-xl p-8"
            >
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold">Se connecter</h2>
                <p className="text-muted-foreground">Accédez à votre espace personnel</p>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="space-y-3"
                  whileFocus={{ scale: 1.02 }}
                >
                  <Label htmlFor="email" className="text-base font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 text-base border-2 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-3"
                  whileFocus={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-base font-medium">Mot de passe</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                      Oublié ?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-14 text-base border-2 focus:border-primary transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Connexion en cours...
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ x: 2 }}
                      >
                        Se connecter
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              {/* Divider */}
              <motion.div
                className="relative my-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-4 text-muted-foreground">Pas encore membre ?</span>
                </div>
              </motion.div>

              {/* Sign up link */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors text-lg"
                >
                  Créer un compte gratuit
                  <Sparkles className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
