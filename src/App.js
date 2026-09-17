import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">DINNER MEETS CINEMA</p>

        <h1>DineSync</h1>

        <p className="tagline">
          One click. One dinner. One movie. One less decision.
        </p>

        <button className="generate-button">
          Find My Night
        </button>
      </header>

      <main className="recommendations">
        <div className="card">
          <span className="card-label">DINNER</span>
          <h2>Your restaurant will appear here.</h2>
          <p>
            DineSync will search for a restaurant that matches your night.
          </p>
        </div>

        <div className="plus">+</div>

        <div className="card">
          <span className="card-label">MOVIE</span>
          <h2>Your movie will appear here.</h2>
          <p>
            DineSync will find a movie to complete the pairing.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
