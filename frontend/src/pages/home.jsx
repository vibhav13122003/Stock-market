import React from 'react';
import Navbar from "../components/Navbar";

const Home = () => {
    return (

        <div className="home-container">
            <Navbar />
            <main className="main-content">
                <section id="section1">
                    <h2>Section 1</h2>
                    <p>Content for section 1</p>
                </section>
                <section id="section2">
                    <h2>Section 2</h2>
                    <p>Content for section 2</p>
                </section>
                <section id="section3">
                    <h2>Section 3</h2>
                    <p>Content for section 3</p>
                </section>
            </main>
        </div>
    );
};

export default Home;