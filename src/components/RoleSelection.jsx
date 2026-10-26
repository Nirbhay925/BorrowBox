
function RoleSelection({ user, onSelectRole }) {
    return (
      <div className="role-page">
        <div className="role-header">
          <h1>BorrowBox</h1>
          <p>Your campus. Your community. Share more.</p>
        </div>
  
        <div className="role-content">
          <h2>What brings you here?</h2>
          <p>Choose how you'd like to use BorrowBox.</p>
  
          <div className="role-cards">
            <button
              className="role-card lender-card"
              onClick={() => onSelectRole("lender")}
            >
              <span className="role-icon">📦</span>
              <h3>I want to lend</h3>
              <p>
                List your books, calculators, and other items
                for students on your campus.
              </p>
              <span className="role-action">Start lending →</span>
            </button>
  
            <button
              className="role-card borrower-card"
              onClick={() => onSelectRole("borrower")}
            >
              <span className="role-icon">🔎</span>
              <h3>I want to borrow</h3>
              <p>
                Discover useful items listed by students
                and request what you need.
              </p>
              <span className="role-action">Explore items →</span>
            </button>
          </div>
  
          <p className="role-user">
            Signed in as {user?.displayName || user?.email || "Student"}
          </p>
        </div>
      </div>
    );
  }
  
  export default RoleSelection;
  