
const carousel = {
    item: [
      {
        copy: `
          TURN A METAVERSE <br />
          INTO A VIRTUAL DINING <br />
          EXPERIENCE THAT CREATES <br />
          A NEW REVENUE STREAM.
        `,
        imageURL: "",
        videoURL: ""
      },
      {
        copy: `
          TURN AR <br/>
          INTO AN EXPERIENCE <br />
          THAT CHANGES SOCIETY.
        `,
        imageURL: "",
        videoURL: ""
      }
    
    ]
  }



import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger, SplitText);



export default function Slider(props) {

    const sliderRef = useRef()

    useLayoutEffect(() => {
        // a gsap.context() lets us use scoped selector text and makes cleanup way easier. See https://greensock.com/docs/v3/GSAP/gsap.context()

        if (!props.isLoading) {
            let ctx = gsap.context(() => {

                let split = SplitText.create("h2", { type: ["lines", "words"] });

                console.log(split, sliderRef.current)

                const tl = new gsap.timeline({
                    scrollTrigger: sliderRef.current,
                    delay: 0.6
                })
                .from(split.words, { // <- selector text, scoped to this component!
                    y: 60,
                    ease: Power2.easeInOut,
                    duration: 0.75,
                    stagger: 0.04,
                })
                .from(".intro-copy p, .intro-copy button", { // <- selector text, scoped to this component!
                    y: 60,
                    opacity: 0,
                    ease: Power2.easeOut,
                    duration: 0.75,
                    stagger: 0.1
                }, "-=0.25")

                return () => split.revert(); // context cleanup
            }, sliderRef.current); // <- scopes all selector text inside the context to this component (optional, default is document)
            return () => ctx.revert(); // useLayoutEffect cleanup
        }
    }, [props.isLoading]);

    return (
        <div className="intro" ref={sliderRef}>
            <div className="flex-2-col">
                <div className="left-col">
                    <h2 className="white">
                        We create the <br />
                        never before.
                    </h2>
                </div>
                <div className="right-col">
                    <div className="intro-copy">
                        <p>We bring together our expertise in design innovation, modern creativity and emerging technologies to create  never before brand experiences.</p>
                        <p>We do this by turning ideas into prototypes, and prototypes into proofs of value that can give brands a competitive advantage.</p>
                        <button className="white">Watch the video</button>
                    </div>
                </div>
            </div>
        </div>
    )
}