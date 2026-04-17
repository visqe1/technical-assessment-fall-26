import './Hero.css'

function Hero() {
    return (
        <section className="hero" id="overview">
            <div className="hero-glow"></div>
            <div className="hero-left">
                <div className="hero-eyebrow">
                    <div className="eyebrow-line"></div>
                    Formula 1 · Data Dashboard
                </div>
                <h1 className="hero-h1">
                    <span className="t-outline">Scuderia</span>
                    <span className="t-white">Ferrari</span>
                    <span className="t-red">By The Numbers.</span>
                </h1>
                <p className="hero-body">
                    Race results, constructor points, and season-by-season performance data for the most iconic team in Formula 1 history.
                </p>
                <div className="hero-stats">
                    <div className="hstat">
                        <div className="hn">16</div>
                        <div className="hl">Constructor Titles</div>
                    </div>
                    <div className="hstat">
                        <div className="hn">15</div>
                        <div className="hl">Driver Titles</div>
                    </div>
                    <div className="hstat">
                        <div className="hn">243</div>
                        <div className="hl">Race Wins</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero