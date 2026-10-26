
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function UserProfile({ user, onSignInClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) {
    return (
      <button
        className="profile-signin-button"
        onClick={onSignInClick}
      >
        <span className="profile-avatar">👤</span>
        Sign in
      </button>
    );
  }

  const displayName = user.displayName || "Student";
  const email = user.email || user.phoneNumber || "";

  return (
    <div className="user-profile">
      <button
        className="profile-trigger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
      >
        {user.photoURL ? (
          <img
            className="profile-avatar"
            src={user.photoURL}
            alt="Profile"
          />
        ) : (
          <span className="profile-avatar">
            {displayName.charAt(0).toUpperCase()}
          </span>
        )}

        <span className="profile-details">
          <strong>{displayName}</strong>
          <span className="profile-status">Signed in</span>
        </span>

        <span aria-hidden="true">⌄</span>
      </button>

      {menuOpen && (
        <div className="profile-menu">
          <p className="profile-email">{email}</p>

          <button
            className="profile-logout-button"
            onClick={async () => {
              try {
                await signOut(auth);
                setMenuOpen(false);
              } catch (error) {
                console.error("Sign-out failed:", error);
              }
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
