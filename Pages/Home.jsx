
export function Home() {

    return (
        <section className="home container">
            <h1 >Welcome to Miss Books shop!</h1>
            <img src={`${process.env.PUBLIC_URL}/hero-img/reading.png`} alt="hero-image" />
        </section>
    )
}