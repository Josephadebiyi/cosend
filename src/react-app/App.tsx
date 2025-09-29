import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@getmocha/users-service/react';
import SplashPage from "@/react-app/pages/Splash";
import OnboardingPage from "@/react-app/pages/Onboarding";
import LoginPage from "@/react-app/pages/Login";
import HomePage from "@/react-app/pages/Home";
import AddPage from "@/react-app/pages/Add";
import ParcelsPage from "@/react-app/pages/Parcels";
import WalletPage from "@/react-app/pages/Wallet";
import ProfilePage from "@/react-app/pages/Profile";
import SearchPage from "@/react-app/pages/Search";
import TrackingPage from "@/react-app/pages/Tracking";
import KYCPage from "@/react-app/pages/KYC";
import SendingFlowPage from "@/react-app/pages/SendingFlow";
import TravelersPageComponent from "@/react-app/pages/TravelersPage";
import RidesListPage from "@/react-app/pages/RidesListPage";
import SupportPage from "@/react-app/pages/Support";
import PickupDetailsPage from "@/react-app/pages/PickupDetails";
import ParcelTrackingPage from "@/react-app/pages/ParcelTracking";
import CarryPackageListingsPage from "@/react-app/pages/CarryPackageListings";
import TermsAndConditionsPage from "@/react-app/pages/TermsAndConditions";
import CalculateShipmentPage from "@/react-app/pages/CalculateShipment";
import RideDetailsPage from "@/react-app/pages/RideDetails";
import ParcelsNewPage from "@/react-app/pages/ParcelsNew";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import ChatPage from "@/react-app/pages/Chat";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        
        <Route path="/tracking-new" element={<TrackingPage />} />
        <Route path="/parcels-new" element={<ParcelsNewPage />} />
        <Route path="/track" element={<TrackingPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/parcels" element={<ParcelsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/tracking-page" element={<TrackingPage />} />
        <Route path="/kyc" element={<KYCPage />} />
        <Route path="/sending" element={<SendingFlowPage />} />
        <Route path="/travelers" element={<TravelersPageComponent />} />
        <Route path="/rides" element={<RidesListPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/pickup-details/:requestId" element={<PickupDetailsPage />} />
        <Route path="/parcel-tracking/:parcelId" element={<ParcelTrackingPage />} />
        <Route path="/my-listings" element={<CarryPackageListingsPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/calculate-shipment" element={<CalculateShipmentPage />} />
        <Route path="/ride-details/:rideId" element={<RideDetailsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
