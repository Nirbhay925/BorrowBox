
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase";
import Login from "./components/login";
import UserProfile from "./components/UserProfile";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const [requestedItems, setRequestedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);

  // Listen for login and logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      // Close the login screen after successful sign-in
      if (currentUser) {
        setShowLogin(false);
      }
    });

    return unsubscribe;
  }, []);

  // Fetch items from Firestore
  useEffect(() => {
    async function fetchItems() {
      try {
        const snapshot = await getDocs(collection(db, "items"));

        const itemsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(itemsList);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Could not load items. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  // Search and category filters
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const matchesAvailability =
      !availableOnly || item.status === "Available";

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAvailability
    );
  });

  // Handle the borrow button
  function handleBorrowClick(item) {
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (
      item.status !== "Available" ||
      requestedItems.includes(item.id)
    ) {
      return;
    }

    setRequestedItems((previousItems) => [
      ...previousItems,
      item.id,
    ]);
  }

  return (
    <div className="page-container">
     <header className="app-header">
        {/* style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      > */}
        <h1 className="title">BorrowBox</h1>

        <UserProfile
          user={user}
          onSignInClick={() => setShowLogin(true)}
        />
      </header>

      <p>Borrow things from students on your campus.</p>

      {authLoading ? (
        <p>Checking login status...</p>
      ) : user ? (
        <p>
          Welcome, {user.displayName || user.email || "Student"}!
        </p>
      ) : (
        <p>Browse items freely. Sign in when you're ready to borrow.</p>
      )}

      <input
        className="search-input"
        type="text"
        placeholder="Search for an item..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="category-filters">
        {["All", "Books", "Electronics", "Stationery"].map(
          (category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          )
        )}
      </div>

      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          margin: "12px 0",
        }}
      >
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(event) => setAvailableOnly(event.target.checked)}
        />
        Show available items only
      </label>

      {loading ? (
        <p>Loading items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredItems.length > 0 ? (
        <div className="items-grid">
          {filteredItems.map((item) => (
            <div className="item-card" key={item.id}>
              <h2>{item.name}</h2>
              <p>Owner: {item.owner}</p>
              <p>Status: {item.status}</p>

              <button
                className="borrow-button"
                onClick={() => handleBorrowClick(item)}
                disabled={
                  item.status !== "Available" ||
                  requestedItems.includes(item.id)
                }
              >
                {item.status !== "Available"
                  ? "Unavailable"
                  : requestedItems.includes(item.id)
                    ? "Request Sent!"
                    : "Request to Borrow"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No items found. Try another search!</p>
      )}

      {/* Login popup */}
      {showLogin && !user && (
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowLogin(false);
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              color: "#222",
              padding: "28px",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "420px",
              boxSizing: "border-box",
            }}
          >
            <button
              onClick={() => setShowLogin(false)}
              aria-label="Close login popup"
              style={{
                position: "absolute",
                top: "10px",
                right: "12px",
                border: "none",
                background: "transparent",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <Login />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
