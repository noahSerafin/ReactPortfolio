import "./Home.scss";
import { NavLink} from "react-router-dom";
import React from "react";
//import gsap from "gsap";
//import CSSRulePlugin from "gsap/CSSRulePlugin";

const Home = () => {
    //gsap.registerPlugin(CSSRulePlugin);
    //const content = CSSRulePlugin.getRule('.content:before')
    /*ComponentDidMount() {
        const h1 = document.getElementById('home-h1')
        const p = document.getElementById('home-a')
        const tl = gsap.timeline()

        tl.from(content, { delay: .5, duration: 4, cssRule: {scaleX: 0}})
        tl.to(h1, {duration: 2, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', y: '30px' }, "-=3")
        tl.to(p, {duration: 4, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', y: '30px' }, "-=2")
    };*/

    return(
        <div className="home">
            <div className="fade1">
                <h1 id="home-h1">I am making websites in Bristol.</h1>
                <div className="content">                    
                    <NavLink id="home-a"className="fade2" to="/projects">See more
                    </NavLink>
                </div>            
            </div>            
        </div>
    )
}

export default Home;