export interface Translations {
  [key: string]: string;
}

export const translations = {
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.close': 'Close',
    'common.search': 'Search',
    'common.view_all': 'View All',
    'common.accept': 'Accept',
    'common.decline': 'Decline',
    
    // App
    'app.name': 'COSEND',
    'app.tagline': 'Connect with trusted travelers',
    
    // Navigation
    'nav.home': 'Home',
    'nav.tracking': 'Tracking',
    'nav.wallet': 'Wallet',
    'nav.profile': 'Profile',
    'nav.add': 'Add',
    
    // Home
    'home.good_morning': 'Good morning!',
    'home.good_afternoon': 'Good afternoon!',
    'home.good_evening': 'Good evening!',
    'home.search_placeholder': 'Search destinations or packages...',
    'home.send_package': 'Send Package',
    'home.carry_package': 'Carry a Package',
    'home.current_shipment': 'Current Shipment',
    'home.available_travelers': 'Available Travelers',
    'home.parcel_requests': 'Parcel Requests',
    'home.find_travelers': 'Find Travelers',
    'home.list_trip': 'List Trip',
    
    // Package sending
    'send.sending_type': 'Sending Type',
    'send.country_to_country': 'Country to Country',
    'send.city_to_city': 'City to City',
    'send.from_country': 'From Country',
    'send.to_country': 'To Country',
    'send.from_city': 'From City',
    'send.to_city': 'To City',
    'send.parcel_type': 'Parcel Type',
    'send.weight': 'Weight',
    'send.price_breakdown': 'Price Breakdown',
    'send.base_price': 'Base price',
    'send.service_fee': 'Service fee',
    'send.total': 'Total',
    
    // Profile
    'profile.title': 'Profile',
    'profile.verification_kyc': 'Verification & KYC',
    'profile.account_settings': 'Account Settings',
    'profile.language_region': 'Language & Region',
    'profile.referral_program': 'Referral Program',
    'profile.help_support': 'Help & Support',
    'profile.sign_out': 'Sign Out',
    'profile.packages_received': 'Packages Received',
    'profile.packages_sent': 'Packages Sent',
    'profile.kyc_verified': 'KYC Verified',
    'profile.edit_profile': 'Edit Profile',
    'profile.change_photo': 'Change Photo',
    'profile.full_name': 'Full Name',
    'profile.username': 'Username',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    
    // KYC
    'kyc.title': 'KYC Verification',
    'kyc.personal_info': 'Personal Information',
    'kyc.document_verification': 'Document Verification',
    'kyc.identity_confirmation': 'Identity Confirmation',
    'kyc.full_name': 'Full Name (as per ID document)',
    'kyc.date_of_birth': 'Date of Birth',
    'kyc.street_address': 'Street Address',
    'kyc.street_number': 'Street Number',
    'kyc.city': 'City',
    'kyc.postal_code': 'Postal Code',
    'kyc.country': 'Country',
    'kyc.phone_number': 'Phone Number',
    'kyc.id_type': 'ID Document Type',
    'kyc.passport': 'Passport',
    'kyc.national_id': 'National ID Card',
    'kyc.upload_document': 'Upload ID Document',
    'kyc.upload_selfie': 'Upload Selfie',
    
    // Support
    'support.title': 'Help & Support',
    'support.faq': 'FAQ',
    'support.contact': 'Contact',
    'support.contact_support': 'Contact Support',
    'support.email': 'Email',
    'support.subject': 'Subject',
    'support.message': 'Message',
    'support.send_message': 'Send Message',
    
    // Wallet
    'wallet.title': 'Wallet',
    'wallet.balance': 'Available Balance',
    'wallet.pending': 'Pending',
    'wallet.top_up': 'Top Up',
    'wallet.withdraw': 'Withdraw',
    'wallet.payment_methods': 'Payment Methods',
    'wallet.recent_transactions': 'Recent Transactions',
    'wallet.total_earnings': 'Total Earnings',
    'wallet.completed_trips': 'Completed Trips',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.mark_all_read': 'Mark all read',
    'notifications.no_notifications': 'No new notifications',
    'notifications.view_all': 'View All Notifications',
  },
  
  es: {
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.confirm': 'Confirmar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.submit': 'Enviar',
    'common.close': 'Cerrar',
    'common.search': 'Buscar',
    'common.view_all': 'Ver Todo',
    'common.accept': 'Aceptar',
    'common.decline': 'Rechazar',
    
    // App
    'app.name': 'COSEND',
    'app.tagline': 'Conecta con viajeros de confianza',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.tracking': 'Seguimiento',
    'nav.wallet': 'Billetera',
    'nav.profile': 'Perfil',
    'nav.add': 'Agregar',
    
    // Home
    'home.good_morning': '¡Buenos días!',
    'home.good_afternoon': '¡Buenas tardes!',
    'home.good_evening': '¡Buenas noches!',
    'home.search_placeholder': 'Buscar destinos o paquetes...',
    'home.send_package': 'Enviar Paquete',
    'home.carry_package': 'Llevar un Paquete',
    'home.current_shipment': 'Envío Actual',
    'home.available_travelers': 'Viajeros Disponibles',
    'home.parcel_requests': 'Solicitudes de Paquetes',
    'home.find_travelers': 'Buscar Viajeros',
    'home.list_trip': 'Publicar Viaje',
    
    // Profile
    'profile.title': 'Perfil',
    'profile.edit_profile': 'Editar Perfil',
    'profile.change_photo': 'Cambiar Foto',
    'profile.full_name': 'Nombre Completo',
    'profile.username': 'Nombre de Usuario',
    'profile.email': 'Correo',
    'profile.phone': 'Teléfono',
  },
  
  fr: {
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Enregistrer',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.confirm': 'Confirmer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.submit': 'Soumettre',
    'common.close': 'Fermer',
    'common.search': 'Rechercher',
    'common.view_all': 'Tout Voir',
    'common.accept': 'Accepter',
    'common.decline': 'Refuser',
    
    // App
    'app.name': 'COSEND',
    'app.tagline': 'Connectez-vous avec des voyageurs de confiance',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.tracking': 'Suivi',
    'nav.wallet': 'Portefeuille',
    'nav.profile': 'Profil',
    'nav.add': 'Ajouter',
    
    // Home
    'home.good_morning': 'Bonjour!',
    'home.good_afternoon': 'Bon après-midi!',
    'home.good_evening': 'Bonsoir!',
    'home.search_placeholder': 'Rechercher des destinations ou des colis...',
    'home.send_package': 'Envoyer un Colis',
    'home.carry_package': 'Porter un Colis',
    'home.current_shipment': 'Expédition Actuelle',
    'home.available_travelers': 'Voyageurs Disponibles',
    'home.parcel_requests': 'Demandes de Colis',
    'home.find_travelers': 'Trouver des Voyageurs',
    'home.list_trip': 'Publier un Voyage',
    
    // Profile
    'profile.title': 'Profil',
    'profile.edit_profile': 'Modifier le Profil',
    'profile.change_photo': 'Changer la Photo',
    'profile.full_name': 'Nom Complet',
    'profile.username': 'Nom d\'utilisateur',
    'profile.email': 'Email',
    'profile.phone': 'Téléphone',
  },
  
  de: {
    // Common
    'common.loading': 'Wird geladen...',
    'common.error': 'Fehler',
    'common.success': 'Erfolgreich',
    'common.cancel': 'Abbrechen',
    'common.save': 'Speichern',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.confirm': 'Bestätigen',
    'common.back': 'Zurück',
    'common.next': 'Weiter',
    'common.previous': 'Vorherig',
    'common.submit': 'Absenden',
    'common.close': 'Schließen',
    'common.search': 'Suchen',
    'common.view_all': 'Alle Anzeigen',
    'common.accept': 'Akzeptieren',
    'common.decline': 'Ablehnen',
    
    // App
    'app.name': 'COSEND',
    'app.tagline': 'Verbinden Sie sich mit vertrauenswürdigen Reisenden',
    
    // Navigation
    'nav.home': 'Startseite',
    'nav.tracking': 'Verfolgung',
    'nav.wallet': 'Geldbörse',
    'nav.profile': 'Profil',
    'nav.add': 'Hinzufügen',
    
    // Home
    'home.good_morning': 'Guten Morgen!',
    'home.good_afternoon': 'Guten Tag!',
    'home.good_evening': 'Guten Abend!',
    'home.search_placeholder': 'Ziele oder Pakete suchen...',
    'home.send_package': 'Paket Senden',
    'home.carry_package': 'Paket Mitnehmen',
    'home.current_shipment': 'Aktuelle Sendung',
    'home.available_travelers': 'Verfügbare Reisende',
    'home.parcel_requests': 'Paketanfragen',
    'home.find_travelers': 'Reisende Finden',
    'home.list_trip': 'Reise Eintragen',
    
    // Profile
    'profile.title': 'Profil',
    'profile.edit_profile': 'Profil Bearbeiten',
    'profile.change_photo': 'Foto Ändern',
    'profile.full_name': 'Vollständiger Name',
    'profile.username': 'Benutzername',
    'profile.email': 'E-Mail',
    'profile.phone': 'Telefon',
  },
  
  it: {
    // Common
    'common.loading': 'Caricamento...',
    'common.error': 'Errore',
    'common.success': 'Successo',
    'common.cancel': 'Annulla',
    'common.save': 'Salva',
    'common.edit': 'Modifica',
    'common.delete': 'Elimina',
    'common.confirm': 'Conferma',
    'common.back': 'Indietro',
    'common.next': 'Avanti',
    'common.previous': 'Precedente',
    'common.submit': 'Invia',
    'common.close': 'Chiudi',
    'common.search': 'Cerca',
    'common.view_all': 'Vedi Tutto',
    'common.accept': 'Accetta',
    'common.decline': 'Rifiuta',
    
    // App
    'app.name': 'COSEND',
    'app.tagline': 'Connettiti con viaggiatori affidabili',
    
    // Navigation
    'nav.home': 'Home',
    'nav.tracking': 'Tracciamento',
    'nav.wallet': 'Portafoglio',
    'nav.profile': 'Profilo',
    'nav.add': 'Aggiungi',
    
    // Home
    'home.good_morning': 'Buongiorno!',
    'home.good_afternoon': 'Buon pomeriggio!',
    'home.good_evening': 'Buonasera!',
    'home.search_placeholder': 'Cerca destinazioni o pacchi...',
    'home.send_package': 'Invia Pacco',
    'home.carry_package': 'Porta un Pacco',
    'home.current_shipment': 'Spedizione Corrente',
    'home.available_travelers': 'Viaggiatori Disponibili',
    'home.parcel_requests': 'Richieste di Pacchi',
    'home.find_travelers': 'Trova Viaggiatori',
    'home.list_trip': 'Pubblica Viaggio',
    
    // Profile
    'profile.title': 'Profilo',
    'profile.edit_profile': 'Modifica Profilo',
    'profile.change_photo': 'Cambia Foto',
    'profile.full_name': 'Nome Completo',
    'profile.username': 'Nome Utente',
    'profile.email': 'Email',
    'profile.phone': 'Telefono',
  },
  
  pt: {
    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.cancel': 'Cancelar',
    'common.save': 'Salvar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.confirm': 'Confirmar',
    'common.back': 'Voltar',
    'common.next': 'Próximo',
    'common.previous': 'Anterior',
    'common.submit': 'Enviar',
    'common.close': 'Fechar',
    'common.search': 'Pesquisar',
    'common.view_all': 'Ver Tudo',
    'common.accept': 'Aceitar',
    'common.decline': 'Recusar',
    
    // App
    'app.name': 'COSEND',
    'app.tagline': 'Conecte-se com viajantes confiáveis',
    
    // Navigation
    'nav.home': 'Início',
    'nav.tracking': 'Rastreamento',
    'nav.wallet': 'Carteira',
    'nav.profile': 'Perfil',
    'nav.add': 'Adicionar',
    
    // Home
    'home.good_morning': 'Bom dia!',
    'home.good_afternoon': 'Boa tarde!',
    'home.good_evening': 'Boa noite!',
    'home.search_placeholder': 'Pesquisar destinos ou pacotes...',
    'home.send_package': 'Enviar Pacote',
    'home.carry_package': 'Levar um Pacote',
    'home.current_shipment': 'Envio Atual',
    'home.available_travelers': 'Viajantes Disponíveis',
    'home.parcel_requests': 'Solicitações de Pacotes',
    'home.find_travelers': 'Encontrar Viajantes',
    'home.list_trip': 'Listar Viagem',
    
    // Profile
    'profile.title': 'Perfil',
    'profile.edit_profile': 'Editar Perfil',
    'profile.change_photo': 'Alterar Foto',
    'profile.full_name': 'Nome Completo',
    'profile.username': 'Nome de Usuário',
    'profile.email': 'Email',
    'profile.phone': 'Telefone',
  }
};

import { useState, useEffect } from 'react';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('app_language') || 'en';
  });
  
  const t = (key: string): string => {
    const languageTranslations = translations[currentLanguage as keyof typeof translations] as Record<string, string>;
    const enTranslations = translations.en as Record<string, string>;
    return languageTranslations?.[key] || enTranslations[key] || key;
  };
  
  const setLanguage = (language: string) => {
    localStorage.setItem('app_language', language);
    setCurrentLanguage(language);
    // Force re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
  };
  
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
  }, []);
  
  return { t, setLanguage, currentLanguage };
};
