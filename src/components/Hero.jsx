import './Hero.css'

function Hero() {
    return (
        <section className="hero" id="overview">
            <div className="streaks-container">
                <div className="streak s1"></div>
                <div className="streak s2"></div>
                <div className="streak s3"></div>
                <div className="streak s4"></div>
                <div className="streak s5"></div>
                <div className="streak s6"></div>
                <div className="streak s7"></div>
            </div>
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
            <div className="hero-right">
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/ferrariclip.mp4" type="video/mp4" />
                </video>
            </div>
        </section>
    )
}

export default Hero