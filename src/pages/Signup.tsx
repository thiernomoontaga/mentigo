import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { GraduationCap, BookOpen, User, ArrowRight, CheckCircle, Sparkles, Users as UsersIcon, Globe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') as UserRole;
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole || null);
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === 'teacher') {
      navigate('/onboarding/teacher');
    } else {
      navigate('/onboarding/student');
    }
  };

  const roles = [
    {
      id: 'student' as UserRole,
      icon: BookOpen,
      title: 'Je suis élève',
      subtitle: 'Apprendre & Progresser',
      description: 'Trouvez le professeur idéal pour atteindre vos objectifs éducatifs',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      features: [
        'Accès à des professeurs qualifiés',
        'Cours adaptés à votre niveau',
        'Suivi personnalisé de progrès',
        'Communauté d\'apprenants'
      ],
      emoji: '📚'
    },
    {
      id: 'teacher' as UserRole,
      icon: User,
      title: 'Je suis professeur',
      subtitle: 'Enseigner & Inspirer',
      description: 'Partagez votre savoir et contribuez à l\'éducation africaine',
      color: 'bg-slate-50 border-slate-200',
      iconColor: 'text-slate-600',
      features: [
        'Définissez vos propres tarifs',
        'Gérez votre emploi du temps',
        'Paiements sécurisés instantanés',
        'Outils pédagogiques avancés'
      ],
      emoji: '👨‍🏫'
    },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Subtle African-inspired background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-600 rounded-full"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 border-2 border-slate-600 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-blue-600 transform rotate-45"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-blue-600">Mentigo</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            >
              Bienvenue dans l'éducation africaine
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 max-w-xl mx-auto"
            >
              Choisissez votre chemin et rejoignez notre communauté d'apprenants et d'enseignants
            </motion.p>
          </motion.div>

          {/* Role Selection Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <button
                  onClick={() => handleRoleSelect(role.id)}
                  className={`w-full p-8 rounded-2xl border-2 text-left transition-all duration-300 ${
                    selectedRole === role.id
                      ? `${role.color} border-blue-600 shadow-lg`
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {/* Selection indicator */}
                  {selectedRole === role.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role.iconColor} bg-gray-100`}>
                        <role.icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl">{role.emoji}</div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {role.title}
                      </h3>
                      <p className="text-sm font-medium text-blue-600">
                        {role.subtitle}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {role.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <ul className="space-y-1">
                        {role.features.slice(0, 3).map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + featureIndex * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              <span className="text-xs text-gray-600">
                                {feature}
                              </span>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 ${
                  selectedRole
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleContinue}
                disabled={!selectedRole}
              >
                {selectedRole ? (
                  <div className="flex items-center gap-3">
                    Commencer
                    <ArrowRight className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <UsersIcon className="w-5 h-5" />
                    Choisissez votre rôle
                  </div>
                )}
              </Button>
            </motion.div>

            {!selectedRole && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500"
              >
                Sélectionnez un rôle pour continuer votre inscription
              </motion.p>
            )}

            {/* Login link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-6"
            >
              <p className="text-sm text-gray-600">
                Déjà membre de la communauté ?{' '}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
