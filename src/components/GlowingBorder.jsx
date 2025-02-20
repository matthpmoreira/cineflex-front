import { useEffect, useRef } from "react";
import styled from "styled-components";

export function GlowingBorder({ children, borderWidth }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = canvas.scrollWidth;
        canvas.height = canvas.scrollHeight;

        const x1 = borderWidth * 2;
        const y1 = borderWidth * 2;
        const x2 = canvas.width - borderWidth * 4;
        const y2 = canvas.height - borderWidth * 4;

        let angle = 0;
        let animationFrame;

        function draw() {
            const gradient = ctx.createConicGradient(angle, canvas.width / 2, canvas.height / 2);
            gradient.addColorStop(0, "#00aeef");
            gradient.addColorStop(1 / 2, "#ec008c");
            gradient.addColorStop(1, "#00aeef");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Glow
            ctx.lineWidth = borderWidth;
            ctx.filter = "blur(1px)";
            ctx.strokeStyle = gradient;
            ctx.strokeRect(x1, y1, x2, y2);

            // Light
            ctx.lineWidth = borderWidth / 2;
            ctx.filter = "blur(.5px)";
            ctx.strokeStyle = "white";
            ctx.strokeRect(x1, y1, x2, y2);
        }

        function animate() {
            draw();
            angle = (angle + 0.05) % (Math.PI * 2);
            animationFrame = requestAnimationFrame(animate);
        }

        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, [borderWidth]);

    return (
        <Container>
            <Canvas ref={canvasRef} $margin={-borderWidth} />
            {children}
        </Container>
    );
}

const Container = styled.div`
    position: relative;
`;

const Canvas = styled.canvas`
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
`;
