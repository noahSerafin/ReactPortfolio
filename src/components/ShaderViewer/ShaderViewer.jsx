import { useState } from "react";
import "./ShaderViewer.scss";
import GlslCanvas from 'glslCanvas';

const ShaderViewer= () => {

    var [index, setIndex] = useState(0);

    const frag = [
        `
                precision mediump float;

        uniform float u_time;

        vec3 color1 = vec3(0.45, 0.13, 0.43);
        vec3 color2 = vec3(0.14, 0.11, 0.44);

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                -0.577350269189626,  // -1.0 + 2.0 * C.x
                                0.024390243902439); // 1.0 / 41.0
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i); // Avoid truncation effects in permutation
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));

            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        vec3 rgb2hsv(vec3 c) {
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }

        vec3 hsv2rgb(vec3 c) {
        c = vec3(c.x, clamp(c.yz, 0.0, 1.0));
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        void main() {

        vec2 st = gl_PointCoord;

        //pos
        vec2 pos = vec2(st*1.4);//value of grainieness
        float DF = 0.0;
        float a = 0.0;
        vec2 vel = vec2(u_time*(-.3));
        DF += snoise(pos+vel)*(.25)+(.25);

        float mixValue = distance(st, vec2(DF, 0.9))*0.4;//blur position
        
        vec3 hsv1 = rgb2hsv(color1);
        vec3 hsv2 = rgb2hsv(color2);
        
        // mix hue in toward closest direction
        float hue = (mod(mod((hsv2.x - hsv1.x), 1.) + 1.5, 1.) - 0.5) * mixValue + hsv1.x;
        vec3 hsv = vec3(hue, mix(hsv1.yz, hsv2.yz, mixValue));
        vec3 hsvo = vec3(hue, mix(hsv2.yz, hsv1.yz, mixValue));
        
        vec3 color = hsv2rgb(hsv);
            
        gl_FragColor = vec4(color, 1);
        }
        `,
        `
        #ifdef GL_ES
        precision mediump float;
        #endif
        
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        
        void main(){
            //float normx(float input){
              //  float average = (u_resolution.x) / 2;
                //float range = (u_resolution.x) / 2;
                //float normalized_x = (input - average) / range; 
                //return normalized_x;
            //}
            vec2 mouse_norm = (u_mouse - (u_resolution / 2.0)) / (u_resolution / 2.0); //normalized between -1 and 1
            vec2 coord = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
            float uDamp = 0.5;
            //coord.x += sin(u_time) + cos(u_time * 2.1);
            //coord.y += cos(u_time) + sin(u_time * 1.6);
            coord.x -= mouse_norm.x;// * uDamp;// - gl_FragCoord.x);
            coord.y -= mouse_norm.y;//abs(mouse_norm.x - gl_FragCoord.x);
            vec3 red = vec3(0.84, 0.14, 0.16);
        
            //color += 0.1 * (abs(sin(u_time)) + 0.1) / length(coord);
            red += (length(coord) * 0.3) / ((0.1) + (abs(sin(u_time)) * 0.5));
        
            gl_FragColor = vec4(red, 1.0);
           
        }
        `,
        `
        #ifdef GL_ES
        precision mediump float;
        #endif
        
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        
        uniform sampler2D u_tex0;
        
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        
        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                -0.577350269189626,  // -1.0 + 2.0 * C.x
                                0.024390243902439); // 1.0 / 41.0
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i); // Avoid truncation effects in permutation
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
        
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }
        
        void main(){
          vec2 mouse_norm = (u_mouse - (u_resolution / 2.0)) / (u_resolution / 2.0); //normalized between -1 and 1
        
            vec2 st = gl_FragCoord.xy/u_resolution.xy;
            st.x *= (u_resolution.x/u_resolution.y)*(0.2);//zoom
            vec3 color = vec3(0.14, 0.11, 0.44);
            vec2 pos = vec2(st*3.);
            vec3 mixom = vec3(0.45, 0.13, 0.43);
        
            float DF = 0.0;
        
            // Add a random position
            //loat a = 0.0;
            //float b = 0.0;
            vec2 vel = vec2(u_time*.1) * (0.5 * mouse_norm);
            DF += snoise(pos+vel)*.25+.25;
        
            // Add a random position
            //a = snoise(pos*vec2(cos(u_time*0.15),sin(u_time*0.1))*0.1)*3.1415;
            //b = snoise(pos*vec2(cos(u_time*0.1),sin(u_time*0.15))*0.1)*3.1415;
            //vel = vec2(cos(a),sin(a));
            //DF += snoise(pos+vel)*.25+.25;
        
            //vec2 m = vec2(mouse_norm.x, mouse_norm.y);
        
            color = vec3( smoothstep(0.1,0.9,(fract(DF)*1.9)) );
            mixom = vec3( smoothstep(0.4,0.99,(fract(DF)*28.1)) );
            vec3 blue = vec3(0.14, 0.11, 0.44);
            //vec3 notred = vec3(0.45, 0.13, 0.8);
            vec3 notred = vec3(0.45, 0.13, 0.43);
          
            
            vec2 coord = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
            float uDamp = 0.5;
        
            coord.x -= mouse_norm.x;// * uDamp;// - gl_FragCoord.x);
            coord.y -= mouse_norm.y;//abs(mouse_norm.x - gl_FragCoord.x);
        
            //gl_FragColor = (vec4((notred+1.0)-color, 1.0));
            vec4 light = (vec4((notred+1.0)-color,1.0));
            vec4 dark = (vec4((blue+1.0)-mixom,1.0));
            //gl_FragColor = mix(light, dark, 0.5);
            gl_FragColor = (light * dark) * (notred, 1.0);
           
        }
        `,
        `
        #ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D u_tex0;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main(){
  vec2 mouse_norm = (u_mouse - (u_resolution / 2.0)) / (u_resolution / 2.0); //normalized between -1 and 1

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= (u_resolution.x/u_resolution.y)*(0.5);//zoom
    vec3 color = vec3(0.0);
    vec2 pos = vec2(st*3.);

    float DF = 0.0;

    // Add a random position
    float a = 0.0;
    vec2 vel = vec2(u_time*.1) * (0.5 * mouse_norm);
    DF += snoise(pos+vel)*.25+.25;

    // Add a random position
    a = snoise(pos*vec2(cos(u_time*0.15),sin(u_time*0.1))*0.1)*3.1415;
    vel = vec2(cos(a),sin(a));
    DF += snoise(pos+vel)*.25+.25;

    //vec2 m = vec2(mouse_norm.x, mouse_norm.y);

    color = vec3( smoothstep(.7,.75,fract(DF)) );
    vec3 red = vec3(0.84, 0.14, 0.16);
    vec3 notred = vec3(0.16, 0.86, 0.84);
    //float normx(float input){
      //  float average = (u_resolution.x) / 2;
        //float range = (u_resolution.x) / 2;
        //float normalized_x = (input - average) / range; 
        //return normalized_x;
    //}
    
    vec2 coord = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
    float uDamp = 0.5;
    //coord.x += sin(u_time) + cos(u_time * 2.1);
    //coord.y += cos(u_time) + sin(u_time * 1.6);
    coord.x -= mouse_norm.x;// * uDamp;// - gl_FragCoord.x);
    coord.y -= mouse_norm.y;//abs(mouse_norm.x - gl_FragCoord.x);
    //vec3 red = vec3(0.84, 0.14, 0.16);

    //color += 0.1 * (abs(sin(u_time)) + 0.1) / length(coord);
    red += ((length(coord) * 0.3) / ((0.1) + ((sin(u_time))))) -1.;

    gl_FragColor = (vec4((red+1.0)-color,1.0));
   
}
        `

    ]
    
    const rightClicked = () => {
        if (index >= frag.length){
            setIndex(index => 0)
        } else { 
            setIndex(index => index + 1)
        }
        /*setTimeout(() => {
            if (products.length <= 6){
                //let newArr = 
                products.push(products.shift());
                //setProducts(newArr);
            }
            setState(state => state = 2)
        }, 150);*/
    }
    const leftClicked = () => {
        if (index <= 0){
            setIndex(index => frag.length)
        } else {
            setIndex(index => index - 1)
        }
    }
    //console.log('length, index:', frag.length, index)
    //console.log('frag:', frag[index])

    var canvas = document.createElement("canvas");/////!!
    var sandbox = new GlslCanvas(canvas);
    sandbox.load(frag[index]);/////!!!!


    return(
        <div >
        </div>
    );
};

export default ShaderViewer;
/*<div className="shader-container block">
            <button className="button--left" onClick={leftClicked}></button>
            
            <button className="button--right" onClick={rightClicked}></button>
            
        </div>*/